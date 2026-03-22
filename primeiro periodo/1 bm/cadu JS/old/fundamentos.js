//Variáveis e tipos de dados
//Tipo de Dado number
let idade = 15;
console.log("A idade da pessoa é " + idade);
let nota = 7.8;
console.log("A nota do aluno é " + nota);
//typeof - verificar o tipo da variável
console.log(typeof nota);
//Tipo de Dado string
let nome = "Antônio";
let sobrenome = 'Carlos';
console.log("Nome do aluno: " + nome + " " + sobrenome);
console.log(typeof nome);
//Tipo de Dado booleano
let achei = false;
let casado = true;
console.log("José é casado? " + casado);
console.log(typeof casado);
//Formatação de saida - concatenação
console.log(nome + ' tem ' + idade + ' anos de idade.');
//Formatação de saida - template string
console.log(`${nome} tem ${idade} anos de idade.`);
//Declaração de constantes 
const RAIO = 5.0;
console.log(`Valor da constante não se altera ao longo do programa: ${RAIO}`);
//RAIO = RAIO + 1;
//console.log(RAIO);
//Operadores matemáticos
let n1 = 4;
let n2 = 10;
console.log(`Soma de ${n1} com ${n2} é ${n1 + n2}.`);
console.log(`Subtração de ${n1} com ${n2} é ${n1 - n2}.`);
console.log(`Multiplicação de ${n1} com ${n2} é ${n1 * n2}.`);
console.log(`Divisão de ${n1} com ${n2} é ${n1 / n2}.`);
console.log(`Exponenciação de ${n1} com ${n2} é ${n1 ** n2}.`);
console.log(`Resto de divisão inteira de ${n1} com ${n2} é ${n1 % n2}.`);
//Hierarquia de Operadores
//Operadores aritméticos
let a = 5 + 3;
let b = a % 5;
let c = 5 * b ** 2;
let d = 10 - a/2;
let e = 6 * 2/d;
let f = b % e + 4 / e;
console.log(`a = ${a}, b = ${b}, c = ${c}`);
console.log(`d = ${d}, e = ${e}, f = ${f}`);
console.log(`Valor de PI: ${Math.PI}`);
console.log(`A raiz quadrada de 144 é ${Math.sqrt(144)}`);
console.log(`O nº 3 elevado ao quadrado é ${Math.pow(3,2)}`);
//Operadores relacionais
n1 = 10;
n2 = 10;
console.log(n1 > n2);
console.log(n1 >= n2);
console.log(n1 < n2);
console.log(n1 <= n2);
console.log(n1 === n2);
console.log(n1 !== n2);
let exp1 = false;
let exp3 = false;
console.log("Operador AND - &&");
console.log("----------------------------------------");
console.log(`${false}, ${false} -> ${false && false}`);
console.log(`${false}, ${true} -> ${false && true}`);
console.log(`${true}, ${false} -> ${true && false}`);
console.log(`${true}, ${true} -> ${true && true}`);
console.log("----------------------------------------");
console.log("Operador OR - ||");
console.log("----------------------------------------");
console.log(`${false}, ${false} -> ${false || false}`);
console.log(`${false}, ${true} -> ${false || true}`);
console.log(`${true}, ${false} -> ${true || false}`);
console.log(`${true}, ${true} -> ${true || true}`);
console.log("----------------------------------------");
console.log("Operador NOT - !");
console.log("----------------------------------------");
console.log(`${false} -> ${!false}`);
console.log(`${true} -> ${!true}`);
