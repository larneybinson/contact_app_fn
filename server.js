//To run angular build using express js and run on node server
//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
// app.use(express.static(__dirname + '/assets'));

// app.get('/app/*', (req, res) => {
//     console.log(req.path);
//     res.sendFile(path.join(__dirname, req.path));
// })

app.get('/', function(req,res) {
    console.log(path.join(__dirname, 'dist', 'contact-app', req.path));
  res.sendFile(path.join(__dirname, 'dist', 'contact-app', 'index.html'));
});

app.get('/*', function(req,res) {
    console.log(path.join(__dirname, 'dist', 'contact-app', req.path));
  res.sendFile(path.join(__dirname, 'dist', 'contact-app', req.path));
});

app.listen(4256,()=>{
    console.log("Listenning on ", 4256);
});

