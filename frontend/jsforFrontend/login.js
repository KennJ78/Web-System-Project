
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  

    var form = this;
    var passwordInput = document.getElementById('password');
    var emailInput = document.getElementById('email');
    var passwordFeedback = document.getElementById('passwordFeedback');

    
    passwordInput.setCustomValidity('');
    emailInput.setCustomValidity('');

    
    if (passwordInput.value.trim() === '') {
        passwordInput.setCustomValidity('Password is required.');
        passwordFeedback.textContent = 'Password is required.';
    } else {
        passwordInput.setCustomValidity('');  
    }

    // Check if the form is valid
    if (form.checkValidity()) {
        
        window.location.href = "cafe.html";  // Replace with the correct HTML page
    } else {
        
        form.classList.add('was-validated');
        event.stopPropagation();
    }
}, false);


// Get the password input field and the toggle icon
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

// Add an event listener to the toggle icon
togglePassword.addEventListener('click', () => {
  // Toggle the type attribute of the password input field
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;

  // Change the icon based on the password input type
  const iconClass = type === 'password' ? 'bi bi-eye-slash' : 'bi bi-eye';
  togglePassword.innerHTML = `<i class="${iconClass}"></i>`;
});