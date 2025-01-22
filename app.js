const http = require("http");
const fs = require("fs");
const path = require("path");
const { mongoose, User } = require("./db/mongoose");  // Importar la conexión y el modelo
const { URLSearchParams } = require("url");

// Crear un usuario por defecto si no existe
async function createDefaultUser() {
  try {
    const existingUser = await User.findOne({ username: 'admin' });
    if (!existingUser) {
      const newUser = new User({ username: 'admin', password: '1234' });
      await newUser.save();
      console.log('Usuario por defecto "admin" creado con éxito');
    } else {
      console.log('El usuario "admin" ya existe');
    }
  } catch (error) {
    console.error('Error al crear el usuario por defecto:', error);
  }
}

createDefaultUser();

// Función para iniciar el servidor

let posts = [
  { id: 1, title: "primer post", content: "Primer post" },
  { id: 2, title: "segundo post", content: "Segundo post" },
];

function iniciar() {
  function onRequest(request, response) {
    const baseURL = `http://${request.headers.host}/`;
    const reqUrl = new URL(request.url, baseURL);
    const pathname = reqUrl.pathname;

    console.log(`Petició per a ${pathname} rebuda.`);

    // Define MIME types for different file extensions
    const mimeTypes = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "text/javascript",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".txt": "text/plain",
    };

    // Helper function to serve files
    const serveFile = (filePath, contentType) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          response.writeHead(404, { "Content-Type": "text/plain" });
          response.end("404 Not Found");
        } else {
          response.writeHead(200, { "Content-Type": contentType });
          response.end(data);
        }
      });
    };

    // Ruta para servir los archivos estáticos
    if (pathname === "/") {
      serveFile("./public/index.html", "text/html");
    } else if (pathname === "/inicio") {
      serveFile("./public/inicio.html", "text/html");
    } else if (pathname === "/quizz") {
      serveFile("./public/quizz.html", "text/html");
    } else if (pathname === "/quizz.js") {
      serveFile("./public/quizz.js", "text/javascript");
    } else if (pathname === "/styles.css") {
      serveFile("./public/styles.css", "text/css");
    }else if (pathname === "/styles.css") {
      serveFile("./public/style.css", "text/css");
    }else if (pathname === "/contacto") {
      serveFile("./public/contacto.html", "text/html");
    } else if (pathname === "/graficas") {
      serveFile("./public/graficas.html", "text/html");
    } else if (pathname === "/about") {
      serveFile("./public/sobrenosotros.html", "text/html");
    } else if (pathname.startsWith("/img/")) {
      // Serve image files dynamically
      const extname = path.extname(pathname);
      const contentType = mimeTypes[extname] || "application/octet-stream";
      serveFile(`./public${pathname}`, contentType);
    } else if(pathname === "/api/posts" && request.method === "GET") {
      // Devolver todos los posts
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(posts));
    } else if (pathname === "/api/posts" && request.method === "POST") {
      // Añadir post
      let body = "";
      request.on("data", (chunk) => {
        body += chunk.toString();
      });
      request.on("end", () => {
        let newPost = JSON.parse(body);
        newPost.id = posts.length ? posts[posts.length - 1].id + 1 : 1; // id autoincrementado
        posts.push(newPost);

        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Post created successfully", post: newPost }));
      });
    }else if(pathname== "/blog"){
      serveFile("./public/blog.html", "text/html");

    }else if(pathname == "/apiConsumer.js"){
      serveFile("./public/apiConsumer.js","text/javascript");

    }else if(pathname.startsWith("/api/posts/") && request.method === "GET") {
      // Get a specific post by ID
      const id = parseInt(pathname.split("/")[3], 10);
      const post = posts.find((p) => p.id === id);

      if (post) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(post));
      } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Post not found" }));
      }
    }else if (pathname.startsWith("/api/posts/") && request.method === "GET") {
      // Get a specific post by ID
      const id = parseInt(pathname.split("/")[3], 10);
      const post = posts.find((p) => p.id === id);
      if (post) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(post));
      } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Post not found" }));
      }
    } else if (pathname.startsWith("/api/posts/") && request.method === "DELETE") {
      // Delete a post by ID
      const id = parseInt(pathname.split("/")[3], 10);
      const postIndex = posts.findIndex((p) => p.id === id);

      if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Post deleted successfully" }));
      } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Post not found" }));
      }
    }else {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("404 NOT FOUND");
    }
  }

  http.createServer(onRequest).listen(8888, () => {
    console.log("Servidor iniciat a http://localhost:8888");
  });
}

exports.iniciar = iniciar;
