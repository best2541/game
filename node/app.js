const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log('test')
    console.log(req.query.time)
})

app.listen(3000, () => {
    console.log('running')
})