const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')

// ruotes / URL  utama
app.use(bodyParser.json())

app.get('/Product', (req, res) => {
    db.query("SELECT * FROM product", (error,result) => {
        // hasil data dari mysql
        console.log(result)
        res.send(result)
    })
})

app.post('/login', (req, res) => {
    console.log({ requestFromOutside: req.body})
    res.send('login berhasil')
})

app.put('/username', (req, res) => {
    console.log({ updateData: req.body})
    res.send('update berhasil')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})