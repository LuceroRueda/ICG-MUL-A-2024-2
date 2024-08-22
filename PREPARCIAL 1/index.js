document.getElementById('positionType').addEventListener('change', () => {
    const positionType = document.getElementById('positionType').value;
    if (positionType === 'cartesian') {
        document.getElementById('cartesianInputs').style.display = 'block';
        document.getElementById('polarInputs').style.display = 'none';
    } else {
        document.getElementById('cartesianInputs').style.display = 'none';
        document.getElementById('polarInputs').style.display = 'block';
    }
});

document.getElementById('drawButton').addEventListener('click', () => {
    const sides = parseInt(document.getElementById('sides').value);
    const sideLength = parseInt(document.getElementById('sideLength').value);
    const color = document.getElementById('color').value;
    const positionType = document.getElementById('positionType').value;
    const graphicType = document.getElementById('graphicType').value;

    let centerX, centerY;
    if (positionType === 'cartesian') {
        centerX = parseInt(document.getElementById('xPos').value);
        centerY = parseInt(document.getElementById('yPos').value);
    } else {
        const radius = parseFloat(document.getElementById('radius').value);
        const angle = parseFloat(document.getElementById('angle').value) * Math.PI / 180;
        centerX = 250 + radius * Math.cos(angle);  // Ajustado al centro del canvas
        centerY = 250 - radius * Math.sin(angle);  // Ajustado al centro del canvas
    }

    if (graphicType === 'raster') {
        drawOnCanvas(sides, sideLength, color, centerX, centerY);
        document.getElementById('vectorSvg').style.display = 'none';
        document.getElementById('rasterCanvas').style.display = 'block';
    } else {
        drawOnSVG(sides, sideLength, color, centerX, centerY);
        document.getElementById('rasterCanvas').style.display = 'none';
        document.getElementById('vectorSvg').style.display = 'block';
    }
});

document.getElementById('clearButton').addEventListener('click', () => {
    clearCanvas();
    clearSVG();
    document.getElementById('coordinates').innerHTML = '';
});

function drawOnCanvas(sides, sideLength, color, centerX, centerY) {
    const canvas = document.getElementById('rasterCanvas');
    const ctx = canvas.getContext('2d');
    clearCanvas();
    
    const angle = 2 * Math.PI / sides;
    const radius = sideLength / (2 * Math.sin(Math.PI / sides));
    
    ctx.beginPath();
    ctx.moveTo(centerX + radius, centerY);

    const coordinates = [];

    for (let i = 1; i <= sides; i++) {
        const x = centerX + radius * Math.cos(i * angle);
        const y = centerY + radius * Math.sin(i * angle);
        ctx.lineTo(x, y);
        const cartesianCoord = `(${Math.round(x)}, ${Math.round(y)})`;
        const r = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const theta = (i * angle * 180 / Math.PI).toFixed(2);
        const polarCoord = `(${r.toFixed(2)}, ${theta}°)`;
        coordinates.push(`Vértice ${i}: ${cartesianCoord} (Cartesiana) / ${polarCoord} (Polar)`);
    }

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    displayCoordinates(coordinates);
}

function drawOnSVG(sides, sideLength, color, centerX, centerY) {
    const svg = document.getElementById('vectorSvg');
    clearSVG();

    const angle = 2 * Math.PI / sides;
    const radius = sideLength / (2 * Math.sin(Math.PI / sides));
    
    let pathData = `M ${centerX + radius} ${centerY} `;
    const coordinates = [];

    for (let i = 1; i <= sides; i++) {
        const x = centerX + radius * Math.cos(i * angle);
        const y = centerY + radius * Math.sin(i * angle);
        pathData += `L ${x} ${y} `;
        const cartesianCoord = `(${Math.round(x)}, ${Math.round(y)})`;
        const r = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const theta = (i * angle * 180 / Math.PI).toFixed(2);
        const polarCoord = `(${r.toFixed(2)}, ${theta}°)`;
        coordinates.push(`Vértice ${i}: ${cartesianCoord} (Cartesiana) / ${polarCoord} (Polar)`);
    }

    pathData += 'Z';

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', color);
    path.setAttribute('stroke', '#000000');
    svg.appendChild(path);

    displayCoordinates(coordinates);
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

function displayCoordinates(coordinates) {
    const coordinatesDiv = document.getElementById('coordinates');
    coordinatesDiv.innerHTML = coordinates.join('<br>');
}
