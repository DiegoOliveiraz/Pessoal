// Criando um objeto do tipo Date()
let d = new Date();
let dia = d.getDay();
//console.log(dia);
if (dia === 0){
    console.log('Hoje é Domingo!');
} else if (dia === 1){
    console.log('Hoje é Segunda!');
} else if (dia === 2){
    console.log('Hoje é Terça!');
} else if (dia === 3){
    console.log('Hoje é Quarta!');
} else if (dia === 4){
    console.log('Hoje é Quinta!');
} else if (dia === 5){
    console.log('Hoje é Sexta!');
} else {  // dia === 6
    console.log('Hoje é Sábado!');
}