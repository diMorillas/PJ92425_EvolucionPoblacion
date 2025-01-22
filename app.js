const http = require("http");
const fs = require("fs");
const path = require("path");
const { mongoose, User } = require("./db/mongoose");
const { URLSearchParams } = require("url");

// Crear un usuario por defecto si no existe
async function createDefaultUser() {
  try {
    const existingUser = await User.findOne({ username: "admin" });
    if (!existingUser) {
      const newUser = new User({ username: "admin", password: "1234" });
      await newUser.save();
      console.log('Usuario por defecto "admin" creado con éxito');
    } else {
      console.log('El usuario "admin" ya existe');
    }
  } catch (error) {
    console.error("Error al crear el usuario por defecto:", error);
  }
}

createDefaultUser();

// Posts simulados
let posts = [
  { id: 1, title: "Primer post", content: "Contenido del primer post" },
  { id: 2, title: "Segundo post", content: "Contenido del segundo post" },
];

function iniciar() {
  function onRequest(request, response) {
    const baseURL = `http://${request.headers.host}/`;
    const reqUrl = new URL(request.url, baseURL);
    const pathname = reqUrl.pathname;

    console.log(`Petición para ${pathname} recibida.`);

    // Tipos MIME
    const mimeTypes = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".txt": "text/plain",
    };

    // Función para servir archivos estáticos
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

    // Manejo de rutas
    if (pathname === "/") {
      serveFile("./public/index.html", "text/html");
    } else if (["/inicio", "/quizz", "/contacto", "/graficas", "/about", "/blogAdmin"].includes(pathname)) {
      serveFile(`./public${pathname}.html`, "text/html");
    } else if (pathname === "/styles.css") {
      serveFile("./public/styles.css", "text/css");
    } else if (pathname === "/quizz.js" || pathname === "/apiConsumer.js") {
      serveFile(`./public${pathname}`, "application/javascript");
    } else if (pathname.startsWith("/img/")) {
      const extname = path.extname(pathname);
      const contentType = mimeTypes[extname] || "application/octet-stream";
      serveFile(`./public${pathname}`, contentType);
    } else if (pathname === "/auth/login" && request.method === "POST") {
      let body = "";
      request.on("data", (chunk) => {
        body += chunk;
      });
      request.on("end", async () => {
        const params = new URLSearchParams(body);
        const username = params.get("username");
        const password = params.get("password");

        try {
          const user = await User.findOne({ username });

          if (!user) {
            response.writeHead(200, { "Content-Type": "text/html" });
            return response.end(`
              <script>
                alert("Usuario no encontrado");
                window.location.href = "/";
              </script>
            `);
          }
          
          if (user.password !== password) {
            response.writeHead(200, { "Content-Type": "text/html" });
            return response.end(`
              <script>
                alert("Contraseña incorrecta");
                window.location.href = "/";
              </script>
            `);
          }
          
          response.writeHead(302, { Location: "/inicio" });
          response.end();
        } catch (err) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.end("Error en el servidor");
        }
      });
    } else if (pathname === "/api/posts" && request.method === "GET") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(posts));
    } else if (pathname === "/api/posts" && request.method === "POST") {
      let body = "";
      request.on("data", (chunk) => {
        body += chunk.toString();
      });
      request.on("end", () => {
        const newPost = JSON.parse(body);
        newPost.id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        posts.push(newPost);

        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Post creado con éxito", post: newPost }));
      });
    } else if (pathname.startsWith("/api/posts/") && request.method === "GET") {
      const id = parseInt(pathname.split("/")[3], 10);
      const post = posts.find((p) => p.id === id);

      if (post) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(post));
      } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Post no encontrado" }));
      }
    } else if (pathname.startsWith("/api/posts/") && request.method === "DELETE") {
      const id = parseInt(pathname.split("/")[3], 10);
      const postIndex = posts.findIndex((p) => p.id === id);

      if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Post eliminado con éxito" }));
      } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Post no encontrado" }));
      }
    } else {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("404 NOT FOUND");
    }
  }

  http.createServer(onRequest).listen(8888, () => {
    console.log("Servidor iniciado en http://localhost:8888");
  });
}

exports.iniciar = iniciar;
