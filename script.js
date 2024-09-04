document.addEventListener('DOMContentLoaded', function() {
    var inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(function(input) {
        input.addEventListener('invalid', function() {
            this.setCustomValidity('');
            if (!this.validity.valid) {
                this.setCustomValidity('يرجى ملء هذا الحقل.');
            }
        });
        input.addEventListener('input', function() {
            this.setCustomValidity('');
        });
    });

    var phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, ''); // Remove non-digit characters
    });

    var form = document.getElementById('registrationForm');
    var modal = document.getElementById('successModal');
    var closeButton = document.querySelector('.close-button');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        var formData = new FormData(form);
        var encodedData = new URLSearchParams(formData).toString();

        fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encodedData
        })
        .then(function(response) {
            if (response.ok) {
                modal.style.display = 'block'; // Show the modal
                form.reset(); // Optionally, reset the form
            } else {
                throw new Error('An error occurred. Please try again.');
            }
        })
        .catch(function(error) {
            alert(error.message);
        });
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
