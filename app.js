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
    } else if (pathname === "/contacto") {
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
    }

    // Ruta para manejar el login (POST)
    else if (pathname === "/auth/login" && request.method === "POST") {
      let body = "";

      // Leer los datos del formulario
      request.on("data", chunk => {
        body += chunk;
      });

      request.on("end", async () => {
        const params = new URLSearchParams(body);
        const username = params.get("username");
        const password = params.get("password");

        try {
          // Buscar el usuario en la base de datos
          const user = await User.findOne({ username });

          if (!user) {
            response.writeHead(404, { "Content-Type": "text/plain" });
            return response.end("Usuario no encontrado");
          }

          // Validar la contraseña
          if (user.password !== password) {
            response.writeHead(401, { "Content-Type": "text/plain" });
            return response.end("Contraseña incorrecta");
          }

          // Respuesta en caso de éxito
          response.writeHead(200, { "Content-Type": "text/plain" });
          response.end("Inicio de sesión exitoso");

        } catch (err) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.end("Error en el servidor");
        }
      });
    }

    // Manejo de rutas no encontradas (404)
    else {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("404 NOT FOUND");
    }
  }

  // Iniciar el servidor
  http.createServer(onRequest).listen(8888, () => {
    console.log("Servidor iniciat a http://localhost:8888");
  });
}

exports.iniciar = iniciar;
