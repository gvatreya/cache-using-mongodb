/**
 * This is a model for the Cache DB object, saved in the cache document
 *
 * Author: Goutham Atreya
 */

class CacheItem {

    /**
     * Helper method to map DB response into a CacheItem model.
     *
     * @param {Object} cacheItem CacheItem Object received from database
     */
    static recordMapper(cacheItem) {
        return new User(
            cacheItem.key,
            cacheItem.value,
            cacheItem.latest_access_time,
            cacheItem.ttl // to be checked against latest_access_time
        );
    }

    constructor(
        key,
        value,
        latest_access_time,
        ttl
    ) {

        this.key = key
        this.value = value
        this.latest_access_time = latest_access_time
        this.ttl = ttl
    }

}


module.exports = CacheItem;
