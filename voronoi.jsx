var numPoints = 300;
var lyr = app.activeDocument.layers.add();
lyr.name = "Voronoi";
var wd = 500;
var ht = 500;

var points = [];
for (var i = 0; i < numPoints; i++) 
{
  var x = Math.random() * wd;
  var y = Math.random() * ht;
  points.push([x, y]);
}

// デロネー三角分割
function triangulate(points) 
{
  var triangles = [];
  for (var i = 0; i < points.length; i++) 
  {
    for (var j = i + 1; j < points.length; j++) 
    {
      for (var k = j + 1; k < points.length; k++) 
      {
        if (isValidTriangle(points[i], points[j], points[k], points)) 
        {
          triangles.push([points[i], points[j], points[k]]);
        }
      }
    }
  }
  return triangles;
}

// 外接円の中心と半径を求める
function circumcircle(A, B, C) 
{
  var D = 2 * ((A[0] - C[0]) * (B[1] - C[1]) - (B[0] - C[0]) * (A[1] - C[1]));
  var Ux = ((A[0] * A[0] + A[1] * A[1]) * (B[1] - C[1]) 
        + (B[0] * B[0] + B[1] * B[1]) * (C[1] - A[1]) 
        + (C[0] * C[0] + C[1] * C[1]) * (A[1] - B[1])) / D;
  var Uy = ((A[0] * A[0] + A[1] * A[1]) * (C[0] - B[0]) 
        + (B[0] * B[0] + B[1] * B[1]) * (A[0] - C[0]) 
        + (C[0] * C[0] + C[1] * C[1]) * (B[0] - A[0])) / D;
  var center = [Ux, Uy];
  var radius = Math.sqrt((A[0] - Ux) * (A[0] - Ux) + (A[1] - Uy) * (A[1] - Uy));
  return { center: center, radius: radius };
}

// デロネー条件チェック
function isValidTriangle(A, B, C, points) 
{
  var circle = circumcircle(A, B, C);
  var radiusSq = circle.radius * circle.radius;
  for (var i = 0; i < points.length; i++) 
  {
    var P = points[i];
    if (P !== A && P !== B && P !== C) 
    {
      var distSq = (P[0] - circle.center[0]) * (P[0] - circle.center[0]) 
                      + (P[1] - circle.center[1]) * (P[1] - circle.center[1]);
      if (distSq < radiusSq) return false;
    }
  }
  return true;
}

// デロネー三角分割を描画（赤色）
function drawDelaunay(layer, triangles) 
{
  var red = new CMYKColor();
  red.cyan = 0;
  red.magenta = 100;
  red.yellow = 0;
  red.black = 0;

  for (var i = 0; i < triangles.length; i++) 
  {
    var path = layer.pathItems.add();
    path.setEntirePath([triangles[i][0], triangles[i][1], triangles[i][2], triangles[i][0]]);
    path.stroked = true;
    path.strokeColor = red;
    path.strokeWidth = 0.3;
    path.filled = false;
  }
}


function drawVoronoi(layer, triangles) 
{
  var black = new GrayColor();
  black.gray = 100;
  var edges = {};
  var circumcenters = [];

  for (var i = 0; i < triangles.length; i++) 
  {
    circumcenters.push(circumcircle(triangles[i][0], triangles[i][1], triangles[i][2]).center);
  }

  // connect each center...
  for (var i = 0; i < triangles.length; i++) 
  {
    for (var j = i + 1; j < triangles.length; j++) 
    {
      if (isNeighbor(triangles[i], triangles[j])) 
      {
        var path = layer.pathItems.add();
        path.setEntirePath([circumcenters[i], circumcenters[j]]);
        path.stroked = true;
        path.strokeColor = black;
        path.strokeWidth = 0.3;
        path.filled = false;
      }
    }
  }
}

function isNeighbor(triangle1, triangle2) 
{
  var sharedVertices = 0;
  for (var i = 0; i < 3; i++) 
  {
    for (var j = 0; j < 3; j++) 
    {
      if (triangle1[i][0] === triangle2[j][0] && triangle1[i][1] === triangle2[j][1]) 
      {
        sharedVertices++;
      }
    }
  }
  return sharedVertices === 2;
}


// option draw circles.
function drawCircumcircles(layer, triangles) 
{
  var blue = new CMYKColor();
  blue.cyan = 100;
  blue.magenta = 50;
  blue.yellow = 0;
  blue.black = 0;

  for (var i = 0; i < triangles.length; i++) 
  {
    var circle = circumcircle(triangles[i][0], triangles[i][1], triangles[i][2]);
    var ellipse = layer.pathItems.ellipse(
      circle.center[1] + circle.radius,
      circle.center[0] - circle.radius,
      circle.radius * 2, circle.radius * 2);
    ellipse.stroked = true;
    ellipse.strokeColor = blue;
    ellipse.strokeWidth = 0.5;
    ellipse.filled = false;
  }
}

function drawPoints(layer, points) 
{
  var green = new CMYKColor();
  green.cyan = 80;
  green.magenta = 0;
  green.yellow = 100;
  green.black = 0;

  for (var i = 0; i < points.length; i++) 
  {
    var ellipse = layer.pathItems.ellipse(
      points[i][1] + 1, points[i][0] - 1, 2, 2);
    ellipse.stroked = false;
    ellipse.filled = true;
    ellipse.fillColor = green;
  }
}

var triangles = triangulate(points);
//drawDelaunay(layer, triangles);
drawVoronoi(lyr, triangles); 
//drawCircumcircles(lyr, triangles);
drawPoints(lyr, points);
