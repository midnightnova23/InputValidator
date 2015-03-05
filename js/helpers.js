/**
 * Created by jctr073 on 3/3/15.
 */
$(document).ready(function() {

    //Watch for change events on any
    // input element with data-rule attribute
    $('input[data-rule]').change(function(){
        validateInput(this);

        if(errorCount()>0) {
            $('#submit').addClass('btn-danger');
        } else {
            $('#submit').removeClass('btn-danger').addClass('btn-success');
        }
    });

    $('#submit').click(function (event) {
        if(errorCount()>0) {
            alert('There are errors on the form!')
            event.preventDefault();
        }
    });
});

function validateInput(obj) {

    //Create Regular Expression from attribute
    expr = new RegExp($(obj).attr('data-rule'));

    //for debugging
    console.log(expr + ' for value: ' + obj.value + ' => ' + expr.test(obj.value));

    //Check value against rule
    if (expr.test(obj.value)) {
        $(obj).parent('div.form-group')
            .removeClass('has-error')
            .addClass('has-success');
        return true;

    } else {
        $(obj).parent('div.form-group')
            .removeClass('has-success')
            .addClass('has-error');
        return false;
    }
}

function errorCount() {
    var errors = 0;
    $('input[data-rule]').each(function( index ){
        if ($(this).parent('div.form-group').hasClass('has-error')) {
            errors++;
        }
    });
    return errors;
}