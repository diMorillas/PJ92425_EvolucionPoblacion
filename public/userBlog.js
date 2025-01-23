import {getPostsSidebar} from "./apiManager.js";
const API_URL = "/api/posts"; // Your API endpoint
const sidebarPosts = document.getElementById("sidebar-posts");
const postTitle = document.getElementById("post-title");
const postBody = document.getElementById("post-body");

// Función para obtener los posts desde la API o localStorage





// Cargar los posts cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  getPostsSidebar();
});
