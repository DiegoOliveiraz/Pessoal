Algoritmo "semnome"
// Disciplina   : Algoritmos I
// Professor   : Débora Amorim 
// Descrição   : Aqui você descreve o que o programa faz! (função)
// Autor(a)    : Nome do(a) aluno(a)
// Data atual  : 11/08/2025 algoritmo "PesquisaPopulacao"
// Pesquisa sobre características físicas de 1500 habitantes
var
   nome: vetor[1..1500] de caractere
   sexo: vetor[1..1500] de caractere
   cor_olhos: vetor[1..1500] de caractere
   idade: vetor[1..1500] de inteiro
   altura: vetor[1..1500] de real
   i: inteiro

   // Contadores para as condições específicas
   cont_mulheres_condicao: inteiro  // a)
   cont_homens_condicao: inteiro    // b)

   // Variáveis para médias
   soma_idades_homens, media_idades_homens: real
   soma_alturas_mulheres, media_alturas_mulheres: real
   soma_todas_idades, media_todas_idades: real
   soma_todas_alturas, media_todas_alturas: real

   // Contadores para médias
   cont_homens, cont_mulheres: inteiro

inicio
   // Inicializando variáveis
   cont_mulheres_condicao <- 0
   cont_homens_condicao <- 0
   soma_idades_homens <- 0
   soma_alturas_mulheres <- 0
   soma_todas_idades <- 0
   soma_todas_alturas <- 0
   cont_homens <- 0
   cont_mulheres <- 0

   escreval("=== PESQUISA CARACTERÍSTICAS FÍSICAS DA POPULAÇÃO ===")
   escreval("População: 1.500 habitantes")
   escreval()
   escreval("Instruções:")
   escreval("- Sexo: M (Masculino) ou F (Feminino)")
   escreval("- Cor dos olhos: A (Azuis), V (Verde) ou C (Castanho)")
   escreval("- Idade: em anos completos")
   escreval("- Altura: em metros (ex: 1.75)")
   escreval()

   // Coleta de dados dos 1500 habitantes
   para i de 1 ate 1500 faca
      escreval("HABITANTE ", i, ":")

      escreva("Nome: ")
      leia(nome[i])

      // Validação do sexo
      repita
         escreva("Sexo (M/F): ")
         leia(sexo[i])
         sexo[i] <- maiusc(sexo[i])
      ate (sexo[i] = "M") ou (sexo[i] = "F")

      // Validação da cor dos olhos
      repita
         escreva("Cor dos olhos (A/V/C): ")
         leia(cor_olhos[i])
         cor_olhos[i] <- maiusc(cor_olhos[i])
      ate (cor_olhos[i] = "A") ou (cor_olhos[i] = "V") ou (cor_olhos[i] = "C")

      // Validação da idade
      repita
         escreva("Idade: ")
         leia(idade[i])
      ate idade[i] >= 0

      // Validação da altura
      repita
         escreva("Altura (m): ")
         leia(altura[i])
      ate altura[i] > 0

      // Contabilizando para as médias gerais
      soma_todas_idades <- soma_todas_idades + idade[i]
      soma_todas_alturas <- soma_todas_alturas + altura[i]

      // Verificando condições específicas e contabilizando por sexo
      se sexo[i] = "F" entao
         cont_mulheres <- cont_mulheres + 1
         soma_alturas_mulheres <- soma_alturas_mulheres + altura[i]

         // a) Mulheres: idade > 15, altura entre 1.50 e 2.00, olhos castanhos
         se (idade[i] > 15) e (altura[i] >= 1.50) e (altura[i] <= 2.00) e (cor_olhos[i] = "C") entao
            cont_mulheres_condicao <- cont_mulheres_condicao + 1
         fimse
      senao
         cont_homens <- cont_homens + 1
         soma_idades_homens <- soma_idades_homens + idade[i]

         // b) Homens: idade entre 18 e 30, altura > 1.70, olhos azuis
         se (idade[i] >= 18) e (idade[i] <= 30) e (altura[i] > 1.70) e (cor_olhos[i] = "A") entao
            cont_homens_condicao <- cont_homens_condicao + 1
         fimse
      fimse

      escreval()

      // Progresso da coleta (a cada 100 pessoas)
      se i mod 100 = 0 entao
         escreval(">>> ", i, " pessoas cadastradas <<<")
         escreval()
      fimse
   fimpara

   // Calculando médias
   se cont_homens > 0 entao
      media_idades_homens <- soma_idades_homens / cont_homens
   senao
      media_idades_homens <- 0
   fimse

   se cont_mulheres > 0 entao
      media_alturas_mulheres <- soma_alturas_mulheres / cont_mulheres
   senao
      media_alturas_mulheres <- 0
   fimse

   media_todas_idades <- soma_todas_idades / 1500
   media_todas_alturas <- soma_todas_alturas / 1500

   // Exibindo resultados
   escreval("=================== RESULTADOS DA PESQUISA ===================")
   escreval()

   escreval("A) MULHERES com:")
   escreval("   - Idade acima de 15 anos")
   escreval("   - Altura entre 1,50m e 2,00m (inclusive)")
   escreval("   - Olhos castanhos")
   escreval("   QUANTIDADE: ", cont_mulheres_condicao, " pessoas")
   escreval()

   escreval("B) HOMENS com:")
   escreval("   - Idade entre 18 e 30 anos (inclusive)")
   escreval("   - Altura acima de 1,70m")
   escreval("   - Olhos azuis")
   escreval("   QUANTIDADE: ", cont_homens_condicao, " pessoas")
   escreval()

   escreval("C) MÉDIA DAS IDADES DOS HOMENS:")
   se cont_homens > 0 entao
      escreval("   ", media_idades_homens:4:2, " anos")
      escreval("   (Base: ", cont_homens, " homens)")
   senao
      escreval("   Não há homens na amostra")
   fimse
   escreval()

   escreval("D) MÉDIA DAS ALTURAS DAS MULHERES:")
   se cont_mulheres > 0 entao
      escreval("   ", media_alturas_mulheres:4:2, " metros")
      escreval("   (Base: ", cont_mulheres, " mulheres)")
   senao
      escreval("   Não há mulheres na amostra")
   fimse
   escreval()

   escreval("E) MÉDIA DE TODAS AS IDADES:")
   escreval("   ", media_todas_idades:4:2, " anos")
   escreval("   (Base: 1.500 habitantes)")
   escreval()

   escreval("F) MÉDIA DE TODAS AS ALTURAS:")
   escreval("   ", media_todas_alturas:4:2, " metros")
   escreval("   (Base: 1.500 habitantes)")
   escreval()

   escreval("================= RESUMO DEMOGRÁFICO =================")
   escreval("Total de habitantes pesquisados: 1.500")
   escreval("Homens: ", cont_homens, " (", (cont_homens*100/1500):4:1, "%)")
   escreval("Mulheres: ", cont_mulheres, " (", (cont_mulheres*100/1500):4:1, "%)")
   escreval()
   escreval("Distribuição por cor dos olhos:")

   // Contando distribuição de cor dos olhos
   var cont_azuis, cont_verdes, cont_castanhos: inteiro
   cont_azuis <- 0
   cont_verdes <- 0
   cont_castanhos <- 0

   para i de 1 ate 1500 faca
      escolha cor_olhos[i]
         caso "A"
            cont_azuis <- cont_azuis + 1
         caso "V"
            cont_verdes <- cont_verdes + 1
         caso "C"
            cont_castanhos <- cont_castanhos + 1
      fimescolha
   fimpara

   escreval("Azuis: ", cont_azuis, " (", (cont_azuis*100/1500):4:1, "%)")
   escreval("Verdes: ", cont_verdes, " (", (cont_verdes*100/1500):4:1, "%)")
   escreval("Castanhos: ", cont_castanhos, " (", (cont_castanhos*100/1500):4:1, "%)")

fimalgoritmo
Var
// Seção de Declarações das variáveis 


Inicio
// Seção de Comandos, procedimento, funções, operadores, etc... 


Fimalgoritmo