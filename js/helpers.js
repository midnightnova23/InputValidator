/**
 * Created by jctr073 on 3/3/15.
 */
$(document).ready(function() {

    //Watch for change events on any input element
    //with either a data-rule or required attribute
    $('input[data-rule], input[required]').change(function(){
        console.log(this);
        validateInput(this);
    });
    $('input[data-rule], input[required]').blur(function(){
        console.log(this);
        validateInput(this);
    });

    $('#submit').click(function (event) {
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

function applyErrorStyles(elm) {
    elm.removeClass('has-success').addClass('has-error');
}
function clearErrorStyles(elm) {
    elm.removeClass('has-error').addClass('has-success');
}

function scanForErrors() {
    var errors = 0;
    $('input[data-rule], input[required]').each(function( index ){
        if ($(this).parent('div.form-group').hasClass('has-error')) {
            errors++;
        }
    });

    if(errors > 0) {
        $('#submit').addClass('btn-danger');
    } else {
        $('#submit').removeClass('btn-danger').addClass('btn-success');
    }
    return errors;
}