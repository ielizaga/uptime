var chart_pastweeks;

$.getJSON($SCRIPT_ROOT + '/_get_hist_weekly'
            , { email: email }
            , function(data) {
                var chart_data= ['time'];
                console.log(data);
                for (var i in data.time) {
                    chart_data.push(data.time[i]);
                }
                chart_pastweeks = drawAreaChart('hist_weekly', chart_data);
            });