const Asteroid = require('./asteroid.js');


function Game(){
  this.DIM_X = 1000;
  this.DIM_Y = 600;
  this.NUM_ASTEROIDS = 20;
  this.addAsteroids();
}

Game.prototype.addAsteroids = function() {
  this.asteroids = [];
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    const game = this;
    this.asteroids.push(new Asteroid( {pos: this.randomPosition() }, game));
  }
};

Game.prototype.randomPosition = function(){
  const randomX = Math.ceil(Math.random() * this.DIM_X);
  const randomY = Math.ceil(Math.random() * this.DIM_Y);
  return [randomX, randomY];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.asteroids.forEach( (asteroid) => {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach( (asteroid) => {
    asteroid.move();
  });
};

Game.prototype.wrap = function(pos){
  if (pos[0] < 0) {
    return [this.DIM_X, pos[1]];
  } else if (pos[0] > this.DIM_X) {
    return [0, pos[1]];
  } else if (pos[1] < 0) {
    return [pos[0], this.DIM_Y];
  } else if (pos[1] > this.DIM_Y) {
    return [pos[0], 0];
  } else {
    return pos;
  }
};

module.exports = Game;
