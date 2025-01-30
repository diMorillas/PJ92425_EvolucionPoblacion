class Post {
    constructor(id, title, content) {
      this.id = id;
      this.title = title;
      this.content = content;
    }
  
    toObject() {
      return {
        id: this.id,
        title: this.title,
        content: this.content,
      };
    }
  }
  
  // Exportar la clase Post
  export default Post;
  