var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';
var comprimento = 600;
var altura = 600;
var jogador = {
    x : 50,
    velocidade_em_x : 4,
    y : 40,
    velocidade_em_y : 4,
    name : 'P',
    hp : 10,
    comprimento: 20,
    altura: 20,
};
var zumbi = {};
var listaDeZumbi = {};
var tempoQuandoOJogoComecou = Date.now();   //Retorna o tempo em ms
var tempoSobrevivido;
var acabouOJogo = 0;
var quantidadeDeZumbi = 1;
var frameCount;

document.onmousemove = function(mouse){
    var mouseX = mouse.clientX;
    var mouseY = mouse.clientY;

    jogador.x = mouseX;
    jogador.y = mouseY;
};

obterDistanciaEntreDoisPontos = function (objeto1, objeto2) {
    var vx = objeto1.x - objeto2.x;
    var vy = objeto1.y - objeto2.y;
    return Math.sqrt(vx*vx+vy*vy);
};

isColidindoRetangulo = function (objeto1, objeto2){
    return objeto1.x <= objeto2.x+objeto2.comprimento
        && objeto2.x <= objeto1.x+objeto1.comprimento
        && objeto1.y <= objeto2.y + objeto2.altura
        && objeto2.y <= objeto1.y + objeto1.altura;
};

isColidindoPonto = function (objeto1, objeto2) {
    var distance = obterDistanciaEntreDoisPontos(objeto1, objeto2);
    return distance < 30;
};

desenhaJogador = function (objeto) {
    ctx.fillStyle = 'green';
    ctx.fillRect(objeto.x-10,objeto.y-10, objeto.comprimento, objeto.altura);
};

desenhaZumbi = function (objeto) {
    ctx.fillStyle = 'red';
    ctx.fillRect(objeto.x,objeto.y,objeto.comprimento, objeto.altura);
};

objetoIsDentroDaTela = function (objeto) {
    objeto.x += objeto.velocidade_em_x;
    objeto.y += objeto.velocidade_em_y;
    if(objeto.x >= comprimento || objeto.x < 0){
        objeto.velocidade_em_x *= -1;
    }else if(objeto.y >= altura || objeto.y < 0){
        objeto.velocidade_em_y *= -1;
    }
};

AtualizarObjeto = function (objeto) {
    objetoIsDentroDaTela(objeto);
    desenhaZumbi(objeto);
};

finalDeJogo = function () {
    tempoSobrevivido = Date.now() - tempoQuandoOJogoComecou;
    ctx.fillStyle = 'black';
    ctx.fillText("Você Perdeu! Você sobreviveu por " + tempoSobrevivido + " ms.",0,50);
    tempoQuandoOJogoComecou = Date.now();
};

AtualizarJogo = function (){
    let frame1 = 0;
    if(acabouOJogo < 1){
        frameCount++;
        ctx.clearRect(0,0, comprimento, altura);
        desenhaJogador(jogador);
        for (var key in listaDeZumbi){
            AtualizarObjeto(listaDeZumbi[key]);
            if(isColidindoRetangulo(jogador,listaDeZumbi[key])){
                jogador.hp--;
                if(jogador.hp <= 0){
                    finalDeJogo();
                    acabouOJogo = 1;
                }
            }
        }
    ctx.fillStyle = 'black';
    ctx.fillText(jogador.hp  + " Hp",0,30);
    }
};

novoZumbi = function (codigo, posicao_x, posicao_y) {

    zumbi = {
        x : posicao_x,
        velocidade_em_x : 0.1,
        y : posicao_y,
        velocidade_em_y : 0.1,
        name : 'Z',
        id : codigo,
        comprimento: 20,
        altura: 20,
    };
    listaDeZumbi[codigo] = zumbi ;
};

gerarZumbi = function(quantidade){
    var max = 500;
    var min = 0;
    var posicao_x;
    var posicao_y;
    for (let i = 0; i < quantidade; i++){
        posicao_x = Math.floor(Math.random() * (+max - +min) + +min);
        posicao_y = Math.floor(Math.random() * (+max - +min) + +min);
        novoZumbi('z' + quantidadeDeZumbi, posicao_x, posicao_y);
        console.log(quantidade + " zumbi " + quantidadeDeZumbi + " i " + i);
        quantidadeDeZumbi++;
    }
};

main = function () {
    gerarZumbi(2)
    setInterval(AtualizarJogo,33);
};

main();