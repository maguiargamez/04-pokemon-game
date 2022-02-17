<template>
  <div>

    <h1 v-if="!pokemon">Espere por favor...</h1>
    <div v-else>
      <h1>¿Quién es este pokémon?</h1>
      <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
      
      <PokemonOptions 
        :pokemons= "pokemonArr"
        @selectionPokemon="checkAnswer"
      />   

      <template v-if="showAnswer">
        <h2 class="fade-in">{{ message }}</h2> 
        <button @click="newGame">
          Nuevo juego
        </button>       
      </template>


    </div>



  </div>
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture"
import PokemonOptions from "@/components/PokemonOptions"
import getPokemonOptions from '@/helpers/getPokemonOptions'

// getPokemonOptions()

export default {
  name: "PokemonPage",
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: ''
    }
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions()
      const rndInt = Math.floor( Math.random() * 4 )
      this.pokemon = this.pokemonArr[ rndInt ]
    },
    checkAnswer( selectedId ){
      this.showPokemon= true
      this.showAnswer= true
      if( selectedId === this.pokemon.id ){
        this.message= `Correcto es ${ this.pokemon.name }!!!!`
      }
      else{
        this.message= `Ooops, era ${ this.pokemon.name } =(`
      }
    },
    newGame(){
      this.pokemonArr= []
      this.pokemon= null,
      this.showPokemon= false      
      this.showAnswer= false
      this.message= ''
      this.mixPokemonArray()
    }
  },
  mounted(){
    this.mixPokemonArray()
  }
};
</script>
