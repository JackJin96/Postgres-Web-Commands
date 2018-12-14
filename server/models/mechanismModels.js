const mongoose = require('mongoose');

const mechanismSchema = mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    associatedDrugs: { type: Array }
});

const MechanismModel = mongoose.model('Mechanism', mechanismSchema);

module.exports = {
    MechanismModel
}