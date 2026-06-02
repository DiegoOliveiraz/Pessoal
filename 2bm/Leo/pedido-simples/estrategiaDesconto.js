/**
 * Padrão Strategy: define uma família de algoritmos de desconto,
 * encapsula cada um e torna-os intercambiáveis.
 */

class EstrategiaDesconto {
  calcular(preco) {
    return preco;
  }
}

class DescontoPadrao extends EstrategiaDesconto {
  constructor(config) {
    super();
    this.config = config;
  }
  calcular(preco) {
    return preco * (1 - this.config.percentualDescontoPadrao);
  }
}

class DescontoFidelidade extends EstrategiaDesconto {
  calcular(preco) {
    return preco * 0.9; // 10% de desconto
  }
}

module.exports = { DescontoPadrao, DescontoFidelidade };
