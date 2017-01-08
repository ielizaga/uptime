var metric_divs = [
    'metric_all_stats',
    'metric_owned_stats',
    'metric_quarter_stats',
    'metric_month_stats',
    'metric_week_stats'
];

var metric_by_month_divs = [
    'assigned_by_month',
    'solved_by_month'
]

$.getJSON($SCRIPT_ROOT + '/get_metrics_data',
    function(data) {
        console.log(data);

        $.each(metric_divs, function(id, metric_div) {
            for (var i in data.metrics[metric_div]) {
                var rowTemplate = '<tr>' +
                    '<td>' + data.metrics[metric_div][i]['key'] + '</td>' +
                    '<td>' + data.metrics[metric_div][i]['value'] + '</td>' +
                    '</tr>';

                $('#'+metric_div+' tbody').append(rowTemplate);
            }
        });

        $.each(metric_by_month_divs, function(id, metric_by_month_div) {
            for (var i in data.metrics[metric_by_month_div]) {
                var rowTemplate = '<tr>' +
                    '<td class="hidden-sm hidden-xs hidden-md">' + data.metrics[metric_by_month_div][i]['Year'] + '</td>' +
                    '<td class="hidden-sm hidden-xs hidden-md">' + data.metrics[metric_by_month_div][i]['Jan'] + '</td>' +
                    '<td class="hidden-sm hidden-xs hidden-md">' + data.metrics[metric_by_month_div][i]['Feb'] + '</td>' +
                    '<td class="hidden-sm hidden-xs hidden-md">' + data.metrics[metric_by_month_div][i]['Mar'] + '</td>' +
                    '<td class="hidden-sm hidden-xs hidden-md">' + data.metrics[metric_by_month_div][i]['Apr'] + '</td>' +
                    '<td class="hidden-sm hidden-xs hidden-md">' + data.metrics[metric_by_month_div][i]['May'] + '</td>' +
                    '<td class="hidden-sm hidden-xs hidden-md">' + data.metrics[metric_by_month_div][i]['June'] + '</td>' +
                    '<td class="hidden-sm hidden-xs hidden-md">' + data.metrics[metric_by_month_div][i]['July'] + '</td>' +
                    '<td class="hidden-sm hidden-xs hidden-md">' + data.metrics[metric_by_month_div][i]['Aug'] + '</td>' +
                    '<td class="hidden-sm hidden-xs hidden-md">' + data.metrics[metric_by_month_div][i]['Sep'] + '</td>' +
                    '<td class="hidden-sm hidden-xs hidden-md">' + data.metrics[metric_by_month_div][i]['Oct'] + '</td>' +
                    '<td class="hidden-sm hidden-xs hidden-md">' + data.metrics[metric_by_month_div][i]['Nov'] + '</td>' +
                    '<td class="hidden-sm hidden-xs hidden-md">' + data.metrics[metric_by_month_div][i]['Dec'] + '</td>' +
                    '</tr>';

                $('#'+metric_by_month_div+' tbody').append(rowTemplate);
            }
        });


    });