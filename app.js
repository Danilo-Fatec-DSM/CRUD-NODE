/* 
express → Framework para criar um servidor web em Node.js.
bodyParser → Middleware que permite processar dados enviados no corpo da requisição (JSON, formulários, etc.).
ConexaoBancoDeDados → Presumivelmente, um módulo personalizado (conexao.js) que gerencia a conexão com um banco de dados.
*/

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import ConexaoBancoDeDados from "./conexao.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
- let app = express(); cria um instância do Express, que será usada para configurar rotas, middlewares e iniciar o servidor
- app.use(bodyParser.urlencoded({ extended: false })); Este é um middleware usado para processar dados enviados via formulário
HTML com o método POST ou PUT, onde os dados são condificados no formato URL-enconded.
- app.use(bodyParser.json()); Esse middleware é usado para processar dados enviados no corpo da requisição em formato JSON, ou seja,
ele converte automaticamente o corpo da requisição em um objeto JavaScript acessível em req.body
*/

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join("public"));
});

/* 
- app.get("/tarefas", function(req, res) {}) Defini uma rota HTTP GET no Express.js para /tarefas
quando o usuário acessar http://localhost:3000/tarefas, essa função será executada
- ConexaoBancoDeDados.pegarTodasAsTarefas(function (tarefa) {}) chama a função pegarTodasAsTarefas,
que consulta o banco de dados e retorna todas as tarefas
- o callback recebe tarefa como parâmetro, que contém os dados vindos do banco
- res.json(tarefa) converte os dados para JSON e os envia como respota para o navegador. Esses dados
são enviados como uma lista de objetos
*/
app.get("/tarefas", function (req, res) {
  ConexaoBancoDeDados.pe(function (tarefa) {
    res.json(tarefa);
  });
});

// Busca uma tarefa pelo título
app.get("/tarefas/:id", function (req, res) {
  let id = req.params.id;
  ConexaoBancoDeDados.pegarTarefaPorId(id, function (tarefa) {
    res.json(tarefa);
  });
});

// Cria uma nova tarefa
app.post("/tarefas", function (req, res) {
  let tarefa = req.body;
  ConexaoBancoDeDados.salvarTarefa(tarefa, function (tarefa) {
    res.json(tarefa);
  });
});

app.put("/tarefas/:id", function (req, res) {
  let tarefa = req.body;

  ConexaoBancoDeDados.atualizarTarefa(tarefa, function (novosDados) {
    res.json({ msg: "Tarefa atualizada" });
  });
});

// Deleta uma tarefa pelo título
app.delete("/tarefas/:id", function (req, res) {
  let id = req.params.id;
  console.log("ID recebido:", id, "Tipo:", typeof id);
  ConexaoBancoDeDados.deletarTarefa(id, function (affectedRows) {
    res.json({ msg: "Tarefa deletada" });
  });
});

/* 
- app.listen(3000, function() {}) o primeireio argumento inicia um servidor na porta 3000,
já o sengundo é um callback, que será chamado quando o servidor iniciar
- let server = app.listen(...) guarda o servidor criado nos permitindo acessar informações
como enderço e porta
- server.address().address Pega o endereço do servidor geralmente "::" ou "0.0.0.0" para ouvir tadas as conexões
- server.address().port Pega a porta na qual o servidor está rodando no nosso caso, 3000
*/

let server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`Servidor rodando em http://${host}:${port}`);
});
