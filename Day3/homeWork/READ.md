 Generative Grid

 Concept
 It creates a "typewriter" effect where the computer moves across the screen, flipping a coin to decide which shape to draw next.
How it Works

The Grid uses a `spacing` variable (100px) to divide the canvas into equal tiles.

Probability Logic:
10% Chance:** Draws a Square (`rect`).
90% Chance:** Draws a Circle(`ellipse`).


The Loop: The `x` coordinate resets to zero and increases `y` whenever it hits the edge of the window, perfectly filling the screen row by row.

Infinite Reset: The code includes logic to restart from the top (`y = 0`) once the screen is full, allowing the pattern to draw forever.
Responsive Design: Uses `windowWidth` so the grid adapts to any screen size automatically.


Visual Choices

Contrast:White strokes on a soft sky-blue background create a clean, blueprint-style look.
Shape Language:The mix of rigid squares and rounded circles creates a balanced, modern texture.

