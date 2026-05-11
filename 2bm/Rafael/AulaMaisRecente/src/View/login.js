

document.querySelector("#frm").addEventListener("submit", async (e) => {
    e.preventDefault();
    //pegar valores
    const email = document.querySelector("#email")
    const senha = document.querySelector("#senha")
    //validar
    const errors = []
    if(email.value.length < 5){
        errors.push("Email deve conter no mínimo 5 caracteres")
    }
    if (errors.length > 0){
        //exibir erros
    }
    //...






    //criar o corpo
    const corpo = {
        email:email.value,
        senha:senha.value
    }

    const url = "http://localhost:3000/login"
    const res = await fetch(url, {
        headers: {
            "content-type":"application/json"
        },
        method: "POST",
        body: JSON.stringify(corpo)
    })
    const dados = await res.json()

    const mensagem = document.querySelector(".errors")

    if(dados.ok){
        mensagem.innerHTML = dados.msg
    } else {
        mensagem.innerHTML = dados.msg
    }
    if(dados.ok){
        location.href="index.html"
        localStorage.setItem("token",dados.token)
    }





    


})