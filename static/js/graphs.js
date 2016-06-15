/**
 * Transform time in seconds to hh:mm:ss format.
 * @param: {Integer} seconds
 * @return: {String} Returns the time in hh:mm:ss format
 **/
function toTimeString(seconds) {
    d = Number(seconds);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); }

/**
 * Draws a gauge chart using C3js generate function.
 * @param: {String} element The css div id where the chart will be generated
 * @param: {Object} data The data that will be used in the chart
 * @param: {Integer} max The maximum value of the gauge chart
 */
function drawGaugeChart(element, data, max) {
    var chart = c3.generate({
        bindto: document.getElementById(element),
        data: {
            columns: [['time', data]],
            type: 'gauge',
        },
        gauge: {
            max: max,
            label: {
                show: false,
            }
        },
        color: {
                pattern: ['#263238', '#195352', '#0c746d', '#009688'],
                threshold: {
                    values: [max*10/100, max*40/100, max*60/100, max*75/100]
                }
        },

        tooltip: {
            format: {
                title: function (d) { return 'Logged'; },
                value: function (value, ratio, id) {
                    return toTimeString(value);
                }

            }
        }
    });

    return chart;
}

/**
 * Draws a bar chart with categories using C3js generate function.
 * @param: {String} element The css div id where the chart will be generated
 * @param: {Object} data The data that will be used in the chart
 * @param: {Object} categories The categories that will be userd in the chart
 */
function drawCategoriesBarChart(element, data, categories) {
    var chart = c3.generate({
        bindto: document.getElementById(element),
        size: {
            height: 240,
        },
        data: {
            columns: [
                data,
            ],
            type: 'bar',
            colors: {
                time: '#009688'
            }
        },
        legend: {
            show: false
        },
        axis : {
            x: {
                type: 'category',
                categories: categories
            },
            y: {
                tick:{
                    format: function(d) {
                        return toTimeString(d);
                    }
                }
            }
        },
        bar: {
            width: {
                ratio: 0.5
            }
        }
    });

    return chart;
}

function drawAreaChart(element,data) {
    var chart = c3.generate({
        bindto: document.getElementById(element),
        data: {
            columns: [
                data,
            ],
            types: {
                time: 'area-spline'
            }
        },
        axis : {
            y: {
                tick:{
                    format: function(d) {
                        return toTimeString(d);
                    }
                }
            }
        }
    });

    return chart;
}