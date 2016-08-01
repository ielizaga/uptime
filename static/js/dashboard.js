var cat_week_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

var chart_week;
var chart_month;
var chart_week_days;



$.getJSON($SCRIPT_ROOT + '/get_user_data',
      function(data) {
        console.log(data);
        // Top data
        $(".dimmer").removeClass("active");

        $('#open').html(data.user.tickets_open);
        $('#closed').html(data.user.tickets_closed);
        $('#assigned').html(data.user.tickets_assigned);
        $('#updated').html(data.user.tickets_updated);


        // all open tickets
        for (var i in data.user.tickets_open_table) {
                    var rowTemplate = '<tr class="tr-color" style="color: black">' +
                                      '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric"><a target="_blank" href="http://discuss.zendesk.com/agent/tickets/'+data.user.tickets_open_table[i]['ticket_id']+'">'+data.user.tickets_open_table[i]['ticket_id']+'</a></td>'+
                                      '<td class="tr-color td-wrap mdl-cell--hide-phone mdl-data-table__cell--non-numeric">'+data.user.tickets_open_table[i]['ticket_subject']+'</td>' +
                                      '<td class="tr-color td-wrap mdl-cell--hide-tablet mdl-cell--hide-phone mdl-data-table__cell--non-numeric">'+data.user.tickets_open_table[i]['assignee']+'</td>' +
                                      '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric">'+data.user.tickets_open_table[i]['submitter']+'</td>' +
                                      '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric">'+data.user.tickets_open_table[i]['ticket_priority']+'</td>' +
                                      '</tr>';

                    $('#open_table tr:last').after(rowTemplate);

                };

        // all closed tickets
        for (var i in data.user.tickets_closed_table) {
                    var rowTemplate = '<tr class="tr-color" style="color: black">' +
                                      '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric"><a target="_blank" href="http://discuss.zendesk.com/agent/tickets/'+data.user.tickets_closed_table[i]['ticket_id']+'">'+data.user.tickets_closed_table[i]['ticket_id']+'</a></td>'+
                                      '<td class="tr-color td-wrap mdl-cell--hide-phone mdl-data-table__cell--non-numeric">'+data.user.tickets_closed_table[i]['ticket_subject']+'</td>' +
                                      '<td class="tr-color td-wrap mdl-cell--hide-tablet mdl-cell--hide-phone mdl-data-table__cell--non-numeric">'+data.user.tickets_closed_table[i]['assignee']+'</td>' +
                                      '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric">'+data.user.tickets_closed_table[i]['submitter']+'</td>' +
                                      '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric">'+data.user.tickets_closed_table[i]['ticket_priority']+'</td>' +
                                      '</tr>';

                    $('#closed_table tr:last').after(rowTemplate);

                };

        // all assigned tickets
        for (var i in data.user.tickets_assigned_table) {
                    var rowTemplate = '<tr class="tr-color" style="color: black">' +
                                      '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric"><a target="_blank" href="http://discuss.zendesk.com/agent/tickets/'+data.user.tickets_assigned_table[i]['ticket_id']+'">'+data.user.tickets_assigned_table[i]['ticket_id']+'</a></td>'+
                                      '<td class="tr-color td-wrap mdl-cell--hide-phone mdl-data-table__cell--non-numeric">'+data.user.tickets_assigned_table[i]['ticket_subject']+'</td>' +
                                      '<td class="tr-color td-wrap mdl-cell--hide-tablet mdl-cell--hide-phone mdl-data-table__cell--non-numeric">'+data.user.tickets_assigned_table[i]['assignee']+'</td>' +
                                      '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric">'+data.user.tickets_assigned_table[i]['submitter']+'</td>' +
                                      '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric">'+data.user.tickets_assigned_table[i]['ticket_priority']+'</td>' +
                                      '</tr>';

                    $('#assigned_table tr:last').after(rowTemplate);

                };

        // all updated tickets
        for (var i in data.user.tickets_updated_table) {
                    var rowTemplate = '<tr class="tr-color" style="color: black">' +
                                      '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric"><a target="_blank" href="http://discuss.zendesk.com/agent/tickets/'+data.user.tickets_updated_table[i]['ticket_id']+'">'+data.user.tickets_updated_table[i]['ticket_id']+'</a></td>'+
                                      '<td class="tr-color td-wrap mdl-cell--hide-phone mdl-data-table__cell--non-numeric">'+data.user.tickets_updated_table[i]['ticket_subject']+'</td>' +
                                      '<td class="tr-color td-wrap mdl-cell--hide-tablet mdl-cell--hide-phone mdl-data-table__cell--non-numeric">'+data.user.tickets_updated_table[i]['assignee']+'</td>' +
                                      '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric">'+data.user.tickets_updated_table[i]['submitter']+'</td>' +
                                      '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric">'+data.user.tickets_updated_table[i]['ticket_priority']+'</td>' +
                                      '</tr>';

                    $('#updated_table tr:last').after(rowTemplate);

                };

        // Charts
        chart_today = drawGaugeChart('today',data.user.time_today,28800);
        chart_week = drawGaugeChart('week',data.user.time_week,144000);
        chart_month = drawGaugeChart('month',data.user.time_month,576000);

        // Bar chart
        var chart_data= ['time'];
        for (var i in data.user.time_days_of_week) {
            chart_data.push(data.user.time_days_of_week[i]);
        }
        chart_week_days = drawCategoriesBarChart('bar', chart_data, cat_week_days);

        // Status data

        if (data.user.last_updated_ticket == 0) {
            $('#miniupdate-text').html("You didn't update any ticket in the last 30 days")
        } else {
            $('#time-last-update').html(data.user.last_updated_time);
            $('#ticket-last-update').html(data.user.last_updated_ticket);
            $('#ticket-last-update').attr('href', 'https://discuss.zendesk.com/agent/tickets/'+data.user.last_updated_ticket);
            $('#ts-last-update').html(data.user.last_updated_ts);
        }

        // Ticket table

        if (data.user.ticket_update_summary.length == 0){
            $("#ticket-table").hide();
        }
        for (var i in data.user.ticket_update_summary) {
            var rowTemplate = '<tr class="tr-color">'+
            '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric"><a target="_blank" href="http://discuss.zendesk.com/agent/tickets/'+data.user.ticket_update_summary[i]['ticket_number']+'">'+data.user.ticket_update_summary[i]['ticket_number']+'</a></td>'+
            '<td class="tr-color td-wrap mdl-cell--hide-phone mdl-data-table__cell--non-numeric">'+data.user.ticket_update_summary[i]['ticket_subject']+'</td>'+
            '<td class="tr-color td-wrap mdl-cell--hide-tablet mdl-cell--hide-phone mdl-data-table__cell--non-numeric">'+data.user.ticket_update_summary[i]['ticket_assignee']+'</td>'+
            '<td class="tr-color td-wrap mdl-cell--hide-tablet mdl-cell--hide-phone mdl-data-table__cell--non-numeric">'+data.user.ticket_update_summary[i]['ticket_submitter']+'</td>'+
            '<td class="tr-color td-wrap mdl-cell--hide-phone mdl-data-table__cell--non-numeric">'+data.user.ticket_update_summary[i]['ticket_update_time']+'</td>'+
            '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric">'+data.user.ticket_update_summary[i]['time_spend']+'</td>'+
            '<td class="tr-color td-wrap mdl-data-table__cell--non-numeric">'+data.user.ticket_update_summary[i]['ticket_status']+'</td> </tr>';

            $('#ticket-table tbody').after(rowTemplate);
        }
    });