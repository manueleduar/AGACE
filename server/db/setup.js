/* MONGOOSE SETUP */

const mongoose = require('mongoose');

const db = {
    init: () => {
        mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_NAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_PROJECT_NAME}.1nx09.mongodb.net/${process.env.MONGO_DB_CLUSTER_NAME}?retryWrites=true&w=majorityp`, { useNewUrlParser: true, useUnifiedTopology: true });
    }
}

module.exports = db;