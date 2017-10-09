const GameView = require('./lib/game_view.js');


document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById('game-canvas');
  canvas.height = 600;
  canvas.width = 1000;
  const ctx = canvas.getContext("2d");
  const gameView = new GameView(ctx);
  gameView.start();
});
