// CHANGE ME AS NEEDED
var server = '10.1.1.28:9001';

var brush;
var canvasWrapper;
var mc;

var init = function(type) {
  
  var socket = io.connect(server);

  if (type === 'brush') {
    brush = new Brush();
    socket.emit('device', { type: 'brush' });
    brush.socket = socket;
    socket.on('welcome', function (data) {
      brush.id = data.id;
      brush.message('Welcome!', 'Use your phone like you would a paintbrush, and draw on the screen!');
    });

  } else if (type === 'canvas') {
    $('#canvasShell').show();
    socket.emit('device', { type: 'canvas' });
    socket.on('welcome', function(data) {
      canvasWrapper = new CanvasWrapper(data.id, socket);
      canvasWrapper.message('Welcome!', "Connect your phone to " + server + " to start drawing!");
    });
  
  } else if (type === 'master') {
    mc = new MasterController();
    socket.emit('device', { type: 'master' });
    mc.socket = socket;
    socket.on('welcome', function(data) {
      
    });
  }

  socket.on('brushAdd', function(data) {
    if (brush instanceof Brush) {
      canvasWrapper.addView(data.brushId);
    }
  });

  socket.on('reset', function(data) {
    if (brush instanceof Brush) {
      brush.setAsController();
    }
  });

  socket.on('draw', function(data) {
    if (brush instanceof Brush) {
      canvasWrapper.assign(data);
    }
  });

  socket.on('color', function(data) {
    if (brush instanceof Brush) {
       brush.flashColor(data.color);
    }
  });
};

var initMotionListener = function() {
    
  window.addEventListener('devicemotion', function(event) {
    var aX = Math.floor(event.acceleration.x);
    var aY = Math.floor(event.acceleration.y);
    var aZ = Math.floor(event.acceleration.z);
    brush.emit("paint", {
      brushId: brush.id,
      aX: aX,
      aY: aY,
      aZ: aZ,
      color: brush.color,
      brushSize: brush.brushSize
    });
  }, false);

};

$(document).ready(function() {

  $('.modeButton').on('click touchend', function(e) {
    e.preventDefault();
    var type = $(this).data('type');
    $('#pickMode').hide();
    init(type);
  });

  $('#brushSize').on('touchend', function(e){
    brush.brushSize = this.value;
    brush.emit('brushChange', { brushSize: this.value });
  });

  $('.colorBlock').on('touchstart', function(e) {
    var color = $(this).data('color');
    brush.color = color;
    brush.emit('colorChange', { color: color });
  });

  $('.controlSpec').on('click touchend', function(e) {
    e.preventDefault();
    var option = $(this).data('option');
    switch (option) {
      case 1:
        mc.emit('makeColor', { color: '#FFFFFF' });
        break;
      case 2:
        mc.emit('makeColor', { color: '#FF0000' });
        break;
      case 3:
        mc.emit('makeColor', { color: '#FFE100' });
        break;
      case 4:
        mc.emit('reset', {});
        break;
    }
  });

  // geolocation - have not touched this yet  
  // var position;
  // var watchId = navigator.geolocation.watchPosition(function(pos) {
  //   position = pos;
  // });
     
  $('#modelWindow button').on('click', function(e) {
    e.preventDefault();
    $('#modelWindow').fadeOut(300, function() {
      $('#modelMask').fadeOut(200);
      $('#modelWindow h1').text('');
      $('#modelWindow p').text('');
    });
    if (brush instanceof Brush) {
      initMotionListener();
    }
  });

});
