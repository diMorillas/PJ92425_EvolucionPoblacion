
class Blog {
  constructor() {
    this.posts = [];
  }

  getPosts() {
    return this.posts;
  }

  getPostById(id) {
    return this.posts.find((post) => post.id === id);
  }

  createPost(id, title, content) {
    const newPost = new Post(id, title, content);
    this.posts.push(newPost);
    return newPost;
  }

  updatePost(id, updatedTitle, updatedContent) {
    const post = this.getPostById(id);
    if (post) {
      post.title = updatedTitle;
      post.content = updatedContent;
      return post;
    }
    return null;
  }

  deletePost(id) {
    const index = this.posts.findIndex((post) => post.id === id);
    if (index !== -1) {
      this.posts.splice(index, 1);
      return true;
    }
    return false;
  }
}

// Exportar la clase Blog
export default Blog;
