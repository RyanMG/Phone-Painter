var MasterController = function () {
  this.socket = 0;
  this.initDevice();
};

MasterController.prototype.emit = function(event, args) {
  this.socket.emit(event, args);
};

MasterController.prototype.initDevice = function() {
  $('#masterController').show();
};
