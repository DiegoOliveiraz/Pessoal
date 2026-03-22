// Código do produto comprado
let cod = 10;
// Qtde comprada
let qtde = 10;
let conta_final = 0;
switch (cod){
    case 1: conta_final = qtde*1.80;
            break;
    case 2: conta_final = qtde*2.00;
            break;
    case 3: conta_final = qtde*2.00;
            break;
    case 4: conta_final = qtde*0.80;
            break;
    case 5: conta_final = qtde*1.50;
            break;
    default: console.log(`Código ${cod} de produto inválido!`);
}//End_switch

if (cod >= 1 && cod <= 5)
    console.log(`O Valor total da conta é: R$ ${conta_final}.`);


