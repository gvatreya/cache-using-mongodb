const Express = require('express')
const BodyParser = require('body-parser')
const app = Express()
const PORT = 3000

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended: true}))



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