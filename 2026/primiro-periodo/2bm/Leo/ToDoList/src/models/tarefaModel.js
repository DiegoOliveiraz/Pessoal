// Modelo de Tarefa
export const tarefaModel = {
  // Criar nova tarefa
  criar(descricao) {
    return {
      id: `tarefa_${Date.now()}`,
      descricao: descricao,
      status: 'pendente', // pendente | concluida
      dataCriacao: new Date().toISOString(),
      dataConclusa: null
    };
  },

  // Validar tarefa
  validar(tarefa) {
    if (!tarefa.descricao || tarefa.descricao.trim().length === 0) {
      return { valido: false, erro: 'Descrição obrigatória' };
    }
    if (tarefa.descricao.length > 200) {
      return { valido: false, erro: 'Descrição muito longa (máx 200 caracteres)' };
    }
    return { valido: true };
  }
};

export default tarefaModel;
