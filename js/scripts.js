

// focus on name Field
$('input[name="user-name"]').focus();
// initially hide Job Role-Other input
$('input#other-title').hide();

// show other role input field when 'other' is selected
$('select#title').on('change', e => {
    const $jobRoleValue = $(e.target).val();
    if ($jobRoleValue === 'other') {
        $('input#other-title').show();
    } else {
        $('input#other-title').hide();
    }
});

// 
$('#colors-js-puns').hide();

$('select#design').on('change', e => {
    const $designValue = $(e.target).val();
    const tShirts = {
        jsPuns: {
            value: "js puns",
            regex: /(.*)(\(JS Puns shirt only\))/,
            colors: ["cornflowerblue", "darkslategrey", "gold"]
        },
        heartJS: {
            value: "heart js",
            regex: /(.*)(\(I ♥ JS shirt only\))/,
            colors: ["tomato", "steelblue", "dimgrey"]
        }
    }
    const $colorOptions = $('#color').children();

    if ($designValue === tShirts.jsPuns.value) {
        $('#colors-js-puns').show();

        $colorOptions.each(function() {
            const $optionText = $(this).text();
            if (tShirts.jsPuns.regex.test($optionText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        $('select#color').val(tShirts.jsPuns.colors[0]).change();
    } else if ($designValue === tShirts.heartJS.value) {
        $('#colors-js-puns').show();

        $colorOptions.each(function() {
            const $optionText = $(this).text();
            if (tShirts.heartJS.regex.test($optionText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        $('select#color').val(tShirts.heartJS.colors[0]).change();
    } else {
        $('#colors-js-puns').hide();
    }
});