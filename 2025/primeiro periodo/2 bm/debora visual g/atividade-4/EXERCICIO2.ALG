algoritmo "Exercicio2"
var
   S, numerador, denominador: real
   i, sinal: inteiro
inicio
   S <- 0
   sinal <- 1
   denominador <- 500

   para i de 1 ate 10 faca
      se (i % 2 = 1) entao
         numerador <- 2
      senao
         numerador <- -5
      fimse

      S <- S + (numerador / denominador)
      denominador <- denominador - 50
      sinal <- sinal * -1
   fimpara

   escreval("Soma dos 10 primeiros termos: ", S)
fimalgoritmo