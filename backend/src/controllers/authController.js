const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'cosmobrains_secret';
const JWT_EXPIRES = '7d';

function gerarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, email: usuario.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
}

function semSenha(usuario) {
  const { senha, ...resto } = usuario;
  return resto;
}

async function cadastro(req, res) {
  const { nomeResponsavel, email, senha, nomeCrianca, dataNascimento } = req.body;

  if (!nomeResponsavel || !email || !senha || !nomeCrianca || !dataNascimento) {
    return res.status(400).json({ ok: false, msg: 'Todos os campos são obrigatórios.' });
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return res.status(400).json({ ok: false, msg: 'E-mail inválido.' });
  }

  if (senha.length < 6) {
    return res.status(400).json({ ok: false, msg: 'Senha deve ter pelo menos 6 caracteres.' });
  }

  const existe = await userModel.findByEmail(email);
  if (existe) {
    return res.status(409).json({ ok: false, msg: 'Este e-mail já está cadastrado.' });
  }

  const nomeExiste = await userModel.findByNome(nomeResponsavel);
  if (nomeExiste) {
    return res.status(409).json({ ok: false, msg: 'Este nome de usuário já está em uso.' });
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const usuario = await userModel.create({ nomeResponsavel, email, senha: senhaHash, nomeCrianca, dataNascimento });

  const token = gerarToken(usuario);
  return res.status(201).json({ ok: true, token, usuario: semSenha(usuario) });
}

async function login(req, res) {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res.status(400).json({ ok: false, msg: 'Informe nome e senha.' });
  }

  const usuario = await userModel.findByNome(nome);
  if (!usuario) {
    return res.status(401).json({ ok: false, msg: 'Usuário ou senha incorretos.' });
  }

  const senhaOk = await bcrypt.compare(senha, usuario.senha);
  if (!senhaOk) {
    return res.status(401).json({ ok: false, msg: 'Usuário ou senha incorretos.' });
  }

  const token = gerarToken(usuario);
  return res.status(200).json({ ok: true, token, usuario: semSenha(usuario) });
}

async function perfil(req, res) {
  const usuario = await userModel.findById(req.usuarioId);
  if (!usuario) {
    return res.status(404).json({ ok: false, msg: 'Usuário não encontrado.' });
  }
  return res.status(200).json({ ok: true, usuario: semSenha(usuario) });
}

async function atualizarPontos(req, res) {
  const { pontos } = req.body;

  if (typeof pontos !== 'number' || pontos < 0) {
    return res.status(400).json({ ok: false, msg: 'Pontos inválidos.' });
  }

  const usuario = await userModel.updatePontos(req.usuarioId, pontos);
  if (!usuario) {
    return res.status(404).json({ ok: false, msg: 'Usuário não encontrado.' });
  }

  return res.status(200).json({ ok: true, usuario: semSenha(usuario) });
}

module.exports = { cadastro, login, perfil, atualizarPontos };
