link_store = {};

function loadLinkForm(product, id) {
    console.log(link_store[product][id]);
    $('#weblink_row_id').val(link_store[product][id]._id);
    $('#product_category').val(link_store[product][id].product_category);
    $('#short_heading').val(link_store[product][id].short_heading);
    $('#website_url').val(link_store[product][id].web_url);
    $('#contact_person').val(link_store[product][id].contact_person);
    $('#contact_person_email').val(link_store[product][id].email);
    $('#long_description').val(link_store[product][id].long_description);
    $('.ui.basic.modal#add-form').modal('show');
}

$.getJSON($SCRIPT_ROOT + '/get_weblink_data',
      function(data) {

        console.log(data);
        link_store = data.weblinks;
        $.each(data.weblinks, function(product) {


            for (var i in data.weblinks[product]) {

                var rowTemplate = '<tr class="tr-color" style="color: black">'+
                                  '<td class="tr-color mdl-data-table__cell--non-numeric" width="1%"><i class="angle right icon"></i></td>'+
                                  '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric"><a target="_blank" href="'+data.weblinks[product][i]['web_url']+'">'+data.weblinks[product][i]['short_heading']+'</a></td>'+
                                  '<td class="tr-color mdl-data-table__cell--non-numeric text-align-right">'+
                                  '<a id="'+data.weblinks[product][i]['_id']+'_edit" class="edit_class" onclick="loadLinkForm(\''+product+'\','+i+')"><i class="write icon icon_attributes"></i></a>'+
                                  '<a id="'+data.weblinks[product][i]['_id']+'_info" class="info_class"><i class="info circle icon icon_attributes"></i></a>' +
                                  '</td>'+
                                  '</tr>';

                if (i%2 == 0) {
                    $('#'+product+'-links-table-left tbody:last').after(rowTemplate);
                } else {
                    $('#'+product+'-links-table-right tbody:last').after(rowTemplate);
                };

                var infoRowTemplate = '<div id="'+data.weblinks[product][i]['_id']+'_info_table" class="ui basic modal">'+
                                      '<div class="actions">'+
                                      '    <div class="ui cancel circular inverted red icon button"><i class="icon remove"></i></div>'+
                                      '</div>'+
                                      '<table class="mdl-cell mdl-cell--6-col mdl-data-table mdl-js-data-table mdl-shadow--2dp" style="width: 100%">'+
                                      '   <tbody>'+
                                      '       <tr>'+
                                      '           <td class="th-color mdl-cell--hide-phone mdl-data-table__cell--non-numeric"><b> Heading </b></b></td>'+
                                      '           <td class="td-wrap th-color mdl-data-table__cell--non-numeric">'+data.weblinks[product][i]['short_heading']+'</td>'+
                                      '       </tr>'+
                                      '       <tr>'+
                                      '           <td class="th-color mdl-cell--hide-phone mdl-data-table__cell--non-numeric"><b> URL </b></td>'+
                                      '           <td class="td-wrap th-color mdl-data-table__cell--non-numeric">'+data.weblinks[product][i]['web_url']+'</td>'+
                                      '       </tr>'+
                                      '       <tr>'+
                                      '           <td class="th-color mdl-cell--hide-phone mdl-data-table__cell--non-numeric"><b> Contact Person </b></td>'+
                                      '           <td class="td-wrap th-color mdl-data-table__cell--non-numeric">'+data.weblinks[product][i]['contact_person']+'</td>'+
                                      '       </tr>'+
                                      '       <tr>'+
                                      '           <td class="th-color mdl-cell--hide-phone mdl-data-table__cell--non-numeric"><b> Contact Person Email </b></td>'+
                                      '           <td class="td-wrap th-color mdl-data-table__cell--non-numeric">'+data.weblinks[product][i]['email']+'</td>'+
                                      '       </tr>'+
                                      '       <tr>'+
                                      '           <td class="th-color mdl-cell--hide-phone mdl-data-table__cell--non-numeric"><b> Description </b></td>'+
                                      '           <td class="td-wrap th-color mdl-data-table__cell--non-numeric">'+data.weblinks[product][i]['long_description']+'</td>'+
                                      '       </tr>'+
                                      '    </tbody>'+
                                      '</table>'+
                                      '</div>';

                $('#'+product+'-links-info').after(infoRowTemplate);
            }
         });

        $('.info_class').click(function(event) {
           info_container = '.ui.basic.modal#'+$(this).attr("id")+'_table';
           $(info_container).modal('show');
        });
      });