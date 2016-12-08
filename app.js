//const express = require('express');
//const app = express();

//app.listen(443, function () {
//    console.log('listening on 3000')
//})

//app.get('/', function (req, res) {
//    res.sendFile(__dirname + '/src/Admin/index.html')
//})

const server = express()
  .use((req, res) => res.sendFile(__dirname + '/src/Admin/index.html'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));