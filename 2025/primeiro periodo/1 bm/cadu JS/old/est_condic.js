/**
 * testar se o numero é par ou impar
 */

//condicional simples
 num = 11;
if (num%2 ===0){
console.log(`o numero ${num} é par!`)

}
else{
if (num%2 ===1)
console.log(`o numero ${num} é impar!`)

}

/**
 * testar se o numero é positivo ou negativo
 */

num = 0;
if (num > 0){
    console.log(`o numero ${num} é positivo`);
}else if (num < 0){
    console.log(`o numero ${num} é negativo`);
}else{
    console.log(`o numero ${num} é nulo`);
}

/**
 * elaborar um algoritimo que leia o nome e a idade de duAS pessoas e verifique
 * qual é o mais novo dentre as duas pessoas lidas.
 */
const nomepessoal1 = "jaison";
const nomepessoal2 = "iracema";
const idadepessoal1 = 47;
const idadepessoal2 = 48;

// comparar se as pessoas tem a mesma idade
if (idadepessoal1 === idadepessoal2){
    console.log(`${nomepessoal1} e ${nomepessoal2} possuem a mesma idade (${idadepessoal1}anos) !`);
}
else if(idadepessoal1 < idadepessoal2){
    console.log(`${nomepessoal1} é mais novo do que ${nomepessoal2}!`);
}

    /**
     * Fazer um algoritmo que leia o nome de um funcionário, seu cargo, seu salário e faça o 
    reajuste salarial de acordo com os critérios apresentados abaixo: 
    A Salário ≤ R$ 1.000,00 -> 30% de reajuste 
    B R$ 1.000,00 < Salário ≤ 5.000,00 -> 20% de reajuste 
    C  Salário > R$ 5.000,00 -> 10% de reajuste
    */


let nome = "diogo";
let cargo = "analista";
let salario = 550;
let reaj, novo_salario;
if (salario <= 1000){
    reaj = 30/100 * salario;
    novo_salario = salario + reaj
} else if (salario > 1000 && salario <= 5000){
    reaj = 20/100+salario;
    novo_salario = salario + reaj
 } else {
        reaj = 10/100+salario;
        novo_salario = salario + reaj
    }

console.log("nome: " + nome);
console.log("cargo: " + cargo);
console.log("salario R$: " + salario);
console.log("reajuste R$: " + reaj)
console.log("novo salario R$: " + novo_salario)

