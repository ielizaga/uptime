function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

var my_articles_divs = [
    'total_my_draft_table',
    'total_my_review_table'
];

var my_article_chart_divs = [
    'total_created_by_month',
    'total_updated_by_month'
];


var last_activity_on_articles_divs = [
    'last_updated_my_article',
    'last_voted_my_article',
    'last_commented_my_article',
    'last_created_by_agent',
    'last_updated_by_agent',
    'last_voted_by_agent',
    'last_commented_by_agent'
];

function markKBCompleted(clicked_id) {
               $.post(
            "/post_mykb_data", {
                "Id": clicked_id,
            },
            function(response) {
                if (response == "success") {
                    $('.ui.small.modal#success-dialog-mykb').modal('show');
                } else {
                    $('.ui.small.modal#error-dialog-mykb').modal('show');
                }
            }
        );
}

$.getJSON($SCRIPT_ROOT + '/get_mykb_data',
    function(data) {
        console.log(data);

        // My Article Sections
        if (data.mykb.total_my_articles.length != 0) {
            $('#total_my_articles').html('<a target="_blank" href="https://discuss.zendesk.com/agent/users/' + data.mykb.total_my_articles[0]['author_id'] + '/articles">' + pad(data.mykb.total_my_articles[0]['Total']) + '</a>');
        }

        if (data.mykb.total_my_voted.length != 0) {
            $('#total_my_voted').html('<a target="_blank" href="https://discuss.zendesk.com/agent/users/' + data.mykb.total_my_voted[0]['voter_id'] + '/votes">' + pad(data.mykb.total_my_voted[0]['Total']) + '</a>');
        }

        if (data.mykb.total_my_commented.length != 0) {
            $('#total_my_commented').html('<a target="_blank" href="https://discuss.zendesk.com/agent/users/' + data.mykb.total_my_commented[0]['commentor_id'] + '/article_comments">' + pad(data.mykb.total_my_commented[0]['Total']) + '</a>');
        }

        $.each(my_articles_divs, function(id, article_divs) {

            if (article_divs == 'total_my_draft_table' || article_divs == 'total_my_review_table') {
                data_container = article_divs.substring(0, (article_divs).length - 6)

                if (data.mykb[data_container] != 0) {
                    $('#' + data_container).html('<a class="table_pop" id="' + article_divs + '_a">' + pad(data.mykb[data_container]) + '</a>');

                    for (var i in data.mykb[article_divs]) {
                        var rowTemplate = '<tr class="tr-color" style="color: black">' +
                            '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric"><a target="_blank" href="https://discuss.zendesk.com/hc/en-us/articles/' + data.mykb[article_divs][i]['article_id'] + '">' + data.mykb[article_divs][i]['article_title'] + '</a></td>' +
                            '<td class="tr-color td-wrap mdl-cell--hide-tablet mdl-cell--hide-phone mdl-data-table__cell--non-numeric">' + data.mykb[article_divs][i]['category'] + '</td>' +
                            '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric">' + data.mykb[article_divs][i]['created'] + '</td>' +
                            '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric">' + data.mykb[article_divs][i]['updated'] + '</td>' +
                            '</tr>';

                        $('#' + article_divs + ' tbody').append(rowTemplate);
                    }
                }
            }
        });

        if (data.mykb.total_my_votes != 0) {
            $('#total_my_votes').html('<a class="table_pop" id="total_my_votes_table_a">' + pad(data.mykb.total_my_votes) + '</a>');
            for (var i in data.mykb.total_my_votes_table) {
                var rowTemplate = '<tr class="tr-color" style="color: black">' +
                    '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric"><a target="_blank" href="https://discuss.zendesk.com/hc/en-us/articles/' + data.mykb.total_my_votes_table[i]['article_id'] + '">' + data.mykb.total_my_votes_table[i]['title'] + '</a></td>' +
                    '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric">' + data.mykb.total_my_votes_table[i]['Positive'] + '</td>' +
                    '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric">' + data.mykb.total_my_votes_table[i]['Total'] + '</td>' +
                    '</tr>';

                $('#total_my_votes_table tbody').append(rowTemplate);
            }
        }

        if (data.mykb.total_my_comments != 0) {
            $('#total_my_comments').html('<a class="table_pop" id="total_my_comments_table_a">' + pad(data.mykb.total_my_comments) + '</a>');
            for (var i in data.mykb.total_my_comments_table) {
                var rowTemplate = '<tr class="tr-color" style="color: black">' +
                    '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric"><a target="_blank" href="https://discuss.zendesk.com/hc/en-us/articles/' + data.mykb.total_my_comments_table[i]['article_id'] + '">' + data.mykb.total_my_comments_table[i]['title'] + '</a></td>' +
                    '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric">' + data.mykb.total_my_comments_table[i]['Total'] + '</td>' +
                    '</tr>';

                $('#total_my_comments_table tbody').append(rowTemplate);
            }
        }


        // Plot graph for all the charts mentioned in my_article_chart_divs variable for contribution section
        $.each(my_article_chart_divs, function(id, my_article_chart_div) {
            var x_axis = [];
            var y_axis = ['Articles'];
            var chart;

            for (var i in data.mykb[my_article_chart_div]) {
                x_axis.push(data.mykb[my_article_chart_div][i]['Month']);
                y_axis.push(data.mykb[my_article_chart_div][i]['Total']);
            }

            chart = drawBarChart(my_article_chart_div, x_axis, y_axis, false);

        });

        // Activity on My Article Section and also what did i last update
        $.each(last_activity_on_articles_divs, function(id, last_activity_on_articles_div) {
            if (data.mykb[last_activity_on_articles_div].length != 0) {
                $('#' + last_activity_on_articles_div).html('<a target="_blank" href="https://discuss.zendesk.com/hc/en-us/articles/' + data.mykb[last_activity_on_articles_div][0]['article_id'] + '">' + pad(data.mykb[last_activity_on_articles_div][0]['article_id']) + '</a>')
                $('#' + last_activity_on_articles_div + '_time').html(data.mykb[last_activity_on_articles_div][0]['date'])
            }
        });

        $(".table_pop").click(function(event) {
            pop_container = '.ui.basic.modal#' + ($(this).attr("id")).substring(0, ($(this).attr("id")).length - 2) + '_box';
            $(pop_container).modal('show');
        });

        /** Table for tickets marked as KB needed **/
        if (data.mykb.kb_needed.length != 0) {

                var rowTemplateHeader ='<div>' +
                                       '    <div class="mdl-card__title-text uptime-card-title2 uptime-color"><br/>Tickets Marked as KB Needed</div>' +
                                       '    <div class="mdl-card__actions mdl-card--border graph-font"></div>' +
                                       '    <div id="table-scroll">' +
                                       '    	<table id="ticket-kb-needed-tab" class="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-data-table mdl-js-data-table mdl-shadow--2dp">' +
                                       '        	<thead>' +
                                       '        		<tr>' +
                                       '            		<th class="th-color mdl-data-table__cell--non-numeric">Ticket #</th>' +
                                       '            		<th class="th-color mdl-data-table__cell--non-numeric mdl-cell--hide-phone">Subject</th>' +
                                       '            		<th class="th-color mdl-data-table__cell--non-numeric">Status</th>' +
                                       '             		<th class="th-color mdl-data-table__cell--non-numeric mdl-cell--hide-tablet mdl-cell--hide-phone">Priority</th>' +
                                       '            		<th class="th-color mdl-data-table__cell--non-numeric mdl-cell--hide-tablet mdl-cell--hide-phone">Last Updated</th>' +
                                       '            		<th class="th-color mdl-data-table__cell--non-numeric">Action</th>' +
                                       '        		</tr>' +
                                       '        	</thead>' +
                                       '        	<tbody>' +
                                       '        	</tbody>' +
                                       '    	</table>' +
                                       '   </div>' +
                                       '</div>';

                $('#ticket-kb-needed-div').append(rowTemplateHeader);

                if (data.mykb.kb_needed.length == 2) {
                    $('#table-scroll').css({ 'height': "180px" });
                } else if (data.mykb.kb_needed.length == 3) {
                    $('#table-scroll').css({ 'height': "240px" });
                } else if (data.mykb.kb_needed.length == 4) {
                    $('#table-scroll').css({ 'height': "305px" });
                } else if (data.mykb.kb_needed.length > 4) {
                    $('#table-scroll').css({ 'height': "305px" });
                }

                for (var i in data.mykb.kb_needed) {
                    var rowTemplate = '<tr class="tr-color" style="color: black">' +
                                        '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric"><a target="_blank" href="http://discuss.zendesk.com/agent/tickets/' + data.mykb.kb_needed[i]['ticket_id'] + '">' + data.mykb.kb_needed[i]['ticket_id'] + '</a></td>' +
                                        '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric mdl-cell--hide-phone" >' + data.mykb.kb_needed[i]['ticket_subject'] + '</td>' +
                                        '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric">' + data.mykb.kb_needed[i]['ticket_status'] + '</td>' +
                                        '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric mdl-cell--hide-tablet mdl-cell--hide-phone">' + data.mykb.kb_needed[i]['ticket_priority'] + '</td>' +
                                        '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric mdl-cell--hide-tablet mdl-cell--hide-phone">' + data.mykb.kb_needed[i]['ticket_updated'] + '</td>' +
                                        '<td id="'+ data.mykb.kb_needed[i]['ticket_id'] + '"onClick="markKBCompleted(this.id)"><button class="ui primary button mykb-button">Done</button></td>' +
                                      '</tr>';

                    $('#ticket-kb-needed-tab tbody').append(rowTemplate);

                }
            }
        }
    );