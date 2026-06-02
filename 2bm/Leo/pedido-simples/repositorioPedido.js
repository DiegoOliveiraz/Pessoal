/**
 * Padrão Repository: abstrai o armazenamento de pedidos.
 * Centraliza operações de leitura/escrita, facilitando mudanças futuras na camada de dados.
 */

class RepositorioPedido {
  constructor() {
    this.pedidos = [];
  }

  salvar(pedido) {
    this.pedidos.push(pedido);
  }

  listar() {
    return this.pedidos;
  }
}

module.exports = new RepositorioPedido();
