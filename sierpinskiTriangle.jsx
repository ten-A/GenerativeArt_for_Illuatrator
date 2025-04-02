function drawSierpinskiTriangle(layer, x, y, size, depth)
{
  if (depth === 0)
  {
    var triangle = layer.pathItems.add();
    triangle.setEntirePath([
      [x, -y],
      [x + size / 2, -y + size * Math.sin(Math.PI / 3)],
      [x + size, -y]
      ]);

      triangle.filled = true;
      triangle.fillColor = getRandomColor();
      triangle.stroked = false;
      triangle.closed = true;
      return;
  } 

  var newSize = size / 2;
  drawSierpinskiTriangle(layer, x, y, newSize, depth - 1);
  drawSierpinskiTriangle(layer, x + newSize, y, newSize, depth - 1);
  drawSierpinskiTriangle(layer, x + newSize / 2, y - newSize * Math.sin(Math.PI / 3), newSize, depth - 1);
}

function getRandomColor()
{
  var color = new RGBColor();
  color.red = Math.random() * 255;
  color.green = Math.random() * 255;
  color.blue = Math.random() * 255;
  return color;
}

var doc = app.activeDocument;
var lyr = doc.layers.add();
lyr.name = "Sierpinski Triangle";

drawSierpinskiTriangle(layer, 100, 500, 400, 5);