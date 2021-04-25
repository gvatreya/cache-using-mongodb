/**
 * This file contains helper methods that manages database connections.
 *
 * Author: Goutham Atreya
 */

const ENV = process.env

const { MongoClient } = require('mongodb');

const env_user = ENV.DB_USER || 'test_admin'
const env_password = ENV.DB_PSWD || 'secret12'
const env_host = ENV.DB_HOST || 'localhost'
const env_port = ENV.DB_PORT || 27017
const env_pool = ENV.DB_POOL || 20
const env_db_name = ENV.DB_NAME || 'cache'

const CONNECTION_URL = `mongodb://${env_host}:${env_port}/${env_db_name}?poolSize=${env_pool}&usNewUrlParser=true&useUnifiedTopology=true`;

let db = null;
let dbClient = null;

//FIXME: Needs to be static
const getDb = async function getDb() {
    if(db === null) {
        dbClient = new MongoClient(CONNECTION_URL);
        await dbClient.connect();
        db = dbClient.db(`${env_db_name}`);
    }
    return db
}

const getAll = async function getAll(collectionName) {
    console.debug('Fetching all cache-items')
    const db = await getDb()
    return  await db.collection(collectionName).find().toArray()
}

const findByCriteria = async function findByCriteria(collectionName, searchCriteria, projections) {
    console.debug('Fetching by searchCriteria: ' + JSON.stringify(searchCriteria)
        + ' and projections: ' + JSON.stringify(projections))
    const db = await getDb()
    return  await db.collection(collectionName).find(searchCriteria, projections).toArray()
}

const findOne = async function findOne(collectionName, searchCriteria, projections) {
    console.debug('Fetching by searchCriteria: ' + JSON.stringify(searchCriteria)
        + ' and projections: ' + JSON.stringify(projections))
    const db = await getDb()
    return  await db.collection(collectionName).findOne(searchCriteria, projections)
}

const update = async function update(collectionName, searchCriteria, updateJson) {
    console.debug('Updating by searchCriteria: ' + JSON.stringify(searchCriteria)
        + ' and updateJson: ' + JSON.stringify(updateJson))
    const db = await getDb()
    return await db.collection(collectionName).updateOne(searchCriteria, {$set : updateJson} )
}

const insertOne = async function insertOne(collectionName, object) {
    console.debug('Inserting item: ' + JSON.stringify(object))
    const db = await getDb()
    return await db.collection(collectionName).insertOne(object)
}

module.exports = {
    getAll: getAll,
    findByCriteria: findByCriteria,
    findOne: findOne,
    update: update,
    insertOne: insertOne
}