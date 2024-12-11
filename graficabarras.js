const canvas = document.getElementById('GrafBarras');
        const ctx = canvas.getContext('2d');

        // Datos del gráfico
        const datos = [50, 200, 300, 500, 700, 1200,3000,7000]; // Población en millones
        const etiquetas = ['2000 a.C', '100 a.C', '711', '1492', '1789', '1850', '1960', '2010']; // Años
        const colores = ['#3357FF', '#FF5733', '#33FF57', '#FFC300', '#FF33A8', '#8E44AD', '#1ABC9C', '#E67E22'];

        // Dimensiones del gráfico
        const anchoBarra = 40;
        const espacioEntreBarras =2.5;
        const ejeX = 50;
        const ejeY = canvas.height - 50;

        // Escala para ajustar la altura de las barras
        const maxValor = Math.max(...datos);
        const escala = (canvas.height - 100) / maxValor;

        // Dibujar el gráfico
        datos.forEach((valor, index) => {
            const altura = valor * escala; // Ajustar la altura según la escala
            const x = ejeX + (anchoBarra + espacioEntreBarras) * index;
            const y = ejeY - altura;

            // Dibujar la barra
            ctx.fillStyle = colores[index];
            ctx.fillRect(x, y, anchoBarra, altura);

            //Texto debajo de las barras
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.fillText(etiquetas[index], x + anchoBarra / 2, ejeY + 20);

        
        });

        // Dibujar los ejes
        ctx.beginPath();
        ctx.moveTo(ejeX - 10, ejeY);
        ctx.lineTo(canvas.width -10, ejeY); // Eje X
        ctx.moveTo(ejeX, 0);
        ctx.lineTo(ejeX, ejeY + 10); // Eje Y
        ctx.stroke();

        // Etiquetas del eje Y
        const intervalos = [50, 200, 300, 500, 700, 1200,3000,7000];
        intervalos.forEach(valor => {
            const y = ejeY - valor * escala;
            ctx.fillStyle = '#000';
            ctx.textAlign = 'right';
            ctx.beginPath();
            ctx.moveTo(ejeX - 5, y);
        });
