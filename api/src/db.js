require ('./modules/defaults')

const 
fs   = require('fs'),
path = require('path'),
{ Sequelize } = require('sequelize'),
{ DB_NAME, DB_DIALECT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = process.env,
sequelize = new Sequelize 
(
  {
    database: DB_NAME,
     dialect: DB_DIALECT,
        host: DB_HOST,
        port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    logging: false,
    pool: 
    {
      max: 3,
      min: 1,
      idle: 10000,
    },
    ssl: process.env.NODE_ENV === 'production' 
    ? 
    {
      require: true,
      rejectUnauthorized : false,
    }
    : {},
    dialectOptions: 
    {
      keepAlive: true,
      logging:  process.env.NODE_ENV === 'production' ? false : console.log ,
      native:   process.env.NODE_ENV === 'production' ? true : false ,
      ssl:      process.env.NODE_ENV === 'production' 
      ? { require: true, 
          rejectUnauthorized: true, 
          ca: fs.readFileSync(path.join(__dirname, 'root-certs.crt')).toString()
        } 
      : false ,
    },
  }
), 
sequelizeModels = (dir = "models") => {
  const
  fs   = require('fs'),
  path = require('path')           
  fs.readdirSync(path.join(__dirname, dir))
    .filter((file) => (path.extname(file).toLowerCase() === '.js' ))
    .forEach((file) => {
      require(path.join(__dirname, dir, file))(sequelize)
    })  
}

sequelize
.authenticate()
.then(() => {
  if (process.env.NODE_ENV!=='production' && process.env.VERBOSE > 0) {
      console.log('✔  DATABASE Connected')
  }
})
.catch(err => {
  if (process.env.NODE_ENV!=='production' && process.env.VERBOSE > 0) {
      console.error('✘  DATABASE Error', err)
  }
})

sequelizeModels()

const 
{ Pokemon,Type } = sequelize.models,
  Pokemon_Type   = sequelize.define('Pokemon_Type', {}, { timestamps: false })
  Type.belongsToMany(Pokemon, { through : Pokemon_Type } )
Pokemon.belongsToMany(Type   , { through : Pokemon_Type } )

module.exports = {
  ...sequelize.models, // in order to import model { Pokemon, Type } = require('./db.js');
  conn: sequelize,     // in order to import connection { conn } = require('./db.js');
}
