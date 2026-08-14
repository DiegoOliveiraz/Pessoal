algoritmo "PesquisaCaracteristicasFisicas"
var
   nome: caractere
   sexo: caractere
   corOlhos: caractere
   idade, qtdFem, qtdMasc, totalPessoas, somaIdadeMulheres, somaIdadeTotal: inteiro
   altura, somaAlturaHomens, somaAlturaTotal: real
   mediaIdadeMulheres, mediaAlturaHomens, mediaIdadeTotal, mediaAlturaTotal: real

inicio
   qtdFem := 0
   qtdMasc := 0
   totalPessoas := 0
   somaIdadeMulheres := 0
   somaAlturaHomens := 0
   somaIdadeTotal := 0
   somaAlturaTotal := 0

   repita
      escreva("Digite o nome (FIM para encerrar): ")
      leia(nome)

      se nome <> "FIM" entao
         escreva("Digite o sexo (M/F): ")
         leia(sexo)
         escreva("Digite a cor dos olhos (A/V/C): ")
         leia(corOlhos)
         escreva("Digite a idade: ")
         leia(idade)
         escreva("Digite a altura: ")
         leia(altura)

         // Atualiza totais gerais
         totalPessoas := totalPessoas + 1
         somaIdadeTotal := somaIdadeTotal + idade
         somaAlturaTotal := somaAlturaTotal + altura

         // Verifica condição a) Mulheres
         se (sexo = "F") e (idade >= 15) e (altura > 1.50) e (corOlhos = "C") entao
            qtdFem := qtdFem + 1
         fimse

         // Verifica condição b) Homens
         se (sexo = "M") e (idade >= 17) e (altura > 1.70) e (corOlhos = "A") entao
            qtdMasc := qtdMasc + 1
         fimse

         // Acumula para médias específicas
         se sexo = "F" entao
            somaIdadeMulheres := somaIdadeMulheres + idade
         senao
            somaAlturaHomens := somaAlturaHomens + altura
         fimse
      fimse
   ate nome = "FIM"

   // Calcula médias
   se totalPessoas > 0 entao
      mediaIdadeTotal := somaIdadeTotal / totalPessoas
      mediaAlturaTotal := somaAlturaTotal / totalPessoas

      se somaIdadeMulheres > 0 entao
         mediaIdadeMulheres := somaIdadeMulheres / (totalPessoas - (totalPessoas - qtdFem))
      fimse

      se somaAlturaHomens > 0 entao
         mediaAlturaHomens := somaAlturaHomens / (totalPessoas - qtdFem)
      fimse
   fimse

   // Exibe resultados
   escreval("a) Mulheres com idade =15, altura >1.50 e olhos castanhos: ", qtdFem)
   escreval("b) Homens com idade =17, altura >1.70 e olhos azuis: ", qtdMasc)
   escreval("c) Média de idade das mulheres: ", mediaIdadeMulheres:2:2)
   escreval("d) Média de altura dos homens: ", mediaAlturaHomens:2:2)
   escreval("e) Média de todas as idades: ", mediaIdadeTotal:2:2)
   escreval("f) Média de todas as alturas: ", mediaAlturaTotal:2:2)
fimalgoritmo