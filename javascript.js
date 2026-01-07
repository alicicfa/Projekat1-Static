const canvas=document.getElementById("board");
const ctx=canvas.getContext("2d");

const colorPicker=document.getElementById("colorPicker");
const brushSize=document.getElementById("brushSize");
const clearBtn=document.getElementById("clearBtn");
const saveBtn=document.getElementById("saveBtn");
const eraserBtn=document.getElementById("eraserBtn");

let drawing=false; 
let currentColor=colorPicker.value;
let isErasing=false;


function resizeCanvas() {
    const dpr = window.devicePixelRatio||1; 
   
    const{width,height}=canvas.getBoundingClientRect();

    canvas.width=width*dpr;
    canvas.height=height*dpr;
    ctx.scale(dpr,dpr); 
    ctx.fillStyle="#FFFFFF";
    ctx.fillRect(0,0,width,height); 
}

window.addEventListener('load', resizeCanvas); 
window.addEventListener('resize', resizeCanvas); 


function startDraw(e) {
    drawing = true;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    
    const dpr = window.devicePixelRatio || 1;
    const x = (clientX - rect.left) * scaleX / dpr;
    const y = (clientY - rect.top) * scaleY / dpr; 

    ctx.beginPath();
    ctx.moveTo(x, y);
    draw(e); 
}

function endDraw() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;
    
    if (e.type.startsWith('touch')) {
        e.preventDefault(); 
    }
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    
    const dpr = window.devicePixelRatio || 1;
    const x = (clientX - rect.left) * scaleX / dpr;
    const y = (clientY - rect.top) * scaleY / dpr; 
    
    ctx.lineWidth = brushSize.value;
    ctx.lineCap = "round";
    ctx.strokeStyle = isErasing ? "#FFFFFF" : currentColor; // Gumica crta bijelom bojom
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseleave", endDraw);
    
canvas.addEventListener("touchstart", startDraw);
canvas.addEventListener("touchmove", (e) => {
    draw(e);
});

	canvas.addEventListener("touchend", endDraw);
	colorPicker.addEventListener("input", () => {
		currentColor = colorPicker.value;
		isErasing = false;
		eraserBtn.textContent = "Briši"; 
});
    
eraserBtn.addEventListener("click",() => {
    isErasing = !isErasing;
    eraserBtn.textContent = isErasing ? "Piši" : "Briši";
    if (!isErasing) {
        currentColor = colorPicker.value;
    }
});
    
clearBtn.addEventListener("click", () => {
    const dpr = window.devicePixelRatio || 1;
    const clearW = canvas.width / dpr;
    const clearH = canvas.height / dpr;
    
    ctx.clearRect(0,0,clearW,clearH);
    ctx.fillStyle ="#FFFFFF";
    ctx.fillRect(0,0,clearW,clearH);
});
    
saveBtn.addEventListener("click",() => {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download ="moj_crtez.png";
    link.click();
});