document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm');
    const errorMessageDiv = document.querySelector('#error-message');

    const validateInputs = () => {
        const email = document.querySelector('#email').value.trim();
        const password = document.querySelector('#password').value.trim();
        const role = document.querySelector('#role').value;

        let isValid = true;
        let errorMessage = '';

        if (!email) {
            isValid = false;
            errorMessage = 'Email is required.';
        } else if (!password) {
            isValid = false;
            errorMessage = 'Password is required.';
        } else if (!role) {
            isValid = false;
            errorMessage = 'Role selection is required.';
        }

        if (!isValid) {
            showValidationError(errorMessage);
        } else {
            hideValidationError();
        }

        return isValid;
    };

    const showValidationError = (message) => {
        errorMessageDiv.textContent = message;
        errorMessageDiv.classList.remove('d-none');
    };

    const hideValidationError = () => {
        errorMessageDiv.textContent = '';
        errorMessageDiv.classList.add('d-none');
    };

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (validateInputs()) {
            const email = document.querySelector('#email').value.trim();
            const password = document.querySelector('#password').value.trim();
            const role = document.querySelector('#role').value;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, role }),
                });

                const result = await response.json();

                if (response.ok) {
                    
                    window.location.href = result.redirectUrl;
                } else {
                    
                    showValidationError(result.error || 'Invalid credentials.');
                }
            } catch (error) {
                console.error('Login error:', error);
                showValidationError('An unexpected error occurred. Please try again.');
            }
        }
    });
});
