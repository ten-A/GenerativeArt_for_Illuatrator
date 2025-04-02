var doc = app.activeDocument;
var layer = doc.layers.add();
layer.name = "Sierpinski Carpet";

var maxDepth = 4; // 再帰の深さ
var baseSize = 300;

function getGrayColor(level) 
{
  var gray = new GrayColor();
  gray.gray = Math.max(10, 100 - level * 10);
  return gray;
}

function drawCarpet(x, y, size, depth) 
{
  if (depth > maxDepth) return;

  var rect = layer.pathItems.rectangle(y, x, size, size);
  rect.stroked = false;
  rect.filled = true;
  rect.fillColor = getGrayColor(depth);
  if (depth == maxDepth) return;
  var newSize = size / 3;
  for (var i = 0; i < 3; i++) 
  {
    for (var j = 0; j < 3; j++) 
    {
      if (i == 1 && j == 1) continue; // remove center one
      drawCarpet(x + j * newSize, y - i * newSize, newSize, depth + 1);
    }
  }
}

drawCarpet(100, 500, baseSize, 1);