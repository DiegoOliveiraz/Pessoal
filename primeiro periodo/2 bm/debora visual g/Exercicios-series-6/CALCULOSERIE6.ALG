algoritmo "CalculoSerie6"
var
   S: real
   i, sinal, termo: inteiro
inicio
   S <- 0
   sinal <- 1
   para i de 40 ate 4 passo -4 faca
      termo <- i * i
      S <- S + (sinal * i) / termo
      sinal <- sinal * -1
   fimpara
   escreva("O valor da série S é: ", S)
fimalgoritmo