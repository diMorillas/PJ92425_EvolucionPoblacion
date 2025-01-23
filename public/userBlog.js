import { getPosts, fetchPostsFromAPI, renderPosts } from "./adminBlog.js"; // Importamos las funciones del módulo de administrador

document.addEventListener("DOMContentLoaded", () => {
  getPosts();
});
