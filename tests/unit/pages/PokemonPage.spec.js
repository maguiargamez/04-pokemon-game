import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonPage component', ()=>{ 
    let wrapper

    beforeEach(()=>{
        wrapper = shallowMount( PokemonPage )
    })

    test('Debe de hacer match con el snapshot', ()=>{
        //console.log(wrapper.html())
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('debe de llamar el mixPokemonArray al montar', ()=>{
        const mixPokemonArraySpy = jest.spyOn( PokemonPage.methods, 'mixPokemonArray' )
        const wrapper = shallowMount( PokemonPage )

        expect( mixPokemonArraySpy ).toHaveBeenCalled()
    })

    test('debe de hacer match con el snapshot cuando cargan los pokemon', ()=>{
        const wrapper = mount( PokemonPage, {
            data(){
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        } )

        expect(wrapper.html()).toMatchSnapshot()
    })

    test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', ()=>{

        const wrapper = shallowMount( PokemonPage, {
            data(){
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        } )

        //console.log(wrapper.html())

        
        const pokemonPictureComponent = wrapper.find('pokemon-picture-stub')
        const pokemonOptionsComponent = wrapper.find('pokemon-options-stub')

        //PokemonPicture debe de existir
        expect( pokemonPictureComponent.exists() ).toBeTruthy()        

        //PokemonOptions debe de existir        
        expect( pokemonOptionsComponent.exists() ).toBeTruthy() 

        //PokemonPicture attribute pokemonId === 1
        expect( pokemonPictureComponent.attributes('pokemonid') ).toBe('1')

        //PokemonOptions attribute pokemons toBe true
        expect( pokemonOptionsComponent.attributes('pokemons') ).toBeTruthy()  

    })

    test('prubeas con checkAnswer',async  ()=> {
        const wrapper = shallowMount( PokemonPage, {
            data(){
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        } )

        await wrapper.vm.checkAnswer(1)

        expect( wrapper.find('h2').exists() ).toBeTruthy()
        expect( wrapper.vm.showPokemon ).toBeTruthy()
        expect( wrapper.find('h2').text() ).toBe(`Correcto es ${ pokemons[0].name }!!!!`)

        await wrapper.vm.checkAnswer(3)
        expect( wrapper.vm.message ).toBe(`Ooops, era ${ pokemons[0].name } =(`)
    })
})