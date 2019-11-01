const bodyParser = require('body-parser');
const postgresClient = require('../postgresClient/postgresClient');

const search = (req) => {
    const searchString = req.query['search_string'];
    console.log(searchString);
    return new Promise((resolve, reject) => {
        // postgresClient.client.connect();
        postgresClient.client.query(searchString, (err, res) => {
            if (err !== null) {
                resolve([{"error": "SQL query syntax error"}]);
            } else {
                resolve(res.rows);
            }
            // console.log(err, res);
        });
        // postgresClient.client.end();
    });
}

// table name, all attributes
const insert = (req) => {
    let insertAttributes = req.query['insert_attributes'];
    let insertValues = req.query['insert_values'];
    let insertTable = req.query['insert_table'];
    let attributes = insertAttributes.split(" ");
    let values = insertValues.split(" ");
    return new Promise((resolve, reject) => {
        // resolve([{ "msg": "INSERT Called" }]);
        insertString = `SELECT * FROM ${insertTable} WHERE ${attributes[0]} = '${values[0]}'`;
        console.log(insertString);
        postgresClient.client.query(insertString, (err, res) => {
            if (err !== null) {
                resolve([{"error": err}]);
            } else {
                resolve(res.rows);
            }
        });
    });
}

// ADD functions
// const addDrug = (reqbody) => {
//     return new Promise((resolve, reject) => {
//         DrugModel.findOne({id: reqbody.id}, (err, drugData) => {
//             if (drugData) {
//                 resolve({ warning: 'drug already exists!' });
//             } else {
//                 const newDrug = new DrugModel({
//                     id: reqbody.id,
//                     name: reqbody.name,
//                     recordId: reqbody.recordId
//                 });
//                 newDrug.save();
//                 resolve(newDrug);
//             }
//         });
//     });
// }

// const addMechanism = (reqbody) => {
//     return new Promise((resolve, reject) => {
//         MechanismModel.findOne({id: reqbody.id}, (err, mechanismData) => {
//             if (mechanismData) {
//                 resolve({ warning: 'mechanism already exists!' });
//             } else {
//                 const newMechanism = new MechanismModel({
//                     id: reqbody.id,
//                     name: reqbody.name,
//                     associatedDrugs: reqbody.associatedDrugs
//                 });
//                 newMechanism.save();
//                 resolve(newMechanism);
//             }
//         });
//     });
// }

// const addRecord = (reqbody) => {
//     return new Promise((resolve, reject) => {
//         RecordModel.findOne({id: reqbody.id}, (err, recordData) => {
//             if (recordData) {
//                 resolve({ warning: 'record already exists!' });
//             } else {
//                 const newRecord = new RecordModel({
//                     id: reqbody.id,
//                     name: reqbody.name,
//                     desc: reqbody.desc
//                 });
//                 newRecord.save();
//                 resolve(newRecord);
//             }
//         });
//     });
// }

// const addCombined = (reqbody) => {
//     return new Promise((resolve, reject) => {
//         CombinedModel.findOne({id: reqbody.id}, (err, combinedData) => {
//             if (combinedData) {
//                 resolve({ warning: 'record already exists!' });
//             } else {
//                 if (reqbody.category === 'drug') {
//                     const newCombined = new CombinedModel({
//                         id: reqbody.id,
//                         name: reqbody.name,
//                         drugId: reqbody.drugId,
//                         category: reqbody.category,
//                         recordId: reqbody.recordId
//                     });
//                     newCombined.save();
//                     resolve(newCombined);
//                 } else if (reqbody.category === 'mechanism') {
//                     const newCombined = new CombinedModel({
//                         id: reqbody.id,
//                         name: reqbody.name,
//                         mechanismId: reqbody.mechanismId,
//                         category: reqbody.category,
//                         associatedDrugs: reqbody.associatedDrugs
//                     });
//                     newCombined.save();
//                     resolve(newCombined);
//                 } else {
//                     resolve({warning: 'category to add is incorrect!'});
//                 }
//             }
//         });
//     });
// }

module.exports = {
    // getDrugs,
    // getDrug,
    // getMechanism,
    // getRecord,
    search,
    insert
    // addDrug,
    // addMechanism,
    // addRecord,
    // addCombined
}