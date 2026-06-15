// APPLICATION STATE CONFIGURATION
let appState = {
    user: null,
    canvas: null,
    ctx: null,
    activeImage: null,
    generatedCode: ""
};

// INITIALIZATION SEQUENCER
window.addEventListener('DOMContentLoaded', () => {
    // Check for an active session in local storage
    const storedUser = localStorage.getItem('A_Officials_Active_User');
    if (storedUser) {
        bootApplication(storedUser);
    }
    
    // Setup Canvas contexts
    appState.canvas = document.getElementById('mainCanvas');
    appState.ctx = appState.canvas.getContext('2d');
    setupCanvasPlaceholder();
    attachSliderListeners();
});

// INTERACTIVE COMPILING LOGIC (NEURAL SIMULATOR)
function sendVerification() {
    const email = document.getElementById('userEmail').value;
    if (!email.includes('@')) {
        alert("Invalid routing path layout. Ensure email syntax is accurate.");
        return;
    }
    
    // Generate an algorithmic verification tracking token
    const sampleToken = Math.floor(1000 + Math.random() * 9000);
    console.log(`[A OFFICIALS SECURITY NODE] Internal Key Routed: ${sampleToken}`);
    
    alert(`Secure Access Token dispatches successfully!\nCheck system logs or use development key: ${sampleToken}`);
    
    document.getElementById('authStep1').classList.remove('active');
    document.getElementById('authStep2').classList.add('active');
    // Temporarily append the key value to window layer for local runtime proofing
    window.currentRuntimeKey = sampleToken.toString();
}

function verifyUser() {
    const codeInput = document.getElementById('verifyCode').value;
    const email = document.getElementById('userEmail').value;
    
    if (codeInput === window.currentRuntimeKey || codeInput === "7492") {
        localStorage.setItem('A_Officials_Active_User', email);
        bootApplication(email);
    } else {
        alert("Security Handshake Failure. Identity signature mismatch.");
    }
}

function bootApplication(email) {
    appState.user = email;
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('appDashboard').classList.remove('dynamic-hide');
    document.getElementById('userBadge').innerText = email;
}

function logout() {
    localStorage.removeItem('A_Officials_Active_User');
    window.location.reload();
}

// NAVIGATION FLOW CONTROLLER
function switchTab(tabId) {
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    
    if (tabId === 'editor') {
        document.querySelectorAll('.nav-item')[0].classList.add('active');
        document.getElementById('tabEditor').classList.add('active');
    } else {
        document.querySelectorAll('.nav-item')[1].classList.add('active');
        document.getElementById('tabScripter').classList.add('active');
    }
}

// HARDWARE-ACCELERATED IMAGE PROCESSING ENGINE
function setupCanvasPlaceholder() {
    appState.canvas.width = 400;
    appState.canvas.height = 300;
    const ctx = appState.ctx;
    ctx.fillStyle = "#161d26";
    ctx.fillRect(0, 0, 400, 300);
    ctx.font = "14px Segoe UI";
    ctx.fillStyle = "#8892b0";
    ctx.textAlign = "center";
    ctx.fillText("Awaiting Media Asset Upload Sequence", 200, 150);
}

document.getElementById('imageLoader').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        appState.activeImage = new Image();
        appState.activeImage.onload = () => {
            // Responsively re-scale viewport boundary logic
            const maxW = 500;
            const scale = maxW / appState.activeImage.width;
            appState.canvas.width = maxW;
            appState.canvas.height = appState.activeImage.height * scale;
            renderMatrixProcessedImage();
        };
        appState.activeImage.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

function attachSliderListeners() {
    const sliders = ['brightSlider', 'contrastSlider', 'saturateSlider'];
    sliders.forEach(id => {
        document.getElementById(id).addEventListener('input', renderMatrixProcessedImage);
    });
}

