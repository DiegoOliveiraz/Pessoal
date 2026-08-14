/**
 3 – Elaborar um algoritmo que faça a tabuada de um número inteiro digitado pelo usuário, mas a 
tabuada não necessariamente deve iniciar em 1 e terminar em 10. Os valores inicial e final devem ser 
informados pelo usuário, conforme exemplo abaixo. Deve-se fazer a proteção de dados para que o 
usuário não digite um valor final menor do que o valor inicial.
Montar a tabuada do número: 5
Começa em: 4
Temina em: 7
Tabuada do número 5 começando em 4 e terminando em 7
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
OBS: Utilizar o comando de repetição for no loop (laço) principal e o comando de repetição do 
while na proteção de dados.
 */

// Solicita o número para a tabuada
const numero = Number(prompt("Montar a tabuada do número:"));

// Validação do intervalo usando do-while
let inicio, fim;
do {
    inicio = Number(prompt("Começa em:"));
    fim = Number(prompt("Termina em:"));
    
    if (fim < inicio) {
        alert("O valor final deve ser maior ou igual ao valor inicial!");
    }
} while (fim < inicio);

// Cabeçalho da tabuada
alert(`Tabuada do número ${numero} começando em ${inicio} e terminando em ${fim}`);

// Geração da tabuada usando for
for (let i = inicio; i <= fim; i++) {
    const resultado = numero * i;
    alert(`${numero} × ${i} = ${resultado}`);
}