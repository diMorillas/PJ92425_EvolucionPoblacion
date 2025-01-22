const API_URL = "/api/posts"; // Your API endpoint
const postContainer = document.getElementById("post-container");
const addPostButton = document.getElementById("add-post");

// Fetch posts from API or localStorage
function getPosts() {
  const cachedPosts = localStorage.getItem("posts");

  if (cachedPosts) {
    console.log("Loaded posts from localStorage.");
    renderPosts(JSON.parse(cachedPosts));
  } else {
    fetchPostsFromAPI();
  }
}

// Fetch posts from the server
function fetchPostsFromAPI() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched posts from server:", data);
      localStorage.setItem("posts", JSON.stringify(data)); // Cache in localStorage
      renderPosts(data);
    })
    .catch((err) => {
      console.error("Error fetching posts:", err);
      postContainer.innerHTML = `<p>Error loading posts. Try again later.</p>`;
    });
}

// Render posts to the DOM
// Renderizar posts (loopearlos y generarlos con JS)
function renderPosts(posts) {
    if (!posts.length) {
      postContainer.innerHTML = "<p>No posts yet. Add a new post!</p>";
      return;
    }
  
    let postsHTML = ""; // Aquí almacenaremos el HTML generado
  
    // Recorremos los posts con un bucle for
    for (let i = 0; i < posts.length; i++) {
      postsHTML += `
        <div class="post" data-id="${posts[i].id}">
          <h3>${posts[i].title}</h3>
          <p>${posts[i].content}</p>
          <button class="delete-post">Delete</button>
        </div>
      `;
    }
  
    postContainer.innerHTML = postsHTML;
  
    // Agregar evento de eliminar a cada botón
    const deleteButtons = document.querySelectorAll(".delete-post");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const postId = event.target.closest(".post").getAttribute("data-id");
        deletePost(postId);
      });
    });
  }

  
// Eliminar un post
function deletePost(postId) {
    // Enviar solicitud DELETE al servidor
    fetch(`${API_URL}/${postId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error deleting post");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
  
        // Actualizar localStorage después de eliminar
        const cachedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        const updatedPosts = cachedPosts.filter((post) => post.id !== parseInt(postId));
  
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
  
        // Re-renderizar posts
        renderPosts(updatedPosts);
      })
      .catch((err) => console.error("Error deleting post:", err));
  }
  

// Add a new post
function addPost() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    alert("Please fill out both fields.");
    return;
  }

  const newPost = { title, content };

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

      // Clear form
      document.getElementById("title").value = "";
      document.getElementById("content").value = "";
    })
    .catch((err) => console.error("Error adding post:", err));
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  getPosts();
  addPostButton.addEventListener("click", addPost);
});
