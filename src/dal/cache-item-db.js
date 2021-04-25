/**
 * This file contains methods for doing CRUD operations
 * on the CacheItem object.
 *
 * Author: Goutham Atreya
 */

const CacheItem = require('../model/cache-item')
const DB_CLIENT = require('../utility/database-utils')

const initCollection = async function initCollection() {
    console.debug('Initialising Collection, if not already there')
    const results = DB_CLIENT.collection('cache')
    console.debug(`Results: ${results}`)
    console.debug("Results: " + JSON.stringify(results))
}

const getAll = async function getAll() {
    console.debug('Fetching all cache-items')
    DB_CLIENT.collection('cache')
}