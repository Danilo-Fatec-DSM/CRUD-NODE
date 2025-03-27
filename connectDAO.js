import ConexaoBancoDeDados from "./conexao.js";
import conexao from "./conexao.js";

/* Chama */
function pegarTodasAsTarefas() {
  conexao.pegarTodasAsTarefas(function (tarefas) {
    tarefas.forEach((tarefa) => {
      console.log(`${tarefa.id}: ${tarefa.titulo}: ${tarefa.descricao}`);
    });
  });
}

function pegarTarefaPorId(id) {
  ConexaoBancoDeDados.pegarTarefaPorId(id, function (tarefa) {
    for (let i = 0; tarefa.length > i; i++) {
      console.log(`${tarefa[i].id} ${tarefa[i].titulo} ${tarefa[i].descricao}`);
    }
  });
}

function criarTarefa(titulo, descricao) {
  let tarefa = { titulo: titulo, descricao: descricao };
  ConexaoBancoDeDados.salvarTarefa(tarefa, function (tarefa) {
    console.log(
      `${tarefa.id} Tarefa Criada  ${tarefa.titulo} ${tarefa.descricao}`
    );
  });
}

function atualizarTarefa(id, titulo, descricao) {
  let tarefa = {
    id: id,
    titulo: titulo,
    descricao: descricao,
  };
  ConexaoBancoDeDados.atualizarTarefa(tarefa, function (tarefa) {
    console.log(
      `Dados Atualizados ${tarefa.id} ${tarefa.titulo} ${tarefa.descricao}`
    );
  });
}

function deletarTarefa(id) {
  let tarefa = { id: id };
  ConexaoBancoDeDados.deletarTarefa(tarefa, function (tarefa) {
    console.log("Tarefa deletada!");
  });
}

pegarTodasAsTarefas()

