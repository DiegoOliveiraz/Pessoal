/**2 – Elaborar um algoritmo que leia 10 números inteiros e calcule o produto dos números pares e 
divisíveis por 5 maiores do que um número de referência qualquer digitado pelo usuário.
Ex: Número de referência digitado pelo usuário: 9
10 Números digitados pelo usuário: 5, 10, 9, 15, 20, 8, 10, 1, 12, 35
Produto: 10 x 20 x 10 = 2000
OBS: Utilizar o comando de repetição for no loop (laço) principal */

// Entrada do número de referência
const numRef = Number(prompt("Digite um número de referência:"));
let produto = 1;
const numerosValidos = [];

// Loop principal para ler os 10 números
for (let i = 1; i <= 10; i++) {
    const input = prompt(`Digite o ${i}º número (inteiro):`);
    const num = Number(input);
    
    // Verificação dos critérios
    if (num % 2 === 0 && num % 5 === 0 && num > numRef) {
        produto *= num;
        numerosValidos.push(num);
        alert(`Número ${num} adicionado (par, divisível por 5 e maior que ${numRef})`);
    }
}

// Saída final formatada
if (numerosValidos.length > 0) {
    alert(`\nNúmeros válidos encontrados: ${numerosValidos.join(' × ')}`);
    alert(`Produto final: ${produto}`);
} else {
    alert("\nNenhum número atendeu aos critérios especificados.");
}