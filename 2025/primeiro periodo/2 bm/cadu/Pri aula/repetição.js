let cont, contpardiv5 = 0;
for (cont = 1; cont <= 100; cont++){
    if (cont%2 === 0 && cont%5 == 0){
        console.log(cont);
        contpardiv5++;
    }
}
console.log(`qtde de pares e divisivies por 5: ${contpardiv5}`);
//console.log("fora do loop!");
//console.log(cont);
