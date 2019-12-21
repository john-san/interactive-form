// globals
const $activitiesParent = $('.activities legend').parent();
let totalCost = 0;
const $totalCostP = $('<p class="is-hidden"></p>');


// show 'other role' input when 'other' is selected
$('select#title').on('change', e => {
    const $jobRoleValue = $(e.target).val();
    if ($jobRoleValue === 'other') {
        $('input#other-title').show();
    } else {
        $('input#other-title').hide();
    }
});

// show corresponding tShirt colors & hide others TODO: Fix this
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

// ensure activity times don't conflict, tallies total price
$activitiesParent.on('change', 'input', function(e) {
    const updatePrice = (checked, currentActivity) => {
        const cost = parseInt(currentActivity.attr('data-cost'));
        if ($totalCostP.is(":hidden")) { $totalCostP.show() ; }
        checked ? totalCost += cost : totalCost -= cost;
        $totalCostP.text(`Total: $${totalCost}`);
    }

    const checkTimes = (checked, activities, currentActivity) => {
        const currentActivityTime = currentActivity.attr('data-day-and-time');
    
        // disable same times when checked, renable when unchecked
        activities.each((idx, el) => {
            const $elTime = $(el).attr('data-day-and-time');
            if (checked && $elTime === currentActivityTime) {
                $(el).attr('disabled', true);
            } else if (checked === false && $elTime === currentActivityTime) {
                $(el).attr('disabled', false);
            }
            // ensures current input is always enabled.  TODO: Figure out how to skip iteration
            currentActivity.attr('disabled', false);
        });
    }

    const $activities = $('fieldset.activities input');
    const $currentActivity = $(this);
    const $checked = $currentActivity.prop('checked');
    
    updatePrice($checked, $currentActivity);
    checkTimes($checked, $activities, $currentActivity);
});



// show correct payment method info on selection
$('#payment').on('change', (e) => {
    const paymentMethod = e.target.value;
    switch(paymentMethod) {
        case "credit card":
            $('#credit-card').show();
            $('#paypal').hide();
            $('#bitcoin').hide();
            break;
        case "paypal":
            $('#paypal').show();
            $('#credit-card').hide();
            $('#bitcoin').hide();
            break;
        case "bitcoin":
            $('#bitcoin').show();
            $('#paypal').hide();
            $('#credit-card').hide();
            break;
    }
    
});


const validateName = () => {
    // name can't be blank

}

const validateEmail = () => {
    // must be valid email, example: dave@teamtreehouse.com

}

const validateActivities = () => {
    // at least 1 activity must be checked

}

const validateCC = () => {
    // Credit Card field should only accept a number between 13 and 16 digits.
    // The Zip Code field should accept a 5-digit number.
    // The CVV should only accept a number that is exactly 3 digits long.
}

// initialize
$('input[name="user-name"]').focus();
$('input#other-title').hide();
$('#colors-js-puns').hide();
$activitiesParent.append($totalCostP);
$('#payment option:first-of-type').attr('disabled', true); 
$('#payment').val('credit card').change();
