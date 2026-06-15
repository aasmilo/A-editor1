// Initialize the advanced Fabric Interactive Canvas
const canvas = new fabric.Canvas('fCanvas', {
    width: 600,
    height: 450,
    backgroundColor: '#111822'
});

// UI elements
const upload = document.getElementById('upload');
const addTextBtn = document.getElementById('addText');
const downloadBtn = document.getElementById('download');
const aiBtn = document.getElementById('aiMagic');

// Filter inputs
const opacitySlider = document.getElementById('opacity');
const brightnessSlider = document.getElementById('brightness');
const blurSlider = document.getElementById('blur');

// Handle Image Layer Upload
upload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (f) => {
        fabric.Image.fromURL(f.target.result, (img) => {
            // Scale image comfortably to fit canvas view
            img.scaleToWidth(300);
            img.set({
                left: 150,
                top: 100,
                cornerColor: '#00ffcc',
                cornerStrokeColor: '#fff',
                borderColor: '#00ffcc',
                cornerSize: 10,
                transparentCorners: false
            });
            canvas.add(img);
            canvas.setActiveObject(img);
        });
    };
    reader.readAsDataURL(file);
});

// Handle adding Interactive Text Layers
addTextBtn.addEventListener('click', () => {
    const text = new fabric.IText('Edit Me', {
        left: 200,
        top: 200,
        fontFamily: 'Segoe UI',
        fill: '#ffffff',
        fontSize: 40,
        cornerColor: '#00ffcc',
        borderColor: '#00ffcc'
    });
    canvas.add(text);
    canvas.setActiveObject(text);
});

// Real-Time Layer Property Modification Engines
canvas.on('selection:created', updateSliders);
canvas.on('selection:updated', updateSliders);

function updateSliders() {
    const activeObj = canvas.getActiveObject();
    if (!activeObj) return;
    opacitySlider.value = activeObj.opacity * 100;
}

opacitySlider.addEventListener('input', () => {
    const activeObj = canvas.getActiveObject();
    if (activeObj) {
        activeObj.set('opacity', opacitySlider.value / 100);
        canvas.renderAll();
    }
});

// Live Render Engine Filters for Canvas Objects
function applyObjectFilter(filterInstance) {
    const activeObj = canvas.getActiveObject();
    if (!activeObj || activeObj.type !== 'image') return;
    
    activeObj.filters = [];
    if(filterInstance) {
        activeObj.filters.push(filterInstance);
    }
    activeObj.applyFilters();
    canvas.renderAll();
}

brightnessSlider.addEventListener('input', () => {
    applyObjectFilter(new fabric.Image.filters.Brightness({
        brightness: parseFloat(brightnessSlider.value)
    }));
});

blurSlider.addEventListener('input', () => {
    applyObjectFilter(new fabric.Image.filters.Blur({
        blur: parseFloat(blurSlider.value)
    }));
});

// AI Engine Security Check Trigger
aiBtn.addEventListener('click', () => {
    alert("A Editor AI Engine Core Notice:\nTo run real generative fill or AI expanding calculations directly inside the workspace without server failure, link your specialized AI model routing script via backend server integration.");
});

// Clean high-res raster data compilation & layout export
downloadBtn.addEventListener('click', () => {
    const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1.0
    });
    const link = document.createElement('a');
    link.download = 'A-Editor-Composite.png';
    link.href = dataURL;
    link.click();
});
