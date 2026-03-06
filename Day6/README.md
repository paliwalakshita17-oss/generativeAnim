Description
So basically this sketch lets you click anywhere on the canvas and a flower grows at that spot. Every flower is different — random colours, random number of petals, random size — so the more you click the more chaotic and fun it gets.

How to Interact

Click anywhere to plant a flower
Just wait and watch it grow, you don't have to do anything after
Keep clicking to fill the whole canvas if you want


Process
I used a class for the flower because each one needs to remember its own position, size, colour and how far along it is in growing. That way the main sketch file stays super clean and just handles the loop and mouse clicks.
For the growing part I wanted it to feel gradual so I started both the petal size and stem height at 0 and just added a little bit every frame until they hit their max. The max is also random so some flowers grow big and some stay small.
Placing the petals uses cos and sin to spread them evenly in a circle basically just math telling each petal where to sit around the centre.

