algoritmo "SistemaNotasFisica"
// Sistema para gerenciar notas de uma turma de 40 alunos
var
   nomes: vetor[1..40] de caractere
   notas: vetor[1..40, 1..4] de real
   medias: vetor[1..40] de real
   i, j: inteiro
   soma_notas, maior_media, menor_media: real
   soma_aprovados, soma_recuperacao, soma_reprovados, soma_geral: real
   cont_aprovados, cont_recuperacao, cont_reprovados: inteiro
   media_aprovados, media_recuperacao, media_reprovados, media_geral: real

inicio
   // Inicializando variáveis
   maior_media <- 0
   menor_media <- 10
   soma_aprovados <- 0
   soma_recuperacao <- 0
   soma_reprovados <- 0
   soma_geral <- 0
   cont_aprovados <- 0
   cont_recuperacao <- 0
   cont_reprovados <- 0

   escreval("=== SISTEMA DE NOTAS - TURMA DE FÍSICA ===")
   escreval()
   
   // Entrada de dados para cada aluno
   para i de 1 ate 40 faca
      escreval("ALUNO ", i, ":")
      escreva("Nome: ")
      leia(nomes[i])
      
      soma_notas <- 0
      para j de 1 ate 4 faca
         escreva("Nota ", j, ": ")
         leia(notas[i,j])
         soma_notas <- soma_notas + notas[i,j]
      fimpara
      
      // Calculando média anual do aluno
      medias[i] <- soma_notas / 4
      soma_geral <- soma_geral + medias[i]
      
      // Verificando maior e menor média
      se medias[i] > maior_media entao
         maior_media <- medias[i]
      fimse
      
      se medias[i] < menor_media entao
         menor_media <- medias[i]
      fimse
      
      // Classificando o aluno e somando para as médias por categoria
      se medias[i] >= 7.0 entao
         soma_aprovados <- soma_aprovados + medias[i]
         cont_aprovados <- cont_aprovados + 1
      senao
         se medias[i] >= 3.5 entao
            soma_recuperacao <- soma_recuperacao + medias[i]
            cont_recuperacao <- cont_recuperacao + 1
         senao
            soma_reprovados <- soma_reprovados + medias[i]
            cont_reprovados <- cont_reprovados + 1
         fimse
      fimse
      
      escreval("Média anual: ", medias[i]:4:2)
      escreval()
   fimpara

   // Calculando médias por categoria
   se cont_aprovados > 0 entao
      media_aprovados <- soma_aprovados / cont_aprovados
   senao
      media_aprovados <- 0
   fimse
   
   se cont_recuperacao > 0 entao
      media_recuperacao <- soma_recuperacao / cont_recuperacao
   senao
      media_recuperacao <- 0
   fimse
   
   se cont_reprovados > 0 entao
      media_reprovados <- soma_reprovados / cont_reprovados
   senao
      media_reprovados <- 0
   fimse
   
   media_geral <- soma_geral / 40

   // Exibindo resultados
   escreval("================== RELATÓRIO FINAL ==================")
   escreval()
   
   // a) Nome e notas de cada aluno
   escreval("A) DADOS DOS ALUNOS:")
   para i de 1 ate 40 faca
      escreval("Aluno: ", nomes[i])
      escreva("Notas: ")
      para j de 1 ate 4 faca
         escreva(notas[i,j]:4:2, " ")
      fimpara
      escreval(" | Média: ", medias[i]:4:2)
   fimpara
   escreval()
   
   // c) Maior média da turma
   escreval("C) MAIOR MÉDIA DA TURMA: ", maior_media:4:2)
   
   // d) Menor média da turma
   escreval("D) MENOR MÉDIA DA TURMA: ", menor_media:4:2)
   escreval()
   
   // e) Média dos alunos APROVADOS
   escreval("E) ALUNOS APROVADOS (Média >= 7,0):")
   escreval("   Quantidade: ", cont_aprovados)
   se cont_aprovados > 0 entao
      escreval("   Média dos aprovados: ", media_aprovados:4:2)
   senao
      escreval("   Não há alunos aprovados")
   fimse
   escreval()
   
   // f) Média dos alunos em RECUPERAÇÃO
   escreval("F) ALUNOS EM RECUPERAÇÃO (3,5 <= Média < 7,0):")
   escreval("   Quantidade: ", cont_recuperacao)
   se cont_recuperacao > 0 entao
      escreval("   Média dos alunos em recuperação: ", media_recuperacao:4:2)
   senao
      escreval("   Não há alunos em recuperação")
   fimse
   escreval()
   
   // g) Média dos alunos REPROVADOS
   escreval("G) ALUNOS REPROVADOS (Média < 3,5):")
   escreval("   Quantidade: ", cont_reprovados)
   se cont_reprovados > 0 entao
      escreval("   Média dos reprovados: ", media_reprovados:4:2)
   senao
      escreval("   Não há alunos reprovados")
   fimse
   escreval()
   
   // h) Média geral da turma
   escreval("H) MÉDIA GERAL DA TURMA: ", media_geral:4:2)
   
   escreval()
   escreval("========== RESUMO ESTATÍSTICO ==========")
   escreval("Total de alunos: 40")
   escreval("Aprovados: ", cont_aprovados, " (", (cont_aprovados*100/40):4:1, "%)")
   escreval("Em recuperação: ", cont_recuperacao, " (", (cont_recuperacao*100/40):4:1, "%)")
   escreval("Reprovados: ", cont_reprovados, " (", (cont_reprovados*100/40):4:1, "%)")

fimalgoritmo