const mongoose = require('mongoose');

const { Schema } = mongoose;

const tSensorSchema = new Schema({
    value: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    },
})

const tSensor = mongoose.model('tSensor', tSensorSchema);
tSensor.createIndexes();
module.exports = tSensor;