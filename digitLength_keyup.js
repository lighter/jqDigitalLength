;(function ($) {
    $.fn.digitLength = function (options) {
        var settings = $.extend({
            // These are the defaults.
            type: '',
            intLen: 0,
            floatLen: 0
        }, options);

        switch (settings.type) {
            case 'fnum':
                $(this).unbind('keyup').keyup(allowEnterFloat);
                break;
            case 'num':
                $(this).unbind('keyup').keyup(allowEnterNumber);
                break;
            default:
                break;
        }


        // only enter number, backspace, right, left
        function onlyNumber(keyCode) {
            if (isBackspace(keyCode) && (keyCode > 57 || keyCode < 48)) {
                return false;
            }
            return true;
        };

        function isBackspace(keyCode) {
            return keyCode != 8 && keyCode != 46 && keyCode != 37 && keyCode != 39;
        };

        function allowEnterNumber() {
            var keyCode = event.keyCode;
            if (!onlyNumber(keyCode)) {
                $(this).val($(this).val().replace(/[^0-9]/g, ''));
            }
            var _val = $(this).val().toString();
            var len = settings.intLen;

            if (len != undefined && len != 0 && (_val.length > len) && isBackspace(keyCode)) {
                $(this).val(_val.substring(0, len));
            }
        };

        function allowEnterFloat() {
            var keyCode = event.keyCode;
            var _val = $(this).val().toString();

            if (_val.split('.').length > 2) {
                $(this).val(_val.substring(0, _val.indexOf(".") + 1));
            }

            if (_val === '.')
            {
                $(this).val('0.');
            }

            if (!onlyNumber(keyCode)) {
                $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
            }

            if ((keyCode >= 48 && keyCode <= 57) || keyCode === 190) {
                var result;
                var isFloat = false;

                if ($(this).val().split(".").length === 2) {
                    var isFloat = true;
                }

                // integer
                if (!isFloat) {
                    // setting int max length
                    if (settings.intLen !== 0) {
                        if ($(this).val().length > settings.intLen) {
                            $(this).val($(this).val().substring(0, settings.intLen));
                        }
                    }
                } else // float
                {
                    if ($(this).val().indexOf(".") !== -1) {
                        var split_val = $(this).val().split(".");
                        var int_val = split_val[0].toString();
                        var float_val = split_val[1].toString();

                        if (settings.intLen !== 0) {
                            if (int_val.length > settings.intLen) {
                                int_val = int_val.substring(0, settings.intLen);
                            }
                        }

                        if (settings.floatLen !== 0) {
                            if (float_val.length > settings.floatLen) {
                                float_val = float_val.substring(0, settings.floatLen);
                            }
                        }

                        var result = int_val + "." + float_val;

                        $(this).val(result);
                    }
                }
            }
        };
    }
})(jQuery);

$(function () {
    $('#test').digitLength({
        type: 'fnum',
        intLen: 2,
        floatLen: 2
    });
    $('#test2').digitLength({
        type: 'num'
    });
    $('#test3').digitLength({
        type: 'num',
        intLen: 3
    });
});