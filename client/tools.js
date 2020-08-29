const socket = io.connect("https://serverwhiteboard.herokuapp.com/");
// const socket = io.connect("http://localhost:3000");
console.log(socket);

let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let undo = document.querySelector("#undo");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
let sliders = document.querySelectorAll("input[type='range']");
let sticky = document.querySelector("#sticky");

let pencilSize = 5;
let eraserSize = 5;

let activeTool = "pencil";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.miterLimit = 1;

let hamburger = document.querySelector(".hamburger-icon");
let toolBar = document.querySelector(".tool-bar");
hamburger.addEventListener("click", function() {
    handleHamburger() 
 
    socket.emit("hamburger");
});

//ctx.lineWidth=10;
pencil.addEventListener("click", function () {
    if (activeTool == "pencil") {
        //  pencil options show
        pencilOptions.classList.add("show");
    } else {
        activeTool = "pencil";
        eraserOptions.classList.remove("show");
        ctx.strokeStyle = "black";
        ctx.lineWidth = pencilSize;
    }
})
eraser.addEventListener("click", function () {
    if (activeTool == "eraser") {
        //  pencil options show
        eraserOptions.classList.add("show");
    } else {
        activeTool = "eraser";
        pencilOptions.classList.remove("show");
        ctx.strokeStyle = "white";
        ctx.lineWidth = eraserSize;
    }
})
undo.addEventListener("click", function () {
    undoOperation();
    // socket.emit("undo");
})
document.addEventListener("keydown", function (e) {
    var evtobj = e;
    if (evtobj.keyCode == 90 && evtobj.ctrlKey)
        undoOperation();
})
redo.addEventListener("click", function () {
    redoOperation();
    // socket.emit("redo");
})
document.addEventListener("keydown", function (e) {
    var evtobj = e;
    if (evtobj.keyCode == 89 && evtobj.ctrlKey)
        redoOperation();
})
sticky.addEventListener("click", function () {
    createSticky();
})
function handleColor(color) {
    ctx.strokeStyle = color;
    socket.emit("color", color);
}
sliders.forEach(function (slider) {
    slider.addEventListener("change", function () {
        let value = slider.value;
        ctx.lineWidth = value;
        if (activeTool == "pencil") {
            pencilSize=ctx.lineWidth;
        }else{
            eraserSize=ctx.lineWidth;
        }
    })
})
