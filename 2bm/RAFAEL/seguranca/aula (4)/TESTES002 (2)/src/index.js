import { soma,anoBissexto } from "./utils/functions.js";
import Pokemon from "./utils/Pokemon.js";

// try{
//     console.log(soma(4,4))
// }catch(e){
//     console.log('aconteceu um erro: ' + e)
// }

//console.log(anoBissexto())

const p = new Pokemon()
const dados = await p.getPokemon('dito')
console.log(dados)

