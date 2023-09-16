const mongoose = require("mongoose");

const { Schema } = mongoose;

const mSensorSchema = new Schema({
    value: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
});

const mSensor = mongoose.model("mSensor", mSensorSchema);
mSensor.createIndexes();
module.exports = mSensor;
