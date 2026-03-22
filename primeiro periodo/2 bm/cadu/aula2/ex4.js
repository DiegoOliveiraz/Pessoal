/**
 4 – Elaborar um algoritmo que receba a idade e o estado civil (C – Casado, S – Solteiro, V – Viúvo e D 
– Desquitado ou Separado), lidos nessa ordem. Calcule e imprima:
A) A quantidade de pessoas casadas com idade menor ou igual a 30 anos;
B) A quantidade de pessoas solteiras com idade maior ou igual a 22 anos;
C) A média das idades das pessoas viúvas;
D) A porcentagem de pessoas desquitadas ou separadas dentre todas as pessoas analisadas.
2
O algoritmo termina quando se digita um número igual a zero para a idade (flag). Se nenhuma pessoa 
viúva for digitada, deve-se contornar o erro apresentando uma mensagem ao usuário (“Nenhuma 
pessoa viúva foi digitada!”). Somente serão aceitas as letras C, S, V e D na variável estado civil, isto é, 
deve ser feita a proteção de dados no código.
OBS: Utilizar o comando de repetição while no loop (laço) principal e o comando de repetição 
do while na proteção de dados
 */

// Variáveis para armazenar os resultados
let casadosMenor30 = 0;
let solteirosMaior22 = 0;
let totalViuvos = 0;
let somaIdadesViuvos = 0;
let totalDesquitados = 0;
let totalPessoas = 0;

// Loop principal
let idade;
while (true) {
    // Entrada da idade (flag = 0 para sair)
    idade = Number(prompt("Digite a idade (0 para sair):"));
    
    if (idade === 0) break;
    
    // Proteção de dados para o estado civil
    let estadoCivil;
    do {
        estadoCivil = prompt("Estado civil (C-Casado, S-Solteiro, V-Viúvo, D-Desquitado):").toUpperCase();
    } while (!['C', 'S', 'V', 'D'].includes(estadoCivil));
    
    totalPessoas++;
    
    // Análises conforme os requisitos
    if (estadoCivil === 'C' && idade <= 30) {
        casadosMenor30++;
    }
    
    if (estadoCivil === 'S' && idade >= 22) {
        solteirosMaior22++;
    }
    
    if (estadoCivil === 'V') {
        somaIdadesViuvos += idade;
        totalViuvos++;
    }
    
    if (estadoCivil === 'D') {
        totalDesquitados++;
    }
}

// Cálculos finais
const mediaViuvos = totalViuvos > 0 ? somaIdadesViuvos / totalViuvos : null;
const percentualDesquitados = totalPessoas > 0 ? (totalDesquitados / totalPessoas) * 100 : 0;

// Apresentação dos resultados
console.log("Resultados:");
console.log(`A) Casados com idade ≤ 30 anos: ${casadosMenor30}`);
console.log(`B) Solteiros com idade ≥ 22 anos: ${solteirosMaior22}`);

if (totalViuvos > 0) {
    console.log(`C) Média de idades dos viúvos: ${mediaViuvos.toFixed(2)}`);
} else {
    console.log("C) Nenhuma pessoa viúva foi digitada!");
}

console.log(`D) Percentual de desquitados/separados: ${percentualDesquitados.toFixed(2)}%`);