var lyr = app.activeDocument.layers.add();
lyr.name = "Koch Snowflake";
var gray = new GrayColor();
gray.gray = 60;
drawKochSnowflake(lyr, 200, 300, 300, 5);

function drawKochSnowflake(ly, x, y, size, depth)
{
  var h = size * Math.sqrt(3) / 2;
  var p1 = [x, -y];
  var p2 = [x + size, -y];
  var p3 = [x + size / 2, -y - h];
  var path = ly.pathItems.add();
  path.stroked = true;
  path.strokeColor = gray;
  path.strokeWidth = 1;
  path.filled = false;
  path.closed = true;
  koch(p1, p2, depth, path);
  koch(p2, p3, depth, path);
  koch(p3, p1, depth, path);
}

function koch(a, b, dpth, path)
{
  if (dpth == 0)
  {
    addPoint(b, path);
    return;
  }
  var c = dv(ad(mlt(a, 2), b), 3);
  var d = dv(ad(mlt(b, 2), a), 3);
  var f = dv(ad(a, b), 2);
  var v0 = dv(sb(f, a), len(f, a));
  var v1 = [v0[1], -v0[0]];
  var e = sb(f, mlt(v1, Math.sqrt(3) / 6 * len(b, a)));
  koch(a, c, dpth - 1, path);
  koch(c, e, dpth - 1, path);
  koch(e, d, dpth - 1, path);
  koch(d, b, dpth - 1, path);
}

function mlt(v, n)
{
  return [v[0] * n, v[1] * n];
}

function dv(v, n) 
{
  return [v[0] / n, v[1] / n];
}

function ad(a, b)
{
  return [a[0] + b[0], a[1] + b[1]];
}

function sb(a, b)
{
  return [a[0] - b[0], a[1] - b[1]];
}

function len(a, b)
{
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}

function addPoint(p, path)
{
  var pt = path.pathPoints.add();
  pt.anchor = p;
  pt.leftDirection = pt.anchor;
  pt.rightDirection = pt.anchor;
}