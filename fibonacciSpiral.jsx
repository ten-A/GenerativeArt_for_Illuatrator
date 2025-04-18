var lyr = app.activeDocument.activeLayer;

var gy = new GrayColor();
gy.gray = 100;
var blue = new CMYKColor();
blue.cyan = 70;
blue.magenta = 35;
blue.yellow = 0;
blue.black = 0; 

var fib = [1, 1];
for (var i=2; i<18; i++) fib[i] = fib[i-1] + fib[i-2];
var wd = 1;
var size = wd;


var x = 100;
var y = -600;
var pos = 0;
var w;

for (var i=0; i<fib.length; i++)
{
  draw (x, y, size, pos);
  w = size;
  size = wd * fib[i+1];
  switch (pos)
  {
    case 0:
      x = x + w;
      y = y - w + size;
      pos = 1;
      break;
    case 1: 
      x = x + w - size;
      y = y + size;
      pos = 2;
      break;
    case 2: 
      x = x  - size ;
      y = y;
      pos = 3;
      break;
    case 3: 
      x = x;
      y = y - w;
      pos = 0;
      break;
  }
}

function draw (x, y, sz, dr) 
{
  var p=[],h=[];
  var rct = lyr.pathItems.rectangle (y, x, sz, sz);
  rct.stroked = true;
  rct.filled = false;
  rct.strokeWidth = 0.1;
  rct.strokeColor = gy;

  var k = 0.552284749800001;
  var pth = lyr.pathItems.add();
  pth.stroked = true;
  pth.filled = false;
  pth.strokeWidth = 1.5;
  pth.strokeColor = blue;

  switch (dr)
  {
    case 0: // top-left to bottom-right
      p[0] = [x, y];
      p[1] = [x+sz, y-sz];
      h[0] = [x, y-sz*k];
      h[1] = [x + sz*(1-k), y-sz ];
      break;
    case 1: // bottom-left to top-right
      p[0] = [x, y-sz];
      p[1] = [x+sz, y];
      h[0] = [x + sz*k, y-sz];
      h[1] = [x+sz , y-sz*k];
      break;
    case 2: // bottom-right to top-left
      p[0] = [x+sz, y-sz];
      p[1] = [x, y];
      h[0] = [x+sz, y-sz*(1-k)];
      h[1] = [x+sz*k, y];
      break;
    case 3: // top-right to bottom-left
      p[0] = [x+sz, y];
      p[1] = [x, y-sz];
      h[0] = [x+sz*(1-k), y];
      h[1] = [x, y-sz*(1-k)];
      break;
  }

  for (var i=0; i<2; i++) 
  {
    var pt = pth.pathPoints.add();
    pt.anchor = p[i];
    if (i == 0) 
    {
      pt.leftDirection = p[i];
      pt.rightDirection = h[i];
    }
    else
    {
      pt.leftDirection = h[i];
      pt.rightDirection = p[i];
    }
  }
}