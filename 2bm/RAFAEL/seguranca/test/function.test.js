import { assert, test, describe } from "poku";
import { soma,fx } from "../src/functions.js";

describe("TESTES DO ARQUIVO function.js",
  { background: "blue", icon: "👌👌👌" });

test("TESTE DE SOMA", () => {
    assert.strictEqual(soma(3, 4), 7, "3 + 4 deve ser igual a 7");
    assert.strictEqual(soma(4, 3), 7, "4 + 3 deve ser igual a 7");
    assert.strictEqual(soma(0, 0), 0, "0 + 0 deve ser igual a 0");
    assert.strictEqual(soma(-4, 3), -1, "-4 + 3 deve ser igual a -1");
    assert.strictEqual(soma(-3, -4), -7, "-3 + -4 deve ser igual a -7");
    assert.strictEqual(soma(-100, 30), -70, "-100 + 30 deve ser igual a -70");
    assert.strictEqual(soma(60, 7), 67, "SIXSSEVEN?");

    assert.throws(() => {
    soma("a", 5);
    }, "trouxe erro ao tentar entrar com uma string a");
    assert.throws(() => {
    soma(5, "b");
    }, "trouxe erro ao tentar entrar com uma string b");
})
  
test("FUNÇÃO SURPRESA", ()=>{
    assert.strictEqual(fx(3),true,"3 deve retorna true")
    assert.strictEqual(fx(1),false,"1 deve retorna false")
    assert.strictEqual(fx(2),true,"2 deve retorna true")
    assert.strictEqual(fx(4),false,"4 deve retorna false")
    assert.strictEqual(fx(5),true,"5 deve retorna true")
    assert.strictEqual(fx(6),false,"6 deve retorna false")
    assert.strictEqual(fx(7),true,"7 deve retorna true")
    assert.strictEqual(fx(30),false,"30 deve retorna false")
    assert.strictEqual(fx(31),true,"31 deve retorna true")
    

    assert.throws(() => {fx(0)}, "0 deve retornar erro")
    assert.throws(() => {fx(-5)}, "numero negativo deve retornan erro")
    assert.throws(() => {fx('x')}, "valor não deve retornan erro")
})
