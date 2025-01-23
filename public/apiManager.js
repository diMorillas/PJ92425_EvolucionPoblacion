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

export function getPostsSidebar(getFrom) {
  const cachedPosts = localStorage.getItem("posts");

  if (cachedPosts) {
    console.log("Loaded posts from localStorage.");
    renderSidebarPosts(JSON.parse(cachedPosts)); // Renderiza los títulos en la barra lateral
  } else {
    fetchPostsFromAPI();
  }
}

// Muestra el contenido del post seleccionado
export function displayPostContent(postId) {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const selectedPost = posts.find((post) => post.id === parseInt(postId));
    console.log(selectedPost);
  
    if (selectedPost) {
      postTitle.textContent = selectedPost.title;
      postBody.textContent = selectedPost.content;
    }
  }
  
