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

		// The range of the function
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
			// It scales acording to the ratio of the absolute values of the difference in to'A' and from'A'.
			// This is necessary because sometimes the scales of the x and y axis are different
			this.r2 = r * Math.abs(toY - fromY) / Math.abs(toX - fromX);

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

			// Calculates the angle according to the x value. If x=fromX -> angle=0; If x=toX -> angle=2 * Math.PI. Thus the position loops
			let angle = (x - this.fromX) / (this.toX - this.fromX) * 2 * Math.PI;

			// Calculates the position based on the angle and offsets the circle, so it's positive in its entirety
			let X = this.r * (Math.cos(angle) + 1);
			let Y = this.r * (Math.sin(angle) + 1);

			// Returns the noise of X, Y and t, but converts from range [-1, 1] to [0, 1]
			return (this.simplexNoise.noise3D(X, Y, t) + 1) / 2;

		}

	}



	/* eval2D(x, y, [t]): Evaluates the noise at values (x, y). */

	eval2D(x, y, t) {

		// Only works if arguments are passed in correctly
		if (!this.error) {

			// Calculates the angle1 according to the x value. If x=fromX => angle1=0; If x=toX => angle1=2 * Math.PI. Thus the position loops on the x axis
			// Calculates the angle2 according to the y value. If y=fromY => angle2=0; If y=toY => angle2=2 * Math.PI. Thus the position loops on the y axis
			let angle1 = (x - this.fromX) / (this.toX - this.fromX) * 2 * Math.PI;
			let angle2 = (y - this.fromY) / (this.toY - this.fromY) * 2 * Math.PI;

			// Calculates the 4D position based on the angle and offsets the circle, so it's positive in its entirety
			let X = this.r * (Math.cos(angle1) + 1);
			let Y = this.r * (Math.sin(angle1) + 1);
			let Z = this.r2 * (Math.cos(angle2) + 1);
			let W = this.r2 * (Math.sin(angle2) + 1);

			// Returns the noise of X, Y, Z amd W, but converts from range [-1, 1] to [0, 1]
			return (this.simplexNoise.noise4D(X, Y, Z, W) + 1) / 2;
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