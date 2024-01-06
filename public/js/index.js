$(function () {
    let arr_appoint = ['name', 'email', 'phone', 'datepicker', 'service', 'employee', 'message']
    $("#submit").on('click', () => {

        let data_appoint = {}
        arr_appoint.forEach(key => {
            let value = $(`#${key}`).val();
            data_appoint[key] = value
            data_appoint['status'] = 'Chưa đến hẹn'
        });
        fetch('/saveAppointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_appoint)
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: "Đặt lịch thành công",
                    text: "Vui lòng kiểm tra email",
                    icon: "success",
                    confirmButtonText: "OK bro"
                });
                arr_appoint.forEach(key => {
                    $(`#${key}`).val('');
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });

    })
    $("#login").on('click', () => {

        let data_login = {
            'email': $("#email-login").val(),
            'password': $("#password-login").val(),
        }
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_login)
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: "Đăng nhập thành công",
                    icon: "success",
                    confirmButtonText: "OK bro"
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        document.location.href = '/admin'
                    }
                });

            })
            .catch(error => {
                console.error('Error:', error);
            });

    })
})