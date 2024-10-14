// frontend/app.js

document.addEventListener('DOMContentLoaded', () => {
    // Manejar el formulario de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://127.0.0.1:5000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nombre, email, password })
                });

                const data = await response.json();

                if (response.status === 201) {
                    alert(data.msg);
                    window.location.href = 'login.html';
                } else {
                    alert(data.msg);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error al registrar el usuario.');
            }
        });
    }

    // Manejar el formulario de inicio de sesión
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://127.0.0.1:5000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.status === 200) {
                    // Guardar el token en el localStorage
                    localStorage.setItem('token', data.access_token);
                    alert(data.msg);
                    window.location.href = 'dashboard.html';
                } else {
                    alert(data.msg);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error al iniciar sesión.');
            }
        });
    }

    // Manejar el cierre de sesión
    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });
    }

    // Proteger el dashboard
    const dashboard = document.getElementById('autonomia');
    if (dashboard) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Debes iniciar sesión para acceder al dashboard.');
            window.location.href = 'login.html';
        } else {
            // Opcional: Verificar el token con el backend
            fetch('http://127.0.0.1:5000/api/protected', {
                method: 'GET',
                headers: {
                    'Authorization': Bearer ${token}
                }
            })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Token inválido');
                }
                return response.json();
            })
            .then(data => {
                console.log(Bienvenido, ${data.logged_in_as});
                // Aquí puedes personalizar el dashboard
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Sesión inválida. Por favor, inicia sesión nuevamente.');
                window.location.href = 'login.html';
            });
        }
    }
});
