/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById('game-canvas');
  canvas.height = 600;
  canvas.width = 1000;
  const ctx = canvas.getContext("2d");
  const gameView = new GameView(ctx);
  gameView.start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);


function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  setInterval( () => {
    this.game.moveObjects();
    this.game.draw(this.ctx);
  }, 20);
};

module.exports = GameView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(5);


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


/***/ }),
/* 3 */
/***/ (function(module, exports) {


function MovingObject(options, game) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = game;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function(){
  this.pos = this.game.wrap(this.pos);
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};

module.exports = MovingObject;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const Util = {
  inherits (childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype);
    childClass.prototype.constructor = childClass;
  },

  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

};

module.exports = Util;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(4);
const MovingObject = __webpack_require__(3);


function Asteroid(options){
  MovingObject.call(this, options);
  this.color = "grey";
  this.radius = 25;
  this.vel = Util.randomVec(Math.ceil(Math.random() * 4));
}

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;


/***/ })
/******/ ]);