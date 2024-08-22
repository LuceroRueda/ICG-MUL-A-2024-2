1. Sistemas de Coordenadas
   
El concepto de sistemas de coordenadas es fundamental en la graficación de figuras geométricas en la web.

Canvas (Sistema de Coordenadas de Píxeles)
  <canvas> utiliza un sistema de coordenadas basado en píxeles. El origen de coordenadas (0,0) está en la esquina superior izquierda del canvas.
  En el código, las funciones drawOnCanvas() utilizan este sistema de coordenadas para dibujar las figuras.

SVG (Sistema de Coordenadas Vectoriales)
  <svg> también utiliza un sistema de coordenadas similar al canvas, pero más orientado a gráficos vectoriales. En SVG, las figuras se dibujan utilizando coordenadas relativas al área de dibujo, donde (0,0) también está en la esquina superior izquierda.
  La función drawOnSVG() maneja la creación de elementos gráficos

2. Librerías de Graficación
Aunque el código no utiliza librerías de graficación externas (como D3.js, Three.js, etc.), utiliza las APIs nativas de HTML5 para la graficación:

Canvas API
  El código utiliza la Canvas API, que es una librería de graficación incorporada en HTML5. Esta API permite dibujar directamente en un elemento <canvas>, utilizando JavaScript para controlar los gráficos de forma procedural.
  En drawOnCanvas(), se usan métodos de la Canvas API, como fillRect() para dibujar un rectángulo o beginPath() y arc() para dibujar un círculo.

SVG (Scalable Vector Graphics)
   El código también utiliza SVG, que es una tecnología nativa de HTML para crear gráficos vectoriales escalables. A diferencia del canvas, SVG permite la manipulación de gráficos mediante el DOM (Document Object Model), lo que significa que los elementos gráficos (como rect, circle, polygon) son directamente accesibles y manipulables en el código HTML y CSS.
   En drawOnSVG(), se crean y configuran elementos SVG como <rect>, <circle>, y <polygon>, usando métodos como setAttribute() para definir sus propiedades (posición, tamaño, colores).
