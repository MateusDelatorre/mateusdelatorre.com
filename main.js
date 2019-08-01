var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';
var width = 600;
var height = 600;
var jogador = {
    x : 50,
    spdX : 4,
    y : 40,
    spdY : 4,
    name : 'P',
    hp : 10,
};
var zumbi = {};
var listaDeZumbi = {};
var tempoQuandoOJogoComecou = Date.now();   //Retorna o tempo em ms
var tempoSobrevivido;
var acabouOJogo = 0;

document.onmousemove = function(mouse){
    var mouseX = mouse.clientX;
    var mouseY = mouse.clientY;

    jogador.x = mouseX;
    jogador.y = mouseY;
};

obterDistanciaEntreDoisobjetos = function (objeto1, objeto2) {
    var vx = objeto1.x - objeto2.x;
    var vy = objeto1.y - objeto2.y;
    return Math.sqrt(vx*vx+vy*vy);
};

isColidindo = function (objeto1, objeto2) {
    var distance = obterDistanciaEntreDoisobjetos(objeto1, objeto2);
    return distance < 30;
};

desenhaJogador = function (objeto) {
    ctx.fillStyle = 'green';
    ctx.fillRect(objeto.x,objeto.y, 20, 20);
};

desenhaZumbi = function (objeto) {
    ctx.fillStyle = 'red';
    ctx.fillRect(objeto.x,objeto.y, 20, 20);
};

objetoIsDentroDaTela = function (objeto) {
    objeto.x += objeto.spdX;
    objeto.y += objeto.spdY;
    if(objeto.x >= width || objeto.x < 0){
        objeto.spdX *= -1;
    }else if(objeto.y >= height || objeto.y < 0){
        objeto.spdY *= -1;
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
    if(acabouOJogo < 1){
    ctx.clearRect(0,0, width, height);
    desenhaJogador(jogador);
    for (var key in listaDeZumbi){
        AtualizarObjeto(listaDeZumbi[key]);
        if(isColidindo(jogador,listaDeZumbi[key])){
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
        spdX : 1,
        y : posicao_y,
        spdY : 1,
        name : 'Z',
        id : codigo,
    };
    listaDeZumbi[codigo] = zumbi ;
};

main = function () {
    /*
    * var min=4;
    * var max=5;
    * var random = Math.random() * (+max - +min) + +min;
    */
    var posicao_x, posicao_y;
    var max = 500;
    var min = 0;
    for (var i = 0; i < 4; i++){
        posicao_x = Math.floor(Math.random() * (+max - +min) + +min);
        posicao_y = Math.floor(Math.random() * (+max - +min) + +min);
        novoZumbi('z' + i, posicao_x, posicao_y);
    }
    setInterval(AtualizarJogo,1);
};

main();