// Solicitar ao usuário que insira seu nome
let nome = prompt("Qual é o seu nome?", "Insira seu nome aqui");
// Verificar se o usuário clicou em "OK" ou "Cancelar"
if (nome !== null) {
alert("Olá, " + nome + "!");
} else {
alert("Entrada de nome cancelada.");
}
let idade = Number(prompt("Quantos anos você tem?"));
if (!isNaN(idade) && idade > 0) {
if (idade >= 18) {
alert("Você é maior de idade.");
} else {
alert("Você é menor de idade.");
}
} else {
alert("Por favor, insira um número válido.");
}


/**Elaborar um algoritmo para ler os coeficientes A, B e C de uma equação do segundo grau levando-se em consideração os seguintes critérios:
•
•
•
Se delta for negativo: imprimir a mensagem ”Não há solução real.”;
Se delta for igual a zero: imprimir a mensagem "Duas raízes reais iguais." e calcular e imprimir a raiz da equação;
Se delta for maior do que zero: imprimir a mensagem "Duas raízes reais diferentes." e calcular e imprimir as raízes da equação.
 */

let a = Number(prompt("Insira o coeficiente A"));
let b = Number(prompt("Insira o coeficiente B"));
let c = Number(prompt("Insira o coeficiente C"));

if (a === 0) {
    alert("Não é uma equação quadrática (A não pode ser zero)");
} else {
    let delta = b * b - 4 * a * c;

    if (delta < 0) {
        alert("Não há solução real");
    } else if (delta === 0) {
        let x = (-b) / (2 * a); // Única raiz (dupla)
        alert(`Duas raízes reais iguais: ${x.toFixed(2)}`); // Corrigido: toFixed(2)
    } else {
        let x1 = (-b + Math.sqrt(delta)) / (2 * a);
        let x2 = (-b - Math.sqrt(delta)) / (2 * a);
        alert(`Duas raízes reais diferentes: ${x1.toFixed(2)} e ${x2.toFixed(2)}`);
    }
}

