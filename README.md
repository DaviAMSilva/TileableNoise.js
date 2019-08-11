# TileableNoise.js

**TileableNoise.js** is a simple library that helps creat seamless tileable noise for many uses.
The Simplex Noise implementation by *jwagner* is required.

## Introduction

This class uses the idea of taking the output of a noise function, walking in a 2D circle, so the end value is equal to the start value, to allow for tileable noise, both in 1D.\
By utilizing 2 circles in a 4D noise space it was possible to make tileable noise in a 2D enviroment.
I got inspiration from Daniel Shiffman's video: [Coding Challenge #136.1: Polar Perlin Noise Loops](https://www.youtube.com/watch?v=ZI1dmHv3MeM), from the channel: "The Coding Train". After seeing the video I wanted to try out making a 2D tileable noise function, and here I am.

## Examples

![Tileable noise example with red lines marking the seamless tile](images/example_simple.png)
*Image made with the library. Red lines mark the seamless tile*

![Colorful image generated with 3 noise functions](images/example_rgb.png)
*Using 3 noise functions as the color channels to get a colorful tileable image*

![Seamless noise generated black blob](images/example_blob.png)
*Noise generated blob that doesn't has an begin/end at the circumference*

## TODO List

- [ ] Make it independent from p5.js
- [ ] Add function to get the current seed
- [ ] Make a Processing version
- [ ] Make a minimal version
- [ ] Optimize it

<!-- ## Class Syntax
```
new TileableNoise(r, fromX, toX, [fromY], [toY])
Output: [0, 1]
```
- **r**: The radius of the circle from where the noise is taken. It represents the noise scale.
- **fromX**, **toX**: Represent, respectevely, the start and the end of loop that creates the noise, basically when the input value is either "fromX" or "toX", the output value will be the same (loops over). They're represent the only axis when using .eval1D, and the X axis when using .eval2D.
- **[fromY]**, **[toY]**: If not passed in, will be set equal to fromX and toX respectvely. They're only used for .eval2D as the Y axis.

## Class Methods

- **.eval1D(x, [t])**: Evaluates the noise at values (x, t). The input t can be used to make animations. If undefined, t is set to 0.
- **.eval2D(x, y, [t])**: Evaluates the noise at values (x, y) according to the value t. The input t can be used to make animations, although not optimal (see description at the function location). If undefined, t is set to 0.
- **.seed([value])**: Sets the seed of the internal simplex noise function as value. If value in not passed in, a random seed is selected -->
