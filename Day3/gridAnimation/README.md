 RGB Static Grid

Concept

An exploration of pixel manipulation and high-speed iteration. 

 How it Works

Nested Loops: The code uses two `for` loops to visit every coordinate on the canvas. The outer loop moves horizontally (`i`), and the inner loop moves vertically (`j`).
Grid Density:The `Gridsize` of 5 determines the resolution. Each "pixel" of static is actually a 5x5 circle.
Randomization: For every single circle, the computer picks a random amount of Red, Green, and Blue, resulting in millions of possible color combinations per frame.


Technical Highlights

Performance:By setting `frameRate(10)`, the sketch balances the intense math of the nested loops with a flickering, high-energy visual effect.
Full-Screen Coverage:Using `innerWidth` and `innerHeight` inside the loops ensures that the pattern scales to fill the browser window perfectly.
Color Logic: `fill(random(255), random(255), random(255))` ensures that every "cell" in the grid is independent, creating the chaotic, vibrant texture.

Visual Choices
Stark Contrast: Drawing bright, random colors against a black background (`background(0)`) makes the "static" feel more electric and intense.
Shape Language: Using `ellipse()` instead of `rect()` at a small scale gives the static a slightly softer, organic texture despite its digital nature.
