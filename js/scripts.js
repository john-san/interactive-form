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

// show corresponding tShirt colors & hide others
$('select#design').on('change', e => {
    const processSelection = (selection) => {
        const $colorOptions = $('#color').children();
        const checkOption = (option) => {
            const $optionValue = $(option).val();
            const $optionText = $(option).text();
            return selection.colors.includes($optionValue) && selection.regex.test($optionText);
        }

        if (selection) {
            $('#colors-js-puns').show();
    
            $colorOptions.each((idx, option) => {
                if (checkOption(option)) {
                    $(option).show();
                } else {
                    $(option).hide();
                }
            });
    
            $('select#color').val(selection.colors[0]).change();
    
        } else {
            $('#colors-js-puns').hide();
        }
    };

    const tShirts = [
         {
            name: "jsPuns",
            value: "js puns",
            regex: /(.*)(\(JS Puns shirt only\))/,
            colors: ["cornflowerblue", "darkslategrey", "gold"]
        },
        {
            name: "heartJS",
            value: "heart js",
            regex: /(.*)(\(I ♥ JS shirt only\))/,
            colors: ["tomato", "steelblue", "dimgrey"]
        }
    ];
    const $designValue = $(e.target).val();
    const selectedTShirt = tShirts.find(tShirt => {
        return tShirt.value == $designValue; 
    });
    
    processSelection(selectedTShirt);
});

// ensure activity times don't conflict, tallies total price
$activitiesParent.on('change', 'input', function(e) {
    const updatePrice = () => {
        const cost = parseInt($currentActivity.attr('data-cost'));
        if ($totalCostP.is(":hidden")) { $totalCostP.show() ; }
        $checked ? totalCost += cost : totalCost -= cost;
        $totalCostP.text(`Total: $${totalCost}`);
    }

    const checkTimes = () => {
        const $currentActivityTime = $currentActivity.attr('data-day-and-time');
    
        // disable same times when checked, renable when unchecked
        $activities.each((idx, activity) => {
            const $activityTime = $(activity).attr('data-day-and-time');
            if ($checked && $activityTime === $currentActivityTime) {
                $(activity).attr('disabled', true);
            } else if ($checked === false && $activityTime === $currentActivityTime) {
                $(activity).attr('disabled', false);
            }
            // ensures current input is always enabled.  TODO: Figure out how to skip iteration
            $currentActivity.attr('disabled', false);
        });
    }

    const $activities = $('fieldset.activities input');
    const $currentActivity = $(this);
    const $checked = $currentActivity.prop('checked');
    
    updatePrice();
    checkTimes();
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

class textValidator {
    constructor(id, errorMessage, regex) {
        this.id = id;
        this.errorMessage = errorMessage;
        this.regex = regex;
    }

    removeError() {
        $(`#${this.id}`).removeClass('error');
        $(`#${this.id}_error`).remove();
    }

    addError() {
        // if the error message doesn't exist, create it
        if ($(`#${this.id}_error`).length === 0) {
            const $err = $(`<span id="${this.id}_error" class="error-tooltip">${this.errorMessage}</span>`);
            $err.insertBefore($(`#${this.id}`));
        }
        $(`#${this.id}`).addClass('error');
    }

    validate() {
        const inputValue = $(`#${this.id}`).val();
        const passed = this.regex.test(inputValue);

        if (passed) {
            this.removeError();
            return true;
        } else {
            this.addError();
            return false;
        }
    }
}


const nameValidator = new textValidator('name', 'Name cannot be blank', /[a-zA-Z]+/);

$('#name').on('change keyup blur', (e) => {
    nameValidator.validate();
});

const emailValidator = new textValidator('mail', 'Must use valid email', /[\w-]+@[\w-]+\.\w+(\.\w+)?/);

$('#mail').on('change keyup blur', (e) => {
    emailValidator.validate();
});

const validateActivities = () => {
    // at least 1 activity must be checked

}

const validateCC = () => {
    // Credit Card field should only accept a number between 13 and 16 digits.
}

const validateZip = () => {
    // The Zip Code field should accept a 5-digit number.
}

const validateCVV = () => {
    // The CVV shouldonly accept a number that is exactly 3 digits long.
}

// initialize
$('input[name="user-name"]').focus();
$('input#other-title').hide();
$('#colors-js-puns').hide();
$activitiesParent.append($totalCostP);
$('#payment option:first-of-type').attr('disabled', true); 
$('#payment').val('credit card').change();
