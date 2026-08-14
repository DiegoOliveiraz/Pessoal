import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import tarefaModel from '../models/tarefaModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const caminhoDb = path.join(__dirname, '../database/tarefas.json');

// Garantir que o arquivo existe
function garantirArquivo() {
  if (!fs.existsSync(caminhoDb)) {
    fs.writeFileSync(caminhoDb, JSON.stringify([], null, 2));
  }
}

// Ler tarefas do arquivo
function lerTarefas() {
  garantirArquivo();
  const dados = fs.readFileSync(caminhoDb, 'utf-8');
  return JSON.parse(dados);
}

// Salvar tarefas no arquivo
function salvarTarefas(tarefas) {
  fs.writeFileSync(caminhoDb, JSON.stringify(tarefas, null, 2));
}

const tarefaRepository = {
  // ✅ Obter todas as tarefas
  obterTodas() {
    return lerTarefas();
  },

  // ✅ Obter tarefa por ID
  obterPorId(id) {
    const tarefas = lerTarefas();
    return tarefas.find(t => t.id === id);
  },

  // ✅ Criar nova tarefa
  criar(descricao) {
    const tarefas = lerTarefas();
    const novaTarefa = tarefaModel.criar(descricao);
    tarefas.push(novaTarefa);
    salvarTarefas(tarefas);
    return novaTarefa;
  },

  // ✅ Atualizar status da tarefa
  atualizarStatus(id, novoStatus) {
    const tarefas = lerTarefas();
    const tarefa = tarefas.find(t => t.id === id);
    
    if (!tarefa) return null;

    tarefa.status = novoStatus;
    if (novoStatus === 'concluida') {
      tarefa.dataConclusa = new Date().toISOString();
    } else {
      tarefa.dataConclusa = null;
    }

    salvarTarefas(tarefas);
    return tarefa;
  },

  // ✅ Deletar tarefa
  deletar(id) {
    const tarefas = lerTarefas();
    const indice = tarefas.findIndex(t => t.id === id);
    
    if (indice === -1) return false;

    tarefas.splice(indice, 1);
    salvarTarefas(tarefas);
    return true;
  },

  // ✅ Editar descrição
  editarDescricao(id, novaDescricao) {
    const tarefas = lerTarefas();
    const tarefa = tarefas.find(t => t.id === id);
    
    if (!tarefa) return null;

    tarefa.descricao = novaDescricao;
    salvarTarefas(tarefas);
    return tarefa;
  },

  // ✅ Obter estatísticas
  obterEstatisticas() {
    const tarefas = lerTarefas();
    return {
      total: tarefas.length,
      pendentes: tarefas.filter(t => t.status === 'pendente').length,
      concluidas: tarefas.filter(t => t.status === 'concluida').length
    };
  }
};

export default tarefaRepository;
