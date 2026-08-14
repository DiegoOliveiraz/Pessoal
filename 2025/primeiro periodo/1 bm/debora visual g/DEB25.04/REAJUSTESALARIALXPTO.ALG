algoritmo "ReajusteSalarialXPTO"
var
   matricula: inteiro
   nome: caractere
   sexo: caractere
   salario, salarioReajustado, maiorSalario, menorSalario, somaSalarios, somaSalariosF: real
   totalFuncionarios, totalFuncionarias: inteiro
   mediaSalarios, mediaSalariosF: real

inicio
   maiorSalario := 0
   menorSalario := 999999
   somaSalarios := 0
   somaSalariosF := 0
   totalFuncionarios := 0
   totalFuncionarias := 0

   repita
      escreva("Digite a matrícula (0 para encerrar): ")
      leia(matricula)

      se matricula <> 0 entao
         escreva("Digite o nome: ")
         leia(nome)
         escreva("Digite o sexo (M/F): ")
         leia(sexo)
         escreva("Digite o salário: ")
         leia(salario)

         // Aplica reajuste
         se salario <= 4000 entao
            salarioReajustado := salario * 1.6
         senao
            se salario <= 10000 entao
               salarioReajustado := salario * 1.3
            senao
               salarioReajustado := salario * 1.1
            fimse
         fimse

         // Atualiza estatísticas
         se salarioReajustado > maiorSalario entao
            maiorSalario := salarioReajustado
         fimse

         se salarioReajustado < menorSalario entao
            menorSalario := salarioReajustado
         fimse

         somaSalarios := somaSalarios + salarioReajustado
         totalFuncionarios := totalFuncionarios + 1

         se sexo = "F" entao
            somaSalariosF := somaSalariosF + salarioReajustado
            totalFuncionarias := totalFuncionarias + 1
         fimse
      fimse
   ate matricula = 0

   // Calcula médias
   se totalFuncionarios > 0 entao
      mediaSalarios := somaSalarios / totalFuncionarios

      se totalFuncionarias > 0 entao
         mediaSalariosF := somaSalariosF / totalFuncionarias
      senao
         mediaSalariosF := 0
      fimse
   fimse

   // Exibe resultados
   escreval("Maior salário reajustado: ", maiorSalario:2:2)
   escreval("Menor salário reajustado: ", menorSalario:2:2)
   escreval("Média dos salários reajustados: ", mediaSalarios:2:2)
   escreval("Média dos salários reajustados das funcionárias: ", mediaSalariosF:2:2)
fimalgoritmo