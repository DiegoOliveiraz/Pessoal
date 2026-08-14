algoritmo "AnaliseDesempenhoEscolar"
var
   matricula: inteiro
   nome: caractere
   nota1, nota2, nota3, nota4, mediaAluno, somaMedias, maiorMedia, menorMedia: real
   totalAlunos, aprovados, recuperacao, reprovados: inteiro
   mediaGeral: real

inicio
   maiorMedia := 0
   menorMedia := 10
   somaMedias := 0
   totalAlunos := 0
   aprovados := 0
   recuperacao := 0
   reprovados := 0

   repita
      escreva("Digite a matrícula (0 para encerrar): ")
      leia(matricula)

      se matricula <> 0 entao
         escreva("Digite o nome: ")
         leia(nome)
         escreva("Digite a nota 1: ")
         leia(nota1)
         escreva("Digite a nota 2: ")
         leia(nota2)
         escreva("Digite a nota 3: ")
         leia(nota3)
         escreva("Digite a nota 4: ")
         leia(nota4)

         // Calcula média do aluno
         mediaAluno := (nota1 + nota2 + nota3 + nota4) / 4

         // Atualiza estatísticas
         se mediaAluno > maiorMedia entao
            maiorMedia := mediaAluno
         fimse

         se mediaAluno < menorMedia entao
            menorMedia := mediaAluno
         fimse

         somaMedias := somaMedias + mediaAluno
         totalAlunos := totalAlunos + 1

         // Classifica o aluno
         se mediaAluno >= 7.0 entao
            aprovados := aprovados + 1
         senao
            se mediaAluno >= 3.5 entao
               recuperacao := recuperacao + 1
            senao
               reprovados := reprovados + 1
            fimse
         fimse

         // Exibe dados do aluno
         escreval("Matrícula: ", matricula)
         escreval("Nome: ", nome)
         escreval("Média anual: ", mediaAluno:2:2)
      fimse
   ate matricula = 0

   // Calcula média geral
   se totalAlunos > 0 entao
      mediaGeral := somaMedias / totalAlunos
   fimse

   // Exibe resultados
   escreval("Maior média da turma: ", maiorMedia:2:2)
   escreval("Menor média da turma: ", menorMedia:2:2)
   escreval("Total de alunos APROVADOS: ", aprovados)
   escreval("Total de alunos em RECUPERAÇÃO: ", recuperacao)
   escreval("Total de alunos REPROVADOS: ", reprovados)
   escreval("Média geral da turma: ", mediaGeral:2:2)
fimalgoritmo