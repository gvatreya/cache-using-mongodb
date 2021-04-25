/**
 * This file contains methods for doing CRUD operations
 * on the CacheItem object.
 *
 * Author: Goutham Atreya
 */

const CacheItem = require('../model/cache-item')
const DbUtils = require('../utility/database-utils')
const Helper = require('../utility/helper')
const Constants = require('../utility/constants')


const getAll = async function getAll() {
    console.debug('Fetching all cache-items')
    const results = await DbUtils.getAll('cache')
    console.log(results)
    return results
}

const findByKey = async function findByKey(key) {
    console.debug(`Fetching cache by key ${key}`)
    const searchCriteria = {
        'key': key
    }
    const cacheItem = await DbUtils.findOne('cache', searchCriteria, {})

    // If Cache Hit
    if(cacheItem) {
        // Check if TTL is still valid
        if (isTtlValid(cacheItem)) {
            // Cache Hit
            console.log('Cache Hit')
            console.debug('Updating Cache Item\'s TTL and last access time')
            const currentTime = new Date().getTime();
            const updateJson = {
                'ttl': currentTime + Constants.CACHE_TTL_IN_MILLIS,
                'last_access_time': currentTime
            }
            const updatedItem = await updateCacheItem(key, updateJson);
            console.debug('Updated successfully', updatedItem)
            return {...cacheItem, ...updateJson}
        } else {
            // If not - handle it as a cache miss
            console.info('TTL Expired for cacheItem: ' + JSON.stringify(cacheItem))
            console.info('Replacing the exsiting with a new cacheItem')
            const newCacheItem = await replaceCacheItem(key);
            console.info('New Cache Item: ' + newCacheItem)
            return {...cacheItem, ...{value: newCacheItem?.value, ttl: newCacheItem?.ttl, last_access_time: newCacheItem?.last_access_time}}
        }
    } else {
        // Cache Miss
        console.log('Cache Miss - Inserting the Key')
        const cacheItem = {
            'key': key,
            'value': Helper.generateRandomString(5)
        }
        const updatedItem = await createCacheItem(cacheItem);
        console.debug('Created new CacheItem', updatedItem)
        return updatedItem
    }
}

const updateCacheItem = async function updateCacheItem(key, updateJson) {
    console.debug(`Updating cache by key ${key}`)
    const searchCriteria = {
        'key': key
    }
    await DbUtils.update('cache', searchCriteria, updateJson)
}

const createCacheItem = async function createCacheItem(cacheItem) {
    console.debug('Creating cache by ' + cacheItem)
    const currentTime = new Date().getTime();
    cacheItem.ttl = currentTime + Constants.CACHE_TTL_IN_MILLIS
    cacheItem.last_access_time = currentTime
    const insertedItem = await DbUtils.insertOne('cache', cacheItem)
    console.log('insertedItem:' + insertedItem)
    return insertedItem?.ops
}

const replaceCacheItem = async function replaceCacheItem(key) {
    console.debug(`Updating cache by key ${key}`)
    const searchCriteria = {
        'key': key
    }
    const currentTime = new Date().getTime();
    const updateJson = {
        'value': Helper.generateRandomString(5),
        'ttl': currentTime + Constants.CACHE_TTL_IN_MILLIS,
        'last_access_time': currentTime
    }
    const cacheItem = await DbUtils.update('cache', searchCriteria, updateJson)
    // console.log(cacheItem)
    return {...updateJson, ...searchCriteria}
}

const isTtlValid = function isTtlValid(cacheItem) {
    const currentTime = new Date();
    return currentTime.getTime() <= cacheItem.ttl;
}

module.exports = {
    getAll: getAll,
    findByKey: findByKey,
    replaceCacheItem: replaceCacheItem,
    updateCacheItem: updateCacheItem,
    createCacheItem: createCacheItem,
}