Grid Systems & Functional Animation 
Description

It explores how loops and custom functions can work together to create an organized yet interactive digital canvas.

Implementation & Logic

Nested Loops (The Grid): used two for loops to create a consistent grid across the 500x500 canvas. This required variables (let i and let j) to avoid the infinite loops that occur when variables are undefined or typed incorrectly.

Custom Functions (The Boat): wrapped the boat's geometry into a drawBoat(x, y) function. By using relative coordinates (like x + 20), the sail stays attached to the hull no matter where it is drawn.

Moving ellipses:  variables x and y are updated with ++ and -- to make circles move across the screen automatically.

