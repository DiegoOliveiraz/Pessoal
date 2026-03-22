// ========================================
// EXERCÍCIOS PRÁTICOS - ARRAYS EM JAVASCRIPT
// ========================================

// ========================================
// 1. Array com 5 números - Maior e Menor
// ========================================
console.log("=== Exercício 1 ===");
const numeros = [45, 12, 78, 23, 56];
const maior = Math.max(...numeros);
const menor = Math.min(...numeros);

console.log("Array:", numeros);
console.log("Maior número:", maior);
console.log("Menor número:", menor);
console.log("\n");

// ========================================
// 2. Lista de Compras - Push, Pop, Shift, Unshift
// ========================================
console.log("=== Exercício 2 ===");
let listaCompras = ["Arroz", "Feijão", "Macarrão"];
console.log("Lista inicial:", listaCompras);

// Adicionar item no final (push)
listaCompras.push("Café");
console.log("Após push('Café'):", listaCompras);

// Adicionar item no início (unshift)
listaCompras.unshift("Leite");
console.log("Após unshift('Leite'):", listaCompras);

// Remover item do final (pop)
const itemRemovido = listaCompras.pop();
console.log("Após pop() - Removido:", itemRemovido);
console.log("Lista atual:", listaCompras);

// Remover item do início (shift)
const itemRemovido2 = listaCompras.shift();
console.log("Após shift() - Removido:", itemRemovido2);
console.log("Lista final:", listaCompras);
console.log("\n");

// ========================================
// 3. Matriz 3x3 - Exibir com dois FOR
// ========================================
console.log("=== Exercício 3 ===");
const matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log("Matriz 3x3:");
for (let i = 0; i < matriz.length; i++) {
  let linha = "";
  for (let j = 0; j < matriz[i].length; j++) {
    linha += matriz[i][j] + " ";
  }
  console.log(linha);
}
console.log("\n");

// ========================================
// 4. Array de Objetos (Alunos) - Nota > 7
// ========================================
console.log("=== Exercício 4 ===");
const alunos = [
  { nome: "João", nota: 8.5 },
  { nome: "Maria", nota: 6.0 },
  { nome: "Pedro", nota: 9.0 },
  { nome: "Ana", nota: 5.5 },
  { nome: "Carlos", nota: 7.5 },
  { nome: "Beatriz", nota: 10.0 },
  { nome: "Lucas", nota: 6.8 },
];

console.log("Alunos com nota maior que 7:");
for (let i = 0; i < alunos.length; i++) {
  if (alunos[i].nota > 7) {
    console.log(`${alunos[i].nome} - Nota: ${alunos[i].nota}`);
  }
}
console.log("\n");

// ========================================
// 5. Array Misto - For Of
// ========================================
console.log("=== Exercício 5 ===");
const arrayMisto = [
  42,
  "texto",
  true,
  { tipo: "objeto", valor: 100 },
  [1, 2, 3],
  null,
  3.14,
];

console.log("Percorrendo array misto com for...of:");
for (const elemento of arrayMisto) {
  console.log(`Tipo: ${typeof elemento} | Valor:`, elemento);
}
