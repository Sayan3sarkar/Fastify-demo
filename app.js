const fastify = require('fastify')({
    logger: true
});

const port = process.env.PORT | 3000;

// Route Declaration
const firstRoute = require('./routes/db-route');
fastify.register(firstRoute, { prefix: '/fastify' });

/**
 * non async await approach of creating a fastify server
 */
fastify.listen(port, (err, address) => {
    if (err) {
        fastify.log.error('An Error Occured: ' + err);
        process.exit(1);
    }
    fastify.log.info(`Listening on port ${port}`);
});

/**
 * async await approach of creating a fastify server
 */
// const start = async () => {
//     try {
//         await fastify.listen(port);
//     }
//     catch(err) {
//         fastify.log.error(err);
//         process.exit(1);
//     }
// };