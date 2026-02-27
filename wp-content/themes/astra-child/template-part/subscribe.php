<style>
    .email-submit-form {
        display: none;
        background: #2a5fb1;
        color: #ffffff;
        overflow: hidden;
        z-index: 9999;
        position: fixed;
        padding: 10px 20px 25px 20px;
        text-align: center;
        width: 280px;
        height: 250px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        left: 10px;
        bottom: 10px;
        border-radius: 7px;
        line-height: 1;
    }

    .email-submit-form .email-submit-form-content-button {
        background-color: #df9d06;
        margin-top: 10px;
        border-radius: 7px;
        /*position: fixed;*/
        bottom: 40px;
        height: 30px;
        width: 100%;
        font-size: 15px;
        line-height: 30px;
        font-weight: bold;
    }

    .email-submit-form .close {
        float: right;
        color: #ffffff;
        width: 10px;
        height: 10px;
    }

    .email-submit-form .button-group {
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        height: auto;
    }

    .email-submit-form input {
        border-radius: 7px;
        width: 100%;
        height: 28px;
        border: none;
        text-align: center;
        padding: 0;
    }

    .email-submit-form .email-submit-form-content {
        font-size: 13px;
        margin-top: 35px;
        margin-bottom: 35px;
        text-align: left;
        line-height: 1.5
        /*font-family: 'Poppins-Medium';*/
    }
</style>
<script>

    jQuery('body').on('change', '.files_stl', function () {
        jQuery('.email-submit-form').show()
        setTimeout(function () {
            jQuery('.email-submit-form').hide()
        }, 30000);
    })

    function close_email_submit_form() {
        jQuery('.email-submit-form').hide()
    }

    function submit_email() {
        let email = jQuery('.email-submit-form .button-group input').val()
        jQuery.post(
            myajax.url, {
                'action': 'add_email',
                'email': email,
            },
            function () {
                close_email_submit_form()
            }
        );
    }
</script>

<div class="email-submit-form">
    <div class="close" onclick="close_email_submit_form()">
        <i class="fa-solid fa-circle-xmark"></i>
    </div>
    <div class="email-submit-form-content">
        Just fill in your email and you can
        subscribe to get the latest news of
        our case studies, services, material
        updates and excellent transactions!
    </div>
    <div class="button-group">
        <input placeholder="Your email address" type="email"/>
        <div class="email-submit-form-content-button" onclick="submit_email()">Sign me up</div>
    </div>
</div>
