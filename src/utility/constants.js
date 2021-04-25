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
    CREATED: 201
}

const CACHE_TTL_IN_MILLIS = ENV.CACHE_TTL_IN_MILLIS || 60 * 1000
const MAX_CACHE_ITEMS = ENV.MAX_CACHE_ITEMS || 10

module.exports = {
    STATUS_CODES: STATUS_CODES
}
