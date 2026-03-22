let prod = 1;
let qtde = 10;
let preco = 0;
let conta_final = 0
switch (prod){
    case 1:
        console.log("hamburger(s)");
        preco = 1.00;
        break;
    case 2:
        console.log("compra de cheeseburger(s)");
        preco = 2.00;
        break;
    case 3:
        console.log("compra de milkshakes(s)");
        preco = 1.50;
        break;
    case 4:
        console.log("compra refrigerante(s)");
        preco = 7.00;
        break;
    case 5:
        console.log("comprar sobremesa(s)");
        preco = 10.50;
        break;
    default:
        console.log("produto não encontrado")
        break;
}       
//end switch
if(prod >= 1 && prod <= 5){
//calcular a conta final
conta_final = preco * qtde;
console.log(`conta final: ${conta_final.toFixed(2)}`);
}