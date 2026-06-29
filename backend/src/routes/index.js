const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const rankingController = require('../controllers/rankingController');
const { autenticar } = require('../middleware/auth');

router.post('/auth/cadastro', authController.cadastro);
router.post('/auth/login',    authController.login);
router.get('/auth/perfil',    autenticar, authController.perfil);
router.post('/auth/pontos',   autenticar, authController.atualizarPontos);

router.get('/ranking', rankingController.getRanking);

module.exports = router;
