Project: Goth Girl Self-Portrait
 Interactive Character Design & Layering Logic

 Concept
This project is a stylized self-portrait in a "Goth" aesthetic. It explores the use of simple geometric shapes to build a complex character and uses interactive elements to bring the portrait to life.

Interaction

Mouse Press: When the mouse is pressed, the girl's eyes "open" (white pupils appear) and begin to look left and right and spiders start coming down 

Eye Movement: The pupils move automatically back and forth within a set boundary to create a sense of life/motion.
 Code Breakdown

1. The Layering

 I organized my code in this order:

Background: Set first so it doesn't cover anything.

Spiders: Drawn early so they appear "behind" the front hair strands but in front of the background.

Back Hair: Drawn before the face so the face sits on top of it.

Face Shape: A combination of a rect() and a triangle() for the chin.

Bangs: Drawn over the forehead.

Eyes & Lashes: Drawn last to ensure the facial features are clearly visible.

2. Variable Logic (eyeX)

I used a variable called eyeX to control the pupils.

Starting Point: eyeX = 0 means the pupils start in the center.

Offset: I add eyeX to the horizontal position of the eye (e.g., 160 + eyeX). This allows both pupils to move together using only one variable.

3. Boundaries & Speed

To keep the eyes from moving off the face, I used "If Statements" to create walls:

The Boundary: I chose 7 pixels as the limit. If the pupil moves further than 7 pixels from the center, the eyeSpeed reverses (multiplies by -1).

4. Visual Elements

Geometry: I used a triangle for the chin to give the face a sharp, stylized look.

Color Palette: High contrast (Black, White, and Deep Red) to fit the Goth theme.

Hair Strands: Used strokeWeight(4) to make the outer hair lines look like thick, bold ink strokes.
