document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('registerForm');
	const alertBox = document.getElementById('registerAlert');

	function showAlert(message, type = 'danger') {
		alertBox.className = `alert alert-${type}`;
		alertBox.textContent = message;
		alertBox.classList.remove('d-none');
	}

	function hideAlert() {
		alertBox.className = 'alert d-none';
		alertBox.textContent = '';
	}

	form.addEventListener('submit', function(event) {
		event.preventDefault();
		hideAlert();

		const email = (document.getElementById('email').value || '').trim().toLowerCase();
		const firstName = (document.getElementById('firstName').value || '').trim();
		const lastName = (document.getElementById('lastName').value || '').trim();
		const phone = (document.getElementById('phone').value || '').trim();
		const password = document.getElementById('password').value || '';
		const confirmPassword = document.getElementById('confirmPassword').value || '';

		if (!email || !firstName || !lastName || !password || !confirmPassword) {
			showAlert('Please fill in all required fields.');
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			showAlert('Please enter a valid email address.');
			return;
		}

		const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
		if (phone && !phoneRegex.test(phone)) {
			showAlert('Please enter a valid phone number.');
			return;
		}

		if (password.length < 6) {
			showAlert('Password must be at least 6 characters.');
			return;
		}

		if (password !== confirmPassword) {
			showAlert('Passwords do not match.');
			return;
		}

		const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
		if (storedUsers.some(function(u) { return u.email === email; })) {
			showAlert('An account with that email already exists.');
			return;
		}

		const nextId = storedUsers.length ? Math.max.apply(null, storedUsers.map(function(u){return u.id;})) + 1 : 1;
		const newUser = {
			id: nextId,
			name: firstName + ' ' + lastName,
			email: email,
			password: password,
			phone: phone,
			role: 'customer'
		};

		storedUsers.push(newUser);
		localStorage.setItem('users', JSON.stringify(storedUsers));

		showAlert('Registration successful! Redirecting to login...', 'success');
		setTimeout(function() {
			window.location.href = '../account/login.html';
		}, 1400);
	});
});