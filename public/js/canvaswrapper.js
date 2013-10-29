var CanvasWrapper = function(id, socket) {
  this.id = id;
  this.socket = socket;
  this.canvases = {};
};

CanvasWrapper.prototype.message = function(headline, message) {
  $('#modelWindow h1').text(headline);
  $('#modelWindow p').text(message);
  $('#modelMask').fadeIn(300, function() {
    $('#modelWindow').fadeIn(400);
  });
};

CanvasWrapper.prototype.addView = function(brushId) {
  var canvas = new Canvas(brushId);
  this.canvases[brushId] = canvas;
};

CanvasWrapper.prototype.assign = function(data) {
  console.log(this.canvases[data.brushId]);
  this.canvases[data.brushId] && this.canvases[data.brushId].calculateMove(data.aX, data.aY, data.aZ, data.color, data.brushSize);
};

