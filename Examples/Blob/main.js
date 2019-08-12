const points = 300;
var step;

var tN; // Initializing
var off = 0; // Initializing

function setup() {
	createCanvas(w = windowWidth, h = windowHeight);

	step = TWO_PI / points;
	fill(100,255,50);

	// The tileable noise object
	tN = new TileableNoise(.1, 0, TWO_PI);
}

function draw() {
	background(255,100,20);
	
	beginShape();
	for (var a = 0; a < TWO_PI; a += step) {
		var r = tN.eval1D(a, off);
		r = map(r, 0, 1, h * .2, h * .4);

		var x = cos(a) * r + w / 2;
		var y = sin(a) * r + h / 2;

		vertex(x, y);
	}
	endShape(CLOSE);

	// Animation
	off += .01;
	
	// Dinamically change the radius of the noise object
	tN.r = map(mouseX, 0, width, .1, 3);
}

function mousePressed() {
	// Get a new random seed
	tN.seed();
}