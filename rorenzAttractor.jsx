function drawLorenzAttractor(points) 
{
  var doc = app.activeDocument;
  var layer = doc.layers.add();
  layer.name = "Lorenz Attractor";

  var pth = layer.pathItems.add();
  pth.stroked = true;
  pth.strokeWidth = 1;
  pth.filled = false;
  

  var bezierPoints = [];
  var leftDirs = [];
  var rightDirs = [];

  for (var i = 1; i < points.length - 1; i++) 
  {
    var pt1 = points[i - 1];
    var pt2 = points[i];
    var pt3 = points[i + 1];
    var control1 = [pt2[0] - (pt3[0] - pt1[0]) / 6, pt2[1] - (pt3[1] - pt1[1]) / 6];
    var control2 = [pt2[0] + (pt3[0] - pt1[0]) / 6, pt2[1] + (pt3[1] - pt1[1]) / 6];

    bezierPoints.push([pt2[0], pt2[1]]);
    leftDirs.push(control1);
    rightDirs.push(control2);
  }

  for (var j = 0; j < bezierPoints.length; j++) 
  {
    var p = pth.pathPoints.add()
    p.anchor = bezierPoints[j];
    p.leftDirection = leftDirs[j];
    p.rightDirection = rightDirs[j];
  }
  pth.selected = true;
}

var points = [];
var x = 1, y = 1, z = 1;
var sigma = 10, rho = 28, beta = 8 / 3;
var dt = 0.01;

for (var i = 0; i < 4096; i++) 
{
  var dx = sigma * (y - x);
  var dy = x * (rho - z) - y;
  var dz = x * y - beta * z;

  x += dx * dt;
  y += dy * dt;
  z += dz * dt;

  points.push([x * 10 + 300, y * 10 + 300]);
}

drawLorenzAttractor(points);
app.executeMenuCommand("simplify menu item");

