const PiCamera = require("pi-camera");
// const express = require('express');
// const app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// });

// app.listen(3000, function () {
//   console.log('Server listening on port 3000!')
// });

const time = new Date().getTime();
const camera = new PiCamera({
  mode: "photo",
  output: `/tmp/analyze/${time}.jpg`,
  nopreview: true
});

camera.snap.then(() => console.log("tchick"));
