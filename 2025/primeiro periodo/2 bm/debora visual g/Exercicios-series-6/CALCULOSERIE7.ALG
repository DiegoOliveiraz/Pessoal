algoritmo "CalculoSerie7"
var
   S: real
   i, sinal: inteiro
   denominador: real
inicio
   S <- 0
   sinal <- 1
   denominador <- 100000
   para i de 1 ate 5 faca
      S <- S + (sinal * (i*i)) / denominador
      sinal <- sinal * -1
      denominador <- denominador / 10
   fimpara
   escreva("O valor da série S é: ", S)
fimalgoritmo