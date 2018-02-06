const request = require('supertest')
const assert = require('chai').assert
const Joi = require('joi')
const joiAssert = require('joi-assert')

const url = 'https://pokeapi.co/api/v2'
const schemaPokemon = require('./schema')

describe('Testes Contrato PokeAPI', () => {

    describe('GET /pokemon/{id or name}', () => {

        let pokemon = {
            id: 1,
            name: 'bulbasaur'
        }

        it('response de acordo com schema criado', (done) => {
            request(url)
                .get(`/pokemon/${pokemon.id}/`)
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    joiAssert(res.body, schemaPokemon, 'Erro no Joi do Pokémon')
                    done(err)
                });
        });
    });

});