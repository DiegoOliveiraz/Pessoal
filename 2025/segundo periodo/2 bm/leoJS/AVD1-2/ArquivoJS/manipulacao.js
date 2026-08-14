// ========================================
// PARTE 1 – Transformação com map()
// ========================================

const produtos = [
  { nome: "Camisa", preco: 50 },
  { nome: "Calça", preco: 80 },
  { nome: "Tênis", preco: 120 },
  { nome: "Boné", preco: 40 }
];

// Aplicar 15% de desconto em cada produto
const precosComDesconto = produtos.map(produto => ({
  nome: produto.nome,
  preco: produto.preco * 0.85
}));

console.log("=== PARTE 1 - Preços com Desconto (15%) ===");
console.log(precosComDesconto);
console.log("\n");


// ========================================
// PARTE 2 – Filtragem com filter()
// ========================================

// Produtos com preço acima de R$ 60
const produtosCaros = produtos.filter(produto => produto.preco > 60);

// Produtos com preço abaixo ou igual a R$ 60
const produtosBaratos = produtos.filter(produto => produto.preco <= 60);

console.log("=== PARTE 2 - Filtragem de Produtos ===");
console.log("Produtos Caros (> R$ 60):", produtosCaros);
console.log("Produtos Baratos (<= R$ 60):", produtosBaratos);
console.log("\n");


// ========================================
// PARTE 3 – Redução com reduce()
// ========================================

const pedidos = [
  { cliente: "Ana", total: 150 },
  { cliente: "Bruno", total: 200 },
  { cliente: "Carla", total: 100 },
  { cliente: "Daniel", total: 180 }
];

// Calcular valor total de todos os pedidos
const valorTotalPedidos = pedidos.reduce((acumulador, pedido) => acumulador + pedido.total, 0);

// Calcular valor médio dos pedidos
const valorMedioPedidos = pedidos.reduce((acumulador, pedido, indice, array) => {
  acumulador += pedido.total;
  return indice === array.length - 1 ? acumulador / array.length : acumulador;
}, 0);

console.log("=== PARTE 3 - Redução de Pedidos ===");
console.log("Valor Total dos Pedidos: R$", valorTotalPedidos);
console.log("Valor Médio dos Pedidos: R$", valorMedioPedidos);
console.log("\n");


// ========================================
// PARTE 4 – Problema Integrado (map + filter + reduce)
// ========================================

const alunos = [
  { nome: "Ana", nota: 9 },
  { nome: "Bruno", nota: 6 },
  { nome: "Carla", nota: 8 },
  { nome: "Diego", nota: 4 },
  { nome: "Eduarda", nota: 7 }
];

// 1. Filtrar alunos aprovados (nota >= 7)
const aprovados = alunos.filter(aluno => aluno.nota >= 7);

// 2. Obter apenas os nomes dos aprovados
const nomesAprovados = aprovados.map(aluno => aluno.nome);

// 3. Calcular média de notas de toda a turma
const mediaTurma = alunos.reduce((acumulador, aluno, indice, array) => {
  acumulador += aluno.nota;
  return indice === array.length - 1 ? acumulador / array.length : acumulador;
}, 0);

console.log("=== PARTE 4 - Problema Integrado ===");
console.log("Alunos Aprovados (nota >= 7):", aprovados);
console.log("Nomes dos Aprovados:", nomesAprovados);
console.log("Média da Turma:", mediaTurma.toFixed(2));
console.log("\n");


// ========================================
// RESUMO DOS RESULTADOS
// ========================================

console.log("========================================");
console.log("           RESUMO GERAL");
console.log("========================================");
console.log("\n📦 PRODUTOS COM DESCONTO:");
precosComDesconto.forEach(p => console.log(`  ${p.nome}: R$ ${p.preco.toFixed(2)}`));

console.log("\n💰 PRODUTOS CAROS:");
produtosCaros.forEach(p => console.log(`  ${p.nome}: R$ ${p.preco}`));

console.log("\n💵 PRODUTOS BARATOS:");
produtosBaratos.forEach(p => console.log(`  ${p.nome}: R$ ${p.preco}`));

console.log("\n🛒 PEDIDOS:");
console.log(`  Total: R$ ${valorTotalPedidos}`);
console.log(`  Média: R$ ${valorMedioPedidos}`);

console.log("\n🎓 ALUNOS:");
console.log(`  Aprovados: ${nomesAprovados.join(", ")}`);
console.log(`  Média da Turma: ${mediaTurma.toFixed(2)}`);
console.log("\n========================================");
