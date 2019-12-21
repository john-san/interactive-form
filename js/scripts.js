// globals

// focus on name Field on load
$('input[name="user-name"]').focus();
// hide 'other role' input input on load
$('input#other-title').hide();

// show 'other role' input when 'other' is selected
$('select#title').on('change', e => {
    const $jobRoleValue = $(e.target).val();
    if ($jobRoleValue === 'other') {
        $('input#other-title').show();
    } else {
        $('input#other-title').hide();
    }
});

//  hide shirt colors on load
$('#colors-js-puns').hide();

// show & hide correct tShirt colors
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

        $colorOptions.each(() => {
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

        $colorOptions.each(() => {
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

const $activitiesParent = $('.activities legend').parent();
$activitiesParent.on('change', 'input', function(e) {
    const $inputs = $('fieldset.activities input');
    const $currentInput = $(this);
    const $checked = $currentInput.prop('checked');
    const $currentInputTime = $currentInput.attr('data-day-and-time');
    
    // disable same times when checked, renable when unchecked
    $inputs.each((idx, el) => {
        const elTime = $(el).attr('data-day-and-time');
        if ($checked && elTime === $currentInputTime) {
            $(el).attr('disabled', true);
        } else if ($checked === false && elTime === $currentInputTime) {
            $(el).attr('disabled', false);
        }
        // ensures current input is always enabled.  TODO: Figure out how to skip iteration
        $currentInput.attr('disabled', false);
    });
});