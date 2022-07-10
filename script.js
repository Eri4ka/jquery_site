import $ from 'jquery';

$(document).ready(function() {

    // Отркыть модальное окно
    function showModalForm() {
        $('.modal-wrapper-content').show();
        $('.modal-wrapper-contentsubmit').hide();
    }

    // Закрыть модальное окно
    function hideModalForm() {
        $('.modal-wrapper-content').hide();
        $('.modal-wrapper-contentsubmit').show();
    }

    // Валидация инпутов
    function validate(input, reg, inputwrapper, invalid, empty) {
        
        if (input.val() && !input.val().match(reg)) {
            input.css('border', '2px solid red');

            if (!$(inputwrapper).children().is('.input-error')) {
                $(inputwrapper).append(`<div class="input-error">${invalid}</div>`);
            } 
            
        } else if (!input.val()) {
            input.css('border', '2px solid red');
            if (!$(inputwrapper).children().is('.input-error')) {
                $(inputwrapper).append(`<div class="input-error">${empty}</div>`);
            } 
            
        } else {
            return true;
        }
    }

    // Получить инвайт
    function getInvite() {
        $('.modal').show();
        hideModalForm();

        $('[data-id=btn-close]').on('click', function() {
            $('.modal').hide();
            
            $('[data-id=form-input]').val('');
            $('[data-id=form-input]').css('border', 'none');
            $('[data-id=form-input]').next('.input-error').remove();
        });
    }

    // Отправить инвайт
    function sendInvite() {
        $('.modal').show();
        showModalForm();
        
        $('[data-id=btn-close]').on('click', function() {
            $('.modal').hide();

            $('.modal-wrapper-content-inputs').children().each(function() {
                $(this).children().val('');
                $(this).children().css('border', 'none');
                $(this).children().next('.input-error').remove();
            });
        });

        $('[data-id=modal-btn]').on('click', function() {
            validate($('[data-id=modal-name]'), /^[a-z]+$/gi, '.modal-wrapper-content-inputs-name', 'You need to enter your friend name', 'Only letters');
            validate($('[data-id=modal-surname]'), /^[a-z]+$/gi, '.modal-wrapper-content-inputs-surname', 'You need to enter your friend surname', 'Only letters');
            
            if (
                validate($('[data-id=modal-name]'), /^[a-z]+$/gi, '.modal-wrapper-content-inputs-name', 'You need to enter your friend name', 'Only letters') &&
                validate($('[data-id=modal-surname]'), /^[a-z]+$/gi, '.modal-wrapper-content-inputs-surname', 'You need to enter your friend surname', 'Only letters')
            ) {
                $.post(
                    'http://localhost:3000/friendivites', 
                    { 
                        name: $('[data-id=modal-name]').val(),
                        surname: $('[data-id=modal-surname]').val()
                    }, 
                    function res(data) {
                        console.log(data);
                    });

                hideModalForm();
            }
        });
    }


    $('input').each(function () {
        $(this).on('input', function() {
            $(this).css('border', 'none');
            $(this).next('.input-error').remove();
        });
    });

    $("button").each(function() {
        $(this).hover(function() {
            $(this).toggleClass('active');
        });
    });

    $('.modal').hide();

    $('[data-id=form-btn]').on('click', function() {
        if (validate($('[data-id=form-input]'), /^\w+\@\w+\.\w+/g, '.topwrapper-content-form-input', 'Invalid email format', 'You need to enter your email')) {
            $.post(
                'http://localhost:3000/invites', 
                { 
                    email: $('[data-id=form-input]').val() 
                }, 
                function res(data) {
                    console.log(data);
                });

            getInvite();
        }
    });
    
    $('[data-id=btn-invite]').on('click', function() {
        sendInvite();
    });

});


