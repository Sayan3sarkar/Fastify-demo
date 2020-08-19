// Controller Imports
const databaseController = require('../controllers/db-controller');

// Options for route schema
// const opts = {
//     schema: {
//         response: { // Serialzing response
//             200: {
//                 type: 'object',
//                 properties: {
//                     hello: { type: 'string' }
//                 }
//             }
//         }
//     }
// };

const routes = async(fastify, options) => {
    fastify.get('/users', databaseController.getUsersController); // Read all
    fastify.get('/user/:id', databaseController.getUsersByIdController); // Read One
    fastify.post('/users', databaseController.postInsertUserController); // Create
    fastify.put('/users', databaseController.putUpdateUserController); // Update
    fastify.delete('/users', databaseController.deleteUserController); // Delete
};

module.exports = routes;