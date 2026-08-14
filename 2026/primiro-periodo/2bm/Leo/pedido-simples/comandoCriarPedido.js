/**
 * Padrão Command: encapsula uma ação (criar pedido) em um objeto.
 * Permite parametrizar operações, enfileirá-las e desfazê-las.
 */

const observador = require("./observador");
const repositorio = require("./repositorioPedido");

class ComandoCriarPedido {
  constructor(pedido) {
    this.pedido = pedido;
  }

  executar() {
    repositorio.salvar(this.pedido);
    observador.notificar(`Pedido criado: ${this.pedido.produto.nome}`);
  }
}

module.exports = ComandoCriarPedido;
