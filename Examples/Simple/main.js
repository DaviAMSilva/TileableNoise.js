var spacing = 10; // make smaller for better quality, BE CAREFUL
var tN; // Initializing

var increment = .01; // The increment of xoff and yoff
var zoff = 0; // Initializing

function setup() {
	createCanvas(windowWidth, windowHeight);
	//noLoop();

	strokeWeight(.2);

	// The tileable noise object that loops twice because of the "/ 2"
	tN = new TileableNoise(.5, 0, increment / 2 * width / spacing, 0, increment / 2 * height / spacing);
}

function draw() {
	noStroke();

	var xoff = 0;
	for (var i = 0; i < width; i += spacing) {
		// Going through the entire x axis looping twice

		var yoff = 0;
		for (var j = 0; j < height; j += spacing) {
			// Going through the entire y axis looping twice

			// Calculating the noise value for the fill
			fill(tN.eval2D(xoff, yoff, zoff) * 255);
			square(i, j, spacing);

			yoff += increment;
		}

		xoff += increment;
	}

	// Lines indicating where the noise loops
	stroke(255, 0, 0);
	line(width / 2, 0, width / 2, height);
	line(0, height / 2, width, height / 2);

	// Uncomment to see animation
	// zoff += increment*10; 
}

function mousePressed() {
	// Get a new random seed
	tN.seed();
}