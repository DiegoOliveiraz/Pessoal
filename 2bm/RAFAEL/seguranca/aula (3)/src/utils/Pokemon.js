export default class Pokemon{

    async valida(){
        return {validade:'ok',autor:'pikachu'}
    }

    async getPokemon(name){
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`
        const obj = await fetch(url)
        const dados = await obj.json()
        return dados
    }
}