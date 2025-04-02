var lyr = app.activeDocument.layers.add();
lyr.name = "Barnsley Fern";

var iterations = 20000;

var x = 0, y = 0;

var green = new CMYKColor();
green.cyan = 50;
green.magenta = 0;
green.yellow = 80;
green.black = 0;

for (var i = 0; i < iterations; i++) 
{
  var r = Math.random();
  var nextX, nextY;
  
  if (r < 0.01) 
  {  // root
    nextX = 0;
    nextY = 0.16 * y;
  }
  else if (r < 0.86) 
  {  // 1st
    nextX = 0.85 * x + 0.04 * y;
    nextY = -0.04 * x + 0.85 * y + 1.6;
  } 
  else if (r < 0.93) 
  {  // 2nd
    nextX = 0.2 * x - 0.26 * y;
    nextY = 0.23 * x + 0.22 * y + 1.6;
  }
  else 
  {  // 3rd
    nextX = -0.15 * x + 0.28 * y;
    nextY = 0.26 * x + 0.24 * y + 0.44;
  }
  
  x = nextX;
  y = nextY;

  var px = 250 + x * 50;
  var py = -100 - y * 50;

  var pt = lyr.pathItems.ellipse(py, px, 1, 1);
  pt.filled = true;
  pt.fillColor = green;
  pt.stroked = false;
}