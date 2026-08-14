algoritmo "VetorSomaPotencia"
// Algoritmo para ler vetor A, calcular soma e criar vetor B com potências
var
   A: vetor[1..10] de real
   B: vetor[1..10] de real
   i: inteiro
   soma: real

inicio
   // Leitura do vetor A
   escreval("=== LEITURA DO VETOR A ===")
   para i de 1 ate 10 faca
      escreva("Digite o elemento A[", i, "] (valor positivo): ")
      leia(A[i])

      // Validação para garantir que o valor seja positivo
      enquanto A[i] <= 0 faca
         escreva("Valor deve ser positivo! Digite novamente A[", i, "]: ")
         leia(A[i])
      fimenquanto
   fimpara

   // Cálculo da soma dos elementos do vetor A
   soma <- 0
   para i de 1 ate 10 faca
      soma <- soma + A[i]
   fimpara

   // Exibição da soma
   escreval()
   escreval("=== RESULTADO DA SOMA ===")
   escreval("Soma de todos os elementos do vetor A: ", soma:0:2)

   // Formação do vetor B (cada elemento elevado à potência da posição)
   para i de 1 ate 10 faca
      B[i] <- A[i] ^ i
   fimpara

   // Exibição dos vetores A e B
   escreval()
   escreval("=== COMPARAÇÃO DOS VETORES ===")
   escreval("Posição |  Vetor A  |    Vetor B    |  Operação")
   escreval("--------|-----------|---------------|------------------")

   para i de 1 ate 10 faca
      escreval(i:4, "    |", A[i]:8:0, "   |", B[i]:12:0, "   |  ", A[i]:0:0, "^", i)
   fimpara

fimalgoritmo