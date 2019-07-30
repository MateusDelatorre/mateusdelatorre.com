var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';
var width = 500;
var height = 500;
var jogador = {
    x : 50,
    spdX : 4,
    y : 40,
    spdY : 4,
    name : 'P',
};
var zumbi = {};
var listaDeZumbi = {};

obterDistanciaEntreDoisobjetos = function (objeto1, objeto2) {
    var vx = objeto1.x - objeto2.x;
    var vy = objeto1.y - objeto2.y;
    return Math.sqrt(vx*vx+vy*vy);
}

isColidindo = function (objeto1, objeto2) {
    var distance = obterDistanciaEntreDoisobjetos(objeto1, objeto2);
    return distance < 30;
}

desenha = function (objeto) {
    ctx.fillRect(objeto.x,objeto.y, 20, 20);
}

objetoIsDentroDaTela = function (objeto) {
    objeto.x += objeto.spdX;
    objeto.y += objeto.spdY;
    if(objeto.x >= width || objeto.x < 0){
        objeto.spdX *= -1;
    }else if(objeto.y >= height || objeto.y < 0){
        objeto.spdY *= -1;
    }
}


AtualizarObjeto = function (objeto) {
    objetoIsDentroDaTela(objeto);
    desenha(objeto);
}

AtualizarJogo = function (){
    ctx.clearRect(0,0, width, height);
    AtualizarObjeto(jogador);
    for (var key in listaDeZumbi){
        AtualizarObjeto(listaDeZumbi[key]);
        var isColliding = isColidindo(jogador,listaDeZumbi[key]);
        if(isColliding){
            console.log('Colliding!');
        }
    }

}

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
}

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
}
main();