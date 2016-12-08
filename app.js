//
//const app = express();

//app.listen(443, function () {
//    console.log('listening on 3000')
//})

//app.get('/', function (req, res) {
//    res.sendFile(__dirname + '/src/Admin/index.html')
//})
const express = require('express');
const server = express()
  .use((req, res) => res.sendFile(__dirname + '/src/Admin/'))
  .listen(3000, () => console.log(`Listening on 3000`));