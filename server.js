const express = require('express');
const app = express();

//Environment Variables
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', function(req, res){
    res.status(200).send("Server created");
})

//Routes
const clientRouter = require("./routes/router");
app.use('/', clientRouter);

// Acknowledgement of server creation
app.listen(port, function(){
    console.log(`Server active on http://localhost:${port}`);
})

