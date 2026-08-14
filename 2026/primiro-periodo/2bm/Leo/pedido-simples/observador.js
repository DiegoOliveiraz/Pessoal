/**
 * Padrão Observer: permite que objetos notifiquem múltiplos observadores
 * sobre mudanças de estado. Implementa pub/sub simples.
 */

class Observador {
  constructor() {
    this.inscritos = [];
  }

  inscrever(funcao) {
    this.inscritos.push(funcao);
  }

  notificar(dado) {
    this.inscritos.forEach((funcao) => funcao(dado));
  }
}

module.exports = new Observador();
