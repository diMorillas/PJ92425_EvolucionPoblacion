

//Variables del HTML de la página del blog del admin
const API_URL = "/api/posts"; // Your API endpoint
const postContainer = document.getElementById("post-container");
const addPostButton = document.getElementById("add-post");

// Fetch posts from API or localStorage

/**
 * Post object is returned from de backend with a GET. If we look closer the function invoques the renderPosts() to load them into the webPage if we have them in LocalStorage. However if this happens to be false it makes a fetch to our api using fetchPostsFromApi() and making a GET request.
 */
 export function getPosts() {
  const cachedPosts = localStorage.getItem("posts"); //guardades en "cache"

  if (cachedPosts) {
    console.log("Loaded posts from localStorage.");
    renderPosts(JSON.parse(cachedPosts));
  } else {
    fetchPostsFromAPI();
  }
}

/**
 * Basic fetching from the api with a GET to retrieve all the posts in our post array (pots are not stored nor saved into our mongoDB).
 */
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


/**
 * 
 * @param {posts from the api as a JSON} posts 
 * @returns it creates all the posts in the DOM looping trhough the api response. Creates the post html until it reaches the end of the response.
 */
export function renderPosts(posts) {
    if (!posts.length) {
      postContainer.innerHTML = "<p>No posts yet. Add a new post!</p>";
      return;
    }
  
    let postsHTML = ""; // Aquí almacenaremos el HTML generado
  
    // Recorremos los posts con un bucle for y le añadirmos el html
    for (let i = 0; i < posts.length; i++) {
      postsHTML += `
        <div class="post" data-id="${posts[i].id}">
          <h3>${posts[i].title}</h3>
          <p>${posts[i].content}</p>
          <button class="delete-post">Delete</button>
        </div>
      `;
    }
  
    postContainer.innerHTML = postsHTML; //This is where we change the html of our "container"
  
    //eventListener to delete buttons
    const deleteButtons = document.querySelectorAll(".delete-post");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const postId = event.target.closest(".post").getAttribute("data-id");
        deletePost(postId);
      });
    });
  }

  
/**
 * 
 * @param {string} postId
 * makes a DELETE request to our api and deletes a post if it matches with the ID we have given 
 */
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
/**
 * 
 * @returns Creates and renders a post. Firstly it fethces the API with a POST request. After the fetch it updates localStorage and adds our new post,
 * Ultimately re renders all the posts with the new one and clears variables to avoid duplicate date when we trigger an addPost() again.
 */
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

// Cargar los posts cuando cargue el dom (parecido a un window.onload)


document.addEventListener("DOMContentLoaded", () => {
  getPosts();
  addPostButton.addEventListener("click", addPost);
});
