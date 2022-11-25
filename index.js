const express = require('express');

const port = 3699;

const app = express();

const path = require('path');

const db = require('./config/mongoose')

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use('/uploads', express.static(path.join(__dirname,'uploads')));
app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log("this port is not runing");
        return false;
    }
    console.log("this port is runing:",port);
})