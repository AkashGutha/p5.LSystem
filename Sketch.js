var ls, i;
var step = 512;

function setup() {
	createCanvas(windowWidth , windowHeight );
	background(200);
	angleMode(DEGREES);

	ls = new LSystem(width / 2, height / 2, -90);

	ls.setStep(5);
	ls.setAngle(90);
	ls.addRule('X', 'X+YF+');
	ls.addRule('Y', '-FX-Y');
	ls.setAxiom('FX');

	ls.runfor(12);
	ls.draw();

}

function draw() {

}