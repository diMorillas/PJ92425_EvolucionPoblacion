import { renderPosts } from "./apiConsumer.js";
import {Blog} from "./clases.js";

let blog = new Blog();

document.addEventListener("DOMContentLoaded", async () => {
  if (blog.getAllPosts().length === 0) {
      await blog.fetchPostsFromAPI();
  }
  renderPosts();
});



/*

// Importamos funciones reutilizables del apiConsumer.js
import { fetchPosts, loadFromLocalStorage, saveToLocalStorage } from "./apiConsumer.js";

document.addEventListener("DOMContentLoaded", () => {
  if(loadFromLocalStorage("user")){
    console.log("posts cargados desde LS");
  }else{
    fetchPosts("user");
    loadFromLocalStorage("user");
  }
});

*/