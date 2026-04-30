// API URL
const API_URL = 'http://localhost:3000/api';

// Elementos do DOM
const inputTarefa = document.getElementById('inputTarefa');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaTarefas = document.getElementById('listaTarefas');
const totalTarefas = document.getElementById('totalTarefas');
const tarefasPendentes = document.getElementById('tarefasPendentes');
const tarefasConcluidas = document.getElementById('tarefasConcluidas');

// 🔄 Carregar tarefas ao iniciar
document.addEventListener('DOMContentLoaded', () => {
  carregarTarefas();
});

// 🎯 Botão Adicionar
btnAdicionar.addEventListener('click', adicionarTarefa);
inputTarefa.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') adicionarTarefa();
});

// ✅ Carregar todas as tarefas
async function carregarTarefas() {
  try {
    console.log('📥 Carregando tarefas...');
    
    const response = await fetch(`${API_URL}/tarefas`);
    const resultado = await response.json();

    if (resultado.ok) {
      exibirTarefas(resultado.tarefas);
      atualizarEstatisticas(resultado);
      console.log('✅ Tarefas carregadas:', resultado.tarefas);
    } else {
      console.error('❌ Erro:', resultado.erro);
    }
  } catch (erro) {
    console.error('❌ Erro ao carregar tarefas:', erro);
  }
}

// 📋 Exibir tarefas na tela
function exibirTarefas(tarefas) {
  listaTarefas.innerHTML = '';

  if (tarefas.length === 0) {
    listaTarefas.innerHTML = '<li class="empty-state">Nenhuma tarefa ainda. Crie uma! 🎯</li>';
    return;
  }

  tarefas.forEach((tarefa) => {
    const li = document.createElement('li');
    li.className = `tarefa-item ${tarefa.status === 'concluida' ? 'concluida' : ''}`;
    li.innerHTML = `
      <input 
        type="checkbox" 
        class="checkbox" 
        ${tarefa.status === 'concluida' ? 'checked' : ''}
        onchange="alternarStatus('${tarefa.id}', this.checked)"
      >
      <span class="tarefa-descricao">${escaparHTML(tarefa.descricao)}</span>
      <div class="tarefa-actions">
        <button class="btn-action btn-edit" onclick="abrirEdicao('${tarefa.id}', '${escaparHTML(tarefa.descricao)}')">✏️</button>
        <button class="btn-action btn-delete" onclick="deletarTarefa('${tarefa.id}')">🗑️</button>
      </div>
    `;
    listaTarefas.appendChild(li);
  });
}

// ➕ Adicionar tarefa
async function adicionarTarefa() {
  const descricao = inputTarefa.value.trim();

  if (!descricao) {
    alert('⚠️ Digite uma descrição!');
    inputTarefa.focus();
    return;
  }

  try {
    console.log('📤 Criando tarefa:', descricao);

    const response = await fetch(`${API_URL}/tarefas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao })
    });

    const resultado = await response.json();

    if (resultado.ok) {
      console.log('✅ Tarefa criada:', resultado.tarefa);
      inputTarefa.value = '';
      carregarTarefas();
    } else {
      alert(`❌ Erro: ${resultado.erro}`);
    }
  } catch (erro) {
    console.error('❌ Erro ao criar tarefa:', erro);
    alert('❌ Erro ao criar tarefa');
  }
}

// ✅ Alternar status (concluir/desconcluir)
async function alternarStatus(id, isConcluida) {
  try {
    const novoStatus = isConcluida ? 'concluida' : 'pendente';
    console.log(`🔄 Alterando status para: ${novoStatus}`);

    const response = await fetch(`${API_URL}/tarefas/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: novoStatus })
    });

    const resultado = await response.json();

    if (resultado.ok) {
      console.log('✅ Status atualizado');
      carregarTarefas();
    } else {
      alert(`❌ Erro: ${resultado.erro}`);
    }
  } catch (erro) {
    console.error('❌ Erro ao alterar status:', erro);
    alert('❌ Erro ao alterar status');
  }
}

// 🗑️ Deletar tarefa
async function deletarTarefa(id) {
  if (!confirm('⚠️ Tem certeza que deseja deletar esta tarefa?')) {
    return;
  }

  try {
    console.log('🗑️ Deletando tarefa:', id);

    const response = await fetch(`${API_URL}/tarefas/${id}`, {
      method: 'DELETE'
    });

    const resultado = await response.json();

    if (resultado.ok) {
      console.log('✅ Tarefa deletada');
      carregarTarefas();
    } else {
      alert(`❌ Erro: ${resultado.erro}`);
    }
  } catch (erro) {
    console.error('❌ Erro ao deletar tarefa:', erro);
    alert('❌ Erro ao deletar tarefa');
  }
}

// ✏️ Abrir modal de edição
function abrirEdicao(id, descricaoAtual) {
  const novaDescricao = prompt('Edite a tarefa:', descricaoAtual);

  if (novaDescricao !== null && novaDescricao.trim() !== '') {
    editarTarefa(id, novaDescricao.trim());
  }
}

// 📝 Editar tarefa
async function editarTarefa(id, novaDescricao) {
  try {
    console.log('✏️ Editando tarefa:', id);

    const response = await fetch(`${API_URL}/tarefas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao: novaDescricao })
    });

    const resultado = await response.json();

    if (resultado.ok) {
      console.log('✅ Tarefa editada');
      carregarTarefas();
    } else {
      alert(`❌ Erro: ${resultado.erro}`);
    }
  } catch (erro) {
    console.error('❌ Erro ao editar tarefa:', erro);
    alert('❌ Erro ao editar tarefa');
  }
}

// 📊 Atualizar estatísticas
function atualizarEstatisticas(stats) {
  totalTarefas.textContent = `Total: ${stats.total}`;
  tarefasPendentes.textContent = `Pendentes: ${stats.pendentes}`;
  tarefasConcluidas.textContent = `Concluídas: ${stats.concluidas}`;
}

// 🛡️ Escapar HTML para evitar injeção
function escaparHTML(texto) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return texto.replace(/[&<>"']/g, (m) => map[m]);
}
