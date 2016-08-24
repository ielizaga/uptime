$.getJSON($SCRIPT_ROOT + '/get_metrics_data',
    function(data) {
        console.log(data);

        // all metrics
        for (var i in data.metrics.metric_all_stats) {
            var rowTemplate = '<tr class="tr-color">' +
                '<td class="tr-color mdl-data-table__cell--non-numeric">' + i + '</td>' +
                '<td class="tr-color mdl-data-table__cell--non-numeric text-align-right">' + data.metrics.metric_all_stats[i] + '</td>' +
                '</tr>';

            $('#metric_all tbody').append(rowTemplate);
        }

        // owned metrics
        for (var i in data.metrics.metric_owned_stats) {
            var rowTemplate = '<tr class="tr-color">' +
                '<td class="tr-color mdl-data-table__cell--non-numeric">' + i + '</td>' +
                '<td class="tr-color mdl-data-table__cell--non-numeric text-align-right">' + data.metrics.metric_owned_stats[i] + '</td>' +
                '</tr>';

            $('#metric_owned tbody').append(rowTemplate);
        }
        // quarter metrics
        for (var i in data.metrics.metric_quarter_stats) {
            var rowTemplate = '<tr class="tr-color">' +
                '<td class="tr-color mdl-data-table__cell--non-numeric">' + i + '</td>' +
                '<td class="tr-color mdl-data-table__cell--non-numeric text-align-right">' + data.metrics.metric_quarter_stats[i] + '</td>' +
                '</tr>';

            $('#metric_quarter tbody').append(rowTemplate);
        }
        // month metrics
        for (var i in data.metrics.metric_month_stats) {
            var rowTemplate = '<tr class="tr-color">' +
                '<td class="tr-color mdl-data-table__cell--non-numeric">' + i + '</td>' +
                '<td class="tr-color mdl-data-table__cell--non-numeric text-align-right">' + data.metrics.metric_month_stats[i] + '</td>' +
                '</tr>';

            $('#metric_month tbody').append(rowTemplate);
        }
        // week metrics
        for (var i in data.metrics.metric_week_stats) {
            var rowTemplate = '<tr class="tr-color">' +
                '<td class="tr-color mdl-data-table__cell--non-numeric">' + i + '</td>' +
                '<td class="tr-color mdl-data-table__cell--non-numeric text-align-right">' + data.metrics.metric_week_stats[i] + '</td>' +
                '</tr>';

            $('#metric_week tbody').append(rowTemplate);
        }
    });