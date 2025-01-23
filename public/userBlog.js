import {getPostsSidebar} from "./apiManager.js";
const API_URL = "/api/posts"; // Your API endpoint
const sidebarPosts = document.getElementById("sidebar-posts");
const postTitle = document.getElementById("post-title");
const postBody = document.getElementById("post-body");

// Función para obtener los posts desde la API o localStorage


// Renderiza los títulos de los posts en la barra lateral
export function renderSidebarPosts(posts) {
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


// Cargar los posts cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  getPostsSidebar();
});
