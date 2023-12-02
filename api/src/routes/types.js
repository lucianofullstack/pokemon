const
{ Router }  = require('express'),
{ Type   }  = require('../db')  ,
axios       = require('axios')  ,
router      = Router()          ,
api         = process.env.API+'type'

let typesData

router.get('/', async (req, res) => {
    try {
        if(!typesData) {
            await Type.bulkCreate((await axios.get(api)).data.results.map(({name}) => ({name})))
            typesData = (await Type.findAll({order: ['name']})).map(e => e.dataValues)
        }
        res.status(200).send(typesData)
    } catch(error){
        return res.status(500).json({ message: error.message })
    }
}); module.exports = router