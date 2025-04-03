function remap(x, t1, t2, s1, s2) 
{
  var f = (x - t1) / (t2 - t1);
  return f * (s2 - s1) + s1;
}

function applyColor(c, rct, clr) 
{
  var r, g, b;
  var p = c / 64;
  var l = ~~(p * 6), o = p * 6 - l, q = 1 - o;
  switch (l % 6) 
  {
    case 0: r = 1; g = o; b = 0; break;
    case 5: r = q; g = 1; b = 0; break;
    case 1: r = 0; g = 1; b = o; break;
    case 4: r = 0; g = q; b = 1; break;
    case 3: r = o; g = 0; b = 1; break;
    case 2: r = 1; g = 0; b = q; break;
  }
  clr.red = r * 255;
  clr.blue = b * 255;
  clr.green = g * 255;
  rct.fillColor = clr;
}

function startDraw() {
  var maxIterations = 200;
  var minX = -1.5, maxX = 1.5;
  var minY = -1.5, maxY = 1.5;
  var jsX = -0.70176, jsY = -0.3842; // ジュリア集合のパラメータ
  var wid = 640;
  var hei = 480;
  var clrbk = new RGBColor;
  clrbk.red = 0;
  clrbk.blue = 0;
  clrbk.green = 0;
  var clr = new RGBColor;
  
  var lyr = app.activeDocument.layers.add();
  lyr.name = "JuliaSet";

  for (var j = 0; j < hei; j++) 
  {
    for (var i = 0; i < wid; i++) 
    {
      var a = remap(i, 0, wid, minX, maxX);
      var b = remap(j, 0, hei, minY, maxY);
      var cnt = 0;

      while (++cnt < maxIterations) 
      {
        var za = a * a;
        var zb = b * b;
        if (za + zb > 4) break;
        var as = za - zb;
        var bs = 2 * a * b;
        a = as + jsX;
        b = bs + jsY;
      }
      
      var rect = lyr.pathItems.rectangle(-j, i, 1, 1);
      rect.stroked = false;
      if (cnt < maxIterations) applyColor(cnt, rect, clr);
      else rect.fillColor = clrbk;
    }
  }
}

startDraw();