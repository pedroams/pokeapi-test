
const Joi = require('joi')

const schemaPokemon = Joi.object({
    id: Joi.number().integer().positive(),
    name: Joi.string(),
    base_experience: Joi.number().integer().positive(),
    height: Joi.number().integer().positive(),
    is_default: Joi.boolean(),
    order: Joi.number().integer().positive(),
    weight: Joi.number().integer().positive(),
    abilities: Joi.array(),
    forms: Joi.array(),
    game_indices: Joi.array(),
    held_items: Joi.array(),
    location_area_encounters: [Joi.array(), Joi.string()], // Array || String
    moves: Joi.array(),
    species: Joi.object({
        url: Joi.string().uri(),
        name: Joi.string().valid('bulbasaur').required()
    }),
    sprites: Joi.object().keys({
        back_female: Joi.string().optional().allow(null), // Allow null or other that describe
        back_shiny_female: Joi.string().optional().allow(null),
        back_default: Joi.string().regex(/https:\/\//), // Valid if contains a RegExp informed
        front_female: Joi.string().optional().allow(null),
        front_shiny_female: Joi.string().optional().allow(null),
        back_shiny: Joi.string().uri(), // Valid if String is a URL 
        front_default: Joi.string().uri(),
        front_shiny: Joi.string().uri()
    }),
    stats: Joi.array(),
    types: Joi.array().items({
        slot: Joi.number().positive(), 
        type: Joi.object()
    }),
})

module.exports = schemaPokemon

