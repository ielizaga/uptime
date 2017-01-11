// Replace special characters
function replace_characters(string) {
    return string.replace(/\(|\)|\-|\//g, '')
}

//// Restore the filter default values when then pages/view is changed
function restore_filter(filter_div) {

    if ($(filter_div).hasClass("kb-filter-activated")) {
        $('.inactive-div').fadeIn().removeClass("inactive-div").addClass("active-div");
        $(filter_div).removeClass("kb-filter-activated");
        $(filter_div).addClass("kb-filter-disabled");
    }

}

var kb_days = [
    'updated_kb_07_days',
    'updated_kb_15_days',
    'updated_kb_30_days',
];

var kb_catgeory = [];

$.getJSON($SCRIPT_ROOT + '/get_kb_data',
    function(data) {
        console.log(data);

        $.each(kb_days, function(id, kb_day) {

            var incrementor = 0
            var kb_type = kb_day.substring(0, (kb_day).length - 11)
            for (var i in data.kbdata[kb_day]) {
                id_generator = replace_characters((i + '_' + kb_day).replace(/\s+/g, '_').toLowerCase());

                var found = jQuery.inArray(i, kb_catgeory);
                if (found >= 0) {} else {
                    kb_catgeory.push(i);
                };

                    var rowTemplateHeader = '<div id="' + id_generator + '"class="col-lg-12 col-md-12 active-div"> ' +
                        '    <div class="card"> ' +
                        '        <div class="card-header" data-background-color="pivotal"> ' +
                        '            <h4 class="title">' + i + '</h4> ' +
                        '        </div> ' +
                        '        <div class="card-content table-responsive"> ' +
                        '            <table id="' + kb_day + '_' + incrementor + '_table" class="table table-hover" id="ticket-table"> ' +
                        '                <thead class="text-warning"> ' +
                        '                    <tr> ' +
                        '                        <th width="40%">Title</th> ' +
                        '                        <th width="10%">Author</th> ' +
                        '                        <th width="10%">Updator</th> ' +
                        '                        <th>Created</th> ' +
                        '                        <th>Updated</th> ' +
                        '                        <th width="5%">Draft</th> ' +
                        '                    </tr> ' +
                        '                </thead> ' +
                        '                <tbody> ' +
                        '                </tbody> ' +
                        '            </table> ' +
                        '        </div> ' +
                        '    </div> ' +
                        '</div> '


                $('#' + kb_day).append(rowTemplateHeader);

                for (var j in data.kbdata[kb_day][i]) {


                        var dataRowTemplate = '<tr class="tr-color">' +
                            '    <td width="40%"><a target="_blank" href="https://discuss.zendesk.com/hc/en-us/articles/' + data.kbdata[kb_day][i][j]['article_id'] + '">' + data.kbdata[kb_day][i][j]['article_title'] + '</a></td>' +
                            '    <td width="10%">' + data.kbdata[kb_day][i][j]['author'] + '</td>' +
                            '    <td width="10%">' + data.kbdata[kb_day][i][j]['author'] + '</td>' +
                            '    <td>' + data.kbdata[kb_day][i][j]['created'] + '</td>' +
                            '    <td>' + data.kbdata[kb_day][i][j]['updated'] + '</td>' +
                            '    <td width="5%">' + data.kbdata[kb_day][i][j]['draft'] + '</td>' +
                            '</tr>';


                    $('#' + kb_day + '_' + incrementor + '_table tbody').append(dataRowTemplate);
                };
                incrementor += 1;
            }
        });

        /* Section : Updated KB
         *
         * JQuery for controlling the function of buttons
         */
        var updated_kb_active = '#updated_kb_07_days';
        var updated_kb_active_button = '#updated_kb_07_days_nav';
        $('.kb-button').click(function() {

            updated_kb_container = '#' + ($(this).attr("id")).substring(0, ($(this).attr("id")).length - 4);
            updated_kb_button = '#' + $(this).attr("id");
            console.log(updated_kb_container, updated_kb_active);
            if ($(updated_kb_container).is(":visible")) {
                return 0;
            } else {
                $(updated_kb_active).fadeOut().removeClass("active-kb").addClass("inactive-kb");
                $(updated_kb_container).fadeIn(1000).addClass("active-kb").removeClass("inactive-kb");
                $(updated_kb_active_button).removeClass("kb-active-button ").addClass("kb-disable-button");
                $(updated_kb_button).addClass("kb-active-button").removeClass("kb-disable-button");
                restore_filter('#filter');
                updated_kb_active = updated_kb_container;
                updated_kb_active_button = updated_kb_button;
            };
        });


        // Populate the Menu for filter button
        $.each(kb_catgeory, function(id, category) {
            var menu_list = '<li><a>' + category + '</a></li>'
            $('#filter_menu').append(menu_list)
        });

        // Define the play when the filter button is selected / clicked
        function filter_selection(value, selected_filter) {

            selected_container = updated_kb_active
            div_picker = replace_characters((value + '_' + selected_container.substring(1)).replace(/\s+/g, '_').toLowerCase());
            $('.active-div').hide().removeClass("active-div").addClass("inactive-div");
            $('#' + div_picker).fadeIn(500).removeClass("inactive-div").addClass("active-div");
            $('#filter').removeClass("kb-filter-disabled")
            $('#filter').addClass("kb-filter-activated")

        };

        // What to do when the dropdown filter is clicked
        $('.dropdown-menu a').click(function(){

                var catch_id = $(this).text();
                filter_selection(catch_id, 'updated_filter_div')
            });

        });
