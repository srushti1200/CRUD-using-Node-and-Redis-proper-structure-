const redis = require('redis');

/***** Connection with redis ****/
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


module.exports = {

    /******** CREATE *******/
    create: async(req, res)=>{
        console.log("In the controller");
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
    
    },

    /******** READ *******/
    get :async(req, res)=>{
            try{
                const result = await client.get(req.params.key);
                console.log("In the controller");
                if(result == "null"){
                    res.send("No such record exists!");
                }   
                else{
                    res.json(result);
                    console.log(result);
                }
            }
            catch(err){
                res.send("ter Some error occured")
                console.log(err);
            }
        },
    
    
    /******** UPDATE ******/
    update :  async(req, res)=>{
        // console.log(req.body);
        let key = req.params.key;
        let val = req.body.value;
        console.log(`key: ${key}, type: ${typeof(key)}, value: ${val}, type: ${typeof(val)}`);
        try{
            const result = client.set(key, val, 'XX');
            if (result!="null"){
                res.status(200).send("Record updated successfully");
            
            }
            else{
                res.status(403).send("Operation was not performed");
            }
        }catch(err){
            res.send("Error occurred:", err );
            console.log(err);
        }
    
    },

    /******** DELETE ******/
    delete: async(req, res)=>{
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
    }
    
    
}