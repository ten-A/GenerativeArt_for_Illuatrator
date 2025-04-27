var lyr = app.activeDocument.activeLayer;
var depth = 5;
var size = 300;
var startX = 100;
var startY = 100;

var pathPoints = [];

var orders = [
  makeOrder("down", "up", "down", false),
  makeOrder("down", "up", "down", true),
  makeOrder("up", "down", "up", false), 
  makeOrder("up", "down", "up", true) 
  ];

var patterns = [
  [0,1,0,2,3,2,0,1,0],
  [1,0,1,3,2,3,1,0,1],
  [2,3,2,0,1,0,2,3,2],
  [3,2,3,1,0,1,3,2,3]
  ];

function drawPeano(x, y, sz, d, orderId, ps) 
{
  if (d==0) 
  {
    if (ps==1||ps==4||ps==7) return;
    pathPoints.push([x+sz/2, y+sz/2]);
    return;
  }

  var sub = sz / 3;
  var ord = orders[orderId];
  var pat = patterns[orderId];

  for (var i=0; i<9; i++) 
  {
    var dx = ord[i][0] * sub;
    var dy = ord[i][1] * sub;
    drawPeano(x+dx, y+dy, sub, d-1, pat[i], i);
  }
}


drawPeano(startX, startY, size, depth, 0, 0);
var pth = lyr.pathItems.add();
pth.closed = false;
pth.stroked = true;
pth.filled = false;
pth.strokeWidth = 0.3;
for (var i=0; i<pathPoints.length; i++)
{
  if (pth.pathPoints.length>16000)
  {
    pth = lyr.pathItems.add();
    pth.closed = false;
    pth.stroked = true;
    pth.filled = false;
    pth.strokeWidth = 0.3;
    p = pth.pathPoints.add();
    p.anchor = pathPoints[i-1];
    p.leftDirection = p.anchor;
    p.rightDirection = p.anchor;
  }
  var p = pth.pathPoints.add();
  p.anchor = pathPoints[i];
  p.leftDirection = p.anchor;
  p.rightDirection = p.anchor;
}


function makeOrder(leftDir, centerDir, rightDir, reverseCols) 
{
  function col(x, dir) 
  {
    var arr = [];
    for (var y=0; y<3; y++) 
    {
      arr.push([x, (dir=="up")? y : 2-y]);
    }
    return arr;
  }

  var cols = [col(0, leftDir), col(1, centerDir), col(2, rightDir)];
  if (reverseCols) cols.reverse();
  return [].concat(cols[0], cols[1], cols[2]);
}