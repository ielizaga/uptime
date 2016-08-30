var metric_divs = [
    'metric_all_stats',
    'metric_owned_stats',
    'metric_quarter_stats',
    'metric_month_stats',
    'metric_week_stats'
];

$.getJSON($SCRIPT_ROOT + '/get_metrics_data',
    function(data) {
        console.log(data);

        $.each(metric_divs, function(id, metric_div) {
            for (var i in data.metrics[metric_div]) {
                var rowTemplate = '<tr class="tr-color">' +
                    '<td class="tr-color mdl-data-table__cell--non-numeric">' + data.metrics[metric_div][i]['key'] + '</td>' +
                    '<td class="tr-color mdl-data-table__cell--non-numeric text-align-right">' + data.metrics[metric_div][i]['value'] + '</td>' +
                    '</tr>';

                $('#'+metric_div+' tbody').append(rowTemplate);
            }
        });
    });