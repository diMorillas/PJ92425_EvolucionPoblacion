
function mostrarGrafico(id) {
    const contenedores = document.querySelectorAll('.grafico-container');
    contenedores.forEach(contenedor => {
        contenedor.style.display = (contenedor.id === id) ? 'block' : 'none';
    });

    if (id === "mapa") {
        const canvas = document.getElementById("mapa");
        if (canvas) {
            canvas.style.display = "block";
        }
    }
}

function toggleTexto(id) {
    const texto = document.getElementById(id);
    const container = document.querySelector('.grafico-texto-contenedor');

    if (texto.style.display === 'none' || texto.style.display === '') {
        texto.style.display = 'block';
        container.style.display = 'flex'; // Asegura que se muestren en línea
    } else {
        texto.style.display = 'none';
        container.style.display = 'block'; // Vuelve a mostrar solo el gráfico
    }
}




const canvasBarras = document.getElementById('canvasBarras');
        const ctx = canvasBarras.getContext('2d');

        const datos = [50, 200, 300, 500, 700, 1200,3000,7000]; 
        const etiquetas = ['2000 a.C', '100 a.C', '711', '1492', '1789', '1850', '1960', '2010']; 
        const colores = ['#3357FF', '#3357FF','#3357FF', '#3357FF', '#3357FF','#3357FF','#3357FF','#3357FF'];

        const anchoBarra = 40;
        const espacioEntreBarras =2.5;
        const ejeX = 50;
        const ejeY = canvasBarras.height - 50;

        const maxValor = Math.max(...datos);
        const escala = (canvasBarras.height - 100) / maxValor;

        datos.forEach((valor, index) => {
            const altura = valor * escala; 
            const x = ejeX + (anchoBarra + espacioEntreBarras) * index;
            const y = ejeY - altura;

            ctx.fillStyle = colores[index];
            ctx.fillRect(x, y, anchoBarra, altura);

      
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.fillText(etiquetas[index], x + anchoBarra / 2, ejeY + 20);

            ctx.fillStyle = '#000'; 
            ctx.textAlign = 'center'; 
            ctx.fillText(`${valor}M`, x + anchoBarra / 2, y - 10);//muestra el numero de millones en cada barra

        
        });

        ctx.beginPath();
        ctx.moveTo(ejeX - 10, ejeY);
        ctx.lineTo(canvasBarras.width -10, ejeY); 
        ctx.moveTo(ejeX, 0);
        ctx.lineTo(ejeX, ejeY + 10); 
        ctx.stroke();

   

//Grafico de progresión--Proyeccion de poblacion 2024-2080
const canvasProgresion = document.getElementById('canvasProgresion').getContext('2d');

// Limpiar el canvas y definir el tamaño
canvasProgresion.clearRect(0, 0, canvasProgresion.canvas.width, canvasProgresion.canvas.height);
canvasProgresion.canvas.width = 500; 
canvasProgresion.canvas.height = 400; 


const data = [
    { year: 2024, population: 8000 },
    { year: 2030, population: 8500 },
    { year: 2050, population: 9500 },
    { year: 2080, population: 10400 }
];


const xStart = 50; 
const yStart = 250; 
const xGap = 100; 
const yScale = 0.081; 


canvasProgresion.beginPath();
canvasProgresion.moveTo(xStart, yStart);
canvasProgresion.lineTo(xStart + 4 * xGap, yStart); 
canvasProgresion.moveTo(xStart, yStart);
canvasProgresion.lineTo(xStart, 50); 
canvasProgresion.strokeStyle = "#000000";
canvasProgresion.lineWidth = 2;
canvasProgresion.stroke();


canvasProgresion.font = "14px Arial";
canvasProgresion.fillStyle = "#000000";
data.forEach((point, index) => {
    canvasProgresion.fillText(point.year, xStart + index * xGap - 15, yStart + 20);
});


const yLabels = [8000, 8500, 9000, 9500, 10000, 10400];
yLabels.forEach((label, index) => {
    const yPos = yStart - (label - 8000) * yScale;
    canvasProgresion.fillText(label, xStart - 40, yPos + 5);
});


canvasProgresion.beginPath();
canvasProgresion.moveTo(xStart, yStart - (data[0].population - 8000) * yScale);
data.forEach((point, index) => {
    const xPos = xStart + index * xGap;
    const yPos = yStart - (point.population - 8000) * yScale;
    canvasProgresion.lineTo(xPos, yPos);
});

canvasProgresion.strokeStyle = "#FF5733";
canvasProgresion.lineWidth = 3;
canvasProgresion.stroke();

canvasProgresion.fillStyle = "#FF5733";
data.forEach((point, index) => {
    const xPos = xStart + index * xGap;
    const yPos = yStart - (point.population - 8000) * yScale;
    canvasProgresion.beginPath();
    canvasProgresion.arc(xPos, yPos, 5, 0, 2 * Math.PI);
    canvasProgresion.fill();
})


