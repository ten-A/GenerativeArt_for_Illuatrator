var depth = 7;
var size = 500;
var doc = app.activeDocument;
var layer = doc.layers.add();
layer.name = "Hilbert Curve";
var pth = layer.pathItems.add();
pth.stroked = true;
pth.strokeWidth = 1;
pth.filled = false;
var points = [];

drawHilbert(depth, 0, 0, size, 1, 0, 0, 1);
     

for (var i = 0; i < points.length; i++) 
{
  var pt = pth.pathPoints.add();
  pt.anchor = points[i];
  pt.leftDirection = pt.anchor;
  pt.rightDirection = pt.anchor;
  if (pth.pathPoints.length>16000) pth = layer.pathItems.add();
}

function drawHilbert(d, x, y, size, xi, xj, yi, yj) 
{
  if (d <= 0) 
  {
    var px = x + (xi + yi) * size / 2;
    var py = y + (xj + yj) * size / 2;
    points.push([px, -py]);
    return;
  }
  drawHilbert(d - 1, x, y, size / 2, yi, yj, xi, xj);
  drawHilbert(d - 1, x + xi * size / 2, y + xj * size / 2, size / 2, xi, xj, yi, yj);
  drawHilbert(d - 1, x + xi * size / 2 + yi * size / 2, y + xj * size / 2 + yj * size / 2, size / 2, xi, xj, yi, yj);
  drawHilbert(d - 1, x + xi * size / 2 + yi * size, y + xj * size / 2 + yj * size, size / 2, -yi, -yj, -xi, -xj);
}
