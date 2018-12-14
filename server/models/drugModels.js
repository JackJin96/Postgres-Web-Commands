const mongoose = require('mongoose');

const drugSchema = mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    recordId: { type: Number, required: true }
});

const DrugModel = mongoose.model('Drug', drugSchema);

module.exports = {
    DrugModel
}