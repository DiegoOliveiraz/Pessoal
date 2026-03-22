//exiba com as letras maiusculas
const nomes = ["elias", "joas", "lucas", "delet", "luiza"];
nomes.sort();
for (let i = 0; i < nomes.length; i++) {
  console.log(nomes[i].toUpperCase());
}


//objetos

class boia {
    constructor(cor,diametro){
        this._cor = cor;
        this._diametro = diametro;
        this.x = x_
        this._y = y

    }

    print(id){
        document.getElementById(id).style.background = this._cor;
        document.getElementById(id).style.width = this._diametro;
        document.getElementById(id).style.height = this._diametro;
        document.getElementById(id).style.top = this._y;
        document.getElementById(id).style.left = this.x;
 
    }

}

const bola =