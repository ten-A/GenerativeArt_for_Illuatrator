var lyr = app.activeDocument.layers.add();
lyr.name = "Fractal Tree";
var gy = new GrayColor();
gy.gray = 50;
drawFractalTree(layer, 300, 500, 100, -Math.PI/2, 8);

function noise(x) 
{
  return (Math.sin(x*0.1) + Math.sin(x*0.07)*0.5 + Math.sin(x*0.03)*0.25)*0.5 + 0.5;
}

function drawFractalTree(ly, x1, y1, length, angle, depth) 
{
  if (depth === 0)
  {
  	drawLeaf(layer, x1, y1, length);
    return;
  }
  var x2 = x1 + length * Math.cos(angle);
  var y2 = y1 + length * Math.sin(angle);
  var branch = layer.pathItems.add();
  branch.setEntirePath([[x1, -y1], [x2, -y2]]);
  branch.stroked = true;
  branch.strokeWidth = depth;
  branch.strokeColor = gy;
    
  var newLength = length * (0.5 + noise(depth)*0.3); 
  var angleVariation = (Math.PI / 6) * (0.4+noise(depth)*0.3);
  drawFractalTree(layer, x2, y2, newLength, angle - angleVariation, depth-1);
  drawFractalTree(layer, x2, y2, newLength, angle + angleVariation, depth-1);
}

function drawLeaf(ly, x, y, size)
{
  var leafSize = size * (0.3 + Math.random() * 0.7); 
  var leaf = ly.pathItems.ellipse(-y-leafSize/2, x-leafSize/2, leafSize, leafSize);
  leaf.filled = true;
  var green = new RGBColor();
  green.red = Math.random() * 50;
  green.green = 100 + Math.random() * 155;
  green.blue = Math.random() * 50;
  leaf.fillColor = green;
  leaf.stroked = false;
}