import tarefaRepository from '../repositories/tarefaRepository.js';
import tarefaModel from '../models/tarefaModel.js';

// ✅ Obter todas as tarefas
export function obterTarefas(req, res) {
  try {
    const tarefas = tarefaRepository.obterTodas();
    const stats = tarefaRepository.obterEstatisticas();

    res.status(200).json({
      ok: true,
      total: stats.total,
      pendentes: stats.pendentes,
      concluidas: stats.concluidas,
      tarefas: tarefas
    });
  } catch (erro) {
    res.status(500).json({ ok: false, erro: erro.message });
  }
}

// ✅ Obter tarefa por ID
export function obterTarefaPorId(req, res) {
  try {
    const { id } = req.params;
    const tarefa = tarefaRepository.obterPorId(id);

    if (!tarefa) {
      return res.status(404).json({
        ok: false,
        erro: 'Tarefa não encontrada'
      });
    }

    res.status(200).json({
      ok: true,
      tarefa: tarefa
    });
  } catch (erro) {
    res.status(500).json({ ok: false, erro: erro.message });
  }
}

// ✅ Criar nova tarefa
export function criarTarefa(req, res) {
  try {
    const { descricao } = req.body;

    // Validar
    const validacao = tarefaModel.validar({ descricao });
    if (!validacao.valido) {
      return res.status(400).json({
        ok: false,
        erro: validacao.erro
      });
    }

    // Criar tarefa
    const novaTarefa = tarefaRepository.criar(descricao);

    res.status(201).json({
      ok: true,
      mensagem: 'Tarefa criada com sucesso',
      tarefa: novaTarefa
    });
  } catch (erro) {
    res.status(500).json({ ok: false, erro: erro.message });
  }
}

// ✅ Atualizar status da tarefa
export function atualizarStatusTarefa(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validar status
    if (!['pendente', 'concluida'].includes(status)) {
      return res.status(400).json({
        ok: false,
        erro: 'Status inválido. Use: pendente ou concluida'
      });
    }

    const tarefa = tarefaRepository.atualizarStatus(id, status);

    if (!tarefa) {
      return res.status(404).json({
        ok: false,
        erro: 'Tarefa não encontrada'
      });
    }

    res.status(200).json({
      ok: true,
      mensagem: 'Status atualizado com sucesso',
      tarefa: tarefa
    });
  } catch (erro) {
    res.status(500).json({ ok: false, erro: erro.message });
  }
}

// ✅ Editar descrição da tarefa
export function editarTarefa(req, res) {
  try {
    const { id } = req.params;
    const { descricao } = req.body;

    // Validar
    const validacao = tarefaModel.validar({ descricao });
    if (!validacao.valido) {
      return res.status(400).json({
        ok: false,
        erro: validacao.erro
      });
    }

    const tarefa = tarefaRepository.editarDescricao(id, descricao);

    if (!tarefa) {
      return res.status(404).json({
        ok: false,
        erro: 'Tarefa não encontrada'
      });
    }

    res.status(200).json({
      ok: true,
      mensagem: 'Tarefa editada com sucesso',
      tarefa: tarefa
    });
  } catch (erro) {
    res.status(500).json({ ok: false, erro: erro.message });
  }
}

// ✅ Deletar tarefa
export function deletarTarefa(req, res) {
  try {
    const { id } = req.params;
    const deletada = tarefaRepository.deletar(id);

    if (!deletada) {
      return res.status(404).json({
        ok: false,
        erro: 'Tarefa não encontrada'
      });
    }

    res.status(200).json({
      ok: true,
      mensagem: 'Tarefa deletada com sucesso'
    });
  } catch (erro) {
    res.status(500).json({ ok: false, erro: erro.message });
  }
}
