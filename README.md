#Phone Painter

In preparation for the start of the Synesthesia project with Kine-Tech, I built a simple application that allows you to use your smartphone to 'paint' in an HTML5 canvas window. The application utilizes socket.IO to facilitate communication between devices in real time, and allows multiple devices to use the same canvas to to draw at the same time.

The accelerometer and gyroscope of connected mobile devices are used to get movement data, which is translated to 'paint strokes' in the canvas.

This application was the prototype on which the Synesthesia project was built. Prototyped over a single day in preperation for the kick off the kine-tech project.

### Tech Stack
* Node JS / Express for the server
* Socket.IO for communication
* HTML5 Canvas for the on-screen 'painting'
