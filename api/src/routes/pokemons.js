const 
axios               = require ('axios') ,
{ Router }          = require('express'),
router              = Router()          ,
{ Pokemon, Type }   = require('../db')  ,
pk                  = { hp:0, attack:1, defense:2, speed:5 }
api                 = process.env.API+'pokemon'

let 
pokeApiData

const 
pokemonGetApi = async () => {
    if(!pokeApiData) 
    {
        const 
        pokemonFirst = await axios.get(api),
        pokemonNext  = await axios.get(pokemonFirst.data.next),
        pokemonGroup = pokemonFirst.data.results.concat(pokemonNext.data.results); // 20 + 20
        try {
            const 
            pokemonUrl = pokemonGroup.map(e => axios.get(e.url)) 
            let 
            pokemonResponse = Promise.all(pokemonUrl)
            .then(e => {
                let pokemon = e.map(e => e.data)
                let pokemonArrangement = [] 
                pokemon.map(e => {
                    pokemonArrangement.push({
                             id: e.id,
                           name: e.name,
                             hp: e.stats[0].base_stat,
                         attack: e.stats[pk.attack].base_stat,
                        defense: e.stats[pk.defense].base_stat,
                          speed: e.stats[pk.speed].base_stat,
                         height: e.height,
                         weight: e.weight,
                         sprite: e.sprites.other.dream_world.front_default,
                          Types: e.types.length < 2 
                               ? [{name: e.types[0].type.name}] 
                               : [{name: e.types[0].type.name}
                               ,  {name: e.types[1].type.name}]
                    })
                })
                return pokemonArrangement
            })
            pokeApiData = pokemonResponse
            return pokemonResponse
        } catch (e) {
          res.json(e.message)
        }
    } else {
      return pokeApiData
    }
}

const pokemonGetDb = async () => {
    try {
        return await Pokemon.findAll({
            include: {
                model: Type, // pokemon <--> type relationship
                attributes: ['name'], 
                through: {
                    attributes: []
                }
            }
        })
    } catch (e) {
        res.json(e.message);
    }
}

const pokemonGetAll = async () => {
    const 
    pokemonApi = await pokemonGetApi(),
    pokemonDb = await pokemonGetDb(),
    pokemonResponse = pokemonApi.concat(pokemonDb);
    return pokemonResponse
}

// GET pokemons & GET pokemons?name=full%20name
router.get('/', async (req, res, next) => {
    const {name} = req.query;
    try {
        const pokemonGroup = await pokemonGetAll();
        if(name) {  
            let pokemonName = await pokemonGroup.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            return pokemonName.length ? 
            res.status(200).send(pokemonName) :
            res.status(204).send('Pokemon not found')
        } else { 
            return res.status(200).send(pokemonGroup);
        }
    } catch (e) {
        return next(e);
    }
});

// POST pokemons
router.post('/', async (req, res, next) => {
    let {name, hp, attack, defense, speed, height, weight, sprite, createdInDb, types} = req.body

    if (types) {
        types = types.map( (field) => field.name) } else {
        types = ['normal']
    }
    try {
        const 
        pokemonCreate = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            sprite,
            createdInDb
        })

        let pokemonCreateType = await Type.findAll({
            where: {name: types}
        })

        if (!pokemonCreateType.length) {
            Type.bulkCreate((await axios.get(process.env.API+'type')).data.results.map(({name}) => ({name})))
            pokemonCreateType = await Type.findAll({
                where: {name: types}
            })
        }
        pokemonCreate.addType(pokemonCreateType);
        return res.status(200).send('Pokemon created successfully')
    } catch (e) {
        next(e)    
    }
})

//GET /pokemons/{idPokemon}
router.get('/:id', async (req, res) => {
    const 
    {id} = req.params,
    pokemonAll = await pokemonGetAll();
    if(id) {
        const pokemonId = pokemonAll.filter(e => e.id == id);
        pokemonId.length ?
        res.status(200).json(pokemonId) :
        res.status(204).send('Pokemon not found')
    }
})

module.exports = router;
