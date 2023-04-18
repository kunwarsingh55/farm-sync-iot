const mongoose = require('mongoose');
const { Schema } = mongoose;

const devicesSchema = new Schema({
    Name:{
        type: String,
        required: true
    },
    State:{
        type: String,
        require:true,
        default: "OFF"
    },
})

const device = mongoose.model('device', devicesSchema);
device.createIndexes();
module.exports = device;