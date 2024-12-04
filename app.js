/*
 * Servidor HTTP para el PJ9 de DAW2 en Jesuïtes el Clot
 */
var http = require("http");
var url = require("url");
var fs = require('fs');

function iniciar() {
  function onRequest(request, response) {
    let sortida;
    const baseURL = 'http://' + request.headers.host + '/';  // Arreglado el baseURL
    const reqUrl = new URL(request.url, baseURL);  // Sin la "A"
    console.log("Petició per a  " + reqUrl.pathname + " rebuda.");
    const pathname = reqUrl.pathname;

    // Ruta para la página principal (index.html)
    if (pathname == '/') {
      fs.readFile('./public/index.html', function (err, sortida) {
        if (err) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.write("Error al cargar index.html");
        } else {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(sortida);
        }
        response.end();
      });

    } else if (pathname == '/quizz.js') {  // Ruta para el archivo JavaScript
      fs.readFile('./public/quizz.js', function (err, sortida) {
        if (err) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.write("Error al cargar index.js");
        } else {
          response.writeHead(200, { "Content-Type": "text/javascript; charset=utf-8" });
          response.write(sortida);
        }
        response.end();
      });

    } else if (pathname == '/style.css') {  // Ruta para el archivo CSS
      fs.readFile('./public/style.css', function (err, sortida) {
        if (err) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.write("Error al cargar style.css");
        } else {
          response.writeHead(200, { "Content-Type": "text/css; charset=utf-8" });
          response.write(sortida);
        }
        response.end();
      });

    } else {  // Si no se encuentra la ruta solicitada
      sortida = "404 NOT FOUND";
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.write(sortida);
      response.end();
    }
  }

  /**Repetir este proceso para cada ruta */

  http.createServer(onRequest).listen(8888, () => {
    console.log("Servidor iniciat a http://localhost:8888");
  });
}

exports.iniciar = iniciar;
