var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
app = express()
app.use('/', express.static(path.join(__dirname, 'dist')))
app.use('/v1', express.static(path.join(__dirname, 'legacy/v1')))
app.use('/v2', express.static(path.join(__dirname, 'legacy/v2')))
app.use('/v3', express.static(path.join(__dirname, 'legacy/v3')))

var port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)
