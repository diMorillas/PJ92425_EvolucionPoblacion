const API_URL = "/api/posts"; // Your API endpoint

// Basic fetching from the API with a GET to retrieve all the posts in our post array (posts are not stored nor saved into our mongoDB).
export function fetchPostsFromAPI() {
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


export function getPosts() {
  const cachedPosts = localStorage.getItem("posts"); // Guardadas en "cache"

  if (cachedPosts) {
    console.log("Loaded posts from localStorage.");
    renderPosts(JSON.parse(cachedPosts));
  } else {
    fetchPostsFromAPI();
  }
}

/** USERS BLOG */

export function getPostsSidebar() {
  const cachedPosts = localStorage.getItem("posts");

  if (cachedPosts) {
    console.log("Loaded posts from localStorage.");
    renderSidebarPosts(JSON.parse(cachedPosts)); // Renderiza los títulos en la barra lateral
  } else {
    fetchPostsFromAPI();
  }
}

// Renderiza los títulos de los posts en la barra lateral
function renderSidebarPosts(posts) {
    if (!posts.length) {
      sidebarPosts.innerHTML = "<p>No posts yet. Add a new post!</p>";
      return;
    }
  
    let postsHTML = "";
    posts.forEach((post) => {
      postsHTML += `<li data-id="${post.id}">${post.title}</li>`;
    });
  
    sidebarPosts.innerHTML = postsHTML;
  
    // Agregar evento de clic a cada título de post
    const postItems = document.querySelectorAll(".sidebar ul li");
    postItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        const postId = event.target.getAttribute("data-id");
        displayPostContent(postId);
      });
    });
  }


// Muestra el contenido del post seleccionado
function displayPostContent(postId) {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const selectedPost = posts.find((post) => post.id === parseInt(postId));
    console.log(selectedPost);
  
    if (selectedPost) {
      postTitle.textContent = selectedPost.title;
      postBody.textContent = selectedPost.content;
    }
  }
  
