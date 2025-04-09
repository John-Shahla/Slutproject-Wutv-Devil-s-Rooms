document.addEventListener('DOMContentLoaded', () => {
    // Tab switching functionality
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and forms
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));

            // Add active class to clicked tab and corresponding form
            tab.classList.add('active');
            const formId = `${tab.getAttribute('data-tab')}-form`;
            document.getElementById(formId).classList.add('active');
        });
    });

    // Form validation and submission
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const remember = document.querySelector('input[name="remember"]').checked;

        // Basic validation
        if (!email || !password) {
            showError(loginForm, 'Vänligen fyll i alla fält');
            return;
        }

        // Here you would typically make an API call to your backend
        // For now, we'll just simulate a successful login
        simulateLogin(email, password, remember);
    });

    // Registration form submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const terms = document.querySelector('input[name="terms"]').checked;

        // Clear previous error messages
        clearErrors(registerForm);

        // Validation
        if (!username || !email || !password || !confirmPassword) {
            showError(registerForm, 'Vänligen fyll i alla fält');
            return;
        }

        if (password !== confirmPassword) {
            showError(registerForm, 'Lösenorden matchar inte');
            return;
        }

        if (password.length < 8) {
            showError(registerForm, 'Lösenordet måste vara minst 8 tecken långt');
            return;
        }

        if (!terms) {
            showError(registerForm, 'Du måste acceptera användarvillkoren');
            return;
        }

        // Here you would typically make an API call to your backend
        // For now, we'll just simulate a successful registration
        simulateRegistration(username, email, password);
    });

    // Helper functions
    function showError(form, message) {
        clearErrors(form);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        form.insertBefore(errorDiv, form.firstChild);
    }

    function clearErrors(form) {
        const errors = form.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
    }

    // Simulated API calls
    function simulateLogin(email, password, remember) {
        // Show loading state
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Loggar in...';
        submitButton.disabled = true;

        // Simulate API delay
        setTimeout(() => {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Simulate successful login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            if (remember) {
                localStorage.setItem('rememberMe', 'true');
            }

            // Redirect to home page
            window.location.href = '../index.html';
        }, 1500);
    }

    function simulateRegistration(username, email, password) {
        // Show loading state
        const submitButton = registerForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Registrerar...';
        submitButton.disabled = true;

        // Simulate API delay
        setTimeout(() => {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Simulate successful registration
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('username', username);

            // Redirect to home page
            window.location.href = '../index.html';
        }, 1500);
    }

    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = '../index.html';
    }
}); 