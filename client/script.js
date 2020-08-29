let ispendown = false;
;
let points = [];
let redoArr = [];
board.addEventListener("mousedown", function (e) {
    // path start
    let x = e.clientX;
    let y = e.clientY;
    let top= getPosition();
    y = y - top;
    //  move to
    ctx.beginPath(0, 0);
    ctx.moveTo(x, y);
    ispendown = true;

    let mdp = {
        x: x,
        y: y,
        id: "md",
        color: ctx.strokeStyle,
        width: ctx.lineWidth
    }
    points.push(mdp);
    socket.emit("md", mdp);
})
board.addEventListener("mousemove", function (e) {
    //  lineto 
    let x = e.clientX;
    let y = e.clientY;
    let top= getPosition();
    y = y - top;
    if (ispendown == true) {
        ctx.lineTo(x, y);
        ctx.stroke();

        let mmp = {
            x: x,
            y: y,
            id: "mm",
            color: ctx.strokeStyle,
            width: ctx.lineWidth
        }
        points.push(mmp);
        socket.emit("mm", mmp);
    }
    // repeat
})
window.addEventListener("mouseup", function (e) {
    // mouse up
    // ctx.closePath();
    ispendown = false;

})
function getPosition() {
    let { top } = board.getBoundingClientRect();
    return top;
}
function redraw() {
    for (let i = 0; i < points.length; i++) {
        let { x, y, id, color, width } = points[i];
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        if (id == "md") {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else if (id == "mm") {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
    
}
function undoOperation() {
    
    if (points.length >= 2) {
        // pop last line
        let tempArr = [];
        for (let i = points.length - 1; i >= 0; i--) {
            let { id } = points[i];
            if (id == "md") {
                tempArr.unshift(points.pop());
                break;
            }else{
                tempArr.unshift(points.pop());
            }
        }
        //  clear Rect
        ctx.clearRect(0, 0, board.width, board.height);

        redoArr.push(tempArr);

        // call redraw
        redraw();
    }

}
function redoOperation() {
    if (redoArr.length > 0) {
        let recentPathArr = redoArr.pop();
        //  add all points to undo arr
        points.push(...recentPathArr);
        ctx.clearRect(0, 0, board.width, board.height);
        // call redraw
        redraw();
    }
}

let isActive = true;
function handleHamburger() {
  if (isActive == true) {
    hamburger.classList.remove("is-active");
    toolBar.classList.remove("add-animation");
  } else {
    hamburger.classList.add("is-active");
    toolBar.classList.add("add-animation");
  }

  isActive = !isActive;
}