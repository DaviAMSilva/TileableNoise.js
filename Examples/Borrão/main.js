const points = 300;
var step, tN;
var offset = 0;

function setup() {
    createCanvas(w = windowWidth, h = windowHeight);
    fill(100, 255, 50);

    step = TWO_PI / points;
    tN = new TileableNoise(0.1, 0, TWO_PI);
}

function draw() {
    tN.r1 = map(mouseX, 0, width, 0.1, 3);

    background(255, 100, 20);

    beginShape();
    for (var a = 0; a < TWO_PI; a += step) {
        var r = tN.eval1D(a, offset);
        r = map(r, -1, 1, h * 0.2, h * 0.4);

        var x = cos(a) * r + w / 2;
        var y = sin(a) * r + h / 2;

        vertex(x, y);
    }
    endShape(CLOSE);

    offset += 0.01;
}

function mousePressed() {
    tN.newSeed();
}