var doc = app.activeDocument;
var lyr = doc.layers.add();
lyr.name = "Penrose Tiling";

var goldenRatio = (1 + Math.sqrt(5)) / 2;
var baseLength = 100;

// angle
var theta1 = Math.PI * 36 / 180;6
var theta2 = Math.PI * 72 / 180;

// Kite
function drawKite(x, y, angle, depth) 
{
  if (depth <= 0) return;
  var points = [
      [x, y],
      [x + baseLength * Math.cos(angle), y + baseLength * Math.sin(angle)],
      [x + (baseLength / goldenRatio) * Math.cos(angle + theta1), y + (baseLength / goldenRatio) * Math.sin(angle + theta1)]
    ];
  drawPolygon(points, depth);
  var newSize = baseLength / goldenRatio;
  drawKite(points[1][0], points[1][1], angle - theta2, depth - 1);
  drawDart(points[2][0], points[2][1], angle + theta1, depth - 1);
}

// Dart
function drawDart(x, y, angle, depth) 
{
  if (depth <= 0) return;
  var points = [
      [x, y],
      [x + baseLength * Math.cos(angle), y + baseLength * Math.sin(angle)],
      [x + (baseLength / goldenRatio) * Math.cos(angle - theta2), y + (baseLength / goldenRatio) * Math.sin(angle - theta2)]
    ];
  drawPolygon(points, depth);
  var newSize = baseLength / goldenRatio;
  drawDart(points[1][0], points[1][1], angle + theta1, depth - 1);
  drawKite(points[2][0], points[2][1], angle - theta2, depth - 1);
}

// polygon
function drawPolygon(points, dp) 
{
  var path = lyr.pathItems.add();
  path.setEntirePath(points);
  path.closed = true;
  path.filled = true;
  path.fillColor = getGrayColor(dp);
  path.stroked = false;
}

function getGrayColor(level) 
{
  var gray = new GrayColor();
  gray.gray = Math.max(10, 100 - level * 15);
  return gray;
}


for (var i = 0; i < 5; i++) 
{
  var angle = i * (2 * Math.PI / 5);
  drawKite(300, 300, angle, 4);
  drawDart(300, 300, angle + theta1, 4);
}




    