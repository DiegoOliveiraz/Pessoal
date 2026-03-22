//solicitar a entra da dos valores
let num1 = Number(prompt("digite o primeiro numero (num1) :"));
let num2 = Number(prompt("digite o primeiro numero (num2) :"));
let num3 = Number(prompt("digite o primeiro numero (num3) :"));
let opcao = Number(prompt("digite a opção dessejada (1,2):"));

//imprimir os valores

alert(`valores lidos:Number num1 = ${num1}, num2 = ${num2}, num3 = ${num3}`);

if (opcao === 1) {
  //imprimir o menor valor
  let menor = Math.min(num1, num2, num3);
  alert(`menor valor é: ${menor}`);
} else if (opcao === 2) {
  //imprimir a raiz quadrada dos valores
  alert(`Raiz quadrada dos valores:
    num1: ${Math.sqrt(num1).toFixed(2)},
    num2: ${Math.sqrt(num2).toFixed(2)},
    num3: ${Math.sqrt(num3).toFixed(2)}
    `);
} else {
  //opção invalida
  alert("opção invalida");
}