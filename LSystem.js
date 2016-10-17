/**
 * 
 */

function state(x, y, angle) {
	this.x = x;
	this.y = y;
	this.angle = angle;
}

function LSystem(x, y, angle) {

	this.rules = [];
	this.x = x;
	this.y = y;
	this.angle = 0;
	if (angle != null)
		this.angle = angle;

	this.step = 20;
	this.dAngle = 0;

	this.axiom = '';

	this.posStack = [];
	this.originState = new state(x, y, this.angle, this.dAngle);
};

LSystem.prototype.setStep = function(step) {
	this.step = step;
};

LSystem.prototype.setAngle = function(angle) {
	this.dAngle = angle;
};

LSystem.prototype.pushPos = function() {
	this.posStack.push(new state(this.x, this.y, this.angle));
};

LSystem.prototype.popPos = function() {
	return this.posStack.pop();
};

LSystem.prototype.reset = function() {
	this.x = this.originState.x;
	this.y = this.originState.y;
	this.angle = this.originState.angle;
	this.dAngle = this.originState.dAngle;
};

LSystem.prototype.addRule = function(alphabet, replace) {
	if (this.rules[alphabet] != null)
		console.log("a rule has been replaced");
	this.rules[alphabet] = replace;
};

LSystem.prototype.draw = function() {
	for ( var i = 0; i < this.axiom.length; i++) {
		var char = this.axiom.charAt(i)
		switch (char) {
		case 'A':
		case 'F':
			// console.log('draw forward\n');

			var nx = this.x - this.step * sin(this.angle);
			var ny = this.y - this.step * cos(this.angle);

			line(this.x, this.y, nx, ny);

			this.x = nx;
			this.y = ny;

			break;
		case 'B':
			// console.log('move backrward\n');
			this.x = this.x - this.step * sin(this.angle);
			this.y = this.y - this.step * cos(this.angle);
			break;
		case '+':
			// console.log('angle added\n');
			this.angle += this.dAngle;
			break;
		case '-':
			// console.log('angle subbed\n');
			this.angle -= this.dAngle;
			break;
		case '[':
			// console.log('angle subbed\n');
			this.pushPos();
			break;
		case ']':
			// console.log('angle subbed\n');
			var prevPos = this.popPos();
			this.x = prevPos.x;
			this.y = prevPos.y;
			this.angle = prevPos.angle;
			break;
		}
	}
};

LSystem.prototype.setAxiom = function(axiom) {
	this.axiom = axiom;
};

LSystem.prototype.run = function() {
	var _axiom = '';
	for ( var i = 0; i < this.axiom.length; i++) {
		if (this.axiom.charAt(i) in this.rules) {
			_axiom += this.rules[this.axiom[i]];
		}
	}
	this.axiom = _axiom;
	return _axiom;
};

LSystem.prototype.runfor = function(n) {
	var _axiom = '';

	for ( var j = 0; j < n; j++) {
		for ( var i = 0; i < this.axiom.length; i++) {
			if (this.axiom.charAt(i) in this.rules)
				_axiom += this.rules[this.axiom[i]];
			else
				_axiom += this.axiom.charAt(i);
		}
		this.axiom = _axiom;
		_axiom = '';
	}
	return this.axiom;
};