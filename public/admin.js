document.addEventListener("DOMContentLoaded", function() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const userList = document.getElementById('userList');
    const createUserForm = document.getElementById('createUserForm');
    
    // Función para obtener los usuarios
    async function getUsers() {
      const response = await fetch('/api/users');
      const data = await response.json();
      userList.innerHTML = ''; // Limpiar la lista antes de mostrar los usuarios
      data.forEach(user => {
        let li = document.createElement('li');
        li.textContent = `${user.username} - ${user.password}`;
        
        // Agregar botón para eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => deleteUser(user._id);
        li.appendChild(deleteButton);
        
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
          username: username.value,
          password: password.value
        })
      });
  
      const data = await response.json();
      if (data._id) {
        alert('Usuario creado exitosamente');
        getUsers(); // Actualizar la lista de usuarios
      } else {
        alert('Error al crear usuario');
      }
    }
  
    // Función para eliminar un usuario
    async function deleteUser(userId) {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      });
  
      const data = await response.json();
      if (data.message === 'Usuario eliminado') {
        alert('Usuario eliminado');
        getUsers(); // Actualizar la lista de usuarios
      } else {
        alert('Error al eliminar usuario');
      }
    }
  
    // Cargar los usuarios al cargar la página
    getUsers();
  
    // Event listener para el formulario de creación de usuario
    createUserForm.addEventListener('submit', createUser);
  });
  