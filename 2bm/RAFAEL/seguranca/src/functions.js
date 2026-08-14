export function soma(a, b) {
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  throw new Error("só aceita numeros jumento");
}

export function fx(x){
    if(typeof a === "number" && x>0){
        if(x==1) return false
        for(let i=2; 1<x; i++){
            if(x % i == 0){
                return false
            }
        }
        return true
    }
    throw new Error("o parametro deve ser unm numero positivo");
}