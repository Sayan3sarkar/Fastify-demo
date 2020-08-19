require('dotenv').config();

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: process.env.MY_SQL_DB_HOST,
    user: process.env.MY_SQL_USER,
    database: process.env.MY_SQL_DATABASE,
    port: process.env.MY_DB_PORT,
    password: process.env.MY_DB_PASSWORD
});

/**
 *   Fetches List of all users in Database
 */
exports.getUsersController = (req, res) => {
    connection.execute(
        'SELECT * FROM `user`',
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message: 'Internal Server Error',
                    error: err
                });
            } else {
                console.log('Results: ' + result); // results contains rows returned by server
                // console.log('Fields: ' + fields); // fields contains extra meta data about results, if available
                res.status(200).send({
                    result: result
                });
            }
        }
    );
};

/**
 *   Fetches List of a user in Database based on id
 */
exports.getUsersByIdController = (req, res) => {
    connection.execute(
        'SELECT * from `user` WHERE `id` = ?', [req.params.id],
        (err, result) => {
            if (!err) {
                if (result.length > 0) {
                    res.status(200).send({
                        result: result
                    });
                }
                res.status(404).send({
                    message: 'No User exists for this id'
                });
            } else {
                console.log(err);
                res.status(500).send({
                    message: 'Internal Server Error',
                    error: err
                });
            }
        }
    );
};

/**
 *   Adds New user to database
 */
exports.postInsertUserController = (req, res) => {
    connection.execute('INSERT INTO `user`(`name`) VALUES (?)', [req.body.name],
        (err, result) => {
            if (!err) {
                res.status(201).send({
                    message: 'User Created successfully',
                    result: result
                });
            } else {
                console.log(err);
                res.status(500).send({
                    message: 'Internal Server Error',
                    error: err
                });
            }
        }
    );
};

/**
 * Update User By ID
 */
exports.putUpdateUserController = (req, res) => {
    connection.execute('UPDATE `user` SET `name` = ? WHERE `id` = ?', [req.body.name, req.body.id],
        (err, result) => {
            if (!err) {
                res.status(200).send({
                    message: 'User Updated successfully',
                    result: result
                });
            } else {
                console.log(err);
                res.status(500).send({
                    message: 'Internal Server Error',
                    error: err
                });
            }
        }
    );
};

/**
 * Delete a user by ID
 */
exports.deleteUserController = (req, res) => {
    connection.execute('DELETE from `user` WHERE `id` = ?', [req.body.id],
        (err, result) => {
            if (!err) {
                res.status(200).send({
                    message: 'User Deleted successfully',
                    result: result
                });
            } else {
                console.log(err);
                res.status(500).send({
                    message: 'Internal Server Error',
                    error: err
                });
            }
        }
    );
};