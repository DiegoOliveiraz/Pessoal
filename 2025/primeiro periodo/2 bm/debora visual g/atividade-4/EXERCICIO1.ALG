algoritmo "Exercicio1"
var
   numero, soma, contador, maior, menor, fatorial, i: inteiro
   media: real
inicio
   soma <- 0
   contador <- 0
   maior <- -1
   menor <- 999999

   repita
      escreva("Digite um número inteiro positivo (0 para sair): ")
      leia(numero)

      se (numero <> 0) entao
         soma <- soma + numero
         contador <- contador + 1

         se (numero > maior) entao
            maior <- numero
         fimse

         se (numero < menor) entao
            menor <- numero
         fimse

         se (numero % 2 = 0) entao
            fatorial <- 1
            para i de 1 ate numero faca
               fatorial <- fatorial * i
            fimpara
            escreval("Fatorial de ", numero, ": ", fatorial)
         senao
            escreval("Tabuada de ", numero, ":")
            para i de 1 ate 10 faca
               escreval(numero, " x ", i, " = ", numero * i)
            fimpara
         fimse
      fimse
   ate (numero = 0)

   se (contador > 0) entao
      media <- soma / contador
      escreval("Média dos números: ", media)
      escreval("Maior número: ", maior)
      escreval("Menor número: ", menor)
   senao
      escreval("Nenhum número foi digitado.")
   fimse
fimalgoritmo