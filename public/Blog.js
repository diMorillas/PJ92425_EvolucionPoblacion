const API_URL = "http://localhost:8888/api/posts";
const STORAGE_KEY = "postsData";

class Post {
    constructor(id, title, content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
}

class Blog {
    constructor() {
        this.posts = this.loadFromLocalStorage();
    }

    // Cargar desde localStorage
    loadFromLocalStorage() {
        const savedPosts = localStorage.getItem(STORAGE_KEY);
        return savedPosts ? JSON.parse(savedPosts).map(p => new Post(p.id, p.title, p.content)) : [];
    }

    // Guardar en localStorage
    saveToLocalStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.posts));
    }

    // Obtener todos los posts
    getAllPosts() {
        return this.posts;
    }

    // Buscar un post por ID
    getPostById(id) {
        return this.posts.find(post => post.id === id);
    }

    // Agregar un nuevo post
    async addPost(id, title, content) {
        const newPost = new Post(id, title, content);
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost),
            });
            if (!response.ok) throw new Error("Error al crear el post");
            this.posts.push(newPost);
            this.saveToLocalStorage();
            return true;
        } catch (error) {
            console.error("Error creando post:", error);
            return false;
        }
    }

    // Modificar un post
    async modifyPost(id, newTitle, newContent) {
        const post = this.getPostById(id);
        if (!post) return false;
        
        const updatedPost = new Post(id, newTitle, newContent);
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedPost),
            });
            if (!response.ok) throw new Error("Error al modificar el post");
            Object.assign(post, updatedPost);
            this.saveToLocalStorage();
            return true;
        } catch (error) {
            console.error("Error modificando post:", error);
            return false;
        }
    }

    // Eliminar un post
    async deletePost(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Error al eliminar el post");
            this.posts = this.posts.filter(post => post.id !== id);
            this.saveToLocalStorage();
            return true;
        } catch (error) {
            console.error("Error eliminando post:", error);
            return false;
        }
    }

    // Obtener posts desde la API
    async fetchPostsFromAPI() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            this.posts = data.map(p => new Post(p.id, p.title, p.content));
            this.saveToLocalStorage();
        } catch (error) {
            console.error("Error obteniendo posts:", error);
        }
    }
}

export { Post, Blog };
