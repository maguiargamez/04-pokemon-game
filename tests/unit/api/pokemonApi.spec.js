import pokemonApi from '@/api/pokemon'

describe('pokemonApi', ()=>{
    test('axios debe estar configurado con el api de pokemon', ()=>{
        expect( pokemonApi.defaults.baseURL ).toBe('https://pokeapi.co/api/v2/pokemon')
    })
})

