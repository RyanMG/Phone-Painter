var Brush = function() {
  this.socket = {};
  this.id = 0;
  this.color = '#FF0000';
  this.brushSize = 1;
  this.initDevice();
};

Brush.prototype.initDevice = function() {
  $('#drawOptions').show();
};

Brush.prototype.emit = function(event, args) {
  this.socket.emit(event, args);
};

Brush.prototype.message = function(headline, message) {
  $('#modelWindow h1').text(headline);
  $('#modelWindow p').text(message);
  $('#modelMask').fadeIn(300, function() {
    $('#modelWindow').fadeIn(400);
  });
};
