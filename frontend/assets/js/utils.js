function mostrarErro(inputId, mensagem) {
  const input = document.getElementById(inputId);
  if (!input) return;
  let erro = input.parentElement.querySelector(".erro-msg");
  if (!erro) {
    erro = document.createElement("span");
    erro.className = "erro-msg";
    input.parentElement.appendChild(erro);
  }
  erro.textContent = mensagem;
  input.style.borderColor = "var(--vermelho)";
}
function limparErros() {
  document.querySelectorAll(".erro-msg").forEach(e => e.textContent = "");
  document.querySelectorAll("input, select").forEach(i => i.style.borderColor = "");
}
function toast(msg, tipo = "info") {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.className = `toast ${tipo} show`;
  setTimeout(() => el.classList.remove("show"), 3000);
}
function gerarEstrelas() {
  const container = document.getElementById("stars");
  if (!container) return;
  for (let i = 0; i < 80; i++) {
    const s = document.createElement("div");
    s.className = "star";
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      --d:${2 + Math.random() * 4}s;
      --delay:${Math.random() * 4}s;
      opacity:${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(s);
  }
}
