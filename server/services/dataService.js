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
                if (res.rows.length > 0) {
                    resolve(res.rows);
                } else {
                    resolve([{"Result": "You search did not match any result in the database."}]);
                }
            }
        });
    });
}

// table name, all attributes
const insert = (req) => {
    const insertAttributes = req.query['insert_attributes'];
    const insertValues = req.query['insert_values'];
    const insertTable = req.query['insert_table'];
    const insertString = `INSERT INTO ${insertTable} (${insertAttributes}) VALUES (${insertValues})`;
    console.log(insertString);
    return new Promise((resolve, reject) => {
        if (insertAttributes.split(",").length !== insertValues.split(",").length) {
            resolve([{"error": "You have error in your input, please check the format and the data you entered!"}]);
        }
        postgresClient.client.query(insertString, (err, res) => {
            if (err !== null) {
                resolve([{"error": "You have tried to insert an entry that already exists in the table, or your input is not valid!",
                "error object": err}]);
            } else {
                resolve([{"success": "You have successfully inserted the entry!", "result object": res}]);
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
    const deleteAttributes = req.query['delete_attributes'];
    const deleteValues = req.query['delete_values'];
    const deleteTable = req.query['delete_table'];
    const deleteString = `DELETE FROM ${deleteTable} WHERE ${deleteAttributes} = ${deleteValues}`;
    return new Promise((resolve, reject) => {
        if (deleteAttributes.split(",").length !== deleteValues.split(",").length) {
            resolve([{"error": "You have error in your input, please check the format and the data you entered!"}]);
        }
        postgresClient.client.query(deleteString, (err, res) => {
            if (err !== null) {
                resolve([{"error": err}]);
            } else {
                console.log(res);
                if (res.rowCount > 0) {
                    resolve([{"success": "You have successfully deleted the entry!", "result object": res}]);
                } else {
                    resolve([{"warning": "You have tried to delete an entry that does not exist!"}]);
                }
            }
        });
    });
}

// table name, primary key, attributes and values
const update = (req) => {
    const updateAttributes = req.query['update_attributes'];
    const updateValues = req.query['update_values'];
    const updateTable = req.query['update_table'];
    return new Promise((resolve, reject) => {
        const splittedAttributes = updateAttributes.split(",");
        const splittedValues = updateValues.split(",");
        if (splittedAttributes.length !== splittedValues.length ||
            splittedAttributes.length === 1 || splittedValues.length === 1) {
            resolve([{"error": "You have error in your input, please check the format and the data you entered!"}]);
        }
        splittedAttributes.forEach((item, index) => {
            if (item.charAt(0) === " ") {
                splittedAttributes[index] = item.substring(1);
            }
        });
        splittedValues.forEach((item, index) => {
            if (item.charAt(0) === " ") {
                splittedValues[index] = item.substring(1);
            }
        });
        let setString = "";
        for (let i = 1; i < splittedAttributes.length; i++) {
            setString += `${splittedAttributes[i]} = ${splittedValues[i]}, `;
        }
        setString = setString.substring(0, setString.length - 2);
        console.log(setString);
        const updateString = `UPDATE ${updateTable} SET ${setString} WHERE ${splittedAttributes[0]} = ${splittedValues[0]}`;
        console.log(updateString);
        postgresClient.client.query(updateString, (err, res) => {
            if (err !== null) {
                resolve([{"error": "You have tried to insert an entry that already exists in the table, or your input is not valid!",
                "error object": err}]);
            } else {
                resolve([{"success": "You have successfully inserted the entry!", "result object": res}]);
            }
        });
    });
}

module.exports = {
    search,
    insert,
    deleteEntry,
    update
}