const express = require('express');
const router = express.Router();

const mSensor = require('../models/mSensor');
const tSensor = require('../models/tSensor');
const hSensor = require('../models/hSensor');

router.post('/', async (req, res) => {
    try {
        if (req.body) {
            let mData = await mSensor.create({
                value: req.body.moisture
            })
            let tData = await tSensor.create({
                value: req.body.temperature
            })
            let hData = await hSensor.create({
                value: req.body.humidity
            })
            
            console.log(req.body);
            res.end("Got it !")
        }
    }
    catch {
        console.log(req.body);
        res.end("Error");
    }
});


module.exports = router;
