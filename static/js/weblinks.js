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

                var rowTemplate = '<tr class="tr-color" style="color: black">' +
                    '<td class="tr-color mdl-data-table__cell--non-numeric" width="1%"><i class="angle right icon"></i></td>' +
                    '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric"><a target="_blank" href="' + data.weblinks[product][i]['web_url'] + '">' + data.weblinks[product][i]['short_heading'] + '</a></td>' +
                    '<td class="tr-color mdl-data-table__cell--non-numeric text-align-right">' +
                    '<a id="' + data.weblinks[product][i]['_id'] + '_edit" class="edit_class" onclick="loadLinkForm(\'' + product + '\',' + i + ')"><i class="write icon icon_attributes"></i></a>' +
                    '<a id="' + data.weblinks[product][i]['_id'] + '_info" class="info_class"><i class="info circle icon icon_attributes"></i></a>' +
                    '</td>' +
                    '</tr>';

                if (i % 2 == 0) {
                    $('#' + product + '-links-table-left tbody').append(rowTemplate);
                } else {
                    $('#' + product + '-links-table-right tbody').append(rowTemplate);
                };

                var infoRowTemplate = '<div id="' + data.weblinks[product][i]['_id'] + '_info_table" class="ui basic modal">' +
                    '<div class="actions">' +
                    '    <div class="ui cancel circular inverted red icon button"><i class="icon remove"></i></div>' +
                    '</div>' +
                    '<table class="mdl-cell mdl-cell--6-col mdl-data-table mdl-js-data-table mdl-shadow--2dp" style="width: 100%">' +
                    '   <tbody>' +
                    '       <tr>' +
                    '           <td class="th-color mdl-cell--hide-phone mdl-data-table__cell--non-numeric"><b> Heading </b></b></td>' +
                    '           <td class="td-wrap th-color mdl-data-table__cell--non-numeric">' + data.weblinks[product][i]['short_heading'] + '</td>' +
                    '       </tr>' +
                    '       <tr>' +
                    '           <td class="th-color mdl-cell--hide-phone mdl-data-table__cell--non-numeric"><b> URL </b></td>' +
                    '           <td class="td-wrap th-color mdl-data-table__cell--non-numeric">' + data.weblinks[product][i]['web_url'] + '</td>' +
                    '       </tr>' +
                    '       <tr>' +
                    '           <td class="th-color mdl-cell--hide-phone mdl-data-table__cell--non-numeric"><b> Contact Person </b></td>' +
                    '           <td class="td-wrap th-color mdl-data-table__cell--non-numeric">' + data.weblinks[product][i]['contact_person'] + '</td>' +
                    '       </tr>' +
                    '       <tr>' +
                    '           <td class="th-color mdl-cell--hide-phone mdl-data-table__cell--non-numeric"><b> Contact Person Email </b></td>' +
                    '           <td class="td-wrap th-color mdl-data-table__cell--non-numeric">' + data.weblinks[product][i]['email'] + '</td>' +
                    '       </tr>' +
                    '       <tr>' +
                    '           <td class="th-color mdl-cell--hide-phone mdl-data-table__cell--non-numeric"><b> Description </b></td>' +
                    '           <td class="td-wrap th-color mdl-data-table__cell--non-numeric">' + data.weblinks[product][i]['long_description'] + '</td>' +
                    '       </tr>' +
                    '    </tbody>' +
                    '</table>' +
                    '</div>';

                $('#' + product + '-links-info').append(infoRowTemplate);
            }
        });

        /* Action when the info button is clicked */
        $('.info_class').click(function(event) {
            info_container = '.ui.basic.modal#' + $(this).attr("id") + '_table';
            $(info_container).modal('show');
        });

        /**
         * Section: Weblink Form
         * Jquery for form ( i.e form to contribute the link )
         */

        /* reset the values based on the button clicked */
        $('#add-link, #reset-link, #continue-link').click(function(event) {

            var hidden_id = $('#weblink_row_id').val();
            var clicked_element_id = $(this).attr("id");

            if (hidden_id != '' && clicked_element_id == "add-link") {
                $('input, textarea, select').val('');
            };

            $('.ui.basic.modal#add-form').modal('show');
        });

        /* Reload once successfully added to database */
        $("#success-link-click").click(function(event) {
            location.reload();
        });

        /* Check if the URL is valid */
        function isUrlValid(url) {
            return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
        }

        /* Check if the email address is Valid */
        function isValidEmailAddress(emailAddress) {
            var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
            return pattern.test(emailAddress);
        };

        /* Update the database with the data */
        function postLinkData() {
            console.log($('#form-link').serializeArray());
            $.post(
                "/post_weblink_form_data",
                $("#form-link").serialize(),
                function(response) {
                    if (response == "success") {
                        $('.ui.small.modal#success-dialog-link').modal('show');
                        $('.ui.basic.modal#add-form').modal('hide');
                    } else {
                        $('#text-link').html("The uptime database couldn't register the entry, please contact the uptime admin or try again after sometime.");
                        $('.ui.small.modal#error-dialog-link').modal('show');
                    }
                }
            );
        }

        /* Form sumbit action and validation check */
        $('#submit-link').click(function() {

            if ($("#product_category").val() == '' || $("#short_heading").val() == '' || $("#website_url").val() == '' || $("#contact_person").val() == '' || $("#long_description").val() == '') {

                $('#text-link').html("It seems like some of the forms mandatory fields have not been entered.");
                $('.ui.small.modal#error-dialog-link').modal('show');

            } else if (!isUrlValid($("#website_url").val())) {

                $('#text-link').html("It seems like URL entered is not valid, a valid URL is for example 'http://mywebsite.com'.");
                $('.ui.small.modal#error-dialog-link').modal('show');

            } else if ($("#contact_person_email").val() != ' ') {

                if (!isValidEmailAddress($("#contact_person_email").val())) {
                    $('#text-link').html("It seems like Email Address is entered incorrectly.");
                    $('.ui.small.modal#error-dialog-link').modal('show');
                } else {
                    postLinkData();
                }

            } else {
                postLinkData();
            }
            return false;
        });

    });