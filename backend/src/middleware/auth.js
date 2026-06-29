const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'cosmobrains_secret';

function autenticar(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ ok: false, msg: 'Token não fornecido.' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.usuarioId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, msg: 'Token inválido ou expirado.' });
  }
}

module.exports = { autenticar };
