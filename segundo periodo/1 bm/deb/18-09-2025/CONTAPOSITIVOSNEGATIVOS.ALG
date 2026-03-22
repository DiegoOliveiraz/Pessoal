algoritmo "ContaPositivosNegativos"
var
   matriz: vetor[1..4,1..4] de real
   QTDNEG: vetor[1..4] de inteiro
   QTDEPOS: vetor[1..4] de inteiro
   i, j: inteiro

inicio
   // Leitura da matriz 4x4
   escreval("Digite os elementos da matriz 4x4:")
   para i de 1 ate 4 faca
      para j de 1 ate 4 faca
         escreva("Matriz[", i, ",", j, "]: ")
         leia(matriz[i,j])
      fimpara
   fimpara

   // Inicialização dos vetores
   para i de 1 ate 4 faca
      QTDNEG[i] <- 0
      QTDEPOS[i] <- 0
   fimpara

   // Contagem de elementos negativos por linha
   para i de 1 ate 4 faca
      para j de 1 ate 4 faca
         se matriz[i,j] < 0 entao
            QTDNEG[i] <- QTDNEG[i] + 1
         fimse
      fimpara
   fimpara

   // Contagem de elementos positivos por coluna
   para j de 1 ate 4 faca
      para i de 1 ate 4 faca
         se matriz[i,j] > 0 entao
            QTDEPOS[j] <- QTDEPOS[j] + 1
         fimse
      fimpara
   fimpara

   // Impressão da matriz
   escreval()
   escreval("MATRIZ:")
   escreval("     Col1  Col2  Col3  Col4")
   para i de 1 ate 4 faca
      escreva("Lin", i, ":")
      para j de 1 ate 4 faca
         escreva(matriz[i,j]:6:0)
      fimpara
      escreval()
   fimpara

   // Impressão do vetor QTDNEG (quantidade de negativos por linha)
   escreval()
   escreval("QTDNEG (quantidade de elementos negativos por linha):")
   para i de 1 ate 4 faca
      escreval("Linha ", i, ": ", QTDNEG[i], " elementos negativos")
   fimpara

   // Impressão do vetor QTDEPOS (quantidade de positivos por coluna)
   escreval()
   escreval("QTDEPOS (quantidade de elementos positivos por coluna):")
   para j de 1 ate 4 faca
      escreval("Coluna ", j, ": ", QTDEPOS[j], " elementos positivos")
   fimpara

fimalgoritmo