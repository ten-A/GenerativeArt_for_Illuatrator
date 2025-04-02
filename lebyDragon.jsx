var doc = app.activeDocument;
var lyr = doc.layers.add();
layer.name = "Levy C curve";

var depth = 13;
var length = 200;

var start = [300, 500];
var end = [300 + length, 500];

function drawLevyC(p1, p2, d, lyr) 
{
  if (d==0) 
  {
    drawLine(p1, p2, lyr);
    return;
  }

  var mid = [(p1[0]+p2[0])/2+(p2[1]-p1[1])/2, (p1[1]+p2[1])/2-(p2[0]-p1[0])/2];
  drawLevyC(p1, mid, d - 1, lyr);
  drawLevyC(mid, p2, d - 1, lyr);
}

function drawLine(p1, p2, lyr) 
{
  var path = lyr.pathItems.add();
  path.stroked = true;
  path.strokeWidth = 1;
  path.filled = false;
  var points = [[p1[0], -p1[1]], [p2[0], -p2[1]]];
  path.setEntirePath(points);
}

drawLevyC(start, end, depth, layer);