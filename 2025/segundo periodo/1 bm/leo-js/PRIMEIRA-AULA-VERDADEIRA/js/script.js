// Pega os elementos do HTML pelo id
const form = document.getElementById("formulario");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const cpf = document.getElementById("cpf");

form.addEventListener("submit", e => {
    e.preventDefault(); // impede o envio automático do formulário

    // validação do nome
    if (nome.value.trim().length < 3) {
        alert("O nome deve ter pelo menos 3 caracteres.");
        return;
    }

    // validação do e-mail
    if (!email.value.includes("@")) {
        alert("Digite um e-mail válido.");
        return;
    }

    // limpa o telefone apenas com números
    telefone.value = telefone.value.replace(/\D/g, "");
    if (telefone.value.length < 10) {
        alert("Digite um telefone válido.");
        return;
    }

    // limpa o CPF apenas com números
    cpf.value = cpf.value.replace(/\D/g, "");
    if (cpf.value.length !== 11) {
        alert("Digite um CPF válido com 11 números.");
        return;
    }

    // valor final no console (apenas para conferência)
    console.log("Nome:", nome.value);
    console.log("Email:", email.value);
    console.log("Telefone:", telefone.value);
    console.log("CPF:", cpf.value);

    alert("Formulário enviado com sucesso!");

});

// Máscara de telefone
telefone.addEventListener("input", e => {
    let valor = e.target.value.replace(/\D/g, "");
    valor = valor.length <= 10 ? valor.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3") : valor.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    e.target.value = valor;
});

// Máscara de CPF
cpf.addEventListener("input", e => {
    let valor = e.target.value.replace(/\D/g, "");
    valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
    e.target.value = valor;
});
