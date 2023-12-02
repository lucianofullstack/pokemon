process.env.VERBOSE = 0
process.env.MORGAN  = 0
const { Pokemon, conn } = require('../../src/db.js')
const { expect } = require('chai')

describe('⚙️ Pokemon model', () => {
    beforeEach(() => Pokemon.sync({ force: true }))
    before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err)
    }))
    describe('status', () => 
    {
        beforeEach(() => Pokemon.sync({ force: true }))

            it('should show an instance of DB', () => {
              expect(new Pokemon()).to.be.an.instanceof(Pokemon);
            })
    
            it('should throw an error if name is null', (done) => 
            {
                Pokemon.create({})
                .then(() => done(new Error('It requires a valid name')))
                .catch(() => done())
            })

            it('should work when its a valid name', () => 
            {
                Pokemon.create({ name: 'Pikachu' })
            })

            it("should work when its a valid pokemon", () => {
              Pokemon.create({
                   name: "test",
                       hp: 10,
                 attack: 10,
                defense: 10,
                  speed: 10,
                 height: 10,
                 weight: 10,
                 sprite: "sprite",
                  types: ["fire", "water"],
              })
            })
        })
})