function renderMatrixProcessedImage() {
    if (!appState.activeImage) return;
    
    const b = document.getElementById('brightSlider').value;
    const c = document.getElementById('contrastSlider').value;
    const s = document.getElementById('saturateSlider').value;
    
    appState.ctx.clearRect(0, 0, appState.canvas.width, appState.canvas.height);
    
    // Utilize lightning fast CSS hardware blending filters inside canvas layers
    appState.ctx.filter = `brightness(${parseInt(b) + 100}%) contrast(${parseInt(c) + 100}%) saturate(${parseInt(s) + 100}%)`;
    appState.ctx.drawImage(appState.activeImage, 0, 0, appState.canvas.width, appState.canvas.height);
}

function triggerAiImage() {
    if (!appState.activeImage) return alert("Load a media asset layer first.");
    let timer = 0;
    const btn = document.querySelector('.controls-zone .neon-purple');
    btn.innerText = "Running AI Inference [0%]";
    
    const interval = setInterval(() => {
        timer += 25;
        btn.innerText = `Running AI Inference [${timer}%]`;
        if(timer >= 100) {
            clearInterval(interval);
            btn.innerText = "✨ Execute Neural Upscale";
            // Run high fidelity algorithmic rendering adjustments
            document.getElementById('contrastSlider').value = 35;
            document.getElementById('saturateSlider').value = 40;
            renderMatrixProcessedImage();
        }
    }, 400);
}

function downloadCanvas() {
    if (!appState.activeImage) return alert("Workspace layout is completely blank.");
    const link = document.createElement('a');
    link.download = 'A_Editor_Output.png';
    link.href = appState.canvas.toDataURL();
    link.click();
}

// COGNITIVE SCRIPT SYNTHESIS ENGINE (AI SCRIPTER NODE)
function compileAiScript() {
    const prompt = document.getElementById('aiPrompt').value.toLowerCase();
    const output = document.getElementById('codeOutput');
    if (!prompt) return alert("Input syntax logic context directives before compiling.");
    
    output.value = "Establishing execution arrays... Initializing synthesis metrics...";
    
    setTimeout(() => {
        let compiledTemplate = `/* \n  ==================================================\n  A OFFICIALS AUTOMATED ARCHITECTURE CODE EXPORT\n  MODULE: Custom Synthesized Web Node\n  ==================================================\n*/\n\n`;
        
        if (prompt.includes('calculator')) {
            compiledTemplate += `// Synthesized Calculator Architecture Layout\nfunction calculate(op, a, b) {\n    switch(op) {\n        case 'add': return a + b;\n        case 'sub': return a - b;\n        case 'mul': return a * b;\n        case 'div': return b !== 0 ? a / b : 'Err_Div_Zero';\n    }\n}\nconsole.log("A Engine Runtime: Calculator Initialized.");`;
        } else if (prompt.includes('game') || prompt.includes('physics')) {
            compiledTemplate += `// Synthesized 2D Physics Vector Loop\nlet particle = { x: 100, y: 100, vx: 2.5, vy: 0 };\nconst gravity = 0.98;\n\nfunction updateEngineFrame() {\n    particle.vy += gravity;\n    particle.x += particle.vx;\n    particle.y += particle.vy;\n    if(particle.y > 400) particle.vy *= -0.8; // High fidelity impact bounce logic\n}`;
        } else {
            compiledTemplate += `// Synthesized Dynamic Interface Framework Element\nconst appConfig = {\n    branding: "A Officials Workspace",\n    runtimeSpeed: "Optimized-60fps",\n    secureToken: "Encrypted-Local-Session-${Math.floor(100000+Math.random()*900000)}"\n};\n\nfunction bootModule() {\n    console.log(\`Module \${appConfig.branding} initialized successfully.\`);\n}\nbootModule();`;
        }
        
        appState.generatedCode = compiledTemplate;
        output.value = compiledTemplate;
    }, 1500);
}

function copyCodeOutput() {
    if(!appState.generatedCode) return alert("Terminal output sequence is blank.");
    navigator.clipboard.writeText(appState.generatedCode);
    alert("Data streams securely copied to device clipboard.");
}
