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
    // let attributes = insertAttributes.split(" ");
    // let values = insertValues.split(" ");
    // const selectString = `SELECT * FROM ${insertTable} WHERE ${attributes[0]} = '${values[0]}'`;
    // console.log(selectString);
    // const insertAttributeString = "";
    // for (let attribute in insertAttributes) {
    //     insertValueString +=
    // }
    const insertString = `INSERT INTO ${insertTable} (${insertAttributes}) VALUES (${insertValues})`;
    console.log(insertString);
    return new Promise((resolve, reject) => {
        postgresClient.client.query(insertString, (err, res) => {
            if (err !== null) {
                resolve([{"error": err}]);
            } else {
                resolve(res);
            }
        });
    });
    /*
insert into reviews (review_id, business_id, user_id, stars, review_date, review_text)
values ('b', 'b', 'c', 3, '01/01/01', 'love');
    */
}

// table name, primary key
const deleteEntry = (req) => {
    let deleteAttributes = req.query['delete_attributes'];
    let deleteValues = req.query['delete_values'];
    let deleteTable = req.query['delete_table'];
    let attributes = deleteAttributes.split(" ");
    let values = deleteValues.split(" ");
    const deleteString = `DELETE FROM ${deleteTable} WHERE ${attributes[0]} = '${values[0]}'`;
    return new Promise((resolve, reject) => {
        postgresClient.client.query(deleteString, (err, res) => {
            if (err !== null) {
                resolve([{"error": err}]);
            } else if (res.rows.length == 0){
                resolve([{"error": "The entry you are trying to delete does not exist!"}]);
            } else {
                resolve(res);
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