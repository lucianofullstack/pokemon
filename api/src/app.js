require ('./modules/defaults')

const
fs           = require('fs'),
path         = require('path'),
express      = require('express'),
cookieParser = require('cookie-parser'),
bodyParser   = require('body-parser'),

appRoute     = (route = "routes", ext = ".js") => {
  fs.readdirSync(path.join(__dirname, route))
    .filter(  (file) => ( path.extname(file).toLowerCase() === ext ) )
    .forEach( (file) => {
      let fileName = path.parse(file).name
      app.use('/' + fileName, require(path.join(__dirname, route, file)))
      if (
           process.env.NODE_ENV!=='production' 
        && process.env.VERBOSE > 0
     ) {
          console.log(`✔  ROUTE ${fileName}`)
       }
    })
    require('./modules/favicon')(app)
}

if ( process.env.NODE_ENV!=='production' 
  && process.env.VERBOSE > 1) {
  require ('./modules/prompt')(process.env)
}

app = express()
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser())

if (process.env.MORGAN === 1) {
  const
  morgan = require('morgan')
  app.use(morgan('dev'))  
}

app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Origin', 
      `${process.env.CLIENT_URL}${
        (process.env.NODE_ENV==='production')
        ?''
        :':'+process.env.CLIENT_PORT
      }`)
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    next()
})
appRoute()
app.use((req, res, next) => {
    res.status(404).send({ message: 'Route' + req.url + ' Not found.' })
})
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({ error: err });
})

module.exports = app;
