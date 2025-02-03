document.addEventListener("DOMContentLoaded", function() {
    let rol = document.getElementById('rol');
    let user = document.getElementById('user');
    let password = document.getElementById('password');
    let postContainer = document.getElementById("post-container");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
        { user: 'admin', password: '1234', rol: 'admin' },
        { user: 'user', password: '1234', rol: 'user' }
    ];

    class Users {
        constructor(user, password, rol) {
            this.user = user;
            this.password = password;
            this.rol = rol;
        }
    }
     

    function guardarEnLocalStorage() {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    window.añadirUsuario = function() {
        if (user.value.trim() === "" || password.value.trim() === "" || rol.value.trim() === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }
        let newUser = new Users(user.value, password.value, rol.value);
        usuarios.push(newUser);
        guardarEnLocalStorage();
        limpiarInputs();
        actualizarUsuarios();
    };

    window.borrarUsuario = function() {
        let username = user.value.trim();
        if (!username) {
            alert("Introduce un usuario para eliminar.");
            return;
        }

        let index = usuarios.findIndex(u => u.user === username);
        if (index !== -1) {
            usuarios.splice(index, 1);
            guardarEnLocalStorage();
            limpiarInputs();
            actualizarUsuarios();
        } else {
            alert("Usuario no encontrado.");
        }
    };

    window.modificarUsuario = function() {
        let username = user.value.trim();
        let newPassword = password.value.trim();
        let newRol = rol.value.trim();

        if (!username) {
            alert("Introduce un usuario para modificar.");
            return;
        }

        let usuario = usuarios.find(u => u.user === username);
        if (usuario) {
            if (newPassword) usuario.password = newPassword;
            if (newRol) usuario.rol = newRol;
            guardarEnLocalStorage();
            alert(`Usuario "${username}" modificado correctamente.`);
            limpiarInputs();
            actualizarUsuarios();
        } else {
            alert("Usuario no encontrado.");
        }
    };

    window.verUsuarios = function() {
        actualizarUsuarios();
    };

    function actualizarUsuarios() {
        postContainer.innerHTML = "";
        usuarios.forEach(e => {
            let div = document.createElement('div');
            div.classList.add("post");
            div.innerHTML = `<h3>${e.user}</h3><p>Rol: ${e.rol}</p><p>Password: ${e.password}</p>`;
            postContainer.appendChild(div);
        });
    }

    function limpiarInputs() {
        user.value = "";
        password.value = "";
        rol.value = "";
    }

    actualizarUsuarios();
});