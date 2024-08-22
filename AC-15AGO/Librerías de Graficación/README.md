1. Sistemas de Coordenadas
2. 
El concepto de sistemas de coordenadas es fundamental en la graficación de figuras geométricas en la web.

Canvas (Sistema de Coordenadas de Píxeles)
  <canvas> utiliza un sistema de coordenadas basado en píxeles. El origen de coordenadas (0,0) está en la esquina superior izquierda del canvas.
  En el código, las funciones drawOnCanvas() utilizan este sistema de coordenadas para dibujar las figuras.

SVG (Sistema de Coordenadas Vectoriales)
  <svg> también utiliza un sistema de coordenadas similar al canvas, pero más orientado a gráficos vectoriales. En SVG, las figuras se dibujan utilizando coordenadas relativas al área de dibujo, donde (0,0) también está en la esquina superior izquierda.
  La función drawOnSVG() maneja la creación de elementos gráficos
