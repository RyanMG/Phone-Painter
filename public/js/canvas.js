var Canvas = function(brushId) {
  this.brushId = brushId;
  this.height = $(window).height();
  this.width = $(window).width();
  this.x = this.width / 2;
  this.y = this.height / 2;
  this.lastX = this.x;
  this.lastY = this.y;
  var newC = document.createElement('canvas');
  var shell = document.getElementById('canvasShell');
  shell.appendChild(newC);
  this.c = newC;
  this.c.height = this.height;
  this.c.width = this.width;
  this.ctx = this.c.getContext('2d');
};

Canvas.prototype.emit = function(event, args) {
  this.socket.emit(events, args);
};

Canvas.prototype.draw = function(brushId, color, brushSize) {
  // clear old data.
  //this.ctx.clearRect(0,0,this.width, this.height);

  this.ctx.beginPath();
  this.ctx.strokeStyle = color;
  this.ctx.lineWidth = brushSize;
  this.ctx.lineJoin = "round";
  this.ctx.moveTo(this.lastX, this.lastY);
  this.ctx.lineTo(this.x, this.y);
  this.ctx.closePath();
  this.ctx.stroke();

  this.lastX = this.x;
  this.lastY = this.y;
};

Canvas.prototype.calculateMove = function(aX, aY, aZ, color, brushSize) {
  this.x += aX;
  this.y += aZ + 1;
  this.draw(color, brushSize);
};
''