import {Blog} from "./clases.js";

const blog = new Blog();

document.addEventListener("DOMContentLoaded", async () => {
    if (blog.getAllPosts().length === 0) {
        await blog.fetchPostsFromAPI();
    }
    renderPosts();
});

export function renderPosts() {
    const container = document.getElementById("post-container");
    container.innerHTML = "";
    blog.getAllPosts().forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <div class="posts">
            <h4><i>${post.id}</i></h4>
            <h2>${post.title}</h2>
              <p>${post.content}</p>
            </div>
        `;
        container.appendChild(postElement);
    });
}

// Manejo de eventos
document.getElementById("add-post").addEventListener("click", async () => {
    const id = document.getElementById("id_post").value.trim();
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    if (!id || !title || !content) {
        alert("Todos los campos son obligatorios");
        return;
    }
    if (await blog.addPost(id, title, content)) {
        renderPosts();
        clearFields();
    }
});

document.getElementById("modify-post").addEventListener("click", async () => {
    const id = document.getElementById("id_post").value.trim();
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    if (!id || !title || !content) {
        alert("Todos los campos son obligatorios");
        return;
    }
    if (await blog.modifyPost(id, title, content)) {
        renderPosts();
        clearFields();
    }
});

document.getElementById("delete-post").addEventListener("click", async () => {
    const id = document.getElementById("id_post").value.trim();
    if (!id) {
        alert("Introduce un ID para eliminar un post");
        return;
    }
    if (await blog.deletePost(id)) {
        renderPosts();
        clearFields();
    }
});

function clearFields() {
    document.getElementById("id_post").value = "";
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}








/*const API_URL = "http://localhost:8888/api/posts";
const STORAGE_KEY = "postsData"; // lo guardamos asi en LS

document.addEventListener("DOMContentLoaded", () => {

  if(loadFromLocalStorage("admin")){
    console.log("posts cargados desde LS");
  }else{
    fetchPosts("admin");
  }
  document.getElementById("add-post").addEventListener("click", createPost);
  document.getElementById("modify-post").addEventListener("click", updatePost);
  document.getElementById("delete-post").addEventListener("click", deletePost);
});

// Obtener y renderizar posts desde la API
export function fetchPosts(page) {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      saveToLocalStorage(data);
      if(page == "admin"){
        renderPosts(data,"admin");  
      }else{
        renderPosts(data,"user");
      }
    })
    .catch((err) => {
      console.error("Error obteniendo posts:", err);
      loadFromLocalStorage(); // Si falla la API, cargar desde localStorage
    });
}

// Renderizar posts en la interfaz
 function renderPosts(posts,page) {
  const container = document.getElementById("post-container");
  container.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    if(page == "admin"){
      postElement.innerHTML = `
      <div class = "posts">
      <h4>${post.id}</h4>
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      </div>
    `;

    }else{
      postElement.innerHTML = `
      <div class = "posts">
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      </div>
    `;

    }

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
      updateLocalStorage(newPost, "add"); // Actualizar en localStorage
      fetchPosts("admin");
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

  const updatedPost = { id, title, content };

  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  })
    .then((response) => response.json())
    .then(() => {
      updateLocalStorage(updatedPost, "update"); // Actualizar en localStorage
      fetchPosts("admin");
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
      updateLocalStorage({ id }, "delete"); // Eliminar en localStorage
      fetchPosts("admin");
      clearFields();
    })
    .catch((err) => console.error("Error eliminando post:", err));
}

// Guardar en localStorage
export function saveToLocalStorage(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

// Cargar desde localStorage
export function loadFromLocalStorage(page) {
  const savedPosts = localStorage.getItem(STORAGE_KEY);
  if (savedPosts) {
    if(page == "admin"){
      renderPosts(JSON.parse(savedPosts),page);

    }else{
      renderPosts(JSON.parse(savedPosts),page);
    }
    return true;
  }
  return false;
}

// Actualizar localStorage (añadir, modificar, eliminar)
function updateLocalStorage(post, action) {
  let posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  if (action === "add") {
    posts.push(post);
  } else if (action === "update") {
    posts = posts.map((p) => (p.id === post.id ? post : p));
  } else if (action === "delete") {
    posts = posts.filter((p) => p.id !== post.id);
  }

  saveToLocalStorage(posts);
}

// Limpiar campos del formulario
function clearFields() {
  document.getElementById("id_post").value = "";
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
}
*/