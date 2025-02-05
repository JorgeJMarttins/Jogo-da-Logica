// Função para gerar equações de primeiro grau mais complexas aleatórias
function gerarProblema() {
    let a = Math.floor(Math.random() * 20) + 1;  // Número aleatório entre 1 e 20
    let b = Math.floor(Math.random() * 20) + 1;  // Número aleatório entre 1 e 20
    let c = Math.floor(Math.random() * 50) + 1;  // Número aleatório entre 1 e 50

    // Garantir que a solução de x seja um número inteiro positivo
    while ((c - b) % a !== 0 || (c - b) / a <= 0) {
        c = Math.floor(Math.random() * 50) + 1;  // Regerar 'c' se a solução não for um inteiro positivo
    }

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

// Variáveis para armazenar o número de acertos, erros e tentativas
let acertos = 0;
let erros = 0;
let tentativas = 0;
let problema;

// Função para verificar a resposta
function verificarResposta() {
    let respostaUsuario = parseFloat(document.getElementById('resposta').value);
    let respostaCorreta = parseFloat(document.getElementById('resposta').getAttribute('data-resposta'));

    // Verificar se a resposta do usuário está correta
    if (respostaUsuario === respostaCorreta) {
        acertos++;
    } else {
        erros++;
    }

    tentativas++;

    // Atualizar os contadores na tela
    document.getElementById('qtdAcerto').value = acertos;
    document.getElementById('qtdErro').value = erros;

    // Verificar se o jogo acabou
    if (tentativas >= 10) {
        alert(`Fim de jogo! Você acertou ${acertos} de 10 questões.`);
        reiniciarJogo();
    } else {
        // Carregar um novo problema após cada tentativa
        problema = carregarProblema();
    }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    acertos = 0;
    erros = 0;
    tentativas = 0;
    document.getElementById('qtdAcerto').value = acertos;
    document.getElementById('qtdErro').value = erros;

    problema = carregarProblema();  // Carregar um novo problema
    document.getElementById('resposta').value = '';
}

// Inicializar o jogo
problema = carregarProblema();

// Event listeners para os botões
document.getElementById('verificar').addEventListener('click', verificarResposta);
document.getElementById('recomecar').addEventListener('click', reiniciarJogo);
