let puntosOrdenados = [];  // Para almacenar los puntos ordenados globalmente
let centroide = [];        // Para almacenar el centroide globalmente

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
    return [sumaX / n, sumaY / n];
}

// Función para calcular el ángulo respecto al centroide
function calcularAngulo(centroide, punto) {
    return Math.atan2(punto[1] - centroide[1], punto[0] - centroide[0]);
}

// Función para ordenar los puntos por ángulo respecto al centroide
function ordenarPuntosPorAngulo(puntos, centroide) {
    return puntos.slice().sort((a, b) => calcularAngulo(centroide, a) - calcularAngulo(centroide, b));
}

// Función para calcular el producto cruzado
function productoCruzado(o, a, b) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

// Función para verificar si la figura es convexa
function esFiguraConvexa(puntos) {
    const n = puntos.length;
    let signoInicial = null;
    for (let i = 0; i < n; i++) {
        const o = puntos[i];
        const a = puntos[(i + 1) % n];
        const b = puntos[(i + 2) % n];
        const cruzado = productoCruzado(o, a, b);

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

// Función para dibujar los puntos y la figura en SVG
function dibujarFigura(svgCanvas, puntos) {
    svgCanvas.innerHTML = '';  // Limpiar el canvas

    // Dibujar los puntos
    puntos.forEach(([x, y]) => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', 5);
        circle.setAttribute('fill', 'blue');
        svgCanvas.appendChild(circle);
    });

    // Dibujar las líneas que conectan los puntos
    for (let i = 0; i < puntos.length; i++) {
        const [x1, y1] = puntos[i];
        const [x2, y2] = puntos[(i + 1) % puntos.length];
        const line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', 2);
        svgCanvas.appendChild(line);
    }
}

// Función para dibujar el centroide y las líneas conectándolo con los vértices
function dibujarCentroideYLíneas(svgCanvas, centroide, puntos) {
    // Dibujar el centroide
    const [cx, cy] = centroide;
    const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', 5);
    circle.setAttribute('fill', 'red');
    svgCanvas.appendChild(circle);

    // Dibujar las líneas desde el centroide hasta cada vértice
    puntos.forEach(([x, y]) => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        line.setAttribute('x1', cx);
        line.setAttribute('y1', cy);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', 'green');
        line.setAttribute('stroke-width', 1);
        svgCanvas.appendChild(line);
    });
}

// Función para generar y mostrar una figura aleatoria
function generarFigura() {
    const puntos = generarPuntosAleatorios(3, 15);
    centroide = calcularCentroide(puntos);
    puntosOrdenados = ordenarPuntosPorAngulo(puntos, centroide);
    const convexa = esFiguraConvexa(puntosOrdenados);

    // Dibujar la figura
    const svgCanvas = document.getElementById('svgCanvas');
    dibujarFigura(svgCanvas, puntosOrdenados);

    // Mostrar el resultado en el HTML
    const resultText = convexa ? "La figura es convexa." : "La figura es cóncava.";
    document.getElementById('result').textContent = resultText;
}

// Función para dibujar el centroide y las líneas conectándolo con los vértices
function dibujarCentroide() {
    const svgCanvas = document.getElementById('svgCanvas');
    dibujarCentroideYLíneas(svgCanvas, centroide, puntosOrdenados);
}

// Agregar eventos a los botones
document.getElementById('generate').addEventListener('click', generarFigura);
document.getElementById('drawCentroid').addEventListener('click', dibujarCentroide);

