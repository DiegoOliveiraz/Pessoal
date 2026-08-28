//importar as funções a serem testadas
import { anoBissexto, soma } from "../src/utils/functions.js";

//importar funcoes do poku para testes
import {describe,assert,it} from 'poku'

describe("TESTE DO ARQUIVO functions.js",{background:'blue'})

it("testando soma(a,b)",()=>{
    assert.equal(soma(2,3) , 5,"soma(2,3) => 5")
    assert.equal(soma(0,0),0,"soma(0,0) => 0")
    assert.equal(soma(-1,-9),-10,"soma(-1,-9) => -10")
    assert.equal(soma(-2,8),6,"soma(-2,8) => 6")
    assert.equal(soma(2,-8),-6,"soma(2,-8) => -6")
})
it("testando erros em soma(a,b)",()=>{
    assert.throws(()=> soma('2',4),"erro ao entrar com string em a")
    assert.throws(()=> soma(2,'4'),"erro ao entrar com string em b")
    assert.throws(()=> soma('2','4'),"erro ao entrar com string em a e b")
    assert.throws(()=> soma(null,4),"erro ao entrar com null em a")
    assert.throws(()=> soma(undefined,4),"erro ao entrar com undefined em a")
    assert.throws(()=> soma(true,4),"erro ao entrar com true em a")
    assert.throws(()=> soma(3,false),"erro ao entrar com false em b")
    //assert.fail("ERRO PROVOCADO PARA VOLTAR AO PONTO")
    
})

