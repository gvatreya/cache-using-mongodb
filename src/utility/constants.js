/**
 * This file contains all the constants that are used in the project.
 *
 * Author: Goutham Atreya
 */

const ENV = process.env

/**
 * HTTP response codes to be sent to client
 * @enum {number}
 */
const STATUS_CODES = {
    CLIENT_ERROR: 400,
    SERVER_ERROR: 500,
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204
}

const CACHE_TTL_IN_MILLIS = ENV.CACHE_TTL_IN_MILLIS || 60 * 1000
const MAX_CACHE_ITEMS = ENV.MAX_CACHE_ITEMS || 5

module.exports = {
    STATUS_CODES: STATUS_CODES,
    CACHE_TTL_IN_MILLIS: CACHE_TTL_IN_MILLIS,
    MAX_CACHE_ITEMS: MAX_CACHE_ITEMS
}
