// Importamos funciones reutilizables del apiConsumer.js
import { fetchPosts, loadFromLocalStorage, saveToLocalStorage } from "./apiConsumer.js";

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar-posts");
    const postTitle = document.getElementById("post-title");
    const postBody = document.getElementById("post-body");

    function displayPosts(posts) {
        sidebar.innerHTML = "";
        posts.forEach(post => {
            const listItem = document.createElement("li");
            listItem.textContent = post.title;
            listItem.dataset.id = post.id;
            listItem.addEventListener("click", () => displayPost(post));
            sidebar.appendChild(listItem);
        });
    }

    function displayPost(post) {
        postTitle.textContent = post.title;
        postBody.textContent = post.content;
    }

    function init() {
        const storedPosts = loadFromLocalStorage();
        if (storedPosts && storedPosts.length > 0) {
            console.log("Cargando posts desde LocalStorage");
            displayPosts(storedPosts);
        } else {
            console.log("Cargando posts desde la API");
            fetchPosts().then(posts => {
                saveToLocalStorage(posts);
                displayPosts(posts);
            }).catch(error => console.error("Error al obtener los posts:", error));
        }
    }

    init();
});