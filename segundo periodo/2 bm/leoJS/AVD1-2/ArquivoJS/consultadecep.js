// ========================================
// CONSULTA DE CEP - VIA CEP API
// ========================================

// Seleção de elementos do DOM
const inputCep = document.getElementById('cep');
const btnBuscar = document.getElementById('btnBuscar');
const loadingDiv = document.getElementById('loading');
const messageDiv = document.getElementById('message');

const inputLogradouro = document.getElementById('logradouro');
const inputBairro = document.getElementById('bairro');
const inputCidade = document.getElementById('cidade');
const inputUf = document.getElementById('uf');

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

/**
 * Formata o CEP adicionando hífen automaticamente
 * @param {string} valor - CEP digitado
 * @returns {string} CEP formatado
 */
const formatarCep = (valor) => {
    // Remove tudo que não é número
    const apenasNumeros = valor.replace(/\D/g, '');
    
    // Adiciona o hífen após 5 dígitos
    if (apenasNumeros.length <= 5) {
        return apenasNumeros;
    }
    
    return apenasNumeros.slice(0, 5) + '-' + apenasNumeros.slice(5, 8);
};

/**
 * Valida se o CEP possui formato correto
 * @param {string} cep - CEP a ser validado
 * @returns {boolean} true se válido
 */
const validarCep = (cep) => {
    const cepLimpo = cep.replace(/\D/g, '');
    return cepLimpo.length === 8;
};

/**
 * Limpa os campos de endereço
 */
const limparCampos = () => {
    inputLogradouro.value = '';
    inputBairro.value = '';
    inputCidade.value = '';
    inputUf.value = '';
};

/**
 * Exibe mensagem de feedback
 * @param {string} texto - Mensagem a ser exibida
 * @param {string} tipo - 'success' ou 'error'
 */
const exibirMensagem = (texto, tipo = 'error') => {
    messageDiv.textContent = texto;
    messageDiv.className = `message ${tipo} active`;
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        messageDiv.classList.remove('active');
    }, 5000);
};

/**
 * Controla o estado de loading
 * @param {boolean} ativo - true para mostrar, false para esconder
 */
const toggleLoading = (ativo) => {
    if (ativo) {
        loadingDiv.classList.add('active');
        btnBuscar.disabled = true;
        inputCep.disabled = true;
    } else {
        loadingDiv.classList.remove('active');
        btnBuscar.disabled = false;
        inputCep.disabled = false;
    }
};

// ========================================
// FUNÇÃO PRINCIPAL - BUSCAR CEP
// ========================================

/**
 * Busca o endereço através da API ViaCEP
 * @param {string} cep - CEP a ser consultado
 */
const buscarCep = async (cep) => {
    // Remove caracteres especiais do CEP
    const cepLimpo = cep.replace(/\D/g, '');
    
    // Valida o CEP
    if (!validarCep(cep)) {
        exibirMensagem('❌ CEP inválido! Digite 8 dígitos.', 'error');
        limparCampos();
        return;
    }
    
    // Ativa loading
    toggleLoading(true);
    limparCampos();
    
    try {
        // Faz a requisição para a API ViaCEP
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao consultar o CEP');
        }
        
        // Converte a resposta para JSON
        const dados = await response.json();
        
        // Verifica se o CEP foi encontrado
        if (dados.erro) {
            exibirMensagem('❌ CEP não encontrado! Verifique e tente novamente.', 'error');
            limparCampos();
            return;
        }
        
        // Preenche os campos com os dados retornados
        inputLogradouro.value = dados.logradouro || '';
        inputBairro.value = dados.bairro || '';
        inputCidade.value = dados.localidade || '';
        inputUf.value = dados.uf || '';
        
        // Exibe mensagem de sucesso
        exibirMensagem(`✅ CEP encontrado! ${dados.localidade} - ${dados.uf}`, 'success');
        
        // Coloca o foco no campo número
        document.getElementById('numero').focus();
        
    } catch (erro) {
        console.error('Erro na consulta:', erro);
        exibirMensagem('❌ Erro ao consultar CEP. Tente novamente.', 'error');
        limparCampos();
    } finally {
        // Desativa loading
        toggleLoading(false);
    }
};

// ========================================
// EVENT LISTENERS
// ========================================

// Formata o CEP enquanto digita
inputCep.addEventListener('input', (e) => {
    e.target.value = formatarCep(e.target.value);
});

// Busca ao clicar no botão
btnBuscar.addEventListener('click', () => {
    const cep = inputCep.value;
    if (cep) {
        buscarCep(cep);
    } else {
        exibirMensagem('⚠️ Digite um CEP para buscar.', 'error');
    }
});

// Busca ao pressionar Enter no campo CEP
inputCep.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const cep = inputCep.value;
        if (cep) {
            buscarCep(cep);
        }
    }
});

// Busca ao perder o foco (blur) - conforme requisito
inputCep.addEventListener('blur', () => {
    const cep = inputCep.value;
    if (cep && validarCep(cep)) {
        buscarCep(cep);
    }
});

// ========================================
// INICIALIZAÇÃO
// ========================================

// Coloca o foco no campo CEP ao carregar a página
window.addEventListener('load', () => {
    inputCep.focus();
});

console.log('✅ Script de Consulta de CEP carregado com sucesso!');
console.log('📍 API ViaCEP integrada e funcionando.');
