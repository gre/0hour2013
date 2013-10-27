
function Game (canvas) {
  this.ctx = canvas.getContext("2d");
  this.REFRESH = 50;
  var self = this;
  window.addEventListener("keypress", function (e) {
    var keyCode = e.keyCode > 96 ? e.keyCode - 32 : e.keyCode;
    if (keyCode>64 && keyCode<=64+26)
      self.onLetterPress(String.fromCharCode(keyCode));
  });
}

Game.prototype = {
  onLetterPress: function (letter) {
    this.letterPressed = true;
    this.letterPress = letter;
  },

  start: function () {
    this.startAt = +new Date();
    this.lastT = -Infinity;
  },

  update: function (time) {
    if (this.letterPressed) {
      if (this.letterPress === this.letter) {
        this.win();
      }
      this.letterPressed = false;
    }
    if (time - this.lastT > this.REFRESH) {
      this.lastT = time;
      this.letter = String.fromCharCode(Math.floor(65+Math.random()*26));
      this.REFRESH *= 1.04;
    }
  },

  render: function () {
    var ctx = this.ctx;
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.font = "bold 160px Helvetica";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.fillText(this.letter, ctx.canvas.width/2, ctx.canvas.height/2);
  }
};

module.exports = Game;
