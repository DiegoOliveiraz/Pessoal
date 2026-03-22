Algoritmo "ESCOLHA"

Var
   opcao : inteiro
Inicio
   escreval("Por favor, selecione uma op��o:")
   escreval("1 - Iniciar atendimento")
   escreval("2 - Acompanhar pedido")
   escreval("3 - Falar com atendente")
   leia(opcao)
   // Estrutura de escolha
   escolha (opcao)
      caso 1
         escreval("Vamos iniciar seu atendimento")
      caso 2
         escreval("Vamos acompanhar o seu pedido")
      caso 3
         escreval("Voc� ser� encaminhado para um atendente")
      outrocaso
         escreval("Op��o inv�lida")
   fimescolha
Fimalgoritmo