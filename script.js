let sequencia = [];
let jogador = [];
let cores = ["rosa", "verde", "roxo", "azul"];

let nivel = 0;
let recorde = 0;
let jogando = false;

// GARANTE QUE O HTML CARREGOU
document.addEventListener("DOMContentLoaded", () => {
  recorde = localStorage.getItem("recorde") || 0;
  document.getElementById("recorde").innerText = "Recorde: " + recorde;
});

// BOTÃO INICIAR
function iniciar() {
  sequencia = [];
  jogador = [];
  nivel = 0;
  jogando = true;

  document.getElementById("status").innerText = "🎮 Jogando...";
  document.getElementById("nivel").innerText = "Nível: 0";
  document.getElementById("cliques").innerText = "Cliques: 0";

  proximaRodada(); // 🔥 COMEÇA O JOGO
}

// NOVA RODADA
function proximaRodada() {
  jogador = [];
  nivel++;

  document.getElementById("nivel").innerText = "Nível: " + nivel;
  document.getElementById("cliques").innerText = "Cliques: 0";

  let cor = cores[Math.floor(Math.random() * 4)];
  sequencia.push(cor);

  mostrarSequencia();
}

// MOSTRA SEQUÊNCIA
function mostrarSequencia() {
  jogando = false;

  let i = 0;

  let intervalo = setInterval(() => {
    piscar(sequencia[i]);
    i++;

    if (i >= sequencia.length) {
      clearInterval(intervalo);
      jogando = true;
    }
  }, 700);
}

// EFEITO
function piscar(cor) {
  let el = document.querySelector("." + cor);
  if (!el) return;

  el.classList.add("ativo");

  setTimeout(() => {
    el.classList.remove("ativo");
  }, 300);
}

// CLIQUE DO JOGADOR
function clicar(cor) {
  if (!jogando) return;

  jogador.push(cor);
  piscar(cor);

  document.getElementById("cliques").innerText =
    "Cliques: " + jogador.length;

  if (jogador[jogador.length - 1] !== sequencia[jogador.length - 1]) {
    erro();
    return;
  }

  if (jogador.length === sequencia.length) {
    setTimeout(proximaRodada, 1000);
  }
}

// ERRO
function erro() {
  jogando = false;

  document.getElementById("status").innerText = "❌ Errou!";

  if (nivel > recorde) {
    recorde = nivel;
    localStorage.setItem("recorde", recorde);
    document.getElementById("recorde").innerText = "Recorde: " + recorde;
  }

  setTimeout(() => {
    document.getElementById("status").innerText = "Clique em iniciar para jogar";
  }, 1000);
}