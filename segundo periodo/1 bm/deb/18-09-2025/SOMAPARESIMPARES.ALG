algoritmo "SomaParesImpares"
var
   MAT: vetor[1..4,1..4] de inteiro
   SOMAPAR: vetor[1..4] de inteiro
   SOMAIMP: vetor[1..4] de inteiro
   i, j: inteiro

inicio
   // Leitura da matriz 4x4
   escreval("Digite os elementos da matriz MAT 4x4:")
   para i de 1 ate 4 faca
      para j de 1 ate 4 faca
         escreva("MAT[", i, ",", j, "]: ")
         leia(MAT[i,j])
      fimpara
   fimpara

   // Inicialização dos vetores
   para i de 1 ate 4 faca
      SOMAPAR[i] <- 0
      SOMAIMP[i] <- 0
   fimpara

   // Soma de elementos pares por linha
   para i de 1 ate 4 faca
      para j de 1 ate 4 faca
         se (MAT[i,j] % 2 = 0) entao
            SOMAPAR[i] <- SOMAPAR[i] + MAT[i,j]
         fimse
      fimpara
   fimpara

   // Soma de elementos ímpares por coluna
   para j de 1 ate 4 faca
      para i de 1 ate 4 faca
         se (MAT[i,j] % 2 <> 0) entao
            SOMAIMP[j] <- SOMAIMP[j] + MAT[i,j]
         fimse
      fimpara
   fimpara

   // Impressão da matriz
   escreval()
   escreval("MATRIZ MAT:")
   escreval("     Col1  Col2  Col3  Col4")
   para i de 1 ate 4 faca
      escreva("Lin", i, ":")
      para j de 1 ate 4 faca
         escreva(MAT[i,j]:6)
      fimpara
      escreval()
   fimpara

   // Impressão do vetor SOMAPAR (soma de elementos pares por linha)
   escreval()
   escreval("SOMAPAR (soma de elementos pares por linha):")
   para i de 1 ate 4 faca
      escreval("Linha ", i, ": ", SOMAPAR[i])
   fimpara

   // Impressão do vetor SOMAIMP (soma de elementos ímpares por coluna)
   escreval()
   escreval("SOMAIMP (soma de elementos ímpares por coluna):")
   para j de 1 ate 4 faca
      escreval("Coluna ", j, ": ", SOMAIMP[j])
   fimpara

fimalgoritmo