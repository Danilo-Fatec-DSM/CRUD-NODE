import mysql from "mysql2";

/* 
Motivos para usar Classes ao usar MySQL

- Organização e Reutilização de Código: As classes permitem encapsular toda a lógica de banco de dados em um único local, facilitando a reutilização e manutenção do código.

- Facilidade na Manutenção: Com uma classe bem estruturada, qualquer alteração na lógica do banco de dados pode ser feita em um único local, sem precisar modificar várias partes do código.

- Melhor Organização no Código: Separar a lógica de banco de dados em classes torna o código mais legível e modular. Em vez de espalhar consultas SQL pelo código, você encapsula tudo dentro da classe.

- Reutilização e Escalabilidade: Se seu projeto cresce, você pode facilmente estender a classe para suportar novas operações, como atualização e remoção de registros.
*/

/* 
Criando o a classe com o método para conectar ao Banco de dados
- static conectar() é um método estático que tem uma variável CONEXAO que representa uma conexão ativa
com o banco de dados permitindo executar consultas SQL, como SELECT, INSERT, UPDATE e DELETE
host: "localhost" → O banco de dados está rodando na máquina local.
user: "root" → Nome do usuário do banco.
password: "admin" → Senha para acessar o banco.
database: "listaDeTarefas" → Nome do banco de dados que queremos usar.
- conexao.connect() estabelece a comunicação com o banco
- return conexao retornar o objeto de conexão para que possamos usá-lo em outras partes do código
*/

class ConexaoBancoDeDados {
  static conectar() {
    const conexao = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "admin",
      database: "listaDeTarefas",
    });
    conexao.connect();
    return conexao;
  }

  /*
  - Método que pega todas as tarefas
  - let consultaSql = conexao.query(sql, function(error, results, fields) usa o método
  query da conexao para executar o SQL. Ele recebe como argumento a consulta e uma função de 
  callback que processa os resultado
  - results contem os dados retornados pelo banco de dados
  */
  static pegarTodasAsTarefas(callback) {
    let conexao = this.conectar();
    let sql = "SELECT * FROM tarefas";
    let consultaSql = conexao.query(sql, function (error, results) {
      if (error) throw error;
      callback(results);
    });
    console.log(consultaSql.sql);
    conexao.end();
  }

  /* 
  - const sql = "SELECT * FROM tarefas WHERE id = ?"; A consulta SQL é definida. O ? é um placeholder para o valor
  quer será fornecido. No nosso caso, o id da tarefa será passado como um paramétro 
  - let consultaSql = conexao.query(sql, [id], function (error, results) {}); executa a consulta no banco de dados tendo
  o parâmetro [id] passado como um array, substituindo o ? na consulta SQL
  - callback(results) é chamado com os resultados da consulta quando ela termina
  */
  static pegarTarefaPorId(id, callback) {
    let conexao = this.conectar();
    let sql = "SELECT * FROM tarefas WHERE id = ?";
    let consultaSql = conexao.query(sql, id, function (error, results) {
      if (error) throw error;
      callback(results);
    });
    console.log(consultaSql.sql);
    conexao.end();
  }

  /*
  - results.insertId; contém o ID da tarefa que foi gerado pelo banco de dados após a inserção
  - tarefa.id = results.insertId; O ID gerado é atribuido ao objeto tarefa
  */
  static salvarTarefa(tarefa, callback) {
    let conexao = this.conectar();
    let sql = "INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)";
    let consultaSql = conexao.query(
      sql,
      [tarefa.titulo, tarefa.descricao],
      function (error, results) {
        if (error) throw error;
        tarefa.id = results.insertId;
        callback(tarefa);
      }
    );
    console.log(`${tarefa.id} ${tarefa.titulo} ${tarefa.descricao}`)
    console.log(consultaSql.sql);
    conexao.end();
  }

  static atualizarTarefa(tarefa, callback) {
    let conexao = this.conectar();
    let sql = "UPDATE tarefas SET ? WHERE id = ?";
    let id = tarefa.id;
    let consultaSql = conexao.query(sql, [tarefa, id], function (error) {
      if (error) throw error;
      callback(tarefa);
    });
    console.log(consultaSql.sql);
    conexao.end();
  }

  static deletarTarefa(id, callback) {
    let conexao = this.conectar();
    let sql = "DELETE FROM tarefas WHERE id = ?";
    let consultaSql = conexao.query(sql, [id], function (error) {
      if (error) throw error;
      callback(id);
    });
    console.log(consultaSql.sql);
    conexao.end();
  }
}

export default ConexaoBancoDeDados;
