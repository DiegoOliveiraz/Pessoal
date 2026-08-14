/**
 * Exercício 2 - CASA BURGUER
 */
let prod = 10;
let qtde = 15;
let preco = 0;
let conta_final = 0;
switch (prod){
    case 1:
        console.log('Compra de Hamburguer(s)');
        preco = 1.80;
        break;
    case 2:
        console.log('Compra de Cheeseburguer(s)');
        preco = 2.00;
        break;
    case 3:
        console.log('Compra de Fritas');
        preco = 2.00;
        break;
    case 4:
        console.log('Compra de Refrigerante(s)');
        preco = 0.80;
        break;
    case 5:
        console.log('Compra de Milkshake(s)');
        preco = 1.50;
        break;
    default:
        console.log('Código de Produto Inválido!');
}//End_switch

if (prod >= 1 && prod <= 5){
    // Calcular a conta final
    conta_final = preco*qtde;
    console.log(`Conta final: R$ ${conta_final.toFixed(2)}`);
}