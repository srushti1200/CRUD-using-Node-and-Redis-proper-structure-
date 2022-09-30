const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const redis = require('redis');
const methodOverride = require('method-override');
const { ppid } = require('process');


const port = 3000;


const app = express();


app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(methodOverride('_method'));

app.get('/', function(req, res, next){
    res.status(200).send("server created");
})

    
