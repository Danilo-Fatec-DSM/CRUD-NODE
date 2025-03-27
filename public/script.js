// Preencher automático
function criaLinha(tarefa) {
  document.getElementById("id").value = tarefa.id;
  document.getElementById("titulo").value = tarefa.titulo;
  document.getElementById("descricao").value = tarefa.descricao;
}

function doGet() {
  return "GET";
}

function doPost() {
  return "POST";
}

function doPut() {
  return "PUT";
}

function doDelete() {
  return "DELETE";
}

function doFindById() {
  let n = document.getElementById("id").value;
  return n;
}

async function clienteDados(minhaFuncao) {
  let n = doFindById();
  const url = `http://localhost:3000/tarefas/${n}`; // URL local para buscar tarefa por ID
  const urls = `http://localhost:3000/tarefas`; // URL local para criar ou listar tarefas

  let rest = minhaFuncao;

  let id = document.getElementById("id").value;
  let titulo = document.getElementById("titulo").value;
  let descricao = document.getElementById("descricao").value;

  const object = { id, titulo, descricao };

  const myInitGet = {
    method: rest,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const myInitPost = {
    method: rest,
    body: JSON.stringify(object),
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (rest === "GET") {
    const dados = await fetch(url, myInitGet);
    const tarefa = await dados.json();
    criaLinha(tarefa[0]);
  } else if (rest === "POST") {
    const dados = await fetch(urls, myInitPost);
    const tarefa = await dados.json();
    criaLinha(tarefa);
  } else if (rest === "DELETE") {
    const dados = await fetch(url, myInitPost);
    const tarefa = await dados.json();
    criaLinha(tarefa);
  } else {
    const dados = await fetch(url, myInitPost);
    const tarefa = await dados.json();
    criaLinha(tarefa);
  }
}

document.getElementById("salvarButton").addEventListener("click", function () {
  clienteDados("POST");
});

document
  .getElementById("atualizarButton")
  .addEventListener("click", function () {
    clienteDados("PUT");
  });
document.getElementById("buscarButton").addEventListener("click", function () {
  clienteDados("GET");
});

document.getElementById("deletarButton").addEventListener("click", function () {
  clienteDados("DELETE");
});
