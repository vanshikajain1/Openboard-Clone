// tool.fillStyle="blue";   //colour change
// tool.fillRect(0,0,100,100);  //pehle do coordinates starting from top left baaki do height width
// tool.strokeStyle="green";   //stroke->outside of tool, fill-> fill in tool
// tool.lineWidth=20;  //width of a line
// tool.strokeRect(10,10,100,100);
// tool.fillStyle="yellow";
// tool.fillRect(700,300,200,200);
// tool.strokeStyle="yellow";   //stroke->outside of tool, fill-> fill in tool
// tool.lineWidth=20;  //width of a line
// tool.strokeRect(700,300,300,300);

// // //darw line
// tool.beginPath(); //mai kuch draw krna chahti hu
// tool.moveTo(200,200); //starting point kya hai drawing ka
// tool.lineTo(500,500); //destination point kya hai drawing ka
// tool.lineTo(500,700);
// tool.lineTo(200,700);
// tool.stroke();
// tool.fillStyle="blue";
// tool.fill();

// let Alltools = document.querySelectorAll(".tools");
// for (let i = 0; i < Alltools.length; i++) {
//   Alltools[i].addEventListener("click", function (e) {
//     let toolName = e.currentTarget.id;
//     if (toolName == "pencil") {
//       tool.lineWidth = 5;
//       tool.strokeStyle = "orange";
//       // console.log(1);
//     } else if (toolName == "eraser") {
//       tool.strokeStyle = "white";
//       // console.log(2);
//     }
//   });
// }

let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let penColors = document.querySelectorAll(".pencil_colors div"); //[ <div> <div> <div> ]
let pencilSize = document.querySelector("#Pslider");
let eraserSize = document.querySelector("#Eslider");

let penOptions = document.querySelector("#penOptions");
let eraserOptions = document.querySelector("#eraserOptions");

let penWidth = 2;
let eraserWidth = 2;

pencilSize.addEventListener("change", function (e) {
  let size = e.target.value;
  tool.lineWidth = size;
});

eraserSize.addEventListener("change", function (e) {
  let size = e.target.value;
  tool.lineWidth = size;
});
pencil.addEventListener("click", function () {
  if (!pencil.classList.contains("active_tool")) {
    //classlist me jaake dekho "active_tool naam ki class hai kya?"
    eraser.classList.remove("active_tool"); //agr nhi hai to eraser se remove krke
    pencil.classList.add("active_tool"); //pencil pe switch krdo
    eraserOptions.classList.add("hide");
    tool.strokeStyle = "black";
    tool.lineWidth = penWidth; //jb pencil active na ho width 2 rhe
  } else {
    //already active
    if (penOptions.classList.contains("hide")) {
      penOptions.classList.remove("hide");
    } else {
      penOptions.classList.add("hide");
    }
  }
});

eraser.addEventListener("click", function () {
  if (!eraser.classList.contains("active_tool")) {
    //classlist me jaake dekho "active_tool naam ki class hai kya? nhi hai to"
    pencil.classList.remove("active_tool"); //eraser se remove krke
    eraser.classList.add("active_tool"); //pencil pe switch krdo
    penOptions.classList.add("hide");
    tool.strokeStyle = "white";
    tool.lineWidth = eraserWidth; //jb eraser active na ho width 2 rhe
  } else {
    //already active
    if (eraserOptions.classList.contains("hide")) {
      eraserOptions.classList.remove("hide");
    } else {
      eraserOptions.classList.add("hide");
    }
  }
});

for (let i = 0; i < penColors.length; i++) {
  penColors[i].addEventListener("click", function () {
    //class ke basis pe colour
    if (penColors[i].classList.contains("red")) {
      tool.strokeStyle = "red";
    } else if (penColors[i].classList.contains("blue")) {
      tool.strokeStyle = "blue";
    } else {
      tool.strokeStyle = "black";
    }
  });
}

let pointsDb = []; //isme sb lines ke collected objects hai
let line = []; //ye ek object hai jisme saare points hai; md mm mm mm mu
let redoPoints = [];

undo.addEventListener("click", function () {
  if (pointsDb.length) {
    let latestLine = pointsDb.pop(); //last object nikalo
    // console.log("," + latestLine.length);
    redoPoints.push(latestLine); //or vo redo me daal do
    tool.clearRect(0, 0, canvas.width, canvas.height); //empty canvas
    drawPoints(); //function call
  }
});

