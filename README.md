# Tileable 1D/2D Simplex Noise Library
This is a simple library that helps creating seamless tileable noise for many uses.

**BY: DaviAMSilva**\
**VERSION: 1.0.0 (10/08/2019)**

## Introduction
																											
This class uses the idea of taking the output of a noise function, walking in a 2D circle, so the end value is equal to the start value, to allow for tileable noise, both in 1D, and 2D.\
I got inspiration from Daniel Shiffman's video: [Coding Challenge #136.1: Polar Perlin Noise Loops](https://www.youtube.com/watch?v=ZI1dmHv3MeM), from the channel: "The Coding Train". After seeing the video I wanted to try out making a 2D tileable noise function, and here I am.\

## Class Syntax
```
new TileableNoise(r, fromX, toX, [fromY], [toY])
```
- **r**: The radius of the circle from where the noise is taken. It represents the noise scale.
- **fromX**, **toX**: Represent, respectevely, the start and the end of loop that creates the noise, basically when the input value is either "fromX" or "toX", the output value will be the same (loops over). They're represent the only axis when using .eval1D, and the X axis when using .eval2D.
- **[fromY]**, **[toY]**: If not passed in, will be set equal to fromX and toX respectvely. They're only used for .eval2D as the Y axis.

## Class Methods																											
- **.eval1D(x, [t])**: Evaluates the noise at values (x, t). The input t can be used to make animations. If undefined, t is set to 0.
- **.eval2D(x, y, [t])**: Evaluates the noise at values (x, y) according to the value t. The input t can be used to make animations, although not optimal (see description at the function location). If undefined, t is set to 0.
- **.seed([value])**: Sets the seed of the internal simplex noise function as value. If value in not passed in, a random seed is selected

## TODO List

- [ ] Upload the actual library
- [ ] Make it independent from p5
- [ ] Allow to get the current seed
- [ ] Optimize it 
- [ ] Make an minimal version
