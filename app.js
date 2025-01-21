/*
 * Servidor HTTP para el PJ9 de DAW2 en Jesuïtes el Clot
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

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

    // Route handling
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
    } else {
      // Handle 404 Not Found
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("404 NOT FOUND");
    }
  }

  // Start the server
  http.createServer(onRequest).listen(8888, () => {
    console.log("Servidor iniciat a http://localhost:8888");
  });
}

exports.iniciar = iniciar;
