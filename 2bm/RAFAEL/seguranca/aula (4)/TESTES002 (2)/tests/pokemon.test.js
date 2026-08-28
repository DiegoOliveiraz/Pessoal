import { assert, it, beforeEach,afterEach, describe } from "poku";
import Pokemon from "../src/utils/Pokemon.js";

describe("TESTANDO A CLASSE POKEMON",{background:"yellow"})

let poke
beforeEach(()=>{
    poke = new Pokemon()
})
afterEach(()=>{
    
})

await it("metodo valida", async ()=>{
    const retorno = {validade:'ok',autor:'pikachu'}
    const v = await poke.valida()
    assert.deepStrictEqual(v,retorno, "deve retornar a validação")
})

await it("metodo pokemon", async ()=>{
    const p = await poke.getPokemon('ditto')
    assert.equal(p.id,132,"deve retornar o id 132 para o ditto")
    assert.equal(p.name,'ditto',"deve retornar o nome ditto")
})