const nameInput = document.getElementById('name');
const error = document.getElementById('error');
nameInput.addEventListener('input', function () {
    if (!/^[a-zA-Z]+$/.test(this.value)) {
        error.innerText = "Name should contain only alphabets";
    } else {
        error.innerText = "";
    }
});
const emailInput = document.getElementById('email');
emailInput.addEventListener('input', function () {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.value)) {
        error.innerText = "Invalid email address";
    } else {
        error.innerText = "";
    }
});
const passwordInput = document.getElementById('password');
passwordInput.addEventListener('input', function () {
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(this.value)) {
        error.innerText = "Weak Password";
    } else {
        error.innerText = "";
    }
});