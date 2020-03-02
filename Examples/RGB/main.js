var spacing = 10;
var t1, t2, t3;
var increment = 0.01;

function setup() {
    createCanvas(windowWidth, windowHeight);
    strokeWeight(0.2);

    t1 = new TileableNoise(0.2, 0, increment / 2 * width / spacing, 0, increment / 2 * height / spacing);
    t2 = new TileableNoise(0.2, 0, increment / 2 * width / spacing, 0, increment / 2 * height / spacing);
    t3 = new TileableNoise(0.2, 0, increment / 2 * width / spacing, 0, increment / 2 * height / spacing);
}

function draw() {
    noStroke();

    var xoff = 0;
    for (var i = 0; i < width; i += spacing) {

        var yoff = 0;
        for (var j = 0; j < height; j += spacing) {

            var r = (t1.eval2D(xoff, yoff) + 1) * 255 / 2;
            var g = (t2.eval2D(xoff, yoff) + 1) * 255 / 2;
            var b = (t3.eval2D(xoff, yoff) + 1) * 255 / 2;

            fill(r, g, b);
            square(i, j, spacing);

            yoff += increment;
        }

        xoff += increment;
    }

    stroke(255, 0, 0);
    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);

}

function mousePressed() {
    t1.newSeed();
    t2.newSeed();
    t3.newSeed();
}