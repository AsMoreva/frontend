(function ($) {
  "use strict";

  /*==================================================================
  [ Focus input ]*/
  $('.input100').each(function () {
    $(this).on('blur', function () {
      if ($(this).val().trim() !== "") {
        $(this).addClass('has-val');
      } else {
        $(this).removeClass('has-val');
      }
    });
  });

  /*==================================================================
  [ Validate ]*/
  const input = $('.validate-input .input100');

  $('.validate-form').on('submit', function () {
    let isValid = true;

    input.each(function () {
      if (!validate(this)) {
        showValidate(this);
        isValid = false;
      }
    });

    return isValid;
  });

  input.each(function () {
    $(this).on('focus', function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    const value = $(input).val().trim();
    const isEmail = $(input).attr('type') === 'email' || $(input).attr('name') === 'email';

    if (isEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    } else {
      return value !== '';
    }
  }

  function showValidate(input) {
    $(input).parent().addClass('alert-validate');
  }

  function hideValidate(input) {
    $(input).parent().removeClass('alert-validate');
  }

  /*==================================================================
  [ Show/Hide Password ]*/
  let showPass = false;
  $('.btn-show-pass').on('click', function () {
    const input = $(this).next('input');
    const icon = $(this).find('i');

    if (showPass) {
      input.attr('type', 'password');
      icon.removeClass('zmdi-eye-off').addClass('zmdi-eye');
    } else {
      input.attr('type', 'text');
      icon.removeClass('zmdi-eye').addClass('zmdi-eye-off');
    }
    showPass = !showPass;
  });

})(jQuery);
