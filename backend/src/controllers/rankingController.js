const userModel = require('../models/userModel');

async function getRanking(req, res) {
  const todos = await userModel.getAll();

  const ranking = todos
    .slice(0, 20)
    .map(u => ({
      id: u.id,
      nomeResponsavel: u.nome,
      pontos: u.pontos,
      quizzesFeitos: u.quizzesFeitos,
    }));

  return res.status(200).json({ ok: true, ranking });
}

module.exports = { getRanking };
