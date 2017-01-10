function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

var cat_week_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
var popup_tables = ['tickets_open_table', 'tickets_closed_table', 'tickets_assigned_table', 'tickets_updated_table']

var chart_week;
var chart_month;
var chart_week_days;

$.getJSON($SCRIPT_ROOT + '/get_user_data',
    function(data) {
        console.log(data);
        // Top data

        $('#open').html('<a class="active-link" id="tickets_open_table_a" data-toggle="modal" data-target="#openModal">' + pad(data.user.tickets_open) + '</a>');
        $('#closed').html('<a class="active-link" id="tickets_closed_table_a" data-toggle="modal" data-target="#closedModal">' + pad(data.user.tickets_closed) + '</a>');
        $('#assigned').html('<a class="active-link" id="tickets_assigned_table_a" data-toggle="modal" data-target="#assignedModal">' + pad(data.user.tickets_assigned) + '</a>');
        $('#updated').html('<a class="active-link" id="tickets_updated_table_a" data-toggle="modal" data-target="#updatedModal">' + pad(data.user.tickets_updated) + '</a>');

        $.each(popup_tables, function(id, table_name) {

            if (data.user[table_name].length == 0) {
                var button = '#' + table_name + '_a';
                $(button).each(function() {
                    $(this).removeClass('active-link');
                    $(this).addClass('disable-link');
                });
            } else {
                for (var i in data.user[table_name]) {

                    var rowTemplate = '<tr class="tr-color" style="color: black">' +
                        '<td><a target="_blank" href="http://discuss.zendesk.com/agent/tickets/' + data.user[table_name][i]['ticket_id'] + '">' + data.user[table_name][i]['ticket_id'] + '</a></td>' +
                        '<td class="hidden-sm hidden-xs">' + data.user[table_name][i]['ticket_subject'] + '</td>' +
                        '<td class="hidden-sm hidden-xs">' + data.user[table_name][i]['assignee'] + '</td>' +
                        '<td class="hidden-sm hidden-xs">' + data.user[table_name][i]['submitter'] + '</td>' +
                        '<td>' + data.user[table_name][i]['ticket_priority'] + '</td>' +
                        '<td>' + data.user[table_name][i]['ticket_status'] + '</td>' +
                        '</tr>';

                    $('#' + table_name + ' tbody').append(rowTemplate);
                };
                $('#'+ table_name).DataTable({
                    "iDisplayLength": 5,
                    "aLengthMenu": [
                        [5, 10, 25],
                        [5, 10, 25]
                    ],
                    'sPaginationType': 'simple'
                });
            }
        });


        // Charts
        chart_today = drawGaugeChart('today', data.user.time_today, 28800);
        chart_week = drawGaugeChart('week', data.user.time_week, 144000);
        chart_month = drawGaugeChart('month', data.user.time_month, 576000);

        // Bar chart
        var chart_data = ['Time'];
        for (var i in data.user.time_days_of_week) {
            chart_data.push(data.user.time_days_of_week[i]['Time']);
        }
        chart_week_days = drawCategoriesBarChart('bar', chart_data, cat_week_days);

        // Status data

        if (data.user.last_updated_ticket == 0) {
            $('#miniupdate-text').html(" You didn't update any ticket in the last 30 days")
        } else {
            $('#time-last-update').html(data.user.last_updated_time);
            $('#ticket-last-update').html(data.user.last_updated_ticket);
            $('#ticket-last-update').attr('href', 'https://discuss.zendesk.com/agent/tickets/' + data.user.last_updated_ticket);
            $('#ts-last-update').html(data.user.last_updated_ts);
        }

        // Ticket table

        for (var i in data.user.ticket_update_summary) {
            var rowTemplate = '<tr>' +
                '<td><a target="_blank" href="http://discuss.zendesk.com/agent/tickets/' + data.user.ticket_update_summary[i]['ticket_number'] + '">' + data.user.ticket_update_summary[i]['ticket_number'] + '</a></td>' +
                '<td class="hidden-xs">' + data.user.ticket_update_summary[i]['ticket_subject'] + '</td>' +
                '<td class="hidden-sm hidden-xs">' + data.user.ticket_update_summary[i]['ticket_assignee'] + '</td>' +
                '<td class="hidden-xs">' + data.user.ticket_update_summary[i]['ticket_submitter'] + '</td>' +
                '<td class="hidden-sm hidden-xs">' + data.user.ticket_update_summary[i]['ticket_update_time'] + '</td>' +
                '<td >' + data.user.ticket_update_summary[i]['time_spend'] + '</td>' +
                '<td >' + data.user.ticket_update_summary[i]['ticket_status'] + '</td> </tr>';

            $('#ticket-table tbody').append(rowTemplate);
        }

        $('#ticket-table').DataTable();

    });