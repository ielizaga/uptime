var hist_chart_divs = [
    'historic_week',
    'historic_month',
    'historic_year',
    'historic_org',
    'historic_ticket'
];
$.getJSON($SCRIPT_ROOT + '/get_historical_data', {
    email: email
}, function(data) {
    console.log(data);

    // Plot graph for all the charts mentioned in hist_chart_divs variable
    $.each(hist_chart_divs, function(id, hist_chart_div) {

        var x_axis = [];
        var y_axis = ['Time'];
        var chart;

        for (var i in data.historical[hist_chart_div]) {
            x_axis.push(data.historical[hist_chart_div][i]['Description']);
            y_axis.push(data.historical[hist_chart_div][i]['Time']);
        }

        chart = drawLineHistChart(hist_chart_div, x_axis, y_axis);

    });

});