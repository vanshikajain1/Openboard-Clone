//alert("Js Ran");
let canvas = document.querySelector(".board");
// draw rect
let tool = canvas.getContext("2d"); //get browser tool to draw

// tool.fillStyle = "yellow";
// tool.fillRect(0, 0, canvas.width, canvas.height);

//change size of canvas
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// jbhi bhi window ka size change ho to canvas apne aap adjust ho
canvas.addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  drawPoints();
});

// let { top: topOffset } = canvas.getBoundingClientRect();
// or
let obj = canvas.getBoundingClientRect();
// displays canvas properties
let top1 = obj.top;
// retrives "top" property from obj into constant top1

let isMouseDown = false;

canvas.addEventListener("mousedown", function (e) {
  if (redoPoints.length) {
    redoPoints = []; //undo ke baad kuch likhne ke baad nye input krne pe naa aye purana
  }

  isMouseDown = true;
  let initialMouseX = e.clientX;
  let initialMouseY = e.clientY;
  tool.beginPath();
  tool.moveTo(initialMouseX, initialMouseY);
  let point = {
    id: "md",
    x: initialMouseX,
    y: initialMouseY,
    strokestyle: tool.strokestyle,
    lineWidth: tool.lineWidth,
  };
  line.push(point);
});

canvas.addEventListener("mousemove", function (e) {
  if (isMouseDown) {
    let finalMouseX = e.clientX;
    let finalMouseY = e.clientY;
    let point = {
      id: "mm",
      x: finalMouseX,
      y: finalMouseY,
      strokestyle: tool.strokestyle,
      lineWidth: tool.lineWidth,
    };
    line.push(point);

    if (isMouseDown == true) {
      // socket.emit("draw", { finalMouseX, finalMouseY });
      tool.lineTo(finalMouseX, finalMouseY);
      tool.stroke();
    }
  }
});

// socket.on("onDraw", ({ finalMouseX, finalMouseY }) => {
//   tool.lineTo(finalMouseX, finalMouseY);
//   tool.stroke();
// });

canvas.addEventListener("mouseup", function (e) {
  isMouseDown = false;
  pointsDb.push(line);
  // console.log(pointsDb);
  line = [];
});
