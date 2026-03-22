/**
 1 – Elaborar um algoritmo para testar se 10 números são pares ou ímpares. Deve-se imprimir também, 
no final, a quantidade de números pares e ímpares digitados. 
OBS: Utilizar o comando de repetição for no loop (laço) principal.
 */
let num, contpar = 0, contimpar = 0;
for (let cont = 0; cont < 10; cont++){
  num = Number(prompt(`digite o ${cont+1}º número: `));
  //numero par
  if (num % 2 === 0){
    alert(`O numero ${num} é par!`);
    contpar++;
  } else{
    alert(`O numero ${num} é impar!`);
    contimpar++;
  }
}
console.log(`Quantidade de números pares: ${contpar}`);
console.log(`Quantidade de números impares: ${contimpar}`);