//Grafico de pastel (los 10 paises mas poblados del mundo)
// Datos para el gráfico de pastel
const datosPastel = [
    { pais: "India", porcentaje: 18.29 },
    { pais: "China", porcentaje: 17.87 },
    { pais: "EEUU", porcentaje: 4.27 },
    { pais: "Indonesia", porcentaje: 3.57 },
    { pais: "Pakistán", porcentaje: 2.99 },
    { pais: "Nigeria", porcentaje: 2.89 },
    { pais: "Brasil", porcentaje: 2.7 },
    { pais: "Bangladesh", porcentaje: 2.19 },
    { pais: "Rusia", porcentaje: 1.85 },
    { pais: "México", porcentaje: 1.68 },
];


const coloresPastel = [
    "#FF5733", "#33FF57", "#5733FF", "#FFC300", 
    "#33FFF0", "#FF33E0", "#8E44AD", "#3498DB", 
    "#F1C40F", "#E67E22"
];


const canvasPastel = document.getElementById("canvasPastel");
const ctxPastel = canvasPastel.getContext("2d");
const centroX = canvasPastel.width / 2;
const centroY = canvasPastel.height / 2;
const radio = 150;

const totalOriginal = datosPastel.reduce((sum, dato) => sum + dato.porcentaje, 0);
const factorEscala = 100 / totalOriginal;

const datosEscalados = datosPastel.map(dato => ({
    ...dato,
    porcentaje: dato.porcentaje * factorEscala,
}));


