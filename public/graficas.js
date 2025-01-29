// funcion para la gestion de los graficos con botones
function mostrarGrafico(id) {
    // Seleccionar todos los contenedores con gráficos
    const contenedores = document.querySelectorAll('.grafico-container');
    contenedores.forEach(contenedor => {
        if (contenedor.id === id) {
            contenedor.style.display = 'block'; 
        } else {
            contenedor.style.display = 'none';
        }
    });
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



//Grafico de Barras--Evolución de la población mundial
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
canvasProgresion.canvas.width = 500; // Ancho del gráfico
canvasProgresion.canvas.height = 400; // Alto del gráfico

// Establecer los datos
const data = [
    { year: 2024, population: 8000 },
    { year: 2030, population: 8500 },
    { year: 2050, population: 9500 },
    { year: 2080, population: 10400 }
];

// Escalado manual de los valores
const xStart = 50; // Punto inicial en X
const yStart = 250; // Punto base en Y
const xGap = 100; // Espacio entre puntos en X
const yScale = 0.081; // Escala de población (para ajustar la altura del gráfico)

// Dibujar el eje X y el eje Y
canvasProgresion.beginPath();
canvasProgresion.moveTo(xStart, yStart);
canvasProgresion.lineTo(xStart + 4 * xGap, yStart); // Eje X
canvasProgresion.moveTo(xStart, yStart);
canvasProgresion.lineTo(xStart, 50); // Eje Y
canvasProgresion.strokeStyle = "#000000";
canvasProgresion.lineWidth = 2;
canvasProgresion.stroke();

// Etiquetas del eje X (años)
canvasProgresion.font = "14px Arial";
canvasProgresion.fillStyle = "#000000";
data.forEach((point, index) => {
    canvasProgresion.fillText(point.year, xStart + index * xGap - 15, yStart + 20);
});

// Etiquetas del eje Y (población)
const yLabels = [8000, 8500, 9000, 9500, 10000, 10400];
yLabels.forEach((label, index) => {
    const yPos = yStart - (label - 8000) * yScale;
    canvasProgresion.fillText(label, xStart - 40, yPos + 5);
});

// Dibujar la línea de progresión
canvasProgresion.beginPath();
canvasProgresion.moveTo(xStart, yStart - (data[0].population - 8000) * yScale);
data.forEach((point, index) => {
    const xPos = xStart + index * xGap;
    const yPos = yStart - (point.population - 8000) * yScale;
    canvasProgresion.lineTo(xPos, yPos);
});
// Estilo de la línea de progresión
canvasProgresion.strokeStyle = "#FF5733";
canvasProgresion.lineWidth = 3;
canvasProgresion.stroke();

// Dibujar puntos en la línea
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

// Colores para las secciones del gráfico
const coloresPastel = [
    "#FF5733", "#33FF57", "#5733FF", "#FFC300", 
    "#33FFF0", "#FF33E0", "#8E44AD", "#3498DB", 
    "#F1C40F", "#E67E22"
];

// Configuración del canvas
const canvasPastel = document.getElementById("canvasPastel");
const ctxPastel = canvasPastel.getContext("2d");
const centroX = canvasPastel.width / 2;
const centroY = canvasPastel.height / 2;
const radio = 150;

// Calcular el total original y el factor de escala
const totalOriginal = datosPastel.reduce((sum, dato) => sum + dato.porcentaje, 0);
const factorEscala = 100 / totalOriginal;

// Ajustar los porcentajes para que sumen 100%
const datosEscalados = datosPastel.map(dato => ({
    ...dato,
    porcentaje: dato.porcentaje * factorEscala,
}));

// Dibujar cada segmento del gráfico
let anguloInicio = 0;
datosEscalados.forEach((dato, index) => {
    const anguloFin = anguloInicio + (dato.porcentaje / 100) * 2 * Math.PI;

    // Dibujar el segmento
    ctxPastel.beginPath();
    ctxPastel.moveTo(centroX, centroY);
    ctxPastel.arc(centroX, centroY, radio, anguloInicio, anguloFin);
    ctxPastel.closePath();
    ctxPastel.fillStyle = coloresPastel[index];
    ctxPastel.fill();

    // Calcular la posición de la etiqueta
    const anguloMedio = (anguloInicio + anguloFin) / 2;
    const etiquetaX = centroX + (radio + 20) * Math.cos(anguloMedio);
    const etiquetaY = centroY + (radio + 20) * Math.sin(anguloMedio);

    // Dibujar la etiqueta
    ctxPastel.fillStyle = "#000";
    ctxPastel.font = "14px Arial";
    ctxPastel.textAlign = "center";
    ctxPastel.fillText(dato.pais, etiquetaX, etiquetaY);

    anguloInicio = anguloFin;
});
