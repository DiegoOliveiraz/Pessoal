//importar as funções a serem testadas
import { anoBissexto, capitalizarPrimeiraLetra, contarPalavras, numeroPar, soma, subtrair, calcularMedia, numeroAleatorio, inverterString, maiorNumero, isWeekend} from "../src/utils/functions.js";

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

it("testando subtração(a,b)",()=>{
    assert.equal( subtrair(2,4),-2,"a subtração da conta (2,4) é -2");
    assert.equal( subtrair(2,5),-3,"a subtração da conta (2,5) é -3");
    assert.equal( subtrair(3,4),-1,"a subtração da conta (3,4) é -1");
    assert.equal( subtrair(4,4),0,"a subtração da conta (4,4) é 0");
    assert.equal( subtrair(7,6),1,"a subtração da conta (7,6) é 1");
    assert.equal( subtrair(6,7),-1,"a subtração da conta (6,7) é -1");
    assert.equal( subtrair(10,5),5,"a subtração da conta (10,5) é 5");
});

it("testando se o numero é par",()=>{
    assert.equal(numeroPar(2),true,"é par")
    assert.equal(numeroPar(4),true,"é par")
    assert.equal(numeroPar(6),true,"é par")
    assert.equal(numeroPar(8),true,"é par")
    assert.equal(numeroPar(10),true,"é par")
})
it("testando se o ano é Bissexto",()=>{
    assert.equal(anoBissexto(2000),true,"Esse ano é bissexto")
    assert.equal(anoBissexto(2004),true,"Esse ano é bissexto")
    assert.equal(anoBissexto(2008),true,"Esse ano é bissexto")
    assert.equal(anoBissexto(2012),true,"Esse ano é bissexto")
})
it("testando erro do ano é Bissexto",()=>{
    assert.throws(()=> anoBissexto(-2025),"precisa ser positivo")
    assert.throws(()=> anoBissexto(-"2025"),"precisa ser uma string")
    assert.throws(()=> anoBissexto(-2025),"esse ano não é bissexto")
   
})

 it("testando o capitalizamento da string",()=>{
     assert.equal(capitalizarPrimeiraLetra("Lula"),"Lula","Sim, LUla é foda 67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67-67.")
     assert.equal(capitalizarPrimeiraLetra("Pedro"),"Pedro","Sim, A capitalização está correta.")
     assert.equal(capitalizarPrimeiraLetra("Juao"),"Juao","Sim, A capitalização está correta.")
     assert.equal(capitalizarPrimeiraLetra("Elias"),"Elias","Sim, A capitalização está correta.")
 })

 it("testando se a contagem de palavras esta funcionando",()=>{
    assert.equal(contarPalavras("vai ser feliz"),3,"a conta está correta")
    assert.equal(contarPalavras("faz a porra do L"),5,"a conta está correta")
 })

it("testando se o email é valido",()=>{
    assert.equal(validarEmail("teste@teste.com"),true,"email válido")
    assert.equal(validarEmail("teste@teste"),false,"email sem domínio é inválido")
    assert.equal(validarEmail("testeteste.com"),false,"email sem @ é inválido")
 })
 
 it("testando a média de um array de números",()=>{
    assert.equal(calcularMedia([2,4,6]),4,"a média de [2,4,6] é 4")
    assert.equal(calcularMedia([10,20,30,40]),25,"a média de [10,20,30,40] é 25")
    assert.equal(calcularMedia([5]),5,"a média de [5] é 5")
    assert.equal(calcularMedia([]),null,"array vazio retorna null")
    assert.equal(calcularMedia("2,4,6"),null,"string não é array, retorna null")
 })
 
 it("testando se o número aleatório fica dentro do intervalo",()=>{
    for(let i=0;i<20;i++){
        const numero = numeroAleatorio(1,10)
        assert.equal(numero>=1 && numero<=10,true,"número está entre 1 e 10")
    }
    const fixo = numeroAleatorio(5,5)
    assert.equal(fixo,5,"min igual a max sempre retorna o próprio número")
 })
 
 it("testando a inversão de uma string",()=>{
    assert.equal(inverterString("Lula"),"aluL","a inversão de Lula é aluL")
    assert.equal(inverterString("Pedro"),"ordeP","a inversão de Pedro é ordeP")
    assert.equal(inverterString(""),"","a inversão de uma string vazia é vazia")
 })
 
 it("testando o maior número de um array",()=>{
    assert.equal(maiorNumero([1,5,3]),5,"o maior número de [1,5,3] é 5")
    assert.equal(maiorNumero([-10,-5,-1]),-1,"o maior número de [-10,-5,-1] é -1")
    assert.equal(maiorNumero([7]),7,"o maior número de [7] é 7")
    assert.equal(maiorNumero([]),null,"array vazio retorna null")
    assert.equal(maiorNumero("1,5,3"),null,"string não é array, retorna null")
 })
 
 it("testando se hoje é final de semana",()=>{
    const dia = new Date().getDay()
    const esperado = dia===0 || dia===6
    assert.equal(isWeekend(),esperado,"o resultado bate com o dia da semana atual")
 })