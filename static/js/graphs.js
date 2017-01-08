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

/*
*
* Section : DashBoard ( Today )
*
*/

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
        size: {
          height: 150
        },
        gauge: {
            max: max,
            width: 20,
            label: {
                show: false,
            }
        },
        color: {
            pattern: ['rgba(255, 255, 255, 0.8)' ],
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
            height: 200,
        },
        grid: {
          x: {
            show: true
          },
          y: {
            show: true
          }
        },
        data: {
            columns: [
                data,
            ],
            type: 'bar',
            colors: {
                Time: '#4DD0E1'
            }
        },
        legend: {
            show: false
        },
        axis: {
            x: {
                type: 'category',
                categories: categories,
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

/*
*
* Section : My Historical Tab
*
*/

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
        grid: {
          x: {
            show: true
          },
          y: {
            show: true
          }
        },
        data: {
            columns: [
                y_data
            ],colors: {
                Articles: '#009688',
                Time: '#FF9800',
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

// Bar Chart used in historical tab
function drawBarHistChart(element, x_data, y_data) {

    var chart = c3.generate({
        bindto: document.getElementById(element),
        size: {
            height: 240,
        },
        data: {
            columns: [
                y_data,
            ],
            colors: {
                Time: '#4FC3F7',
            },
            type: 'bar',
        },grid: {
          x: {
            show: true
          },
          y: {
            show: true
          }
        },
        legend: {
            show: false
        },
        axis: {
            x: {
                type: 'category',
                categories: x_data
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


// Pie Chart used in historical tab
function drawPieHistChart(element, data, chart_title) {

    var chart = c3.generate({
        bindto: document.getElementById(element),
        size: {
            height: 240,
        },
        color: {
            pattern: ['#EF5350','#EC407A','#AB47BC','#7E57C2','#5C6BC0','#42A5F5','#29B6F6','#66BB6A','#FFA726','#FF7043']
        },
        data: {
            // iris data from R
            columns: data,
            type: 'donut',
        },
        legend: {
            show: true,
            position: 'right'
        },
        donut: {
            expand: true,
            label: {
                show: true,
                threshold: 0.1,
                format: function(value, ratio, id) {
                    return toTimeString(value);
                }
            },
            title: chart_title
        },
        tooltip: {
            format: {
                title: function(d) {
                    return 'Time';
                },
                value: function(value, ratio, id) {
                    return toTimeString(value);
                }
            }
        }
    });

    return chart;
}

/*
*
* Section : KB Analytics / My KB
*
*/

// Line Chart
function drawLineChart(element, x_data, y_data) {

    var chart = c3.generate({
        bindto: document.getElementById(element),
        size: {
            height: 265
        },
        padding: {
            top: 20,
        },
        grid: {
          x: {
            show: true
          },
          y: {
            show: true
          }
        },
        data: {
            columns: [
                y_data
            ],
            colors: {
                Articles: '#FFA726',
                Time: '#9CCC65',
                Votes: '#5C6BC0',
                Comments: '#26C6DA'
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



// Bar Chart
function drawBarChart(element, x_data, y_data, rotated) {

    var chart = c3.generate({
        bindto: document.getElementById(element),
        size: {
            height: 240,
        },
        grid: {
          x: {
            show: true
          },
          y: {
            show: true
          }
        },
        data: {
            columns: [
                y_data,
            ],
            type: 'bar',
            colors: {
                Articles: '#26C6DA',
                Votes: '#FF7043',
                Comments: '#78909C',
            }
        },
        legend: {
            show: false
        },
        axis: {
            rotated: rotated,
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

// Stacked Chart
function drawCombinationAnalyticsChart(element, tooltip, total, published, draft) {

        var chart = c3.generate({
            bindto: document.getElementById(element),
            size: {
                height: 220,
            },
            padding: {
               bottom: 15
            },
            grid: {
              x: {
                show: true
              },
              y: {
                show: true
              }
            },
            color: {
                pattern: ['#FFA726','#FF3D00', '#5C6BC0']
            },
            data: {
                columns: [
                    total,
                    published,
                    draft
                ],
                type: 'bar',
                types: {
                    'Published': 'spline',
                    'Drafts': 'spline'
                },
                groups: [
                    ['Total','Published']
                ]
            },
            legend: {
                show: true,
                position: 'bottom'
            },
            axis: {
                x: {
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

/*
*
* Section : Zendesk Ticket Trends
*
*/


// Pie Chart
function drawPieChart(element, data, chart_title) {

    var chart = c3.generate({
        bindto: document.getElementById(element),
        size: {
            height: 240,
        },
        color: {
            pattern: ['#EF5350','#EC407A','#AB47BC','#7E57C2','#5C6BC0','#42A5F5','#29B6F6','#66BB6A','#FFA726','#FF7043']
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
            title: chart_title
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
                pattern: ['#FFB74D','#7E57C2','#29B6F6','#FF7043']
            },
            grid: {
              x: {
                show: true
              },
              y: {
                show: true
              }
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
                    show: true,
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
