import { Router } from 'express';
import {
  obterTarefas,
  obterTarefaPorId,
  criarTarefa,
  atualizarStatusTarefa,
  editarTarefa,
  deletarTarefa
} from '../controllers/tarefaController.js';

const tarefaRoutes = Router();

// GET - Obter todas as tarefas
tarefaRoutes.get('/tarefas', obterTarefas);

// GET - Obter tarefa por ID
tarefaRoutes.get('/tarefas/:id', obterTarefaPorId);

// POST - Criar nova tarefa
tarefaRoutes.post('/tarefas', criarTarefa);

// PUT - Atualizar status da tarefa
tarefaRoutes.put('/tarefas/:id/status', atualizarStatusTarefa);

// PUT - Editar descrição da tarefa
tarefaRoutes.put('/tarefas/:id', editarTarefa);

// DELETE - Deletar tarefa
tarefaRoutes.delete('/tarefas/:id', deletarTarefa);

export default tarefaRoutes;
