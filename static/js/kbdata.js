// Replace special characters
function replace_characters(string) {
    return string.replace(/\(|\)|\-|\//g, '')
}

// Restore the filter default values when then pages/view is changed
function restore_filter(filter_div) {

    if ($(filter_div).hasClass("filter-selection")) {
        $('.ui.dropdown').dropdown('restore default text');
        $('.inactive-div').fadeIn().removeClass("inactive-div").addClass("active-div");
        $(filter_div).removeClass("filter-selection");
    }

}

var kb_days = [
    'new_kb_07_days',
    'new_kb_15_days',
    'new_kb_30_days',
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

                if (kb_type == "new") {
                    var rowTemplateHeader = '<div id="' + id_generator + '"class="active-div mdl-grid uptime-content">' +
                        '   <div class="mdl-card__title-text uptime-card-title uptime-color">' + i + '</div>' +
                        '   <div class="mdl-card__actions mdl-card--border graph-font">' +
                        '      <table id="' + kb_day + '_' + incrementor + '_table" class="mdl-cell mdl-cell--6-col mdl-data-table mdl-js-data-table mdl-shadow--2dp" style="width: 100%">' +
                        '          <thead>' +
                        '              <tr>' +
                        '                  <th class="th-color mdl-data-table__cell--non-numeric" width="50%">Title</th>' +
                        '                  <th class="th-color mdl-cell--hide-phone mdl-data-table__cell--non-numeric" width="20%">Author</th>' +
                        '                  <th class="th-color mdl-data-table__cell--non-numeric">Created</th>' +
                        '                  <th class="th-color mdl-data-table__cell--non-numeric" width="5%">Draft</th>' +
                        '               </tr>' +
                        '          </thead>' +
                        '          <tbody>' +
                        '          </tbody>' +
                        '      </table>' +
                        '   </div>' +
                        '</div>'
                } else {
                    var rowTemplateHeader = '<div id="' + id_generator + '"class="mdl-grid uptime-content active-div">' +
                        '   <div class="mdl-card__title-text uptime-card-title uptime-color">' + i + '</div>' +
                        '   <div class="mdl-card__actions mdl-card--border graph-font">' +
                        '      <table id="' + kb_day + '_' + incrementor + '_table" class="mdl-cell mdl-cell--6-col mdl-data-table mdl-js-data-table mdl-shadow--2dp" style="width: 100%">' +
                        '          <thead>' +
                        '              <tr>' +
                        '                  <th class="th-color mdl-data-table__cell--non-numeric" width="40%">Title</th>' +
                        '                  <th class="th-color mdl-cell--hide-phone mdl-cell--hide-tablet mdl-data-table__cell--non-numeric" width="10%">Author</th>' +
                        '                  <th class="th-color mdl-cell--hide-phone mdl-data-table__cell--non-numeric" width="10%">Updator</th>' +
                        '                  <th class="th-color mdl-cell--hide-phone mdl-cell--hide-tablet mdl-data-table__cell--non-numeric">Created</th>' +
                        '                  <th class="th-color mdl-data-table__cell--non-numeric">Updated</th>' +
                        '                  <th class="th-color mdl-data-table__cell--non-numeric" width="5%">Draft</th>' +
                        '               </tr>' +
                        '          </thead>' +
                        '          <tbody>' +
                        '          </tbody>' +
                        '      </table>' +
                        '   </div>' +
                        '</div>'

                }

                $('#' + kb_day).append(rowTemplateHeader);

                for (var j in data.kbdata[kb_day][i]) {

                    if (kb_type == "new") {

                        var dataRowTemplate = '<tr class="tr-color">' +
                            '    <td class="td-wrap tr-color mdl-data-table__cell--non-numeric" width="50%"><a target="_blank" href="https://discuss.zendesk.com/hc/en-us/articles/' + data.kbdata[kb_day][i][j]['article_id'] + '">' + data.kbdata[kb_day][i][j]['article_title'] + '</a></td>' +
                            '    <td class="td-wrap tr-color mdl-cell--hide-phone mdl-data-table__cell--non-numeric" width="20%">' + data.kbdata[kb_day][i][j]['author'] + '</td>' +
                            '    <td class="td-wrap tr-color mdl-data-table__cell--non-numeric">' + data.kbdata[kb_day][i][j]['created'] + '</td>' +
                            '    <td class="td-wrap tr-color mdl-data-table__cell--non-numeric" width="5%">' + data.kbdata[kb_day][i][j]['draft'] + '</td>' +
                            '</tr>';
                    } else {

                        var dataRowTemplate = '<tr class="tr-color">' +
                            '    <td class="td-wrap tr-color mdl-data-table__cell--non-numeric" width="40%"><a target="_blank" href="https://discuss.zendesk.com/hc/en-us/articles/' + data.kbdata[kb_day][i][j]['article_id'] + '">' + data.kbdata[kb_day][i][j]['article_title'] + '</a></td>' +
                            '    <td class="td-wrap tr-color mdl-cell--hide-phone mdl-cell--hide-tablet mdl-data-table__cell--non-numeric" width="10%">' + data.kbdata[kb_day][i][j]['author'] + '</td>' +
                            '    <td class="td-wrap tr-color mdl-cell--hide-phone mdl-data-table__cell--non-numeric" width="10%">' + data.kbdata[kb_day][i][j]['updator'] + '</td>' +
                            '    <td class="td-wrap tr-color mdl-cell--hide-phone mdl-cell--hide-tablet mdl-data-table__cell--non-numeric">' + data.kbdata[kb_day][i][j]['created'] + '</td>' +
                            '    <td class="td-wrap tr-color mdl-data-table__cell--non-numeric">' + data.kbdata[kb_day][i][j]['updated'] + '</td>' +
                            '    <td class="td-wrap tr-color mdl-data-table__cell--non-numeric" width="5%">' + data.kbdata[kb_day][i][j]['draft'] + '</td>' +
                            '</tr>';
                    }

                    $('#' + kb_day + '_' + incrementor + '_table tbody').append(dataRowTemplate);
                };
                incrementor += 1;
            }
        });

        /* Section : New KB
         *
         * JQuery for controlling the function of buttons
         */
        var new_kb_active = '#new_kb_07_days';
        var new_kb_active_button = '#new_kb_07_days_nav';
        $('.new-kb-button').click(function() {

            new_kb_container = '#' + ($(this).attr("id")).substring(0, ($(this).attr("id")).length - 4);
            new_kb_button = '#' + $(this).attr("id");

            if ($(new_kb_container).is(":visible")) {
                return 0;
            } else {
                $(new_kb_active).fadeOut().removeClass("active-kb").addClass("inactive-kb");
                $(new_kb_container).fadeIn(1000).addClass("active-kb").removeClass("inactive-kb");
                $(new_kb_active_button).removeClass("toggle-color")
                $(new_kb_button).addClass("toggle-color");
                restore_filter('#new_filter_div');
                new_kb_active = new_kb_container;
                new_kb_active_button = new_kb_button;

                $("#section-title").html(title);

            };
        });

        /* Section : Updated KB
         *
         * JQuery for controlling the function of buttons
         */
        var updated_kb_active = '#updated_kb_07_days';
        var updated_kb_active_button = '#updated_kb_07_days_nav';
        $('.updated-kb-button').click(function() {

            updated_kb_container = '#' + ($(this).attr("id")).substring(0, ($(this).attr("id")).length - 4);
            updated_kb_button = '#' + $(this).attr("id");

            if ($(updated_kb_container).is(":visible")) {
                return 0;
            } else {
                $(updated_kb_active).fadeOut().removeClass("active-kb").addClass("inactive-kb");
                $(updated_kb_container).fadeIn(1000).addClass("active-kb").removeClass("inactive-kb");
                $(updated_kb_active_button).removeClass("toggle-color")
                $(updated_kb_button).addClass("toggle-color");
                restore_filter('#updated_filter_div');
                updated_kb_active = updated_kb_container;
                updated_kb_active_button = updated_kb_button;

                $("#section-title").html(title);

            };
        });

        // Populate the Menu for filter button
        $.each(kb_catgeory, function(id, category) {
            var menu_list = '<div class="item">' + category + '</div>'
            $('#new_filter_menu, #updated_filter_menu').append(menu_list)
        });

        // Define the play when the filter button is selected / clicked
        function filter_selection(value, selected_filter) {

            if (selected_filter == 'new_filter_div') {
                selected_container = new_kb_active
            } else if (selected_filter == 'updated_filter_div') {
                selected_container = updated_kb_active
            };
            div_picker = replace_characters((value + '_' + selected_container.substring(1)).replace(/\s+/g, '_').toLowerCase());
            $('.active-div').hide().removeClass("active-div").addClass("inactive-div");
            $('#' + div_picker).fadeIn(500).removeClass("inactive-div").addClass("active-div");
            $('#'+selected_filter).addClass("filter-selection")

        };

        // What to do when the dropdown filter is clicked
        $('.dropdown')
            .dropdown({
                transition: 'drop',
                onChange: function(value) {
                    var catch_id = $(this).attr("id");
                    filter_selection(value, catch_id)
                }
            });
    });