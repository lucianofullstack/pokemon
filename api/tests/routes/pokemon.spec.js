const 
{ expect } = require('chai'),
session = require('supertest-session'),
app = require('../../src/app.js'),
{ Pokemon, conn } = require('../../src/db.js'),
agent = session(app),
pokemon = { name: 'Pikachu'}

describe('⚙️ Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));

    describe('status', () => {
       it('GET /favicon.ico should get 200', () =>
           agent.get('/favicon.ico').expect(200)
       )
       it('GET /poke should get 404', () =>
            agent.get('/poke').expect(404)
        )
        it('GET /pokemons should get 200', () =>
            agent.get('/pokemons').expect(200)
        )
        it("GET /types should get 200", () => 
            agent.get("/types").expect(200)
        )
        it('GET /pokemons/25 should get pikachu', () =>
            agent.get('/pokemons/25').then((res) => 
            {
              expect(res.body[0].name).equals('pikachu')
            })
        )
        it("GET /pokemons?name=pikachu should get id 25", () =>
            agent.get("/pokemons?name=pikachu").then((res) => 
            {
              expect(res.body[0].id).equals(25)
            })
        )
    })
})
