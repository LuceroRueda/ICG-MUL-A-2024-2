document.getElementById('clearButton').addEventListener('click', () => {
    clearCanvas();
    clearSVG();
});

document.getElementById('drawButton').addEventListener('click', () => {
    const shapeType = document.getElementById('shapeType').value;
    const fillColor = document.getElementById('fillColor').value;
    const lineColor = document.getElementById('lineColor').value;
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);
    const xPos = parseInt(document.getElementById('xPos').value);
    const yPos = parseInt(document.getElementById('yPos').value);
    const graphicType = document.getElementById('graphicType').value;

    if (graphicType === 'raster') {
        drawOnCanvas(shapeType, fillColor, lineColor, xPos, yPos, width, height);
    } else if (graphicType === 'vector') {
        drawOnSVG(shapeType, fillColor, lineColor, xPos, yPos, width, height);
    }
});

function drawOnCanvas(shapeType, fillColor, lineColor, xPos, yPos, width, height) {
    const canvas = document.getElementById('rasterCanvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = fillColor;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;

    // Dibujar la figura seleccionada
    if (shapeType === 'rectangle') {
        ctx.fillRect(xPos, yPos, width, height);
        ctx.strokeRect(xPos, yPos, width, height);
    } else if (shapeType === 'square') {
        ctx.fillRect(xPos, yPos, width, width);
        ctx.strokeRect(xPos, yPos, width, width);
    } else if (shapeType === 'circle') {
        ctx.beginPath();
        ctx.arc(xPos + width / 2, yPos + width / 2, width / 2, 0, 2 * Math.PI); // Usamos "width" como radio
        ctx.fill();
        ctx.stroke();
    } else if (shapeType === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(xPos, yPos);
        ctx.lineTo(xPos + width, yPos); // Línea base del triángulo
        ctx.lineTo(xPos + width / 2, yPos - height); // Altura del triángulo
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

function drawOnSVG(shapeType, fillColor, lineColor, xPos, yPos, width, height) {
    const svg = document.getElementById('vectorSvg');

    let shape;

    // Crear la figura SVG seleccionada
    if (shapeType === 'rectangle') {
        shape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        shape.setAttribute('x', xPos);
        shape.setAttribute('y', yPos);
        shape.setAttribute('width', width);
        shape.setAttribute('height', height);
    } else if (shapeType === 'square') {
        shape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        shape.setAttribute('x', xPos);
        shape.setAttribute('y', yPos);
        shape.setAttribute('width', width);
        shape.setAttribute('height', width);
    } else if (shapeType === 'circle') {
        shape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        shape.setAttribute('cx', xPos + width / 2);
        shape.setAttribute('cy', yPos + width / 2);
        shape.setAttribute('r', width / 2); // Usamos "width" como radio
    } else if (shapeType === 'triangle') {
        shape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const points = `${xPos},${yPos} ${xPos + width},${yPos} ${xPos + width / 2},${yPos - height}`;
        shape.setAttribute('points', points);
    }

    shape.setAttribute('fill', fillColor);
    shape.setAttribute('stroke', lineColor);
    shape.setAttribute('stroke-width', 2);
    svg.appendChild(shape);
}

function clearCanvas() {
    const canvas = document.getElementById('rasterCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clearSVG() {
    const svg = document.getElementById('vectorSvg');
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
}
