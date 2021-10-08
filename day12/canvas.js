const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#60D936";
ctx.fillRect(0, 0, 600, 400);

ctx.beginPath();
ctx.arc(40, 40, 20, 0, 2 * Math.PI);
ctx.fillStyle = "white";
ctx.closePath();
ctx.fill();

ctx.beginPath();
ctx.arc(46, 30, 3, 0, 2 * Math.PI);
ctx.fillStyle = "black";
ctx.closePath();
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "#004C80";
ctx.moveTo(40, 40);
ctx.arc(40, 40, 20, -0.2, Math.PI + (Math.PI * -1.6) / 2);
ctx.closePath();
ctx.fill();

const gradient = ctx.createLinearGradient(0, 60, 0, 100);
gradient.addColorStop(0, "yellow");
gradient.addColorStop(1, "blue");

ctx.beginPath();
ctx.fillStyle = gradient;
ctx.fillRect(20, 60, 40, 40);
ctx.closePath();
ctx.fill();

ctx.beginPath();
ctx.moveTo(32, 100);
ctx.lineTo(21, 130);
ctx.closePath();
ctx.stroke();

ctx.beginPath();
ctx.setLineDash([2, 4]);
ctx.moveTo(48, 100);
ctx.lineTo(59, 130);
ctx.closePath();
ctx.stroke();

ctx.translate(80, 63);
ctx.rotate((-330 * Math.PI) / 180);
ctx.translate(-80, -63);

ctx.font = "10px serif";
ctx.fillStyle = "black";
ctx.fillText("Hello", 70, 60);
ctx.setTransform(1, 0, 0, 1, 0, 0);

ctx.beginPath();
ctx.fillStyle = "grey";
ctx.setLineDash([0, 0]);
ctx.moveTo(100, 50);
ctx.lineTo(150, 30);
ctx.lineTo(146, 20);
ctx.lineTo(170, 28);
ctx.lineTo(157, 48);
ctx.lineTo(153, 39);
ctx.lineTo(104, 59);
ctx.closePath();
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.fillRect(200, 30, 40, 40);
ctx.closePath();
ctx.fill();

const img = new Image();
img.src = "./draw.png";
img.addEventListener("load", (e) => {
  let width = 0;
  let height = 0;
  if (img.width > img.height) {
    const ratio = img.width / 40;
    width = img.width / ratio;
    height = img.height / ratio;
  } else {
    const ratio = img.height / 40;
    width = img.width / ratio;
    height = img.height / ratio;
  }

  ctx.drawImage(img, 200, 30, width, height);
  //, 40, 40
});
