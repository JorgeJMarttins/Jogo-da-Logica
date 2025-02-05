// Função para gerar equações de primeiro grau aleatórias
function gerarProblema() {
    let a = Math.floor(Math.random() * 10) + 1;  // Número aleatório entre 1 e 10
    let b = Math.floor(Math.random() * 10) + 1;  // Número aleatório entre 1 e 10
    let c = Math.floor(Math.random() * 10) + 1;  // Número aleatório entre 1 e 10
    let x = (c - b) / a;  // Solução para a equação

    // Armazenar a solução da equação
    let problema = `${a}x + ${b} = ${c}`;
    return { problema, x };
}

// Função para carregar o problema na tela
function carregarProblema() {
    let problema = gerarProblema();

    // Exibir a equação na tela
    document.getElementById('problemasMatematicos').innerHTML = `
        <div>
            <label for="resposta">${problema.problema}</label>
            <input type="number" id="resposta" class="resposta" data-resposta="${problema.x}">
        </div>
    `;

    return problema;
}

// Variáveis para armazenar o número de acertos e erros
let acertos = 0;
let erros = 0;
let problema;

// Função para verificar a resposta
function verificarResposta() {
    let respostaUsuario = parseFloat(document.getElementById('resposta').value);
    let respostaCorreta = parseFloat(document.getElementById('resposta').getAttribute('data-resposta'));

    if (respostaUsuario === respostaCorreta) {
        acertos++;
        // Carregar novo problema após o acerto
        problema = carregarProblema();
    } else {
        erros++;
    }

    // Atualizar os contadores na tela
    document.getElementById('qtdAcerto').value = acertos;
    document.getElementById('qtdErro').value = erros;

    // Verificar se o número de acertos chegou a 10 e reiniciar o jogo
    if (acertos >= 10) {
        alert("Parabéns! Você alcançou 10 acertos!");
        reiniciarJogo();
    }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    acertos = 0;
    erros = 0;
    document.getElementById('qtdAcerto').value = acertos;
    document.getElementById('qtdErro').value = erros;

    problema = carregarProblema();  // Carregar novo problema
    document.getElementById('resposta').value = '';
}

// Inicializar o jogo
problema = carregarProblema();

// Event listeners para os botões
document.getElementById('verificar').addEventListener('click', verificarResposta);
document.getElementById('recomecar').addEventListener('click', reiniciarJogo);