const bodyParser = require('body-parser'),
    http = require('http'),
    express = require('express')

const port = process.env.port || 3000,
    app = express(),
    server = http.createServer(app)
    properties = require('./properties')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/properties',properties)
app.use(express.static('public'))

server.listen(port, ()=>{
    console.log('running in port '+port);
})