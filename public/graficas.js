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
//CODIGO DE EJEMPLO NO DEFINITIVO SOLO DE EJEMPLO
const canvasProgresion = document.getElementById('canvasProgresion').getContext('2d');

// Limpiar el canvas y definir el tamaño
canvasProgresion.clearRect(0, 0, canvasProgresion.canvas.width, canvasProgresion.canvas.height);
canvasProgresion.canvas.width = 500; // Ancho del gráfico
canvasProgresion.canvas.height = 300; // Alto del gráfico

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
const yScale = 0.02; // Escala de población (para ajustar la altura del gráfico)

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