let anguloInicio = 0;
datosEscalados.forEach((dato, index) => {
    const anguloFin = anguloInicio + (dato.porcentaje / 100) * 2 * Math.PI;


    ctxPastel.beginPath();
    ctxPastel.moveTo(centroX, centroY);
    ctxPastel.arc(centroX, centroY, radio, anguloInicio, anguloFin);
    ctxPastel.closePath();
    ctxPastel.fillStyle = coloresPastel[index];
    ctxPastel.fill();

    const anguloMedio = (anguloInicio + anguloFin) / 2;
    const etiquetaX = centroX + (radio + 20) * Math.cos(anguloMedio);
    const etiquetaY = centroY + (radio + 20) * Math.sin(anguloMedio);


    ctxPastel.fillStyle = "#000";
    ctxPastel.font = "14px Arial";
    ctxPastel.textAlign = "center";
    ctxPastel.fillText(dato.pais, etiquetaX, etiquetaY);

    anguloInicio = anguloFin;



    //PARTE 4: Mapa con países y sus densidades de población a nivel mundial y actual
const ctx = canvas.getContext("2d");
const mapa = document.getElementById("mapa");
const canvasMapa = document.getElementById("canvas")

const imagenFondo = new Image();
imagenFondo.src = './img/mapa.png';

const paises = [
  { nombre: "España", center: [700, 200], radio: 10, bandera: './img/españa.png', poblacion: 47, descripcion: "Población de España",  densidad: 93},
  { nombre: "Francia", center: [720, 170], radio: 10, bandera: "./img/francia.png", poblacion: 67, descripcion: "Población de Francia", densidad: 120}, 
  { nombre: "Italia", center: [755, 185], radio: 10, bandera: "./img/italia.png", poblacion: 60, descripcion: "Población de Italia", densidad: 200},
  { nombre: "Alemania", center: [750, 150], radio: 10, bandera: "./img/alemania.png", poblacion: 83, descripcion: "Población de Alemania", densidad: 230},
  { nombre: "Reino Unido", center: [705, 130], radio: 10, bandera: "./img/reinounido.png", poblacion: 66, descripcion: "Población de Reino Unido", densidad: 270},
  { nombre: "Estados Unidos", center: [320, 200], radio: 10, bandera: "./img/EstadosUnidos.png", poblacion: 331, descripcion: "Población de Estados Unidos", densidad: 35},
  { nombre: "Mexico", center: [300, 290], radio: 10, bandera: "./img/mexico.png", poblacion: 128, descripcion: "Población de México", densidad: 66},
  { nombre: "Brazil", center: [500, 450], radio: 10, bandera: "./img/brazil.png", poblacion: 212, descripcion: "Población de Brasil", densidad: 25},
  { nombre: "Argentina", center: [460, 570], radio: 10, bandera: "./img/argentina.png", poblacion: 44, descripcion: "Población de Argentina", densidad: 16},
  { nombre: "China", center: [1100, 220], radio: 10, bandera: "./img/china.png", poblacion: 1393, descripcion: "Población de China", densidad: 145},
  { nombre: "India", center: [1030, 300], radio: 10, bandera: "./img/india.png", poblacion: 1380, descripcion: "Población de India", densidad: 420},
  { nombre: "Australia", center: [1250, 520], radio: 10, bandera: "./img/australia.png", poblacion: 25, descripcion: "Población de Australia", densidad: 3},
  { nombre: "Japon", center: [1250, 210], radio: 10, bandera: "./img/japon.png", poblacion: 126, descripcion: "Población de Japón", densidad: 334},
  { nombre: "Canadá", center: [350, 100], radio: 10, bandera: "./img/canada.png", poblacion: 37, descripcion: "Población de Canadá", densidad: 4},
  { nombre: "Sudáfrica", center: [800, 550], radio: 10, bandera: "./img/sudafrica.png", poblacion: 59, descripcion: "Población de Sudáfrica", densidad: 49},
  { nombre: "Rusia", center: [1000, 100], radio: 10, bandera: "./img/rusia.png", poblacion: 144, descripcion: "Población de Rusia", densidad: 8},
  { nombre: "Egipto", center: [825, 270], radio: 10, bandera: "./img/egipto.png", poblacion: 104, descripcion: "Población de Egipto", densidad: 100},
  { nombre: "Pakistán", center: [990, 250], radio: 10, bandera: "./img/pakistan.png", poblacion: 220, descripcion: "Población de Pakistán", densidad: 300},
  { nombre: "Indonesia", center: [1200, 420], radio: 10, bandera: "./img/indonesia.png", poblacion: 273, descripcion: "Población de Indonesia", densidad: 151},
  { nombre: "Nigeria", center: [740, 350], radio: 10, bandera: "./img/nigeria.png", poblacion: 206, descripcion: "Población de Nigeria", densidad: 210},
  { nombre: "Bangladesh", center: [1075, 280], radio: 10, bandera: "./img/bangladesh.png", poblacion: 165, descripcion: "Población de Bangladesh", densidad: 1265},
  { nombre: "Israel", center: [850, 245], radio: 10, bandera: "./img/Israel.png", poblacion: 9, descripcion: "Población de Israel", densidad: 415},
  { nombre: "Singapur", center: [1140, 390], radio: 10, bandera: "./img/singapur.png", poblacion: 5.5, descripcion: "Población de Singapur", densidad: 8358},
  { nombre: "Vietnam", center: [1160, 330], radio: 10, bandera: "./img/vietnam.png", poblacion: 97, descripcion: "Población de Vietnam", densidad: 315},
  { nombre: "Filipinas", center: [1220, 340], radio: 10, bandera: "./img/filipinas.png", poblacion: 109, descripcion: "Población de Filipinas", densidad: 368},
  { nombre: "Países Bajos", center: [730, 140], radio: 10, bandera: "./img/paisesbajos.png", poblacion: 17, descripcion: "Población de Países Bajos", densidad: 521},
  { nombre: "Taiwán", center: [1200, 280], radio: 10, bandera: "./img/taiwan.png", poblacion: 24, descripcion: "Población de Taiwán", densidad: 672},
  { nombre: "Corea del Sur", center: [1210, 220], radio: 10, bandera: "./img/coreasur.png", poblacion: 52, descripcion: "Población de Corea del Sur", densidad: 527},
  { nombre: "Corea del Norte", center: [1200, 200], radio: 10, bandera: "./img/coreanorte.png", poblacion: 25, descripcion: "Población de Corea del Norte", densidad: 214}
];

imagenFondo.onload = function() {
  ctx.drawImage(imagenFondo, 0, 0, canvas.width, canvas.height);
  dibujarBanderas();
}


function dibujarBanderas() {
  ctx.font = "20px Arial";
  paises.forEach(pais => {
    ctx.fillText(pais.bandera, pais.center[0] - 10, pais.center[1] + 10);
  });
}

function dibujarBanderas() {
  paises.forEach(pais => {
    ctx.beginPath();
    ctx.arc(pais.center[0], pais.center[1], pais.radio, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(0, 150, 0, 0.3)";
    ctx.fill();
    ctx.stroke();

    if (pais.bandera) {
      const img = new Image();
      img.src = pais.bandera;
      img.onload = function() {
        ctx.drawImage(img, pais.center[0] - 10, pais.center[1] - 10, 20, 15);
      };
}});
}

canvas.addEventListener("mousemove", function(event) {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  let found = false;
  paises.forEach(pais => {
    const dx = mouseX - pais.center[0];
    const dy = mouseY - pais.center[1];
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= pais.radio) {
      mapa.style.display = "block";
      mapa.style.left = `${mouseX + 10}px`;
      mapa.style.top = `${mouseY + 15}px`;

      if (pais.densidad >= 200) {
        mapa.innerHTML = `
        <img src="${pais.bandera}" style="width: 20px; height: 15px; margin-right: 5px;" />
        ${pais.nombre}<br>
        Población: ${pais.poblacion} millones<br>
        Densidad: Alta (${pais.densidad} habitantes por km²)<br>
        Este país tiene una alta concentración de población.`;
      } else {
        mapa.innerHTML = `
        <img src="${pais.bandera}" style="width: 20px; height: 15px; margin-right: 5px;" />
        ${pais.nombre}<br>
        Población: ${pais.poblacion} millones<br>Densidad: ${pais.densidad} habitantes por km²`;
      }

      found = true;
    }
  });

  if (!found) {
    mapa.style.display = "none";
  }
});
});
