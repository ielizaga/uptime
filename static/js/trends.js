function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function ConvertToTimeString(seconds) {
    d = Number(seconds);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}

var trend_chart_divs = [
    'total_trend_created_by_product',
    'total_trend_solved_by_product_currentweek',
    'total_trend_created_by_product_currentweek',
    'total_trend_solved_by_product_lastweek',
    'total_trend_created_by_product_lastweek',
];

var trend_divs = [
    'total_trend_created',
    'total_trend_open',
    'total_trend_solved',
    'total_trend_pending',
    'total_trend_hold',
    'total_trend_backlog',
    'total_trend_sev1',
    'total_trend_replies',
    'total_trend_agent_time',
    'total_trend_created_currentweek',
    'total_trend_solved_currentweek',
    'total_trend_agent_time_currentweek',
    'total_trend_created_lastweek',
    'total_trend_solved_lastweek',
    'total_trend_agent_time_lastweek'
];

$.getJSON($SCRIPT_ROOT + '/get_trends_data',
    function(data) {
        console.log(data);

        // Plot the values for the divs
        $.each(trend_divs, function(id, trend_div) {

            if (data.trends[trend_div] != 0) {

                if (trend_div == 'total_trend_agent_time' || trend_div == 'total_trend_agent_time_lastweek' || trend_div == 'total_trend_agent_time_currentweek') {
                    $('#' + trend_div).html(ConvertToTimeString(data.trends[trend_div]));
                } else {
                    $('#' + trend_div).html(pad(data.trends[trend_div]));
                };
            }
        });

        // Plot pie chart for the divs
        $.each(trend_chart_divs, function(id, trend_chart_div) {

            var chart_data = []
            for (var i in data.trends[trend_chart_div]) {
                var temp = [data.trends[trend_chart_div][i]['Description'], data.trends[trend_chart_div][i]['Total']]
                chart_data.push(temp)
            }
            drawPieChart(trend_chart_div, chart_data);

        });

        // Plot Stacked combination charts for the backlog
        var stack_chart_data_total = ['Total']
        var stack_chart_data_pending = ['Pending']
        var stack_chart_data_hold = ['Hold']
        var stack_chart_data_open = ['Open']
        var stack_tooltip = []
        for (var i in data.trends.total_trend_backlog_by_product) {

            var temp_desc = [data.trends.total_trend_backlog_by_product[i]['Description']]
            stack_tooltip.push(temp_desc)

            var temp_total = [data.trends.total_trend_backlog_by_product[i]['Total']]
            stack_chart_data_total.push(temp_total)

            var temp_pending = [data.trends.total_trend_backlog_by_product[i]['Pending']]
            stack_chart_data_pending.push(temp_pending)

            var temp_hold = [data.trends.total_trend_backlog_by_product[i]['Hold']]
            stack_chart_data_hold.push(temp_hold)

            var temp_open = [data.trends.total_trend_backlog_by_product[i]['Open']]
            stack_chart_data_open.push(temp_open)

        }
        drawCombinationChart('total_trend_backlog_by_product', stack_chart_data_total, stack_chart_data_pending, stack_chart_data_hold, stack_chart_data_open, stack_tooltip);

    });