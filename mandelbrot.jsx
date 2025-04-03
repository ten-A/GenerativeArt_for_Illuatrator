function remap(x, t1, t2, s1, s2) 
{
  return (x - t1) / (t2 - t1) * (s2 - s1) + s1;
}

function applyColor(c, rect, clr, maxIterations) 
{
  var p = c / maxIterations;
  var l = Math.floor(p * 6), o = p * 6 - l, q = 1 - o;
  var r, g, b;
  switch (l % 6) 
  {
    case 0: r = 1; g = o; b = 0; break;
    case 1: r = q; g = 1; b = 0; break;
    case 2: r = 0; g = 1; b = o; break;
    case 3: r = 0; g = q; b = 1; break;
    case 4: r = o; g = 0; b = 1; break;
    case 5: r = 1; g = 0; b = q; break;
  }
  clr.red = r * 255;
  clr.green = g * 255;
  clr.blue = b * 255;
  rect.fillColor = clr;
}

function drawMandelbrot() 
{
  var maxIterations = 100;
  var minX = -2, maxX = 1, minY = -1.5, maxY = 1.5;
  var width = 480, height = 640;
  var clr = new RGBColor();
  var clrbk = new RGBColor();
  clrbk.red = clrbk.green = clrbk.blue = 0;
  
  var doc = app.activeDocument;
  var layer = doc.layers.add();
  layer.name = "Mandelbrot Set";
  
  for (var j = 0; j < height; j++) 
  {
    for (var i = 0; i < width; i++) 
    {
      var a = remap(i, 0, width, minX, maxX);
      var b = remap(j, 0, height, minY, maxY);
      var ca = a, cb = b;
      var count = 0;
      
      while (count < maxIterations) 
      {
        var aa = a * a - b * b;
        var bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a * a + b * b > 16) break;
        count++;
      }
      
      var rect = layer.pathItems.rectangle(-j, i, 1, 1);
      rect.stroked = false;
      if (count < maxIterations) applyColor(count, rect, clr, maxIterations);
      else rect.fillColor = clrbk;
    }
  }
}

drawMandelbrot();
