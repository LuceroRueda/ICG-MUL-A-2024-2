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
        let x = r;
        let y = 0;
        let err = 1 - r;

        while (x >= y) {
            path += `M${cx + x},${cy + y} L${cx + y},${cy + x} L${cx - y},${cy + x} L${cx - x},${cy + y} ` +
                    `L${cx - x},${cy - y} L${cx - y},${cy - x} L${cx + y},${cy - x} L${cx + x},${cy - y} `;
            y++;
            if (err < 0) {
                err += 2 * y + 1;
            } else {
                x--;
                err += 2 * (y - x + 1);
            }
        }

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
        let x = 0;
        let y = b;
        let a2 = a * a;
        let b2 = b * b;
        let fa2 = 4 * a2;
        let fb2 = 4 * b2;
        let sigma = 2 * b2 + a2 * (1 - 2 * b);

        while (b2 * x <= a2 * y) {
            path += `M${cx + x},${cy + y} L${cx - x},${cy + y} L${cx - x},${cy - y} L${cx + x},${cy - y} `;
            if (sigma >= 0) {
                sigma += fa2 * (1 - y);
                y--;
            }
            sigma += b2 * ((4 * x) + 6);
            x++;
        }

        x = a;
        y = 0;
        sigma = 2 * a2 + b2 * (1 - 2 * a);

        while (a2 * y <= b2 * x) {
            path += `M${cx + x},${cy + y} L${cx - x},${cy + y} L${cx - x},${cy - y} L${cx + x},${cy - y} `;
            if (sigma >= 0) {
                sigma += fb2 * (1 - x);
                x--;
            }
            sigma += a2 * ((4 * y) + 6);
            y++;
        }

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
