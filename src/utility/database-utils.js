/**
 * This file contains helper methods that manages database connections.
 *
 * Author: Goutham Atreya
 */

const ENV = process.env

const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectID;

const user = ENV.DB_USER || 'test_admin'
const password = ENV.DB_PSWD || 'secret12'
const host = ENV.DB_HOST || 'localhost'
const port = ENV.DB_PORT || 27017
const pool = ENV.DB_POOL || 20
const database = ENV.DB_NAME || 'test-cache'

const CONNECTION_URL = `mongodb://${host}:${port}/${database}?poolSize=${pool}`;

let dbClient = null;

// FIXME: Need to make this static method that will be called only once and getDatabase actually returns the dbClient
const init = async function init() {
    dbClient = new MongoClient(CONNECTION_URL);
    await dbClient.connect();
    return dbClient;
}

const getDatabase = async function getDatabase() {
    return dbClient
}
