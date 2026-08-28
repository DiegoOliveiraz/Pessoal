export function fx(x){
    if(typeof x === "number" && x>0){
        if(x==1) return false
        for(let i=2; i<x; i++){
            if(x % i == 0){
                return false
            }
        }
        return true
    }
    throw new Error("o parametro deve ser unm numero positivo");
}

// Soma dois valores
export function soma(a,b){
    if (typeof(a)!=='number' || typeof(b)!=='number'){
        throw new Error('Os valores devem ser numéricos')
    }
    return a + b
}
// Subtrai dois valores
export function subtrair(a, b) {
    return a - b;
}

// Verifica se um número é par
export function numeroPar(n) {
    return n % 2 === 0;
}
// Descobre se um ano é Bissesto
export function anoBissexto(ano){
    if(typeof(ano)!=='number') throw new Error("O ano deve ser numérico")
    if(ano<=0) throw new Error("O ano deve ser positivo")

    if(ano % 4 == 0)
        return true
    else
        return false
}

// Capitaliza a primeira letra de uma string
export function capitalizarPrimeiraLetra(texto) {
    if (!texto) return "";
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Conta quantas palavras existem em uma frase
export function contarPalavras(frase) {
    if (!frase) return 0;
    return frase.trim().split(/\s+/).length;
}

// Verifica se o e-mail é válido
export function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Calcula a média de um array de números
export function calcularMedia(numeros) {
    if (!Array.isArray(numeros) || numeros.length === 0) return null;
    const soma = numeros.reduce((acc, val) => acc + val, 0);
    return soma / numeros.length;
}

// Gera um número aleatório entre min e max
export function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Inverte uma string
export function inverterString(texto) {
    return texto.split("").reverse().join("");
}

// Retorna o maior número de um array
export function maiorNumero(numeros) {
    if (!Array.isArray(numeros) || numeros.length === 0) return null;
    return Math.max(...numeros);
}

// Retorna true se hoje for final de semana
export function isWeekend(){
    const data = new Date()
    const dia = data.getDay()
    return dia==0||dia==6?true:false
}



