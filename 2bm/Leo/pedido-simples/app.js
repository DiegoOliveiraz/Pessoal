/**
 * Arquivo principal: demonstra o uso integrado de todos os padrões de design.
 * - Factory: criação de produtos
 * - Strategy: aplicação de diferentes estratégias de desconto
 * - Command: execução de operações de pedidos
 * - Observer: notificações de eventos
 * - Repository: armazenamento de dados
 * - Singleton: instância única de configuração
 */

const config = require("./configuracao");
const { criarProduto } = require("./fabricaProduto");
const { DescontoPadrao, DescontoFidelidade } = require("./estrategiaDesconto");
const observador = require("./observador");
const Repositorio = require("./repositorioPedido");
const ComandoCriarPedido = require("./comandoCriarPedido");

// Observadores
observador.inscrever((msg) => console.log("LOG:", msg));
observador.inscrever((msg) => console.log("📢 Notificação:", msg));

// Criando produtos com Factory
const produto1 = criarProduto("eletronico", "Fone de Ouvido", 200);
const produto2 = criarProduto("vestuario", "Camisa Polo", 100);

// Aplicando estratégias de desconto
const descontoPadrao = new DescontoPadrao(config);
const descontoFidelidade = new DescontoFidelidade();

produto1.precoFinal = descontoPadrao.calcular(produto1.preco);
produto2.precoFinal = descontoFidelidade.calcular(produto2.preco);

// Criando pedidos com Command
const pedido1 = { produto: produto1, cliente: "João" };
const pedido2 = { produto: produto2, cliente: "Maria" };

const comando1 = new ComandoCriarPedido(pedido1);
const comando2 = new ComandoCriarPedido(pedido2);

comando1.executar();
comando2.executar();

// Mostrando repositório de pedidos
console.log("\n📦 Pedidos Salvos:");
console.table(Repositorio.listar());
