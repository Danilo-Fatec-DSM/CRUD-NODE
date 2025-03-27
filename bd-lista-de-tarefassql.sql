CREATE DATABASE listaDeTarefas;

USE listaDeTarefas;

CREATE TABLE tarefas (
	id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(50),
    descricao VARCHAR(255),
    CONSTRAINT pk_tarefa PRIMARY KEY (id)
);

INSERT INTO tarefas (id, titulo, descricao)
VALUES (1, "Estudar Node.js", "Terminar de revisar os conteúdos das aulas 10 a 16");

select * from tarefas;