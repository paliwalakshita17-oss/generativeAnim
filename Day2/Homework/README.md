 Navrasa Transition (Anger to Disgust)

Concept
An interactive visualization of the shift from  Anger to Disgust. 

Interaction
Vertical Control: The emotion is mapped to mouseY.

Melting Effect: By using mouseY as a triangle coordinate, the shapes physically stretch and "drip" toward the cursor as you move down.

Technical Highlights
Manual Gradient: I used mouseY / 500 to create a decimal (0.0 to 1.0). This tells lerpColor exactly how much to blend the Red and Green.

Layering: The sketch uses four distinct layers of triangles. Background layers are thin (strokeWeight(2)), while the central melting shard is thick (strokeWeight(10)) to give it a "sticky" feel.


Visual Choices
Color Palette: Transitioning from Pure Red (intensity) to a Muddy Moss Green (decay).

Atmosphere: The background shifts from dark red to murky olive, ensuring the entire "world" of the portrait changes mood.

Chaos: The overlapping triangles maintain a sense of turbulent energy, reflecting the chaotic nature of both emotions.