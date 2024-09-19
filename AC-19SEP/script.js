class Figura {
    constructor(svg) {
        this.svg = svg;
        this.strokeStyle = 'black';
        this.lineWidth = 2;
    }

    setEstilo(strokeStyle, lineWidth) {
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
    }

    dibujar() {
        // Método vacío para ser sobreescrito
    }
}

class Linea extends Figura {
    constructor(svg, x1, y1, x2, y2) {
        super(svg);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    dibujar() {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = this.Línea(this.x1, this.y1, this.x2, this.y2);
        line.setAttribute('d', d);
        line.setAttribute('stroke', this.strokeStyle);
        line.setAttribute('stroke-width', this.lineWidth);
        line.setAttribute('fill', 'none'); // Sin relleno
        this.svg.appendChild(line);
    }

    Línea(x1, y1, x2, y2) {
        let path = `M${x1},${y1} `;
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = (x1 < x2) ? 1 : -1;
        const sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            path += `L${x1},${y1} `;
            if (x1 === x2 && y1 === y2) break;
            const e2 = err * 2;
            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
        }

        return path;
    }
}

class Circunferencia extends Figura {
    constructor(svg, cx, cy, r) {
        super(svg);
        this.cx = cx;
        this.cy = cy;
        this.r = r;
    }

    dibujar() {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = this.Circunferencia(this.cx, this.cy, this.r);
        circle.setAttribute('d', d);
        circle.setAttribute('stroke', this.strokeStyle);
        circle.setAttribute('stroke-width', this.lineWidth);
        circle.setAttribute('fill', 'none'); // Sin relleno
        this.svg.appendChild(circle);
    }

    Circunferencia(cx, cy, r) {
        let path = '';
        const step = 0.01; // Resolución del dibujo
        for (let theta = 0; theta <= 2 * Math.PI; theta += step) {
            const x = cx + r * Math.cos(theta);
            const y = cy + r * Math.sin(theta);
            if (theta === 0) {
                path += `M${x},${y} `;
            } else {
                path += `L${x},${y} `;
            }
        }
        path += 'Z'; // Cierra el contorno de la circunferencia
        return path;
    }
}

class Elipse extends Figura {
    constructor(svg, cx, cy, a, b) {
        super(svg);
        this.cx = cx;
        this.cy = cy;
        this.a = a;
        this.b = b;
    }

    dibujar() {
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = this.Elipse(this.cx, this.cy, this.a, this.b);
        ellipse.setAttribute('d', d);
        ellipse.setAttribute('stroke', this.strokeStyle);
        ellipse.setAttribute('stroke-width', this.lineWidth);
        ellipse.setAttribute('fill', 'none'); // Sin relleno
        this.svg.appendChild(ellipse);
    }

    Elipse(cx, cy, a, b) {
        let path = '';
        const step = 0.01; // Resolución del dibujo
        for (let theta = 0; theta <= 2 * Math.PI; theta += step) {
            const x = cx + a * Math.cos(theta);
            const y = cy + b * Math.sin(theta);
            if (theta === 0) {
                path += `M${x},${y} `;
            } else {
                path += `L${x},${y} `;
            }
        }
        path += 'Z'; // Cierra el contorno de la elipse
        return path;
    }
}

// Inicializar el SVG
const svgCanvas = document.getElementById('svgCanvas');

// Crear las figuras
const figuras = [
    new Linea(svgCanvas, 50, 50, 200, 200),
    new Circunferencia(svgCanvas, 300, 100, 50),
    new Elipse(svgCanvas, 400, 300, 80, 50)
];

// Configurar estilo de dibujo
figuras.forEach(figura => {
    figura.setEstilo('black', 2); // Estilo común para todas
    figura.dibujar();
});