redo.addEventListener("click", function () {
  if (redoPoints.length) {
    let line = redoPoints.pop(); //redo me jo bhi hai use nikalo
    pointsDb.push(line); //or isme daldo
    for (let j = 0; j < line.length; j++) {
      tool.lineWidth = line[j].lineWidth;
      tool.strokeStyle = line[j].strokeStyle;
      if (line[j].id == "md") {
        tool.beginPath();
        tool.moveTo(line[j].x, line[j].y);
      } else {
        tool.lineTo(line[j].x, line[j].y);
        tool.stroke();
      }
    }
  }
});

function drawPoints() {
  for (let i = 0; i < pointsDb.length; i++) {
    let line = pointsDb[i];

    for (let j = 0; j < line.length; j++) {
      tool.lineWidth = line[j].lineWidth;
      tool.strokeStyle = line[j].strokeStyle;
      if (line[j].id == "md") {
        tool.beginPath();
        tool.moveTo(line[j].x, line[j].y);
      } else {
        tool.lineTo(line[j].x, line[j].y);
        tool.stroke();
      }
    }
  }
}

function createSticky() {
  let sticky = document.createElement("div");
  sticky.classList.add("sticky");
  // «div class-"sticky'></div)

  let stickyHeader = document.createElement("div");
  stickyHeader.classList.add("notesHeader");
  // <div class="sticky">
  //     <div class="notesHeader">
  //   </div>

  let close = document.createElement("div");
  close.setAttribute("id", "close");
  //  <div class="notesOptions" id="close"></div>
  //   </div>
  let minimize = document.createElement("div");
  minimize.setAttribute("id", "minimize");
  // <div class="notesOptions" id="minimize"></div>;

  let stickyContent = document.createElement("div");
  stickyContent.classList.add("stickyContent");
  //     <div class="stickyContent"> </div>

  sticky.appendChild(stickyHeader);
  stickyHeader.appendChild(minimize);
  stickyHeader.appendChild(close);
  sticky.appendChild(stickyContent);

  document.body.appendChild(sticky);

  let initialX;
  let initialY;
  let isStickyHold = false;
  stickyHeader.addEventListener("mousedown", function (e) {
    isStickyHold = true;
    initialX = e.clientX; //function e ke x coordinate ki value initialX me daalo
    initialY = e.clientY;
  });
  stickyHeader.addEventListener("mousemove", function (e) {
    if (isStickyHold) {
      let finalX = e.clientX;
      let finalY = e.clientY;
      let dy = finalY - initialY;
      let dx = finalX - initialX;

      let { top, left } = sticky.getBoundingClientRect();
      sticky.style.top = top + dy + "px";
      sticky.style.left = left + dx + "px";

      initialX = finalX;
      initialY = finalY;
    }
  });
  stickyHeader.addEventListener("mouseup", function (e) {
    isStickyHold = false;
  });

  minimize.addEventListener("click", function () {
    stickyContent.style.display =
      stickyContent.style.display == "none" ? "block" : "none";
  });

  close.addEventListener("click", function () {
    sticky.remove();
  });

  return stickyContent;
}

let stickyAdd = document.querySelector("#notes");
stickyAdd.addEventListener("click", function () {
  let notes = createSticky();
  let textBox = document.createElement("textarea");
  // <textarea name="" id="textBox" cols="30" rows="10"></textarea>
  textBox.setAttribute("id", "textBox");
  textBox.setAttribute("placeholder", "Type here...");
  notes.appendChild(textBox);
});

let imageUpload = document.querySelector("#photo-upload");
let upload = document.querySelector("#upload");
upload.addEventListener("click", function () {
  imageUpload.click();
});
imageUpload.addEventListener("change", function () {
  let fileObject = imageUpload.files[0];
  let filePath = URL.createObjectURL(fileObject); //gives image Url
  let img = document.createElement("img"); //create img type html element
  //<img/>
  img.setAttribute("src", filePath); //img ke src me filePath(url) pass krdia
  // <img src="filePath"/>
  img.classList.add("photo");
  let stickyContent = createSticky();
  stickyContent.appendChild(img); //stickyContent class me img add krdo
});

let download = document.querySelector("#download");
download.addEventListener("click", function () {
  // let filePath = canvas.toDataURL("image/png"); //DataURL, canvas ka content filePath me dalde image format me
  // let aTag = document.createElement("a"); //anchor ka div bnaya
  // aTag.setAttribute("href", "filePath"); //link uska filePath me hai
  // aTag.setAttribute("download", "canvas.png"); // image download ho canvas.jpeg naam se
  // aTag.click();
  
  let url = canvas.toDataURL(); //default is png
  let a = document.createElement("a");
  a.href = url;
  a.download = "board.png";
  a.click();
  a.remove();
});
