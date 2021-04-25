const Express = require('express')
const BodyParser = require('body-parser')
const app = Express()
const PORT = 3000

const CacheItemHandler = require('./src/handler/cache-item-handler')
const Constants = require('./src/utility/constants')

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended: true}))


app.get('/cache-items', (request, response, next) => {
    CacheItemHandler.getAll(request, response)
        .then(results => response.status(Constants.STATUS_CODES.OK).json(results))
        .catch(next)
})

app.get('/cache-items/:key', (request, response, next) => {
    CacheItemHandler.findByKey(request, response)
        .then(results => response.status(Constants.STATUS_CODES.OK).json(results))
        .catch(next)
})

app.post('/cache-items', (request, response, next) => {
    CacheItemHandler.create(request, response)
        .then(results => response.status(Constants.STATUS_CODES.CREATED).json(results))
        .catch(next)
})

app.put('/cache-items/:key', (request, response, next) => {
    CacheItemHandler.update(request, response)
        .then(results => response.status(Constants.STATUS_CODES.NO_CONTENT).json())
        .catch(next)
})

app.use(function (err, req, res, next) {
        console.log(err.stack)
        console.log(err)
        res.status(500).send({ErrorDetails: '' + err})
        // res.status(500).send(err)
    }
)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
})