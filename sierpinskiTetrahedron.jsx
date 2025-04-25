var lyr = app.activeDocument.layers.add();
lyr.name = "SierpinskiTetrahedron";
var colors = [];
for (var i=0; i<4; i++) 
{
  var c = new RGBColor();
  c.red = Math.random() * 127 + 128;
  c.green = Math.random() * 127 + 128;
  c.blue = Math.random() * 127 + 128;
  colors.push(c);
}

var depth = 6;
var size = 100;
// angle
var angleX = Math.PI/180 * 170;
var angleY = Math.PI/180 * 185;

// base tetrahedron
var vertices = [
  [0, 0, 0],
  [1, 0, 0],
  [0.5, Math.sqrt(3)/2, 0],
  [0.5, Math.sqrt(3)/6, Math.sqrt(6)/3]
];

var tetrahedra = [];
subdivide(vertices, depth);
tetrahedra.sort(function(a, b){return avgZ(a)-avgZ(b);});
for (var i=0; i<tetrahedra.length; i++) 
{
  drawTetrahedron(tetrahedra[i]);
}


function subdivide(vs, d) 
{
  if (d==0) 
  {
    tetrahedra.push(vs);
    return;
  }
  var mid = [];
  for (var i=0; i<4; i++)
  {
    for (var j=i+1; j<4; j++) 
    {
      var m = scale3D(add3D(vs[i], vs[j]), 0.5);
      mid.push(m);
    }
  }

  subdivide([vs[0], mid[0], mid[1], mid[2]], d-1);
  subdivide([mid[0], vs[1], mid[3], mid[4]], d-1);
  subdivide([mid[1], mid[3], vs[2], mid[5]], d-1);
  subdivide([mid[2], mid[4], mid[5], vs[3]], d-1);
}

function avgZ(vs) 
{
  var sum = 0;
  for (var i=0; i<vs.length; i++) 
  {
    sum += vs[i][2];
  }
  return sum / vs.length;
}

function project(v) 
{
  var rotated = rotate3D(v, angleX, angleY);
  var scale = size;
  var x = rotated[0] * scale + 200;
  var y = rotated[1] * scale + 500;
  return [x, y];
}

function drawTetrahedron(vs) 
{
  var faces = [[0,1,2], [0,1,3], [1,2,3], [2,0,3]];

  for (var i=0; i<4; i++) 
  {
    var face = faces[i];
    var pth = layer.pathItems.add();
    pth.stroked = true;
    pth.filled = true;
    pth.strokeWidth = 0.2;
    pth.strokeColor = colors[i];
    pth.fillColor = colors[i];
    for (var j=0; j<3; j++) 
    {
      var pt = pth.pathPoints.add();
      var p = project(vs[face[j]]);
      pt.anchor = p;
      pt.leftDirection = p;
      pt.rightDirection = p;
    }
    path.closed = true;
  }
}


// 3D calc
function add3D(a, b) 
{
  return [a[0]+b[0], a[1]+b[1], a[2]+b[2]];
}

function scale3D(v, s) 
{
  return [v[0]*s, v[1]*s, v[2]*s];
}

function rotate3D(v, angleX, angleY) 
{
  var cx = Math.cos(angleX), sx = Math.sin(angleX);
  var cy = Math.cos(angleY), sy = Math.sin(angleY);
  var y1 = v[1] * cx - v[2] * sx;
  var z1 = v[1] * sx + v[2] * cx;
  var x2 = v[0] * cy + z1 * sy;
  var z2 = -v[0] * sy + z1 * cy;
  return [x2, y1, z2];
}