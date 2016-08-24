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

            chart = drawBarChart(my_article_chart_div, x_axis, y_axis);

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

    });