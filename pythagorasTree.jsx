var doc = app.activeDocument;
var layer = doc.layers.add();
layer.name = "Pythagoras Tree";
var baseSize = 50;
var maxDepth = 12;


function drawPythagorasTree(x, y, size, angle, depth) 
{
  if (depth > maxDepth) return;
  var rad = angle * Math.PI / 180;
  var cosA = Math.cos(rad);
  var sinA = Math.sin(rad);
  // rectangle
  var p1 = [x, y];
  var p2 = [x + size * cosA, y + size * sinA];
  var p3 = [p2[0] - size * sinA, p2[1] + size * cosA];
  var p4 = [p1[0] - size * sinA, p1[1] + size * cosA];
  
  var square = layer.pathItems.add();
  square.setEntirePath([p1, p2, p3, p4]);
  square.stroked = false;
  square.filled = true;
  square.fillColor = getGrayColor(depth);
  square.closed = true;
  var newSize = size * Math.sqrt(2) / 2;
  
  // left side
  var leftX = p4[0];
  var leftY = p4[1];
  var leftAngle = angle + 45;
  drawPythagorasTree(leftX, leftY, newSize, leftAngle, depth + 1);

  // right side
  var rightX = p3[0] - newSize * Math.cos((angle - 45) * Math.PI / 180);
  var rightY = p3[1] - newSize * Math.sin((angle - 45) * Math.PI / 180);
  var rightAngle = angle - 45;
  drawPythagorasTree(rightX, rightY, newSize, rightAngle, depth + 1);
}

function getGrayColor(level) 
{
  var gray = new GrayColor();
  gray.gray = Math.max(10, 100 - level * 10);
  return gray;
}


drawPythagorasTree(300, 100, baseSize, 0, 1);
