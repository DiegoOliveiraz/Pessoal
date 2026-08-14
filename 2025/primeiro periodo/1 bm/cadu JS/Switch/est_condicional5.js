/**
 * Exercício 4 - Menu de Opções
 */

function Cadastrar(){
    console.log('Cadastrar Funcionários!');
}

function Alterar(){
    console.log('Alterar Funcionários!');
}

function Excluir(){
    console.log('Excluir Funcionários!');
}

function Consultar(){
    console.log('Consultar Funcionários!');
}

console.log('-'.repeat(60));
console.log('------ 1 - Executa a rotina de Inclusão de Funcionários ---- ');
console.log('------ 2 - Executa a rotina de Alteração de Funcionários --- ');
console.log('------ 3 - Executa a rotina de Exclusão de Funcionários ---- ');
console.log('------ 4 - Executa a rotina de Consulta de Funcionários ---- ');
console.log('-'.repeat(60));
let opcao = 10;
switch (opcao){
    case 1: 
        Cadastrar();
        break;
    case 2:
        Alterar();
        break;
    case 3:
        Excluir();
        break;
    case 4:
        Consultar();
        break;
    default:
        console.log("Opção Inválida!");
}//End_switch