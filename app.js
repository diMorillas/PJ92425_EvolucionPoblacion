/*
 * Servidor HTTP para el PJ9 de DAW2 en Jesuïtes el Clot
 */
var http = require("http");
var url = require("url");
var fs = require('fs');

function iniciar() {
	function onRequest(request, response) {
		let sortida;
        const baseURL = request.protocol + '://' + request.headers.host + '/';
        const reqUrl = new URL(request.url, baseURL);
        console.log("Petició per a  " + reqUrl.pathname + " rebuda.");
        const pathname = reqUrl.pathname;

        if (pathname == '/') {
            fs.readFile('./index.html', function(err, sortida) {
                response.write(sortida);
                response.end();
            });
        
        } else if (pathname == './index.js') { // Cambiado './M01_ajax.js' a '/M01_ajax.js'
            fs.readFile('./index.js', function(err, sortida) {
                response.writeHead(200, {
                    "Content-Type": "text/javascript; charset=utf-8"
                });
                response.write(sortida);
                response.end();
            });
        
        } else if (pathname == '/style.css') { // Cambiado './M01_styleAjax.css' a '/M01_styleAjax.css'
            fs.readFile('./style.css', function(err, sortida) {
                response.write(sortida);
                response.end();
            });
        
        } else {
            sortida = "404 NOT FOUND";
            response.write(sortida);
            response.end();
        }
        
	}
	http.createServer(onRequest).listen(8888);
	console.log("Servidor iniciat.");
}

exports.iniciar = iniciar;
