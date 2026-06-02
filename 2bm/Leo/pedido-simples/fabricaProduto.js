/**
 * Padrão Factory: cria diferentes tipos de produtos sem expor a lógica de criação.
 * Encapsula a complexidade de instanciação.
 */

function criarProduto(tipo, nome, preco) {
  if (tipo === "eletronico") {
    return { tipo, nome, preco, garantiaMeses: 12 };
  } else if (tipo === "vestuario") {
    return { tipo, nome, preco, tamanho: "M" };
  } else {
    return { tipo: "geral", nome, preco };
  }
}

module.exports = { criarProduto };
