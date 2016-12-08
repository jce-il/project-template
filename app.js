var express = require('express');
var app = express();

app.use(express.static('src/Admin'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/src/Admin/index.html');
});

app.listen(3000, function () {
    console.log('listening on 3000')
})


