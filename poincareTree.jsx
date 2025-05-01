//mobius translation
function mobius(z, a, b, c, d) 
{
  var numerator = a.mul(z).add(b);
  var denominator = c.mul(z).add(d);
  return numerator.div(denominator);
}

// composit: M2 ∘ M1
function composeMobius(m1, m2) 
{
  return {
    a: m2.a.mul(m1.a).add(m2.b.mul(m1.c)),
    b: m2.a.mul(m1.b).add(m2.b.mul(m1.d)),
    c: m2.c.mul(m1.a).add(m2.d.mul(m1.c)),
    d: m2.c.mul(m1.b).add(m2.d.mul(m1.d))
  };
}

// invert translation
function invertMobius(m) 
{
  return {
    a: m.d,
    b: m.b.neg(),
    c: m.c.neg(),
    d: m.a
  };
}

// rotate and scaling
function mobiusRotateScaleOrigin(theta, scale) 
{
  var r = Math.sqrt(scale);
  var a = Complex.expi(theta / 2).mul(new Complex(r, 0));
  var d = Complex.expi(-theta / 2).mul(new Complex(1 / r, 0));
  return { a: a, b: new Complex(0, 0), c: new Complex(0, 0), d: d };
}

// translate z -> z - w
function mobiusTranslate(w) 
{
  return {
    a: new Complex(1, 0),
    b: w.neg(),
    c: new Complex(0, 0),
    d: new Complex(1, 0)
  };
}

// recursion
function drawTree(doc, cx, cy, R, z0, z1, depth) 
{
  if (depth === 0) return;

  drawLine(doc, cx, cy, R, z0, z1);

  var angle = Math.PI / 36;
  var scale = 1.2;

  for (var i = -1; i <= 1; i += 2) 
  {
    var theta = i * angle;

    // z1 -> center and invert
    var T1 = mobiusTranslate(z1);
    var T2 = invertMobius(T1);

    // rotate and scaling
    var Rtheta = mobiusRotateScaleOrigin(theta, scale);

    // mobius tlanslation： M = T2 ∘ Rtheta ∘ T1
    var M = composeMobius(composeMobius(T2, Rtheta), T1);

    // new end point z2 = M(z1)
    var z2 = mobius(z1, M.a, M.b, M.c, M.d);

    drawTree(doc, cx, cy, R, z1, z2, depth - 1);
  }
}

// draw
function drawLine(doc, cx, cy, R, z1, z2) 
{
  var x1 = cx + z1.re * R;
  var y1 = cy - z1.im * R;
  var x2 = cx + z2.re * R;
  var y2 = cy - z2.im * R;

  var path = doc.pathItems.add();
  path.setEntirePath([[x1, y1], [x2, y2]]);
  path.stroked = true;
  path.filled = false;
  path.strokeWidth = 0.5;
}

// complex class
function Complex(re, im) 
{
  this.re = re;
  this.im = im;
}
Complex.prototype.add = function(z) 
{
  return new Complex(this.re + z.re, this.im + z.im);
};
Complex.prototype.sub = function(z) 
{
  return new Complex(this.re - z.re, this.im - z.im);
};
Complex.prototype.mul = function(z) 
{
  return new Complex(
    this.re * z.re - this.im * z.im,
    this.re * z.im + this.im * z.re
  );
};
Complex.prototype.div = function(z) 
{
  var denom = z.re * z.re + z.im * z.im;
  return new Complex(
    (this.re * z.re + this.im * z.im) / denom,
    (this.im * z.re - this.re * z.im) / denom
  );
};
Complex.prototype.conj = function() 
{
  return new Complex(this.re, -this.im);
};
Complex.prototype.neg = function() 
{
  return new Complex(-this.re, -this.im);
};
Complex.expi = function(theta) 
{
  return new Complex(Math.cos(theta), Math.sin(theta));
};

var doc = app.activeDocument;
var cx = 200, cy = 400, R = 30;
var maxDepth = 16;
var z0 = new Complex(0, 0);
var z1 = new Complex(0, 0.3);
drawTree(doc, cx, cy, R, z0, z1, maxDepth);










    