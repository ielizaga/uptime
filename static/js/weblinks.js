link_store = {};

function loadLinkForm(product, id) {
    $('#weblink_row_id').val(link_store[product][id]._id);
    $('#product_category').val(link_store[product][id].product_category);
    $('#short_heading').val(link_store[product][id].short_heading);
    $('#website_url').val(link_store[product][id].web_url);
    $('#contact_person').val(link_store[product][id].contact_person);
    $('#contact_person_email').val(link_store[product][id].email);
    $('#long_description').val(link_store[product][id].long_description);
    $('#formModal').modal('show');
}

$.getJSON($SCRIPT_ROOT + '/get_weblink_data',
    function(data) {

        var active_weblink_table = '#support-table'
        $(".weblink-menu").click(function(event) {
        main_container = '#'+($(this).attr("id")).substring(0, ($(this).attr("id")).length - 5);
            if(main_container=="#support"){
                title="Pivotal Support Services Weblinks";
            }else if(main_container=="#greenplum") {
                title="Pivotal Greenplum Weblinks";
            }else if(main_container=="#hdb") {
                title="Pivotal HDB Weblinks";
            }else if(main_container=="#gemfire") {
                title="Pivotal Gemfire Weblinks";
            }else if(main_container=="#pcf") {
                title="Pivotal Cloud Foundry Weblinks";
            }
            $("#weblink-title").html(title);
            $(active_weblink_table).removeClass("weblink-active").addClass("weblink-inactive");
            $(main_container+"-table").removeClass("weblink-inactive").addClass("weblink-active");
            active_weblink_table = main_container+"-table";
        });

        console.log(data);
        link_store = data.weblinks;
        $.each(data.weblinks, function(product) {


            for (var i in data.weblinks[product]) {

                var rowTemplate = '<tr>' +
                    '<td><i class="fa fa-chevron-right" aria-hidden="true"></i></td>' +
                    '<td><a target="_blank" href="' + data.weblinks[product][i]['web_url'] + '">' + data.weblinks[product][i]['short_heading'] + '</a></td>' +
                    '<td>' +
                    '<a id="' + data.weblinks[product][i]['_id'] + '_edit" class="edit_class weblink-action-icon" onclick="loadLinkForm(\'' + product + '\',' + i + ')"><i class="fa fa-pencil fa-lg" aria-hidden="true"></i></a>' +
                    '<a id="' + data.weblinks[product][i]['_id'] + '_info" class="info_class weblink-action-icon" data-toggle="modal" data-target="#' + data.weblinks[product][i]['_id'] + '" style="margin-left:10px"><i class="fa fa-info-circle fa-lg" aria-hidden="true"></i></a>' +
                    '</td>' +
                    '</tr>';

                if (i % 2 == 0) {
                    $('#' + product + '-links-table-left tbody').append(rowTemplate);
                } else {
                    $('#' + product + '-links-table-right tbody').append(rowTemplate);
                };

                var infoRowTemplate = '<div aria-labelledby="myModalLabel" class="modal fade" id="'+ data.weblinks[product][i]['_id'] +'" role="dialog" tabindex="-1"> ' +
        '    <div class="modal-dialog modal-width" role="document"> ' +
        '        <div class="modal-content card card-stats"> ' +
        '            <div class="card-header" data-background-color="blue"> ' +
        '                <i class="fa fa-info-circle fa-lg" aria-hidden="true"></i> ' +
        '            </div> ' +
        '            <div class="modal-header"> ' +
        '                <button aria-label="Close" class="close" data-dismiss="modal" type="button"><span aria-hidden="true">&times;</span></button> ' +
        '                <h4 class="modal-title">Info</h4> ' +
        '            </div> ' +
        '            <div class="modal-body table-responsive"> ' +
        '                <table class="table table-hover" id="tickets_open_table"> ' +
        '                   <tbody>' +
        '                      <tr>' +
        '                          <td><b> Heading </b></b></td>' +
        '                          <td>' + data.weblinks[product][i]['short_heading'] + '</td>' +
        '                      </tr>' +
        '                      <tr>' +
        '                          <td><b> URL </b></td>' +
        '                          <td>' + data.weblinks[product][i]['web_url'] + '</td>' +
        '                      </tr>' +
        '                      <tr>' +
        '                          <td><b> Contact Person </b></td>' +
        '                          <td>' + data.weblinks[product][i]['contact_person'] + '</td>' +
        '                      </tr>' +
        '                      <tr>' +
        '                          <td><b> Contact Person Email </b></td>' +
        '                          <td>' + data.weblinks[product][i]['email'] + '</td>' +
        '                      </tr>' +
        '                      <tr>' +
        '                          <td><b> Description </b></td>' +
        '                          <td>' + data.weblinks[product][i]['long_description'] + '</td>' +
        '                      </tr>' +
        '                   </tbody>' +
        '                </table> ' +
        '            </div> ' +
        '            <div class="modal-footer"> ' +
        '                <button class="btn btn-default btn-simple" data-dismiss="modal" type="button">Close</button> ' +
        '            </div> ' +
        '        </div> ' +
        '    </div> ' +
        '</div> ';

                $('#' + product + '-links-info').append(infoRowTemplate);
            }
        });

        /* Update the database with the data */
        function postLinkData() {
            $.post(
                "/post_weblink_form_data",
                $("#form-link").serialize(),
                function(response) {
                    if (response == "success") {
                        $(location).attr('href', '/weblinks')
                    }
                }
            );
        }

        /* add link html control */
        $('#add-link').click(function() {
          $('#add-icon').html('<div class="card-header" data-background-color="green"><i class="fa fa-plus" aria-hidden="true"></i></div><div class="modal-header"><button aria-label="Close" class="close" data-dismiss="modal" type="button"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Add weblink</h4></div>')
        });

        /* update link html control */
        $('.edit_class').click(function() {
          $('#add-icon').html('<div class="card-header" data-background-color="orange"><i class="fa fa-pencil" aria-hidden="true"></i></div><div class="modal-header"><button aria-label="Close" class="close" data-dismiss="modal" type="button"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Edit weblink</h4></div>')
        });

        /* Reset the modal after its closed */
        $('#formModal').on('hidden.bs.modal', function(){
            $(this).find('form')[0].reset();
        });

        /* Form sumbit action and validation check */
        $('#form-link').submit(function(event){
                postLinkData();
        });

    });