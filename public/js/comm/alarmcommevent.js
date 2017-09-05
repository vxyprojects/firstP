var ALARM_COMM_EVENT = {
    init_event: function () {

        $('input[name="use_alarm_config"]').click(function (e) {
            if ($('input[name="use_alarm_config"]').prop('checked') === false) {
                $('.config_alarm').hide();
            } else if ($('input[name="use_alarm_config"]').prop('checked') === true) {
                $('.config_alarm').show();
            }
        });

        $('#alarm_period').focusout(function (e) {
            var iComparePeriod = parseInt($('#alarm_period').val());
            if ($('#config_day_type').val() === 'd') {
                if (iComparePeriod > 28) {
                    $('#alarm_period').val('28')
                }

            } else if ($('#config_day_type').val() === 'w') {
                if (iComparePeriod > 4) {
                    $('#alarm_period').val('4')
                }
            }
        })
    },
    default_alarm_format: function () {
        //알림 관련 init 처리
        $('input[name="use_alarm_config"]').prop('checked', false);
        $('#alarm_period').val('')
        $('#config_alarm_day_type').val('d')
        $('#config_alarm_time').val('오전 12:00')
        $('.config_alarm').hide();

    }
};