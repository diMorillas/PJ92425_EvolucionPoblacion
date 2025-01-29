const http = require("http");
const fs = require("fs");
const path = require("path");
const { mongoose, User } = require("./db/mongoose");
const { URLSearchParams } = require("url");
const cookie = require("cookie");

async function createDefaultAdmin() {
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

async function createDefaultUser() {
  try {
    const existingUser = await User.findOne({ username: "user" });
    if (!existingUser) {
      const newUser = new User({ username: "user", password: "1234" });
      await newUser.save();
      console.log('Usuario por defecto "user" creado con éxito');
    } else {
      console.log('El usuario "user" ya existe');
    }
  } catch (error) {
    console.error("Error al crear el usuario por defecto:", error);
  }
}

createDefaultUser();
createDefaultAdmin();

let posts = [];

const checkAuthentication = (request) => {
  const cookies = cookie.parse(request.headers.cookie || "");
  return cookies.session_id;
};

function iniciar() {
  function onRequest(request, response) {
    const baseURL = `http://${request.headers.host}/`;
    const reqUrl = new URL(request.url, baseURL);
    const pathname = reqUrl.pathname;

    console.log(`Petición para ${pathname} recibida.`);

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

    const username = checkAuthentication(request);
    if (username) {
      if (pathname === "/") {
        response.writeHead(302, { Location: "/inicio" });
        return response.end();
      }
    } else if (!username && pathname !== "/" && pathname !== "/auth/login") {
      response.writeHead(302, { Location: "/" });
      return response.end();
    }

    if (pathname === "/") {
      serveFile("./public/index.html", "text/html");
    } else if (["/inicio", "/quizz", "/contacto", "/graficas", "/about", "/blogAdmin", "/blog"].includes(pathname)) {
      
      // Bloqueo de acceso a /blogAdmin para usuario "user"
      if (pathname === "/blogAdmin") {
        if (username && username.toLowerCase() === "user") {
          response.writeHead(403, { "Content-Type": "text/html" });
          return response.end(`
            <script>
              alert("Acceso denegado: No tienes permisos de administrador");
              window.location.href = "/inicio";
            </script>
          `);
        }
      }
      
      serveFile(`./public${pathname}.html`, "text/html");
      
    } else if (pathname === "/styles.css") {
      serveFile("./public/styles.css", "text/css");
    } else if (pathname === "/quizz.js" || pathname === "/apiConsumer.js" || pathname === "/userBlog.js" || pathname === "/graficas.js") {
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

          response.setHeader(
            "Set-Cookie",
            cookie.serialize("session_id", user.username, {
              path: "/",
              httpOnly: true
            })
          );
          
          response.writeHead(302, { Location: "/inicio" });
          response.end();
        } catch (err) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.end("Error en el servidor");
        }
      });
    } else if (pathname === "/auth/logout" && request.method === "GET") {
      response.setHeader(
        "Set-Cookie",
        cookie.serialize("session_id", "", {
          path: "/",
          expires: new Date(0),
        })
      );
      
      response.writeHead(302, { Location: "/" });
      response.end();
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
      const postIndex = posts.findIndex((p) => p.id === id); // Buscar índice del post por ID (string)

      if (postIndex !== -1) {
        posts.splice(postIndex, 1); 
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Post eliminado con éxito" }));
      } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Post no encontrado" }));
      }
    } else if (pathname.startsWith("/api/posts") && request.method === "PUT") {
      const id = parseInt(pathname.split("/")[3], 10);
      const id = parseInt(pathname.split("/")[3], 10);
      const postIndex = posts.findIndex((p) => p.id === id);
      
      let body = "";
      request.on("data", (chunk) => {
        body += chunk.toString();
      });
      
      request.on("end", () => {
        const updatedPost = JSON.parse(body);
        
        if (postIndex !== -1) {
          posts[postIndex] = { ...posts[postIndex], ...updatedPost };
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ message: "Post actualizado con éxito" }));
        } else {
          response.writeHead(404, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ message: "Post no encontrado" }));
        }
      });
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