var chart_divs = [
    'kb_current_month_per_catgeory',
    'kb_current_month_per_author',
    'kb_in_review',
    'kb_overall_by_author',
    'kb_per_month',
    'kb_comments_per_month',
    'kb_votes_per_month'
];

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

$.getJSON($SCRIPT_ROOT + '/get_kbanalytics_data',
    function(data) {
        console.log(data);

        // Get the Total Article/Votes/Comments Count
        $('#total_articles').html(pad(data.kbanalytics.total_articles));
        $('#total_votes').html(pad(data.kbanalytics.total_votes));
        $('#total_comments').html(pad(data.kbanalytics.total_comments));

        // Plot graph for all the draft articles
        var x_axis = [];
        var y_axis = ['Articles'];
        for (var i in data.kbanalytics.kb_in_draft[0]) {
            x_axis.push(i);
            y_axis.push(data.kbanalytics.kb_in_draft[0][i]);
        };

        chart = drawBarChart('kb_in_draft', x_axis, y_axis);

        // Plot graph for all the overall articles per category
        var x_axis = [];
        var y1_axis = ['Articles'];
        var y2_axis = ['Published'];
        var y3_axis = ['Drafts'];
        for (var i in data.kbanalytics.kb_overall_by_catgeory) {
            x_axis.push(data.kbanalytics.kb_overall_by_catgeory[i]['category']);
            y1_axis.push(data.kbanalytics.kb_overall_by_catgeory[i]['total']);
            y2_axis.push(data.kbanalytics.kb_overall_by_catgeory[i]['published']);
            y3_axis.push(data.kbanalytics.kb_overall_by_catgeory[i]['draft']);
        };

        chart = drawCombinationAnalyticsChart('kb_overall_by_catgeory', x_axis, y1_axis, y2_axis, y3_axis);


        // Plot graph for all the charts mentioned in chart_divs variable
        $.each(chart_divs, function(id, chart_div) {

            var x_axis = [];
            var chart;

            if (chart_div == 'kb_votes_per_month') {
                var y_axis = ['Votes'];
            } else if (chart_div == 'kb_comments_per_month') {
                var y_axis = ['Comments'];
            } else {
                var y_axis = ['Articles'];
            }

            for (var i in data.kbanalytics[chart_div]) {
                x_axis.push(data.kbanalytics[chart_div][i]['Description']);
                y_axis.push(data.kbanalytics[chart_div][i]['Total']);
            }

            if (chart_div == 'kb_per_month' || chart_div == 'kb_comments_per_month' || chart_div == 'kb_votes_per_month') {
                chart = drawLineChart(chart_div, x_axis, y_axis);
            } else if (chart_div == 'kb_current_month_per_catgeory' || chart_div == 'kb_current_month_per_author') {
                chart = drawBarChart(chart_div, x_axis, y_axis, true);
            } else {
                chart = drawBarChart(chart_div, x_axis, y_axis, false);
            }

        });

    });