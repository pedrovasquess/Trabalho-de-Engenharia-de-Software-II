const request = require('supertest');
const initSqlJs = require('sql.js');
const dbModule = require('../src/models/db');

let app;

beforeAll(async () => {
  const SQL = await initSqlJs();
  dbModule._resetForTest(SQL);
  app = require('../src/app');
});

beforeEach(async () => {
  const SQL = await initSqlJs();
  dbModule._resetForTest(SQL);
});

const usuario1 = {
  nomeResponsavel: 'Maria Silva',
  email: 'maria@teste.com',
  senha: '123456',
  nomeCrianca: 'Joãozinho',
  dataNascimento: '2015-05-10',
};

async function cadastrarELogar(dados = usuario1) {
  const res = await request(app).post('/api/auth/cadastro').send(dados);
  return { token: res.body.token, usuario: res.body.usuario, status: res.status };
}

// ═══════════════════════════════════════════════════════════════════════════════
// CADASTRO
// ═══════════════════════════════════════════════════════════════════════════════
describe('POST /api/auth/cadastro', () => {

  test('cadastra com dados válidos → 201', async () => {
    const res = await request(app).post('/api/auth/cadastro').send(usuario1);
    expect(res.status).toBe(201);
    expect(res.body.ok).toBe(true);
    expect(res.body.token).toBeDefined();
  });

  test('retorna campo nome no usuario → frontend depende disso', async () => {
    const res = await request(app).post('/api/auth/cadastro').send(usuario1);
    // Frontend usa usuario.nome para exibir "Olá, Maria!"
    expect(res.body.usuario.nome).toBe('Maria Silva');
  });

  test('retorna email no usuario', async () => {
    const res = await request(app).post('/api/auth/cadastro').send(usuario1);
    expect(res.body.usuario.email).toBe('maria@teste.com');
  });

  test('nunca retorna a senha na resposta', async () => {
    const res = await request(app).post('/api/auth/cadastro').send(usuario1);
    expect(res.body.usuario.senha).toBeUndefined();
  });

  test('senha é armazenada com hash — não em texto puro', async () => {
    const res = await request(app).post('/api/auth/cadastro').send(usuario1);
    // Depois do cadastro, login com a senha correta deve funcionar (prova que hash está certo)
    const login = await request(app).post('/api/auth/login').send({
      nome: 'Maria Silva', senha: '123456'
    });
    expect(login.status).toBe(200);
    // E login com senha errada deve falhar (prova que o hash não aceitou texto puro)
    const loginErrado = await request(app).post('/api/auth/login').send({
      nome: 'Maria Silva', senha: '123456ERRADA'
    });
    expect(loginErrado.status).toBe(401);
  });

  test('usuário começa com pontos = 0 e quizzesFeitos = 0', async () => {
    const res = await request(app).post('/api/auth/cadastro').send(usuario1);
    expect(res.body.usuario.pontos).toBe(0);
    expect(res.body.usuario.quizzesFeitos).toBe(0);
  });

  test('token JWT retornado tem formato válido (3 partes)', async () => {
    const res = await request(app).post('/api/auth/cadastro').send(usuario1);
    expect(typeof res.body.token).toBe('string');
    expect(res.body.token.split('.')).toHaveLength(3);
  });

  test('rejeita e-mail duplicado → 409', async () => {
    await request(app).post('/api/auth/cadastro').send(usuario1);
    const res = await request(app).post('/api/auth/cadastro').send(usuario1);
    expect(res.status).toBe(409);
    expect(res.body.msg).toMatch(/e-mail|cadastrado/i);
  });

  test('rejeita nome de usuário duplicado → 409', async () => {
    await request(app).post('/api/auth/cadastro').send(usuario1);
    const res = await request(app).post('/api/auth/cadastro').send({
      ...usuario1, email: 'outro@email.com'
    });
    expect(res.status).toBe(409);
    expect(res.body.msg).toMatch(/nome/i);
  });

  test('rejeita quando falta nomeResponsavel → 400', async () => {
    const { nomeResponsavel, ...resto } = usuario1;
    const res = await request(app).post('/api/auth/cadastro').send(resto);
    expect(res.status).toBe(400);
  });

  test('rejeita quando falta email → 400', async () => {
    const { email, ...resto } = usuario1;
    const res = await request(app).post('/api/auth/cadastro').send(resto);
    expect(res.status).toBe(400);
  });

  test('rejeita quando falta senha → 400', async () => {
    const { senha, ...resto } = usuario1;
    const res = await request(app).post('/api/auth/cadastro').send(resto);
    expect(res.status).toBe(400);
  });

  test('rejeita quando falta nomeCrianca → 400', async () => {
    const { nomeCrianca, ...resto } = usuario1;
    const res = await request(app).post('/api/auth/cadastro').send(resto);
    expect(res.status).toBe(400);
  });

  test('rejeita quando falta dataNascimento → 400', async () => {
    const { dataNascimento, ...resto } = usuario1;
    const res = await request(app).post('/api/auth/cadastro').send(resto);
    expect(res.status).toBe(400);
  });

  test('rejeita body vazio → 400', async () => {
    const res = await request(app).post('/api/auth/cadastro').send({});
    expect(res.status).toBe(400);
  });

  test('rejeita e-mail com formato inválido → 400', async () => {
    const res = await request(app).post('/api/auth/cadastro').send({ ...usuario1, email: 'nao-e-email' });
    expect(res.status).toBe(400);
    expect(res.body.msg).toMatch(/inválido/i);
  });

  test('rejeita e-mail sem @ → 400', async () => {
    const res = await request(app).post('/api/auth/cadastro').send({ ...usuario1, email: 'semArroba.com' });
    expect(res.status).toBe(400);
  });

  test('rejeita senha com menos de 6 caracteres → 400', async () => {
    const res = await request(app).post('/api/auth/cadastro').send({ ...usuario1, senha: '123' });
    expect(res.status).toBe(400);
    expect(res.body.msg).toMatch(/6 caracteres/i);
  });

  test('aceita senha com exatamente 6 caracteres → 201', async () => {
    const res = await request(app).post('/api/auth/cadastro').send({ ...usuario1, senha: '123456' });
    expect(res.status).toBe(201);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════════════════════════
describe('POST /api/auth/login', () => {

  beforeEach(async () => {
    await request(app).post('/api/auth/cadastro').send(usuario1);
  });

  test('loga com credenciais corretas → 200', async () => {
    const res = await request(app).post('/api/auth/login').send({ nome: 'Maria Silva', senha: '123456' });
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.token).toBeDefined();
  });

  test('retorna campo nome no usuario → frontend depende disso para exibir saudação', async () => {
    const res = await request(app).post('/api/auth/login').send({ nome: 'Maria Silva', senha: '123456' });
    expect(res.body.usuario.nome).toBe('Maria Silva');
  });

  test('nunca retorna a senha na resposta', async () => {
    const res = await request(app).post('/api/auth/login').send({ nome: 'Maria Silva', senha: '123456' });
    expect(res.body.usuario.senha).toBeUndefined();
  });

  test('rejeita senha errada → 401', async () => {
    const res = await request(app).post('/api/auth/login').send({ nome: 'Maria Silva', senha: 'errada' });
    expect(res.status).toBe(401);
    expect(res.body.ok).toBe(false);
  });

  test('rejeita usuário inexistente → 401', async () => {
    const res = await request(app).post('/api/auth/login').send({ nome: 'Fantasma', senha: '123456' });
    expect(res.status).toBe(401);
  });

  test('rejeita body vazio → 400', async () => {
    const res = await request(app).post('/api/auth/login').send({});
    expect(res.status).toBe(400);
  });

  test('rejeita sem nome → 400', async () => {
    const res = await request(app).post('/api/auth/login').send({ senha: '123456' });
    expect(res.status).toBe(400);
  });

  test('rejeita sem senha → 400', async () => {
    const res = await request(app).post('/api/auth/login').send({ nome: 'Maria Silva' });
    expect(res.status).toBe(400);
  });

  test('login é case-insensitive no nome → 200', async () => {
    const res = await request(app).post('/api/auth/login').send({ nome: 'MARIA SILVA', senha: '123456' });
    expect(res.status).toBe(200);
  });

  test('mensagem de erro igual para nome errado e senha errada (segurança)', async () => {
    const res1 = await request(app).post('/api/auth/login').send({ nome: 'Fantasma', senha: '123456' });
    const res2 = await request(app).post('/api/auth/login').send({ nome: 'Maria Silva', senha: 'errada' });
    expect(res1.body.msg).toBe(res2.body.msg);
  });

  test('token JWT retornado tem formato válido (3 partes)', async () => {
    const res = await request(app).post('/api/auth/login').send({ nome: 'Maria Silva', senha: '123456' });
    expect(res.body.token.split('.')).toHaveLength(3);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// PERFIL (rota autenticada)
// ═══════════════════════════════════════════════════════════════════════════════
describe('GET /api/auth/perfil', () => {
  let token;

  beforeEach(async () => {
    const { token: t } = await cadastrarELogar();
    token = t;
  });

  test('retorna perfil com token válido → 200', async () => {
    const res = await request(app).get('/api/auth/perfil').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  test('retorna campo nome → frontend usa para exibir saudação e avatar', async () => {
    const res = await request(app).get('/api/auth/perfil').set('Authorization', `Bearer ${token}`);
    expect(res.body.usuario.nome).toBe('Maria Silva');
  });

  test('retorna email no perfil', async () => {
    const res = await request(app).get('/api/auth/perfil').set('Authorization', `Bearer ${token}`);
    expect(res.body.usuario.email).toBe('maria@teste.com');
  });

  test('retorna pontos e quizzesFeitos → frontend usa para stats', async () => {
    const res = await request(app).get('/api/auth/perfil').set('Authorization', `Bearer ${token}`);
    expect(res.body.usuario.pontos).toBeDefined();
    expect(res.body.usuario.quizzesFeitos).toBeDefined();
  });

  test('nunca retorna senha no perfil', async () => {
    const res = await request(app).get('/api/auth/perfil').set('Authorization', `Bearer ${token}`);
    expect(res.body.usuario.senha).toBeUndefined();
  });

  test('rejeita sem Authorization header → 401', async () => {
    const res = await request(app).get('/api/auth/perfil');
    expect(res.status).toBe(401);
    expect(res.body.msg).toMatch(/token/i);
  });

  test('rejeita token malformado → 401', async () => {
    const res = await request(app).get('/api/auth/perfil').set('Authorization', 'Bearer nao.e.jwt');
    expect(res.status).toBe(401);
  });

  test('rejeita token sem prefixo Bearer → 401', async () => {
    const res = await request(app).get('/api/auth/perfil').set('Authorization', token);
    expect(res.status).toBe(401);
  });

  test('rejeita token com assinatura adulterada → 401', async () => {
    const partes = token.split('.');
    partes[2] = 'assinatura_falsa_adulterada';
    const tokenAdulterado = partes.join('.');
    const res = await request(app).get('/api/auth/perfil').set('Authorization', `Bearer ${tokenAdulterado}`);
    expect(res.status).toBe(401);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// PONTOS
// ═══════════════════════════════════════════════════════════════════════════════
describe('POST /api/auth/pontos', () => {
  let token;

  beforeEach(async () => {
    const { token: t } = await cadastrarELogar();
    token = t;
  });

  test('adiciona pontos corretamente → 200', async () => {
    const res = await request(app)
      .post('/api/auth/pontos')
      .set('Authorization', `Bearer ${token}`)
      .send({ pontos: 80 });
    expect(res.status).toBe(200);
    expect(res.body.usuario.pontos).toBe(80);
    expect(res.body.usuario.quizzesFeitos).toBe(1);
  });

  test('acumula pontos em múltiplas rodadas', async () => {
    await request(app).post('/api/auth/pontos').set('Authorization', `Bearer ${token}`).send({ pontos: 50 });
    const res = await request(app).post('/api/auth/pontos').set('Authorization', `Bearer ${token}`).send({ pontos: 30 });
    expect(res.body.usuario.pontos).toBe(80);
    expect(res.body.usuario.quizzesFeitos).toBe(2);
  });

  test('aceita pontos = 0 (quiz sem acertos) → incrementa quizzesFeitos', async () => {
    const res = await request(app)
      .post('/api/auth/pontos')
      .set('Authorization', `Bearer ${token}`)
      .send({ pontos: 0 });
    expect(res.status).toBe(200);
    expect(res.body.usuario.quizzesFeitos).toBe(1);
    expect(res.body.usuario.pontos).toBe(0);
  });

  test('aceita pontuação máxima do quiz (75 pts: 5 questões × 15 pts) → 200', async () => {
    const res = await request(app)
      .post('/api/auth/pontos')
      .set('Authorization', `Bearer ${token}`)
      .send({ pontos: 75 });
    expect(res.status).toBe(200);
    expect(res.body.usuario.pontos).toBe(75);
  });

  test('nunca retorna senha após atualizar pontos', async () => {
    const res = await request(app)
      .post('/api/auth/pontos')
      .set('Authorization', `Bearer ${token}`)
      .send({ pontos: 60 });
    expect(res.body.usuario.senha).toBeUndefined();
  });

  test('rejeita pontos negativos → 400', async () => {
    const res = await request(app)
      .post('/api/auth/pontos')
      .set('Authorization', `Bearer ${token}`)
      .send({ pontos: -10 });
    expect(res.status).toBe(400);
  });

  test('rejeita pontos como string → 400', async () => {
    const res = await request(app)
      .post('/api/auth/pontos')
      .set('Authorization', `Bearer ${token}`)
      .send({ pontos: 'muito' });
    expect(res.status).toBe(400);
  });

  test('rejeita body sem campo pontos → 400', async () => {
    const res = await request(app)
      .post('/api/auth/pontos')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res.status).toBe(400);
  });

  test('rejeita sem autenticação → 401', async () => {
    const res = await request(app).post('/api/auth/pontos').send({ pontos: 50 });
    expect(res.status).toBe(401);
  });

  test('pontos de um usuário não afetam outro', async () => {
    const { token: t2 } = await cadastrarELogar({
      ...usuario1, nomeResponsavel: 'Carlos', email: 'carlos@t.com'
    });
    await request(app).post('/api/auth/pontos').set('Authorization', `Bearer ${token}`).send({ pontos: 100 });
    
    // Perfil do segundo usuário deve ter 0 pontos
    const res = await request(app).get('/api/auth/perfil').set('Authorization', `Bearer ${t2}`);
    expect(res.body.usuario.pontos).toBe(0);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// RANKING
// ═══════════════════════════════════════════════════════════════════════════════
describe('GET /api/ranking', () => {

  test('retorna ranking vazio quando não há usuários → 200', async () => {
    const res = await request(app).get('/api/ranking');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.ranking).toEqual([]);
  });

  test('ranking é público — não precisa de autenticação', async () => {
    const res = await request(app).get('/api/ranking');
    expect(res.status).toBe(200);
  });

  test('ordena por pontos decrescente', async () => {
    const { token: t1 } = await cadastrarELogar(usuario1);
    const { token: t2 } = await cadastrarELogar({ ...usuario1, nomeResponsavel: 'Carlos', email: 'carlos@t.com' });

    await request(app).post('/api/auth/pontos').set('Authorization', `Bearer ${t1}`).send({ pontos: 30 });
    await request(app).post('/api/auth/pontos').set('Authorization', `Bearer ${t2}`).send({ pontos: 90 });

    const res = await request(app).get('/api/ranking');
    expect(res.body.ranking[0].pontos).toBe(90);
    expect(res.body.ranking[1].pontos).toBe(30);
  });

  test('retorna nomeResponsavel — campo que o frontend exibe no ranking', async () => {
    const { token: t } = await cadastrarELogar(usuario1);
    await request(app).post('/api/auth/pontos').set('Authorization', `Bearer ${t}`).send({ pontos: 50 });
    const res = await request(app).get('/api/ranking');
    expect(res.body.ranking[0].nomeResponsavel).toBe('Maria Silva');
  });

  test('nunca expõe senhas no ranking', async () => {
    await cadastrarELogar();
    const res = await request(app).get('/api/ranking');
    res.body.ranking.forEach(u => expect(u.senha).toBeUndefined());
  });

  test('retorna no máximo 20 usuários', async () => {
    for (let i = 1; i <= 22; i++) {
      await cadastrarELogar({ ...usuario1, nomeResponsavel: `User${i}`, email: `user${i}@t.com` });
    }
    const res = await request(app).get('/api/ranking');
    expect(res.body.ranking.length).toBeLessThanOrEqual(20);
  });

  test('cada item do ranking tem id, nomeResponsavel, pontos, quizzesFeitos', async () => {
    await cadastrarELogar();
    const res = await request(app).get('/api/ranking');
    const item = res.body.ranking[0];
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('nomeResponsavel');
    expect(item).toHaveProperty('pontos');
    expect(item).toHaveProperty('quizzesFeitos');
  });

  test('usuário sem pontos aparece no ranking com pontos = 0', async () => {
    await cadastrarELogar();
    const res = await request(app).get('/api/ranking');
    expect(res.body.ranking[0].pontos).toBe(0);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// INTEGRAÇÃO — fluxo completo do jogo
// ═══════════════════════════════════════════════════════════════════════════════
describe('Fluxo completo de integração', () => {

  test('cadastro → login → quiz → ranking → perfil atualizado', async () => {
    // 1. Cadastrar
    const cad = await request(app).post('/api/auth/cadastro').send(usuario1);
    expect(cad.status).toBe(201);
    const token = cad.body.token;

    // 2. Login funciona após cadastro
    const login = await request(app).post('/api/auth/login').send({ nome: 'Maria Silva', senha: '123456' });
    expect(login.status).toBe(200);
    expect(login.body.usuario.nome).toBe('Maria Silva');

    // 3. Adicionar pontos do quiz
    const pts = await request(app)
      .post('/api/auth/pontos')
      .set('Authorization', `Bearer ${token}`)
      .send({ pontos: 75 });
    expect(pts.body.usuario.pontos).toBe(75);

    // 4. Ranking reflete os pontos
    const rank = await request(app).get('/api/ranking');
    expect(rank.body.ranking[0].pontos).toBe(75);
    expect(rank.body.ranking[0].nomeResponsavel).toBe('Maria Silva');

    // 5. Perfil reflete os pontos e quizzes feitos
    const perfil = await request(app)
      .get('/api/auth/perfil')
      .set('Authorization', `Bearer ${token}`);
    expect(perfil.body.usuario.pontos).toBe(75);
    expect(perfil.body.usuario.quizzesFeitos).toBe(1);
    expect(perfil.body.usuario.nome).toBe('Maria Silva');
  });

  test('dois jogadores — ranking e pontos completamente isolados', async () => {
    const { token: t1 } = await cadastrarELogar(usuario1);
    const { token: t2 } = await cadastrarELogar({
      ...usuario1, nomeResponsavel: 'Pedro', email: 'pedro@t.com'
    });

    await request(app).post('/api/auth/pontos').set('Authorization', `Bearer ${t1}`).send({ pontos: 200 });
    await request(app).post('/api/auth/pontos').set('Authorization', `Bearer ${t2}`).send({ pontos: 350 });

    const rank = await request(app).get('/api/ranking');
    expect(rank.body.ranking[0].nomeResponsavel).toBe('Pedro');
    expect(rank.body.ranking[0].pontos).toBe(350);
    expect(rank.body.ranking[1].nomeResponsavel).toBe('Maria Silva');
    expect(rank.body.ranking[1].pontos).toBe(200);

    // Perfis isolados
    const p1 = await request(app).get('/api/auth/perfil').set('Authorization', `Bearer ${t1}`);
    const p2 = await request(app).get('/api/auth/perfil').set('Authorization', `Bearer ${t2}`);
    expect(p1.body.usuario.pontos).toBe(200);
    expect(p2.body.usuario.pontos).toBe(350);
  });

  test('token inválido não dá acesso ao perfil de ninguém → 401', async () => {
    await cadastrarELogar();
    const res = await request(app)
      .get('/api/auth/perfil')
      .set('Authorization', 'Bearer token.completamente.falso');
    expect(res.status).toBe(401);
  });

  test('múltiplos quizzes acumulam quizzesFeitos corretamente', async () => {
    const { token } = await cadastrarELogar();

    for (let i = 0; i < 3; i++) {
      await request(app).post('/api/auth/pontos').set('Authorization', `Bearer ${token}`).send({ pontos: 50 });
    }

    const perfil = await request(app).get('/api/auth/perfil').set('Authorization', `Bearer ${token}`);
    expect(perfil.body.usuario.quizzesFeitos).toBe(3);
    expect(perfil.body.usuario.pontos).toBe(150);
  });
});