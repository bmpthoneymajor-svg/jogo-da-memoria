
const simbolos = [
    "🚀", "💻", "🎮", "🤖",
    "🌎", "⚡", "🧠", "🛸"
];

const tabuleiro = document.getElementById("tabuleiro");
const movimentosTexto = document.getElementById("movimentos");
const paresTexto = document.getElementById("pares");
const mensagem = document.getElementById("mensagem");

let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let movimentos = 0;
let pares = 0;

function embaralhar(lista) {
    return lista.sort(() => Math.random() - 0.5);
}

function iniciarJogo() {
    tabuleiro.innerHTML = "";
    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;
    movimentos = 0;
    pares = 0;

    movimentosTexto.textContent = movimentos;
    paresTexto.textContent = pares;
    mensagem.textContent = "";

    const cartas = embaralhar([...simbolos, ...simbolos]);

    cartas.forEach(simbolo => {
        const carta = document.createElement("button");

        carta.classList.add("carta");
        carta.textContent = "?";
        carta.dataset.simbolo = simbolo;
        carta.setAttribute("aria-label", "Carta fechada");

        carta.addEventListener("click", () => virarCarta(carta));

        tabuleiro.appendChild(carta);
    });
}

function virarCarta(carta) {
    if (
        bloqueado ||
        carta === primeiraCarta ||
        carta.classList.contains("acertada") ||
        carta.classList.contains("revelada")
    ) {
        return;
    }

    carta.textContent = carta.dataset.simbolo;
    carta.classList.add("revelada");
    carta.setAttribute("aria-label", carta.dataset.simbolo);

    if (!primeiraCarta) {
        primeiraCarta = carta;
        return;
    }

    segundaCarta = carta;
    movimentos++;

    movimentosTexto.textContent = movimentos;

    verificarPar();
}

function verificarPar() {
    if (
        primeiraCarta.dataset.simbolo ===
        segundaCarta.dataset.simbolo
    ) {
        primeiraCarta.classList.add("acertada");
        segundaCarta.classList.add("acertada");

        pares++;
        paresTexto.textContent = pares;

        primeiraCarta = null;
        segundaCarta = null;

        if (pares === simbolos.length) {
            mensagem.textContent =
                `Parabéns! Você venceu em ${movimentos} movimentos!`;
        }

    } else {
        bloqueado = true;

        setTimeout(() => {
            primeiraCarta.textContent = "?";
            segundaCarta.textContent = "?";

            primeiraCarta.classList.remove("revelada");
            segundaCarta.classList.remove("revelada");

            primeiraCarta.setAttribute("aria-label", "Carta fechada");
            segundaCarta.setAttribute("aria-label", "Carta fechada");

            primeiraCarta = null;
            segundaCarta = null;
            bloqueado = false;

        }, 1000);
    }
}

document.getElementById("reiniciar")
    .addEventListener("click", iniciarJogo);

iniciarJogo();
