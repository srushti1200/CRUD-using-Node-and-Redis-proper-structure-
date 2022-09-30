const express = require('express');
const app = express();
const redis = require('redis');


const port = 5000;
// const bluebird = require('bluebird');

// bluebird.promisifyAll(redis);



const client = redis.createClient();

client.on("error", (err)=>{
    console.log("Redis client error :", err);
});

(async()=> {

await client.connect();
})();

console.log("connecting to Redis");

client.on("ready", ()=>{
    console.log("connected");
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', function(req, res){
    res.status(200).send("Server created");
})

// const clientRouter = require("./routes/router");
// app.use('/', clientRouter);



/***********  Create route ************/

app.post('/create', function(req, res){
    console.log(req.body);
    let key = req.body.key;
    let val = req.body.value;
    console.log(`key: ${key}, type: ${typeof(key)}, value: ${val}, type: ${typeof(val)}`);
    try{
        const result = client.set(key, val);
        if (result){
            res.status(200).send("Record added successfully");
        
        }
        else{
            res.send("Operation was not performed");
        }
    }catch(err){
        res.send("Error occurred:", err );
        console.log(err);
    }

})

/*********  Read  route ********/
app.get('/:key', async(req, res)=>{
    try{
        const result = await client.get(req.params.key);
        if(result == "null"){
            res.send("No such record exists!");
        }   
        else{
            res.json(result);
            console.log(result);
        }
    }
    catch(err){
        res.send("Some error occured")
        console.log(err);
    }
})


/******  Update Route    ******/

app.post('/update/:key', function(req, res){
    // console.log(req.body);
    let key = req.params.key;
    let val = req.body.value;
    // console.log(`key: ${key}, type: ${typeof(key)}, value: ${val}, type: ${typeof(val)}`);
    try{
        const result = client.set(key, val, 'XX');
        if (result!="null"){
            res.status(200).send("Record updated successfully");
        
        }
        else{
            res.send("Operation was not performed");
        }
    }catch(err){
        res.send("Error occurred:", err );
        console.log(err);
    }

})


/*******  Delete Route  ******/

app.delete('/:key', async(req, res)=>{
    try{
        const result = await client.del(req.params.key);
        if(result == "null"){
            res.send("No such record exists!");
        }   
        else{
            res.send("Record deleted successfully");
            console.log(result);
        }
    }
    catch(err){
        res.send("Some error occured")
        console.log(err);
    }
})


app.listen(port, function(){
    console.log("Server live");
})

// async function getValue(){
//     const result = await client.get("f");
//     console.log(result, "typeof result : ", typeof(result));
// }
// getValue();






// client.set('framework3', 'VueJs', function(err, reply) {
//     console.log(reply);
//   });

//   client.set('framework1', 'Express', function(err, reply) {
//     console.log(reply);
//   });

// async function delValue(){
//         const result = await client.del("Language");
//         if(!result){
//             console.log("no such record");
//         }
//         console.log(result, "typeof result : ", typeof(result));
//     }
// delValue();