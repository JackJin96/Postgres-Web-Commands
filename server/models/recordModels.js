const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true }
});

const RecordModel = mongoose.model('Record', recordSchema);

module.exports = {
    RecordModel
}