Algoritmo "ReajusteSalarios"
// Este algoritmo lê os dados (matrícula, nome, sexo, salário) de 1500 funcionários,
// realiza o reajuste salarial de acordo com as regras:
//   ? Salário = R$ 4.000,00 ? reajuste de 60%
//   ? R$ 4.000,00 < Salário = R$ 10.000,00 ? reajuste de 30%
//   ? Salário > R$ 10.000,00 ? reajuste de 10%
// Em seguida, o programa exibe:
//   - O maior salário reajustado;
//   - O menor salário reajustado;
//   - A média dos salários reajustados de todos os funcionários;
//   - A média dos salários reajustados das funcionárias.
// Todas as entradas são validadas.

Var
   matricula: inteiro
   nome: caractere
   sexo: caractere
   salario, reajuste, salarioAjustado: real
   maiorSalario, menorSalario, somaSalarios, somaSalariosF, mediaTotal, mediaF: real
   contFuncionarios, contFuncionarias: inteiro
   i: inteiro

Inicio
   // Inicializações
   maiorSalario <- -999999
   menorSalario <-  999999
   somaSalarios <- 0
   somaSalariosF <- 0
   contFuncionarios <- 0
   contFuncionarias <- 0

   Para i de 1 ate 10 faca
      // Leitura e validação da matrícula
      Escreva("Digite a matrícula do funcionário: ")
      Leia(matricula)
      Enquanto (matricula <= 0) faca
         Escreva("Matrícula inválida! Digite novamente: ")
         Leia(matricula)
      FimEnquanto

      // Leitura e validação do nome
      Escreva("Digite o nome do funcionário: ")
      Leia(nome)
      Enquanto (nome = "") faca
         Escreva("Nome inválido! Digite novamente: ")
         Leia(nome)
      FimEnquanto

      // Leitura e validação do sexo
      Escreva("Digite o sexo do funcionário (M/F): ")
      Leia(sexo)
      Enquanto ((sexo <> "M") e (sexo <> "F") e (sexo <> "m") e (sexo <> "f")) faca
         Escreva("Sexo inválido! Por favor, digite M ou F: ")
         Leia(sexo)
      FimEnquanto

      // Leitura e validação do salário
      Escreva("Digite o salário do funcionário: ")
      Leia(salario)
      Enquanto (salario <= 0) faca
         Escreva("Salário inválido! Digite um valor positivo: ")
         Leia(salario)
      FimEnquanto

      // Cálculo do reajuste conforme os critérios
      Se (salario <= 4000) entao
         reajuste <- salario * 0.6
      Senao
         Se ((salario > 4000) e (salario <= 10000)) entao
            reajuste <- salario * 0.3
         Senao
            reajuste <- salario * 0.1
         FimSe
      FimSe

      salarioAjustado <- salario + reajuste

      // Atualiza os acumuladores e contadores
      somaSalarios <- somaSalarios + salarioAjustado
      contFuncionarios <- contFuncionarios + 1

      Se (salarioAjustado > maiorSalario) entao
         maiorSalario <- salarioAjustado
      FimSe

      Se (salarioAjustado < menorSalario) entao
         menorSalario <- salarioAjustado
      FimSe

      // Acumula os salários das funcionárias (sexo F ou f)
      Se ((sexo = "F") ou (sexo = "f")) entao
         somaSalariosF <- somaSalariosF + salarioAjustado
         contFuncionarias <- contFuncionarias + 1
      FimSe

   FimPara

   // Cálculo das médias
   Se (contFuncionarios > 0) entao
      mediaTotal <- somaSalarios / contFuncionarios
   Senao
      mediaTotal <- 0
   FimSe

   Se (contFuncionarias > 0) entao
      mediaF <- somaSalariosF / contFuncionarias
   Senao
      mediaF <- 0
   FimSe

   // Exibição dos resultados
   Escreval("Maior salário reajustado: R$ ", maiorSalario:0:2)
   Escreval("Menor salário reajustado: R$ ", menorSalario:0:2)
   Escreval("Média dos salários reajustados: R$ ", mediaTotal:0:2)
   Escreval("Média dos salários reajustados das funcionárias: R$ ", mediaF:0:2)
Fimalgoritmo
