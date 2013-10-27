
var Glsl = require("glsl.js");
var Game = require("./game");

var viewport = document.getElementById("viewport");
var score = document.getElementById("score");
var finalscore = document.getElementById("finalscore");
var gameviewport = document.getElementById("game");
var game = new Game(gameviewport);

var glsl = Glsl({
  canvas: viewport,
  fragment: document.getElementById("fragment").textContent,
  variables: {
    time: 0,
    text: gameviewport
  },
  init: function () {
    game.start();
  },
  update: function (time, delta) {
    game.update(time, delta);
    game.render(time, delta);
    this.set("time", time);
    this.sync("text");
  }
});

glsl.start();

game.win = function () {
  var s = Math.round(100000*(Math.pow(1/(+new Date()-game.startAt), 0.3)));
  glsl.stop();
  viewport.style.display = "none";
  score.style.display = "block";
  finalscore.innerHTML = s;
}

