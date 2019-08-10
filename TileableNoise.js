/* 
	MADE BY:
	 ____                    _      _      __  __   ____    _   _                 
	|  _ \    __ _  __   __ (_)    / \    |  \/  | / ___|  (_) | | __   __   __ _ 
	| | | |  / _` | \ \ / / | |   / _ \   | |\/| | \___ \  | | | | \ \ / /  / _` |
	| |_| | | (_| |  \ V /  | |  / ___ \  | |  | |  ___) | | | | |  \ V /  | (_| |
	|____/   \__,_|   \_/   |_| /_/   \_\ |_|  |_| |____/  |_| |_|   \_/    \__,_|
*/

class TileableNoise {



	constructor(r, fromX, toX, fromY, toY) {

		this.fromX = fromX;
		this.toX = toX;

		if (arguments.length === 3) {

			// If fromY and toY are not passed in they get assigned the same as fromX and toX, respectevely...
			this.fromY = fromX;
			this.toY = toX;

			// r is the radius of the first circle from where the noise is taken. It represents the noise scale of the x axis.
			this.r = r;

			// Here r2 is equal to r because the x axis is "equal" to the y axis
			this.r2 = r;

		} else if (arguments.length === 5) {

			// ... else It's assigned as normal
			this.fromY = fromY;
			this.toY = toY;

			// r is the radius of the first circle from where the noise is taken. It represents the noise scale of the x axis.
			this.r = r;

			// r2 is the radius of the second circle . It represents the noise scale of the y axis.
			// It scales acording to the ratio of the absolute values of the difference in toA and fromA.
			// This is necessary because sometimes the scales of the x and y axis are different
			this.r2 = r * abs(toY - fromY) / abs(toX - fromX);

		} else {

			// If arguments are passed in incorrectly the code simply won't run
			console.error("An invalid number of arguments was passed in (" + arguments.length + ", instead of 3 or 5)");

			// If error = true, the code is skipped
			this.error = true;

		}

		// Stores the noise function
		this.simplexNoise = new SimplexNoise();

	}



	/* eval1D(x, [t]): Evaluates the noise at values (x, t). The input t can be used to make animations. If undefined, t is set to 0. */

	eval1D(x, t) {

		// Only works if arguments are passed in correctly
		if (!this.error) {

			// If t is not passed in, it's set to 0
			if (arguments.length === 1) t = 0;

			// Calculates the angle according to the x value. If x=fromX => angle=0; If x=toX => angle=TWO_PI. Thus the position loops
			var angle = map(x, this.fromX, this.toX, 0, TWO_PI);

			// Calculates the position based on the angle and offsets the circle, so it's positive in its entirety
			var X = this.r * (cos(angle) + 1);
			var Y = this.r * (sin(angle) + 1);

			// Returns the noise of X, Y and t, but converts from range [-1, 1] to [0, 1]
			return (this.simplexNoise.noise3D(X, Y, t) + 1) / 2;

		}

	}



	/* eval2D(x, y, [t]): Evaluates the noise at values (x, y) according to the value t. The input t can be used to make animations, 
	although not optimal (see description at the function location). If undefined, t is set to 0. */

	eval2D(x, y, t) {

		// Only works if arguments are passed in correctly
		if (!this.error) {

			if (arguments.length === 2) t = 0;

			// Calculates the angle1 according to the x value. If x=fromX => angle1=0; If x=toX => angle1=TWO_PI. Thus the position loops on the x axis
			// Calculates the angle2 according to the y value. If y=fromY => angle2=0; If y=toY => angle2=TWO_PI. Thus the position loops on the y axis
			var angle1 = map(x, this.fromX, this.toX, 0, TWO_PI);
			var angle2 = map(y, this.fromY, this.toY, 0, TWO_PI);

			// By having "t" always positive the inputs of the noise valuve can't be negative 
			var T = abs(t);

			// Calculates the 4D position based on the angle and offsets the circle, so it's positive in its entirety
			var X = this.r * (cos(angle1) + 1 + T);
			var Y = this.r * (sin(angle1) + 1 + T);
			var Z = this.r2 * (cos(angle2) + 1 + T);
			var W = this.r2 * (sin(angle2) + 1 + T);

			// Returns the noise of X, Y, Z amd W, but converts from range [-1, 1] to [0, 1]
			return (this.simplexNoise.noise4D(X, Y, Z, W) + 1) / 2;

			/*
			Unfortunately the animation of the 2D tileable noise is not great because I wasn't able to find any 5D noise implementation, which was needed to make this work.
			Thus I had to animate the noise by moving the 2 circles through the noise space which gives some weird results that I wasn't able to solve.
			So I wouldn't recommend using animation on 2D tileable noise
			*/

		}

	}



	/* seed([value]): Sets the seed of the internal simplex noise function as value. If value in not passed in, a random seed is selected */

	seed(value) {

		// Only works if arguments are passed in correctly
		if (!this.error) {

			// Sets the seed of the internal simplex noise function as value. If value in not passed in, a random seed is selected
			this.simplexNoise = new SimplexNoise(value);

		}

	}



}