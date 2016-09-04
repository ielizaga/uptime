var line_hist_chart_divs = [
    'historic_week',
    'historic_month',
    'historic_year',
    'historic_org_current_week',
    'historic_ticket_current_week',
    'historic_org_last_week',
    'historic_ticket_last_week',
    'historic_org',
    'historic_ticket'
];

var pie_hist_chart_divs = [
    'historic_org_current_week',
    'historic_org_last_week',
    'historic_org'
];

$.getJSON($SCRIPT_ROOT + '/get_historical_data', {
//    email: email
}, function(data) {
    console.log(data);

    // Plot graph for all the charts mentioned in hist_chart_divs variable
    $.each(line_hist_chart_divs, function(id, line_hist_chart_div) {

        var x_axis = [];
        var y_axis = ['Time'];
        var chart;

        for (var i in data.historical[line_hist_chart_div]) {
            x_axis.push(data.historical[line_hist_chart_div][i]['Description']);
            y_axis.push(data.historical[line_hist_chart_div][i]['Time']);
        }

        if (line_hist_chart_div == 'historic_week' || line_hist_chart_div=='historic_month' || line_hist_chart_div=='historic_year') {
            drawLineHistChart(line_hist_chart_div, x_axis, y_axis);
        } else {
            drawBarHistChart(line_hist_chart_div, x_axis, y_axis);
        }
    });

    // Plot pie chart for the divs
    $.each(pie_hist_chart_divs, function(id, pie_hist_chart_div) {

        var chart_data = []
        for (var i in data.historical[pie_hist_chart_div]) {
            var temp = [data.historical[pie_hist_chart_div][i]['Description'], data.historical[pie_hist_chart_div][i]['Time']]
            chart_data.push(temp)
        }

        drawPieHistChart(pie_hist_chart_div, chart_data, "Time by Org");

    });

});