const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");

/****** CREATE ROUTE *******/
router.post('/create', controller.create);



/****** READ ROUTE *******/
router.get('/:key', controller.get);



/****** UPDATE ROUTE *******/
router.post('/update/:key', controller.update);



/****** DELETE ROUTE *******/
router.delete('/:key',  controller.delete)



module.exports = router;