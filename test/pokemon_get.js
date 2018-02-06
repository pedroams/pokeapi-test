const request = require('supertest')
const assert = require('chai').assert

const url = 'https://pokeapi.co/api/v2'
const _ = require('lodash');

describe('PokeApi Tests', () => {

    before((done) => {
        request(url)
            .get('/pokemon/?limit=151')
            .end((err, res) => {
                pokemon = _.sample(res.body.results);
                done(err)
            })
    });

    describe('GET /pokemon/{id or name}', () => {
        it('name deve estar válido', (done) => {
            request(url)
                .get(`/pokemon/${pokemon.name}/`)
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.name, pokemon.name)
                    res.body.forms.forEach((form) => {
                        assert.equal(form.name, pokemon.name)
                    })
                    assert.equal(res.body.species.name, pokemon.name)
                    done()
                })
        });

        it(('com "id" inexistente'), (done) => {
            request(url)
                .get('/pokemon/900/')
                .expect(404, done)
        })
    })

    describe(('GET /pokemon-form/{id or name}'), () => {

        before((done) => {
            request(url)
                .get(`/pokemon/${pokemon.name}/`)
                .end((err, res) => {
                    pokemon.sprites = res.body.sprites
                    done()
                })
        });    

        it('propriedades importantes devem estar válidas', (done) => {
            request(url)
                .get(`/pokemon-form/${pokemon.name}/`)
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.name, pokemon.name)
                    assert.include(pokemon.sprites, res.body.sprites)
                    done()
                });
        });

        it(('requisicão inválida /pokemon-/{id or name}'), (done) => {
            request(url)
                .get(`/pokemon-/${pokemon.name}/`)
                .end((err, res) => {
                    assert.equal(res.status, 404)
                    assert.match(res.text, /pokéapi - The Pokemon RESTful API/)
                    done()
                });
        })
    })

    describe(('GET /pokemon-species/{id or name}'), () => {

        before((done) => {
            request(url)
                .get(`/pokemon/${pokemon.name}/`)
                .end((err, res) => {
                    pokemon = res.body.species
                    pokemon.id = res.body.id
                    done()
                });
        });

        it('propriedades importantes devem estar válidas', (done) => {
            request(url)
                .get(`/pokemon-species/${pokemon.name}/`)
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.id, pokemon.id)
                    done(err)
            });
        });

    })

});