const API_URL = 'http://localhost:3000/api';

function getToken() {
  return localStorage.getItem('token');
}
function setToken(token) {
  localStorage.setItem('token', token);
}
function removeToken() {
  localStorage.removeItem('token');
}

function getUsuarioLogado() {
  try {
    return JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
  } catch(e) {
    return null;
  }
}
function setUsuarioLogado(u) {
  localStorage.setItem('usuarioLogado', JSON.stringify(u));
}

// Limpa sessão local e vai pro login
function _limparSessaoEIrParaLogin() {
  removeToken();
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'login.html';
}

// Guard assíncrono: verifica token no servidor
// Usar nas páginas protegidas: await exigirLoginAsync()
async function exigirLoginAsync() {
  const token = getToken();
  if (!token) {
    _limparSessaoEIrParaLogin();
    return false;
  }
  try {
    const res = await fetch(`${API_URL}/auth/perfil`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) {
      // Token inválido ou usuário não existe mais no banco
      _limparSessaoEIrParaLogin();
      return false;
    }
    const data = await res.json();
    // Atualiza o cache local com dados frescos do servidor
    setUsuarioLogado(data.usuario);
    return true;
  } catch(e) {
    // Servidor offline — deixa passar com dados locais
    if (!getUsuarioLogado()) {
      _limparSessaoEIrParaLogin();
      return false;
    }
    return true;
  }
}

function logout() {
  removeToken();
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'login.html';
}

async function authCadastro(dados) {
  try {
    const res = await fetch(`${API_URL}/auth/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    const data = await res.json();
    if (data.ok) {
      setToken(data.token);
      setUsuarioLogado(data.usuario);
    }
    return data;
  } catch(e) {
    return { ok: false, msg: 'Erro de conexão com o servidor.' };
  }
}

async function authLogin(nome, senha) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, senha }),
    });
    const data = await res.json();
    if (data.ok) {
      setToken(data.token);
      setUsuarioLogado(data.usuario);
    }
    return data;
  } catch(e) {
    return { ok: false, msg: 'Erro de conexão com o servidor.' };
  }
}

async function atualizarPontos(pontosGanhos) {
  try {
    const res = await fetch(`${API_URL}/auth/pontos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ pontos: pontosGanhos }),
    });
    const data = await res.json();
    if (data.ok) setUsuarioLogado(data.usuario);
    return data;
  } catch(e) {
    return { ok: false, msg: 'Erro de conexão com o servidor.' };
  }
}

async function getRanking() {
  try {
    const res = await fetch(`${API_URL}/ranking`);
    const data = await res.json();
    return data.ok ? data.ranking : [];
  } catch(e) {
    return [];
  }
}
