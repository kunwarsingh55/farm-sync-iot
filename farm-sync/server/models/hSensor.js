const mongoose = require('mongoose');

const { Schema } = mongoose;

const hSensorSchema = new Schema({
    value:{
        type: Number,
        required: true
    },
    date:{
        type: String,
        default:Date.now
    },
})

const hSensor = mongoose.model('hSensor', hSensorSchema);
hSensor.createIndexes();
module.exports = hSensor;