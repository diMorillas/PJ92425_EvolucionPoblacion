document.addEventListener("DOMContentLoaded", function() {
  const createUserForm = document.getElementById('createUserForm');
  const userList = document.getElementById('userList');

  // Obtener y mostrar usuarios
  async function loadUsers() {
      try {
          const response = await fetch('/api/users');
          
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const users = await response.json();
          renderUsers(users);
      } catch (error) {
          console.error('Error cargando usuarios:', error);
          alert('Error al cargar usuarios');
      }
  }

  // Renderizar lista de usuarios
  function renderUsers(users) {
      userList.innerHTML = '';
      users.forEach(user => {
          const li = document.createElement('li');
          li.innerHTML = `
              <strong>${user.username}</strong>
              <button class="delete-btn" data-id="${user._id}">Eliminar</button>
          `;
          userList.appendChild(li);
      });

      // Agregar event listeners a los botones de eliminar
      document.querySelectorAll('.delete-btn').forEach(button => {
          button.addEventListener('click', async () => {
              if (confirm('¿Estás seguro de eliminar este usuario?')) {
                  try {
                      const response = await fetch(`/api/users/${button.dataset.id}`, {
                          method: 'DELETE'
                      });
                      
                      if (!response.ok) {
                          throw new Error(`HTTP error! status: ${response.status}`);
                      }
                      
                      loadUsers(); // Recargar lista
                      alert('Usuario eliminado exitosamente');
                  } catch (error) {
                      console.error('Error eliminando usuario:', error);
                      alert('Error al eliminar usuario');
                  }
              }
          });
      });
  }

  // Manejar creación de usuarios
  createUserForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(createUserForm);
      const userData = {
          username: formData.get('username'),
          password: formData.get('password')
      };

      try {
          const response = await fetch('/api/users', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData)
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Error al crear usuario');
          }

          createUserForm.reset();
          loadUsers(); // Recargar lista
          alert('Usuario creado exitosamente');
          
      } catch (error) {
          console.error('Error creando usuario:', error);
          alert(error.message);
      }
  });

  // Cargar usuarios al iniciar
  loadUsers();
});