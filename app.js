const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let painting = false;
let currentTool = 'pencil'; // Default tool
let brushColor = document.getElementById('colorPicker').value;
let brushSize = document.getElementById('brushSize').value;

canvas.width = canvas.offsetWidth;
canvas.height = 600;

// Start drawing
function startPosition(e) {
    painting = true;
    ctx.beginPath(); // Inizia un nuovo percorso
    draw(e);
}

// End drawing
function endPosition() {
    painting = false;
    ctx.closePath(); // Chiude il percorso corrente
}

// Draw function for brush and eraser
function draw(e) {
    if (!painting) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round'; // Usa "round" per linee arrotondate

    if (currentTool === 'pencil') {
        ctx.strokeStyle = brushColor;
    } else if (currentTool === 'eraser') {
        ctx.strokeStyle = '#ffffff'; // Bianco per cancellare
    }

    // Disegna una linea fluida
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop); // Posiziona per continuità
}

// Tool event listeners
document.getElementById('pencilBtn').addEventListener('click', () => {
    currentTool = 'pencil';
    document.body.style.cursor = 'url("pencil-cursor.png"), auto'; // Cambia il cursore a matita
});

document.getElementById('eraserBtn').addEventListener('click', () => {
    currentTool = 'eraser';
    document.body.style.cursor = 'url("eraser-cursor.png"), auto'; // Cambia il cursore a gomma
});

// Tool adjustments
document.getElementById('colorPicker').addEventListener('input', (e) => {
    brushColor = e.target.value;
});

document.getElementById('brushSize').addEventListener('input', (e) => {
    brushSize = e.target.value;
    document.getElementById('brushSizeValue').textContent = brushSize;
});

// Clear canvas
document.getElementById('clearBtn').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save drawing
document.getElementById('saveBtn').addEventListener('click', () => {
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'my-drawing.png';
    link.click();
});

// Event listeners for drawing
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
