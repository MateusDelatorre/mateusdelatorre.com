var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';
var width = 500;
var height = 500;

//jogador variaveis
var jogador = {
    x : 50,
    spdX : 4,
    y : 40,
    spdY : 4,
    name : 'P',
};

var listaDeZumbi = {};

function obterDistanciaEntreDoisobjetos(objeto1, objeto2) {
    var vx = objeto1.x - objeto2.x;
    var vy = objeto1.y - objeto2.y;
    return Math.sqrt(vx*vx+vy*vy);
}

function isColidindo(objeto1, objeto2) {
    var distance = obterDistanciaEntreDoisobjetos(objeto1, objeto2);
    return distance < 30;
}

//zumbi variaveis
function novoZumbi(codigo, posicao_x, posicao_y) {

    var zumbi = {
        x : posicao_x,
        spdX : 1,
        y : posicao_y,
        spdY : 1,
        name : 'Z',
        id : codigo,
    };
    listaDeZumbi[codigo] = zumbi ;
}

function update(){
    ctx.clearRect(0,0, width, height);
    draw(jogador);
    for (var key in listaDeZumbi){
        draw(listaDeZumbi[key]);
    }
}

function draw(objeto) {
    objeto.x += objeto.spdX;
    objeto.y += objeto.spdY;
    if(objeto.x >= width || objeto.x < 0){
        objeto.spdX *= -1;
    }else if(objeto.y >= height || objeto.y < 0){
        objeto.spdY *= -1;
    }
    ctx.fillText(objeto.name,objeto.x,objeto.y);
    console.log(objeto.x);
}

function main() {
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
    setInterval(update,1);
}
main();