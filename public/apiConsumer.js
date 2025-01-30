const API_URL = "http://localhost:8888/api/posts";

document.addEventListener("DOMContentLoaded", () => {
  fetchPosts();

  document.getElementById("add-post").addEventListener("click", createPost);
  document.getElementById("modify-post").addEventListener("click", updatePost);
  document.getElementById("delete-post").addEventListener("click", deletePost);
});

// Obtener y renderizar los posts
function fetchPosts() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => renderPosts(data))
    .catch((err) => console.error("Error obteniendo posts:", err));
}

// Renderizar posts en la interfaz
function renderPosts(posts) {
  const container = document.getElementById("post-container");
  container.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
      <h2>${post.id}</h2>
      <h3>${post.title}</h3>
      <p>${post.content}</p>
    `;
    container.appendChild(postElement);
  });
}

// Crear un nuevo post
function createPost() {
  const id = document.getElementById("id_post").value.trim();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!id || !title || !content) {
    alert("Todos los campos son obligatorios");
    return;
  }

  const newPost = { id, title, content };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
    .then((response) => response.json())
    .then(() => {
      fetchPosts();
      clearFields();
    })
    .catch((err) => console.error("Error creando post:", err));
}

// Modificar un post
function updatePost() {
  const id = document.getElementById("id_post").value.trim();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!id || !title || !content) {
    alert("Todos los campos son obligatorios");
    return;
  }

  const updatedPost = { title, content };

  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  })
    .then((response) => response.json())
    .then(() => {
      fetchPosts();
      clearFields();
    })
    .catch((err) => console.error("Error modificando post:", err));
}

// Eliminar un post con el ID ingresado en el formulario
function deletePost() {
  const id = document.getElementById("id_post").value.trim();

  if (!id) {
    alert("Introduce un ID para eliminar un post");
    return;
  }

  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then(() => {
      fetchPosts();
      clearFields();
    })
    .catch((err) => console.error("Error eliminando post:", err));
}

// Limpiar campos del formulario
function clearFields() {
  document.getElementById("id_post").value = "";
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
}
