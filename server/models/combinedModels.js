const mongoose = require('mongoose');

const combinedSchema = mongoose.Schema({
    id: { type: Number, required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    drugId: { type: Number },
    mechanismId: { type: Number },
    recordId: { type: Number },
    associatedDrugs: { type: Array },
    desc: { type: String }
});

const CombinedModel = mongoose.model('Combined', combinedSchema);

module.exports = {
    CombinedModel
}