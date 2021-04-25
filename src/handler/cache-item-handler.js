/**
 * This file contains all the handler methods pertaining to Cache-Item handling
 *
 * Author: Goutham Atreya
 */

const CacheItem = require('../model/cache-item')
const CacheItemDbSvc = require('../dal/cache-item-service')

const getAll = async function getAll(request, response) {
    return CacheItemDbSvc.getAll()
}

const findByKey = async function findByKey(request, response) {
    const key = request.params.key
    // FIXME: Validation
    console.log(`Key: ${key}`)
    return CacheItemDbSvc.findByKey(key)
}

const create = async function create(request, response) {
    const {key, value } = request.body
    // FIXME: Validation
    console.log(`Key: ${key}, Value: ${value}`)
    return CacheItemDbSvc.createCacheItem({key: key, value: value})
}

const update = async function update(request, response) {
    const key = request.params.key
    const {value } = request.body
    // FIXME: Validation
    console.log(`Key: ${key}, Value: ${value}`)
    await CacheItemDbSvc.updateCacheItem(key, {value: value})
}

const deleteCacheItem = async function deleteCacheItem(request, response) {
    const key = request.params.key
    // FIXME: Validation
    console.log(`Key: ${key}`)
    await CacheItemDbSvc.deleteCacheItem(key)
}

const deleteAllCacheItems = async function deleteAllCacheItems(request, response) {
    await CacheItemDbSvc.deleteAllCacheItems()
}


module.exports = {
    getAll: getAll,
    findByKey: findByKey,
    create: create,
    update: update,
    deleteCacheItem: deleteCacheItem,
    deleteAllCacheItems: deleteAllCacheItems
}