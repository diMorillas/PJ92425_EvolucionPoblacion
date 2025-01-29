// Variables del HTML de la página del blog del admin
const API_URL = "/api/posts"; // Your API endpoint
const postContainer = document.getElementById("post-container");
const addPostButton = document.getElementById("add-post");

// Fetch posts from API or localStorage
export function getPosts() {
  const cachedPosts = localStorage.getItem("posts"); // Guardadas en "cache"
  if (cachedPosts) {
    //fetchPostsFromAPI();
    console.log("Loaded posts from localStorage.");
    console.log(cachedPosts);
    renderPosts(JSON.parse(cachedPosts));
  } else {
    fetchPostsFromAPI();
  }
}

// Basic fetching from the API with a GET to retrieve all the posts in our post array (posts are not stored nor saved into our mongoDB).
export function fetchPostsFromAPI() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched posts from server:", data);
      localStorage.setItem("posts", JSON.stringify(data)); // Cache in localStorage
      renderPosts(data); // Renderizar posts al obtenerlos
    })
    .catch((err) => {
      console.error("Error fetching posts:", err);
      postContainer.innerHTML = `<p>Error loading posts. Try again later.</p>`;
    });
}

/**
 * Renders posts in the DOM.
 * @param {Array} posts - The posts from the API.
 */
export function renderPosts(posts) {
  if (!posts.length) {
    postContainer.innerHTML = "<p>No posts yet. Add a new post!</p>";
    return;
  }

  let postsHTML = ""; // Store generated HTML for posts

  // Loop through the posts and generate HTML
  for (let i = 0; i < posts.length; i++) {
    postsHTML += `
      <div class="post" data-id="${posts[i].id}">
        <p>${posts[i].id}</p>
        <h3>${posts[i].title}</h3>
        <p>${posts[i].content}</p>
      </div>
    `;
  }

  postContainer.innerHTML = postsHTML; // Update the container with the posts' HTML

}

/**
 * Deletes a post by its ID.
 * @param {string} postId - The ID of the post to delete.
 */
function deletePost(postId) {
  // Enviar la solicitud DELETE al servidor
  fetch(`${API_URL}/${postId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        console.log(`Error al intentar eliminar el post con ID: ${postId}`);
        throw new Error("Error deleting post");
      }
      return response.json(); // Procesar la respuesta JSON
    })
    .then((data) => {
      console.log(data.message);

      // Actualizar localStorage después de la eliminación
      const cachedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      const updatedPosts = cachedPosts.filter((post) => post.id !== postId); // Comparar como string

      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      function deletePost(postId) {
        // Enviar la solicitud DELETE al servidor
        fetch(`${API_URL}/${postId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              console.log(`Error al intentar eliminar el post con ID: ${postId}`);
              throw new Error("Error deleting post");
            }
            return response.json(); // Procesar la respuesta JSON
          })
          .then((data) => {
            console.log(data.message);
      
            // Actualizar localStorage después de la eliminación
            const cachedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      
            // Asegurarse de que ambos ID sean números antes de compararlos
            const updatedPosts = cachedPosts.filter((post) => post.id !== parseInt(postId, 10));
      
            // Guardar los posts actualizados en localStorage
            localStorage.setItem("posts", JSON.stringify(updatedPosts));
      
            // Re-renderizar los posts en la interfaz
            renderPosts(updatedPosts);
          })
          .catch((err) => {
            console.error("Error deleting post:", err);
          });
      }
      
      // Re-renderizar los posts en la interfaz
      renderPosts(updatedPosts);
    })
    .catch((err) => console.error("Error deleting post:", err));
}


let botonEliminar = document.getElementById("delete-post");
botonEliminar.addEventListener("click",()=>{
  let idPost = document.getElementById("id_post").value.trim();
  console.log(idPost)
  console.log(botonEliminar);
  console.log("delete click");
  console.log(idPost);
  deletePost(idPost);

});

/**
 * Adds a new post.
 */
function addPost() {
  const id = document.getElementById("id_post").value.trim();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  // Validate inputs
  if (!id || !title || !content) {
    alert("Please fill out all fields.");
    return;
  }

  const newPost = { id:id, title:title, content:content };

  // Send POST request to add the post
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Post added successfully:", data.post);

      // Update localStorage
      const cachedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      cachedPosts.push(data.post);
      localStorage.setItem("posts", JSON.stringify(cachedPosts));

      // Re-render posts
      renderPosts(cachedPosts);

      // Clear form fields
      document.getElementById("id_post").value = "";
      document.getElementById("title").value = "";
      document.getElementById("content").value = "";
    })
    .catch((err) => console.error("Error adding post:", err));
}

// Load posts when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  //localStorage.clear();
  getPosts();
  addPostButton.addEventListener("click", addPost);

});