document.addEventListener("DOMContentLoaded", function() {
    let rol = document.getElementById('rol');
    let user = document.getElementById('user');
    let password = document.getElementById('password');
    let postContainer = document.getElementById("post-container");

    // Función para obtener los usuarios
    async function getUsers() {
        const response = await fetch('/api/users');
        const data = await response.json();
        console.log(data);
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        data.forEach(user => {
            let li = document.createElement('li');
            li.textContent = `${user.username} - ${user.password}`;
            userList.appendChild(li);
        });
    }

    // Función para crear un nuevo usuario
    async function createUser(event) {
        event.preventDefault();

        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.value,
                password: password.value
            })
        });

        const data = await response.json();
        console.log(data);
        if (data._id) {
            alert('Usuario creado exitosamente');
            getUsers(); // Actualiza la lista de usuarios
        } else {
            alert('Error al crear usuario');
        }
    }

    // Cargar los usuarios al cargar la página
    getUsers();

    // Event listener para el formulario de creación de usuario
    postContainer.addEventListener('submit', createUser);
});
