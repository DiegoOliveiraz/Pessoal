algoritmo "CalculoSerie2"
var
   S: real
   i: inteiro
inicio
   S <- 0
   para i de 1 ate 50 faca
      S <- S + (2^i) / (51 - i)
   fimpara
   escreva("O valor da série S é: ", S)
fimalgoritmo