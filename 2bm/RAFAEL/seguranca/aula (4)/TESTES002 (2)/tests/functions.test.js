//importar as funções a serem testadas
import { anoBissexto,isWeekend,calcularMedia, soma,subtrair,numeroAleatorio,numeroPar,capitalizarPrimeiraLetra } from "../src/utils/functions.js";

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

it("testando subtração", ()=>{
    assert.equal(subtrair(3,2) , 1,"subtrair(3,2) deve retornar 1")

})

it("testando calcularMedia", ()=>{
    assert.equal(calcularMedia([2,3,4,5,1]) , 3,"deve retornar 3 de [2,3,4,5,1]")

})

it("testando numeroPar", ()=>{
    assert.equal(numeroPar(3) , false,"deve retornar false para 3")
    assert.equal(numeroPar(1000) , true,"deve retornar true para 1000")
    assert.equal(numeroPar(-2) ,true,"deve retornar true para -2")
    assert.equal(numeroPar(0) ,true,"deve retornar true para 0")
})

it("testando capitalizarPrimeiraLetra", ()=>{
    assert.equal(capitalizarPrimeiraLetra('rick') , 'Rick',"deve retornar Rick")
})

it("testando numeroAleatorio", ()=>{
    let n,min,max
    
    min=1; max=10; n=numeroAleatorio(min,max)
    assert.equal(n>=min && n<=max, true, `deve retornar entre ${min} e ${max} (${n})`)
    
    min=2; max=5; n=numeroAleatorio(min,max)
    assert.ok(n>=min && n<=max,`deve retornar entre ${min} e ${max} (${n})`)

    min=-100; max=100; n=numeroAleatorio(min,max)
    assert.ok(n>=min && n<=max,`deve retornar entre ${min} e ${max} (${n})`)

    for(let i=0;i<=100;i++){
        min=1; max=10; n=numeroAleatorio(min,max)
        assert.ok(n>=min && n<=max,`deve retornar entre ${min} e ${max} (${n})`)
    }
})

//DEVE SER REFEITO
it("testando isWeekend", ()=>{
    //guardar a classe original
    const real = global.Date
    //modificar a classe
    global.Date = function(){return new real('2026/08/29') } //final de semana
    //faz o teste
    const date = new Date()
    //faz o teste
     assert.equal(isWeekend() , true,"deve retornar true para o dia" +date.toLocaleString('pt-br'))
    //volta com a função normal
    global.Date = real


    // assert.equal(isWeekend() , false,"deve retornar false")
   
    
})







