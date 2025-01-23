// Variables del HTML de la página del blog del admin
import {fetchPostsFromAPI,getPosts} from './apiManager.js'
const API_URL = "/api/posts"; // Your API endpoint
const postContainer = document.getElementById("post-container");
const addPostButton = document.getElementById("add-post");

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
        <h3>${posts[i].title}</h3>
        <p>${posts[i].content}</p>
        <button class="delete-post">Delete</button>
      </div>
    `;
  }

  postContainer.innerHTML = postsHTML; // Update the container with the posts' HTML

  // Add event listeners to the delete buttons
  const deleteButtons = document.querySelectorAll(".delete-post");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const postId = event.target.closest(".post").getAttribute("data-id");
      deletePost(postId);
    });
  });
}

/**
 * Deletes a post by its ID.
 * @param {string} postId - The ID of the post to delete.
 */
function deletePost(postId) {
  // Send DELETE request to the server
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

      // Update localStorage after deletion
      const cachedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      const updatedPosts = cachedPosts.filter((post) => post.id !== parseInt(postId));

      localStorage.setItem("posts", JSON.stringify(updatedPosts));

      // Re-render posts
      renderPosts(updatedPosts);
    })
    .catch((err) => console.error("Error deleting post:", err));
}

/**
 * Adds a new post.
 */
export function addPost() {
  const id = document.getElementById("id_post").value.trim();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  // Validate inputs
  if (!id || !title || !content) {
    alert("Please fill out all fields.");
    return;
  }

  const newPost = { id, title, content };

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
  getPosts();
  addPostButton.addEventListener("click", addPost);
});
