/**
 * Created by jctr073 on 3/3/15.
 */
$(document).ready(function() {

    $sub    = $('[type=submit]');
    $inputs = $('input[data-rule], input[required]');

    //Watch for change events on any input element
    //with either a data-rule or required attribute
    $inputs.change(function(){
        validateInput(this);
    });
    $inputs.blur(function(){
        validateInput(this);
    });

    //Watch and prevent any type of submit
    //if the form elements has errors
    $sub.click(function (event) {
        if(scanForErrors()>0) {
            alert('There are errors on the form!')
            event.preventDefault();
        }
    });
});

function validateInput(obj) {
    //Create Regular Expression from attribute
    var expr = new RegExp($(obj).attr('data-rule'));
    var $div = $(obj).parent('div.form-group');

    //for debugging
    console.log(expr + ' for value: ' + obj.value + ' => ' + expr.test(obj.value));

    //Has a value?
    if (obj.value != "") {
        //Check the value against rule
        if (!expr.test(obj.value)) {
            applyErrorStyles($div);
        } else {
            clearErrorStyles($div);
        }
    } else if (obj.required) {
        applyErrorStyles($div);
    } else {
        clearErrorStyles($div);
    }
    scanForErrors();
}

function scanForErrors() {
    var errorCount = 0;

    //Loop and count errors
    $inputs.each(function( index ){
        if ($(this).parent('div.form-group').hasClass('has-error')) {
            errorCount++;
        }
    });

    //Add visual indicator of error state
    //to the submit element
    if(errorCount > 0) {
        $sub.addClass('btn-danger');
    } else {
        $sub.removeClass('btn-danger').addClass('btn-success');
    }
    return errorCount;
}

function applyErrorStyles($elm) {
    $elm.removeClass('has-success').addClass('has-error');
}
function clearErrorStyles($elm) {
    $elm.removeClass('has-error').addClass('has-success');
}
