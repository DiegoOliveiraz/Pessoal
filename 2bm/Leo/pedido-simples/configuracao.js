/**
 * Padrão Singleton: garante que apenas uma instância de Configuração exista.
 * Centraliza configurações globais da aplicação (moeda, descontos, etc).
 */

class Configuracao {
  constructor() {
    if (Configuracao.instancia) {
      return Configuracao.instancia;
    }
    this.moeda = "R$";
    this.percentualDescontoPadrao = 0.05;
    Configuracao.instancia = this;
  }

  alterarMoeda(novaMoeda) {
    this.moeda = novaMoeda;
  }
}

module.exports = new Configuracao();
