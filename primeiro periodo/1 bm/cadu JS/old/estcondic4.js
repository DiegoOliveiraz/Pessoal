/**
 * ex - 4 menu de opções
 */
function cadastro(){
    console.log('cadastro de funcionários')
}
function alterar(){
    console.log('alterar de funcionários')
}
function excluir(){
    console.log('excluir de funcionários')
}
function consultar(){
    console.log('consultar de funcionários')
}
console.log('-'.repeat(60));
console.log('----------- 1 Executa a rotina de inclusão de funcionários ----');
console.log('----------- 2 Executa a rotina de alteração de funcionários ----');
console.log('----------- 3 Executa a rotina de exclusão de funcionários ----');
console.log('----------- 4 Executa a rotina de consulta de funcionários ----');
console.log('-'.repeat(60));

let opcao = 3;
switch (opcao){
    case 1:
        cadastro()
        break;
    case 2:
        alterar()
        break;
    case 3:
        excluir()
        break;
    case 4:
        consultar()
        break;

    default:
        console.log("opção inválida")
}