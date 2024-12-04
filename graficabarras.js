
const canvas = document.getElementById('GrafBarras');
const ctx = canvas.getContext('2d');

// Datos del gráfico
const datos = [30, 50, 70, 90, 2000];
const etiquetas = ['Europa', 'Asia', 'Oceania', 'América', 'África'];
const colores = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD'];

// Dimensiones del gráfico
const anchoBarra = 40;
const espacioEntreBarras = 20;
const ejeX = 50;
const ejeY = canvas.height - 30;

// Dibujar el gráfico
datos.forEach((valor, index) => {
    const altura = valor;
    const x = ejeX + (anchoBarra + espacioEntreBarras) * index;
    const y = ejeY - altura;

    // Dibujar la barra
    ctx.fillStyle = colores[index];
    ctx.fillRect(x, y, anchoBarra, altura);

    // Etiquetas debajo de las barras
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText(etiquetas[index], x + anchoBarra / 2, ejeY + 20);
});

// Dibujar los ejes
ctx.beginPath();
ctx.moveTo(ejeX - 10, ejeY);
ctx.lineTo(canvas.width - 10, ejeY); // Eje X
ctx.moveTo(ejeX, 10);
ctx.lineTo(ejeX, ejeY + 10); // Eje Y
ctx.stroke();
