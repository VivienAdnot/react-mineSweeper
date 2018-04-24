const express = require('express');
const path = require('path');

var app = express();

app.use(express.static('../mine-sweeper/build'));

app.get('*', (req, res) => {

    const fileUrl = path.join(__dirname, '../mine-sweeper/build/index.html');
    res.sendfile(fileUrl);

});

app.listen(5000);