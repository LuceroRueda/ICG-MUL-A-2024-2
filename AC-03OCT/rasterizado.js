let puntosGenerados = []; // Variable global para almacenar los puntos generados
let centroideGenerado = []; // Variable global para almacenar el centroide

// Función para generar puntos aleatorios
function generarPuntosAleatorios(minPuntos, maxPuntos) {
    const numPuntos = Math.floor(Math.random() * (maxPuntos - minPuntos + 1)) + minPuntos;
    const puntos = [];
    for (let i = 0; i < numPuntos; i++) {
        const x = Math.floor(Math.random() * 400) + 50;  // Generar X entre 50 y 450
        const y = Math.floor(Math.random() * 400) + 50;  // Generar Y entre 50 y 450
        puntos.push([x, y]);
    }
    return puntos;
}

// Función para calcular el centroide
function calcularCentroide(puntos) {
    const n = puntos.length;
    const sumaX = puntos.reduce((acc, p) => acc + p[0], 0);
    const sumaY = puntos.reduce((acc, p) => acc + p[1], 0);
    return [Math.floor(sumaX / n), Math.floor(sumaY / n)];
}

// Función para calcular el ángulo respecto al centroide
function calcularAngulo(centroide, punto) {
    return Math.atan2(punto[1] - centroide[1], punto[0] - centroide[0]);
}

// Función para ordenar los puntos por ángulo respecto al centroide
function ordenarPuntosPorAngulo(puntos, centroide) {
    return puntos.slice().sort((a, b) => calcularAngulo(centroide, a) - calcularAngulo(centroide, b));
}

// Algoritmo de Bresenham para líneas
function algoritmoBresenham(x1, y1, x2, y2, ctx, color) {
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let sx = (x1 < x2) ? 1 : -1;
    let sy = (y1 < y2) ? 1 : -1;
    let err = dx - dy;

    ctx.fillStyle = color;

    while (true) {
        ctx.fillRect(x1, y1, 1, 1); // Dibuja un píxel
        if (x1 === x2 && y1 === y2) break;
        let e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
    }
}

// Función para verificar si la figura es convexa
function esFiguraConvexa(puntos) {
    const n = puntos.length;
    let signoInicial = null;
    for (let i = 0; i < n; i++) {
        const o = puntos[i];
        const a = puntos[(i + 1) % n];
        const b = puntos[(i + 2) % n];
        const cruzado = (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
        if (cruzado !== 0) {
            const signo = cruzado > 0 ? 1 : -1;
            if (signoInicial === null) {
                signoInicial = signo;
            } else if (signoInicial !== signo) {
                return false;  // Si el signo cambia, la figura no es convexa
            }
        }
    }
    return true;
}

// Función para dibujar la figura utilizando el algoritmo de Bresenham
function dibujarFigura(ctx, puntos) {
    ctx.clearRect(0, 0, 500, 500); // Limpiar el canvas

    // Dibujar las líneas que conectan los puntos
    for (let i = 0; i < puntos.length; i++) {
        const [x1, y1] = puntos[i];
        const [x2, y2] = puntos[(i + 1) % puntos.length];
        algoritmoBresenham(x1, y1, x2, y2, ctx, 'black'); // Líneas negras
    }

    // Dibujar los vértices en azul
    ctx.fillStyle = 'blue';
    puntos.forEach(([x, y]) => {
        ctx.fillRect(x - 2, y - 2, 4, 4); // Dibujar un pequeño cuadrado en cada vértice
    });
}

// Función para dibujar el centroide y las líneas conectándolo con los vértices
function dibujarCentroideYLíneas(ctx, centroide, puntos) {
    const [cx, cy] = centroide;

    // Dibujar el centroide en rojo
    ctx.fillStyle = 'red';
    ctx.fillRect(cx - 3, cy - 3, 6, 6); // Dibujar un pequeño cuadrado para el centroide

    // Dibujar las líneas desde el centroide hasta cada vértice en verde
    puntos.forEach(([x, y]) => {
        algoritmoBresenham(cx, cy, x, y, ctx, 'green');
    });
}

// Función para generar y mostrar una figura aleatoria
function generarFigura() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    puntosGenerados = generarPuntosAleatorios(3, 15);
    centroideGenerado = calcularCentroide(puntosGenerados);
    const puntosOrdenados = ordenarPuntosPorAngulo(puntosGenerados, centroideGenerado);
    const convexa = esFiguraConvexa(puntosOrdenados);

    // Dibujar la figura
    dibujarFigura(ctx, puntosOrdenados);

    // Mostrar el resultado en el HTML
    const resultText = convexa ? "La figura es convexa." : "La figura es cóncava.";
    document.getElementById('result').textContent = resultText;

    return { centroideGenerado, puntosOrdenados };
}

// Función para dibujar el centroide y las líneas conectándolo con los vértices
function dibujarCentroide() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    if (puntosGenerados.length === 0 || centroideGenerado.length === 0) {
        alert("Primero debes generar una figura.");
        return;
    }

    dibujarCentroideYLíneas(ctx, centroideGenerado, puntosGenerados);
}

// Agregar eventos a los botones
document.getElementById('generate').addEventListener('click', generarFigura);
document.getElementById('drawCentroid').addEventListener('click', dibujarCentroide);
