//Comando for
let count = 1;
for (count = 1;count<=3;count++){
    console.log(count);
}
console.log('-'.repeat(9));
//Comando while
count = 1;
while (count <= 3){
    console.log(count);
    count++;
}
console.log('-'.repeat(9));
//Comando do ...while
count = 1;
do
{
    console.log(count);
    count++;
}while (count <= 3)
console.log('-'.repeat(9));
//Comando break
for (count = 1; count < 10; count++) {
    if (count === 5) 
        break;
    console.log("O número atual é: " + count);
}
console.log('-'.repeat(9));
//Comando continue
for (count = 1; count < 10; count++) {
    if (count === 5) 
        continue;
    console.log("O número atual é: " + count);
}

