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

    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}

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
            columns: [
                ['Time', data]
            ],
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
                values: [max * 10 / 100, max * 40 / 100, max * 60 / 100, max * 75 / 100]
            }
        },

        tooltip: {
            format: {
                title: function(d) {
                    return 'Logged';
                },
                value: function(value, ratio, id) {
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
                Time: '#009688'
            }
        },
        legend: {
            show: false
        },
        axis: {
            x: {
                type: 'category',
                categories: categories
            },
            y: {
                tick: {
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

// Line Chart
function drawLineChart(element, x_data, y_data) {

    var chart = c3.generate({
        bindto: document.getElementById(element),
        size: {
            height: 220
        },
        padding: {
            bottom: 20,
        },
        data: {
            columns: [
                y_data
            ],
            colors: {
                Articles: '#009688',
                Time: '#009688',
                Votes: '#009688',
                Comments: '#009688'
            }
        },
        legend: {
            show: false
        },
        axis: {
            x: {
                type: 'category',
                categories: x_data,
            },
        }
    });

    return chart;
}

// Line Chart to be used for historical tab.
function drawLineHistChart(element, x_data, y_data) {

    var chart = c3.generate({
        bindto: document.getElementById(element),
        size: {
            height: 220
        },
        padding: {
            bottom: 20,
        },
        data: {
            columns: [
                y_data
            ],
            colors: {
                Articles: '#009688',
                Time: '#009688',
                Comments: '#009688'
            },

        },
        legend: {
            show: false
        },
        axis: {
            x: {
                type: 'category',
                categories: x_data,
            },
            y: {
                tick: {
                    format: function(d) {
                        return toTimeString(d);
                    }
                }
            }
        }
    });

    return chart;
}



// Bar Chart
function drawBarChart(element, x_data, y_data) {

    var chart = c3.generate({
        bindto: document.getElementById(element),
        size: {
            height: 240,
        },
        data: {
            columns: [
                y_data,
            ],
            type: 'bar',
            colors: {
                Articles: '#009688',
                Votes: '#009688',
                Comments: '#009688',
            }
        },
        legend: {
            show: false
        },
        axis: {
            x: {
                type: 'category',
                categories: x_data
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


// Multiple Line Chart
function drawMultipleLineChart(element, x_data, y1_data, y2_data, y3_data) {

    var chart = c3.generate({
        bindto: document.getElementById(element),
        size: {
            height: 220
        },
        color: {
            pattern: ['#009688', '#00665c', '#001412']
        },
        padding: {
            bottom: 25,
        },
        data: {
            columns: [
                y1_data,
                y2_data,
                y3_data
            ]
        },
        legend: {
            show: false
        },
        axis: {
            x: {
                type: 'category',
                categories: x_data,
            },
        }
    });

    return chart;
}

// Pie Chart
function drawPieChart(element, data) {

    var chart = c3.generate({
        bindto: document.getElementById(element),
        size: {
            height: 240,
        },
        color: {
            pattern: ['#00ccb8','#00b8a5','#00a393','#009688','#007a6e','#00665c','#005249','#003d37','#002925','#001412']
        },
        data: {
            // iris data from R
            columns: data,
            type: 'donut'
        },
        legend: {
            show: true,
            position: 'right'
        },
        donut: {
            expand: false,
            label: {
                format: function(value, ratio, id) {
                    return value;
                }
            },
            title: "Tickets by Product"
        },
        tooltip: {
            format: {
                title: function(d) {
                    return 'Tickets';
                },
                value: function(value, ratio, id) {
                    return value;
                }

            }
        }
    });

    return chart;
}


// Stacked Combination Chart
function drawCombinationChart(element, total, open, pending, hold, tooltip) {

        var chart = c3.generate({
            bindto: document.getElementById(element),
            size: {
                height: 240,
            },
            color: {
                pattern: ['#009688','#00ccb8', '#00665c','#005249','#003d37','#002925','#001412']
            },
            data: {
                columns: [
                    total,
                    open,
                    pending,
                    hold,
                ],
                type: 'bar',
                types: {
                    'Pending': 'spline',
                    'Hold': 'spline',
                    'Open': 'spline',
                },
                groups: [
                    ['Total','Pending']
                ]
            },
            axis: {
                x: {
                    show: false,
                    type: 'category',
                    categories: tooltip,
                },
            },
            tooltip: {
                format: {
                    value: function(value, ratio, id) {
                        return value;
                    }
            }
        }
        });

    return chart;
}