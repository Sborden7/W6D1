const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');


function Asteroid(options){
  MovingObject.call(this, options);
  this.color = "grey";
  this.radius = 25;
  this.vel = Util.randomVec(Math.ceil(Math.random() * 4));
}

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
