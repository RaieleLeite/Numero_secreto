let listaNumerosSoteados = [];
let valorMaximo = 100;
let tentativas = 1;
let mensagemChute;

const input = document.querySelector('.container__input');
input.max = valorMaximo;


function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function gerarNumeroAleatorio (){
    let numeroEscolhido = parseInt(Math.random() * valorMaximo + 1);
    let quantidadeElementosNaLista = listaNumerosSoteados.length;
    if(quantidadeElementosNaLista == valorMaximo){
        listaNumerosSoteados = [];
    }

    if(listaNumerosSoteados.includes(numeroEscolhido)){
       return gerarNumeroAleatorio();
    } else {
        listaNumerosSoteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

let numeroAleatorio = gerarNumeroAleatorio();
console.log(numeroAleatorio);

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do Número Secreto');
    let mensagemEscolherNumero = `Escolha um número entre 1 e ${valorMaximo}`;
    exibirTextoNaTela('p', mensagemEscolherNumero);
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroAleatorio){
        exibirTextoNaTela('h1', 'Parabéns! Você acertou');
        let palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas';
        let mensagemTentivas = `Você acertou com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentivas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute < numeroAleatorio) {
            mensagemChute = `O número secreto é maior que ${chute}`;
            exibirTextoNaTela('p', mensagemChute);
        } else {
            mensagemChute = `O número secreto é menor que ${chute}`;
            exibirTextoNaTela('p', mensagemChute);
        }

        limparCampo();
        tentativas++;
    } 
}

function novoJogo(){
    exibirMensagemInicial();
    limparCampo();
    numeroAleatorio = gerarNumeroAleatorio();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}


function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}