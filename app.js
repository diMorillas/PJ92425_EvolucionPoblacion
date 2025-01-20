/*
 * Servidor HTTP para el PJ9 de DAW2 en Jesuïtes el Clot
 */
var http = require("http");
var fs = require('fs');
const mongoose = require('mongoose');


function iniciar() {
  function onRequest(request, response) {
    let sortida;
    const baseURL = 'http://' + request.headers.host + '/';
    const reqUrl = new URL(request.url, baseURL);
    console.log("Petició per a  " + reqUrl.pathname + " rebuda.");
    const pathname = reqUrl.pathname;

    // Manejo de las rutas
    if (pathname == '/') {  // Ruta para la página principal (index.html)
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
    

    }
    else if(pathname == '/inicio'){
      fs.readFile('./public/inicio.html', function (err, sortida) {
        if (err) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.write("Error al cargar index.html");
        } else {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(sortida);
        }
        response.end();
      });

    } else if (pathname == '/quizz') {  // Ruta para el quiz (quizz.html)
      fs.readFile('./public/quizz.html', function (err, sortida) {
        if (err) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.write("Error al cargar quizz.html");
        } else {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(sortida);
        }
        response.end();
      });


    } else if (pathname == '/quizz.js') {  // Ruta para el archivo JavaScript del quiz
      fs.readFile('./public/quizz.js', function (err, sortida) {
        if (err) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.write("Error al cargar quizz.js");
        } else {
          response.writeHead(200, { "Content-Type": "text/javascript; charset=utf-8" });
          response.write(sortida);
        }
        response.end();
      });

    } else if (pathname == '/styles.css') {  // Ruta para el archivo CSS
      fs.readFile('./public/styles.css', function (err, sortida) {
        if (err) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.write("Error al cargar style.css");
        } else {
          response.writeHead(200, { "Content-Type": "text/css; charset=utf-8" });
          response.write(sortida);
        }
        response.end();
      });


    }else if (pathname == '/contacto') {  // Ruta para el quiz (quizz.html)
      fs.readFile('./public/contacto.html', function (err, sortida) {
        if (err) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.write("Error al cargar quizz.html");
        } else {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(sortida);
        }
        response.end();
      });
    }else if (pathname == '/graficas') {  // Ruta para el quiz (quizz.html)
    fs.readFile('./public/graficas.html', function (err, sortida) {
      if (err) {
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.write("Error al cargar quizz.html");
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(sortida);
      }
      response.end();
    });
  }else if (pathname == '/about') {  // Ruta para el quiz (quizz.html)
    fs.readFile('./public/sobrenosotros.html', function (err, sortida) {
      if (err) {
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.write("Error al cargar quizz.html");
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(sortida);
      }
      response.end();
    });
  }
  
  
    
    else {  // Si no se encuentra la ruta solicitada
      sortida = "404 NOT FOUND";
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.write(sortida);
      response.end();
    }
  }

  http.createServer(onRequest).listen(8888, () => {
    console.log("Servidor iniciat a http://localhost:8888");
  });
}

exports.iniciar = iniciar;
