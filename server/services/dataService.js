const bodyParser = require('body-parser');

const drugModel = require('../models/drugModels');
const mechanismModel = require('../models/mechanismModels');
const recordModel = require('../models/recordModels');
const combinedModel = require('../models/combinedModels');

const DrugModel = drugModel.DrugModel;
const MechanismModel = mechanismModel.MechanismModel;
const RecordModel = recordModel.RecordModel;
const CombinedModel = combinedModel.CombinedModel;

// const getDrugs = (req) => {
//     return new Promise((resolve, reject) => {
//         resolve('drug1');
//     });
// }

const search = (req) => {
    searchString = req.query['search_string'];
    return new Promise((resolve, reject) => {
        console.log('in promise');
        CombinedModel.find({name: {$regex: '^' + searchString, $options: 'i'}}, (err, data) => {
            console.log('finding');
            if (data) {
                console.log(data);
                resolve(data);
            } else {
                console.log('not found');
                resolve({warning: 'Entry does not exist!'});
            }
        });
    });
}

// GET single functions
const getDrug = (req) => {
    drugID = req.query['drug_id'];
    return new Promise((resolve, reject) => {
        DrugModel.findOne({ id: drugID },  (err, drugData) => {
            if (drugData) {
                resolve(drugData);
            } else {
                resolve({warning: 'Drug does not exist!'});
            }
        });
    });
};

const getMechanism = (req) => {
    mechanismID = req.query['mechanism_id'];
    return new Promise((resolve, reject) => {
        MechanismModel.findOne({ id: mechanismID },  (err, mechanismData) => {
            if (mechanismData) {
                resolve(mechanismData);
            } else {
                resolve({warning: 'Mechanism does not exist!'});
            }
        });
    });
};

const getRecord = (req) => {
    recordID = req.query['record_id'];
    return new Promise((resolve, reject) => {
        RecordModel.findOne({ id: recordID },  (err, recordData) => {
            if (recordData) {
                resolve(recordData);
            } else {
                resolve({warning: 'Mechanism does not exist!'});
            }
        });
    });
};


// ADD functions
const addDrug = (reqbody) => {
    return new Promise((resolve, reject) => {
        DrugModel.findOne({id: reqbody.id}, (err, drugData) => {
            if (drugData) {
                resolve({ warning: 'drug already exists!' });
            } else {
                const newDrug = new DrugModel({
                    id: reqbody.id,
                    name: reqbody.name,
                    recordId: reqbody.recordId
                });
                newDrug.save();
                resolve(newDrug);
            }
        });
    });
}

const addMechanism = (reqbody) => {
    return new Promise((resolve, reject) => {
        MechanismModel.findOne({id: reqbody.id}, (err, mechanismData) => {
            if (mechanismData) {
                resolve({ warning: 'mechanism already exists!' });
            } else {
                const newMechanism = new MechanismModel({
                    id: reqbody.id,
                    name: reqbody.name,
                    associatedDrugs: reqbody.associatedDrugs
                });
                newMechanism.save();
                resolve(newMechanism);
            }
        });
    });
}

const addRecord = (reqbody) => {
    return new Promise((resolve, reject) => {
        RecordModel.findOne({id: reqbody.id}, (err, recordData) => {
            if (recordData) {
                resolve({ warning: 'record already exists!' });
            } else {
                const newRecord = new RecordModel({
                    id: reqbody.id,
                    name: reqbody.name,
                    desc: reqbody.desc
                });
                newRecord.save();
                resolve(newRecord);
            }
        });
    });
}

const addCombined = (reqbody) => {
    return new Promise((resolve, reject) => {
        CombinedModel.findOne({id: reqbody.id}, (err, combinedData) => {
            if (combinedData) {
                resolve({ warning: 'record already exists!' });
            } else {
                if (reqbody.category === 'drug') {
                    const newCombined = new CombinedModel({
                        id: reqbody.id,
                        name: reqbody.name,
                        drugId: reqbody.drugId,
                        category: reqbody.category,
                        recordId: reqbody.recordId
                    });
                    newCombined.save();
                    resolve(newCombined);
                } else if (reqbody.category === 'mechanism') {
                    const newCombined = new CombinedModel({
                        id: reqbody.id,
                        name: reqbody.name,
                        mechanismId: reqbody.mechanismId,
                        category: reqbody.category,
                        associatedDrugs: reqbody.associatedDrugs
                    });
                    newCombined.save();
                    resolve(newCombined);
                } else {
                    resolve({warning: 'category to add is incorrect!'});
                }
            }
        });
    });
}

module.exports = {
    // getDrugs,
    getDrug,
    getMechanism,
    getRecord,
    search,
    addDrug,
    addMechanism,
    addRecord,
    addCombined
}