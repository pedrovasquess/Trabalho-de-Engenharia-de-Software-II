const { getDb, run, get, all } = require('./db');

async function findByEmail(email) {
  const db = await getDb();
  return get(db, 'SELECT * FROM usuarios WHERE email = ?', [email]);
}

async function findByNome(nome) {
  const db = await getDb();
  return get(db, 'SELECT * FROM usuarios WHERE nome = ?', [nome]);
}

async function findById(id) {
  const db = await getDb();
  return get(db, 'SELECT * FROM usuarios WHERE id = ?', [id]);
}

async function create(dados) {
  const db = await getDb();
  run(db,
    `INSERT INTO usuarios (nome, email, senha, nomeCrianca, dataNascimento)
     VALUES (?, ?, ?, ?, ?)`,
    [dados.nomeResponsavel, dados.email, dados.senha, dados.nomeCrianca, dados.dataNascimento]
  );
  // Retorna o usuário recém-criado
  return get(db, 'SELECT * FROM usuarios WHERE email = ?', [dados.email]);
}

async function updatePontos(id, pontosGanhos) {
  const db = await getDb();
  run(db,
    `UPDATE usuarios SET pontos = pontos + ?, quizzesFeitos = quizzesFeitos + 1 WHERE id = ?`,
    [pontosGanhos, id]
  );
  return get(db, 'SELECT * FROM usuarios WHERE id = ?', [id]);
}

async function getAll() {
  const db = await getDb();
  return all(db, 'SELECT * FROM usuarios ORDER BY pontos DESC');
}

module.exports = { findByEmail, findByNome, findById, create, updatePontos, getAll };
