const express =  require('express');
var router =  express.Router();

router.post('/create', function(req, res){
    console.log(req.body);
    let key = req.body.key;
    let val = req.body.value;
    console.log(`key: ${key}, type: ${typeof(key)}, value: ${val}, type: ${typeof(val)}`);
    try{
        client.set(key, val, function(err, reply){
            // console.log(reply);
            console.log("in the create route");
            if(err){
                res.send("Error occurred:", err );
                console.log(err);
            }
            else{
                res.status(202).send("Record added successfully");
            }
        })
        
    }catch(err){
        res.send("Error occurred:", err );
        console.log(err);
    }

})

module.exports = router;