// Define três variáveis numéricas com valores de anos
let N1 = 1886;
let N2 = 1945;
let N3 = 2026;

// Cria um array com os valores e ordena em ordem crescente usando sort()
// A função anônima (a,b) => a - b compara e ordena os números
let ordem = [N1, N2, N3].sort((a, b) => a - b);
// Exibe o resultado da ordenação no console
console.log(ordem);
