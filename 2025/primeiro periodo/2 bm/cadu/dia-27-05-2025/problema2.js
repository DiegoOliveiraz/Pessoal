//solicitar numero da tabuada
let numero = Number(
  prompt("Digite o numero para o qual deseja calcular a tabuada:")
);

//solicitar os valores inicial e final, garatindo que final seja maior ou igual ao inicial
let inicio, fim;
do {
  inicio = Number(prompt("Digite o valor inicial da tabuada:"));
  fim = Number(
    prompt(
      "digite o valor final da tabuada (deve ser maior ou igual ao inicial:"
    )
  );
  if (fim < inicio) {
    alert("O valor final deve ser maior ou igual ao inicial. Tente novamente");
  }
} while (fim < inicio);

//calcular e exibir a tabuada
let resultado = `Tabuada do numero ${numero}\nComeça em: ${inicio}\nTermina em: ${fim}\n`;

for (let i = inicio; i <= fim; i++) {
  resultado += `${numero} x ${i} = ${numero * i}\n`;
}
alert(resultado);
