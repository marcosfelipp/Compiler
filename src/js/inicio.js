var tabela_de_transicao = []
var tabela_de_simbolos = {}

tabela_de_transicao[[0, 1]] = 1;

tabela_de_transicao[[1, 1]] = 1; //Aceitacao
tabela_de_transicao[[1, 2]] = 2
tabela_de_transicao[[1, 3]] = 4

tabela_de_transicao[[2, 1]] = 3

tabela_de_transicao[[3, 1]] = 3 //Aceitacao
tabela_de_transicao[[3, 3]] = 4

tabela_de_transicao[[4, 1]] = 6
tabela_de_transicao[[4, 4]] = 5

tabela_de_transicao[[5, 1]] = 6

tabela_de_transicao[[6, 1]] = 6 //Aceitacao

//Transições para literal
tabela_de_transicao[[0, 5]] = 7
tabela_de_transicao[[7, 5]] = 8 //Aceitacao

//Transições para identificador
tabela_de_transicao[[0, 0]] = 9 //Aceitacao
tabela_de_transicao[[9, 0]] = 9 //Aceitacao
tabela_de_transicao[[9, 1]] = 9 //Aceitacao
tabela_de_transicao[[9, 6]] = 9 //Aceitacao

//Transições para comentario
tabela_de_transicao[[0, 7]] = 10
tabela_de_transicao[[10, 8]] = 11 //Aceitacao

//Transições para Operadores Relacionais < 13, > 14, = 15
tabela_de_transicao[[0, 13]] = 14  //Aceitação
tabela_de_transicao[[0, 15]] = 18  //Aceitação
tabela_de_transicao[[14, 14]] = 15  //Aceitação
tabela_de_transicao[[0, 14]] = 16  //Aceitação
tabela_de_transicao[[14, 15]] = 17  //Aceitação
tabela_de_transicao[[16, 15]] = 17  //Aceitação

//Transições para Atribuições
tabela_de_transicao[[0, 13]] = 14  //Aceitação
tabela_de_transicao[[14, 4]] = 19  //Aceitação

//Transições para Operadores Aritméticos (+,-,*,/)
tabela_de_transicao[[0, 4]] = 20  //Aceitação

//Transições para Abre parenteses
tabela_de_transicao[[0, 16]] = 21  //Aceitação

//Transições para fecha parenteses
tabela_de_transicao[[0, 17]] = 22  //Aceitação

//Transições para ponto e vírgula (;)
tabela_de_transicao[[0, 18]] = 23  //Aceitação

var alphabet = ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");
var numbers = ("0123456789")

var dic = {}
var output;

for (i in alphabet) {
    dic[alphabet[i]] = 0
}

for (i in numbers) {
    dic[numbers[i]] = 1
}

dic['.'] = 2
dic['^'] = 3
dic['+'] = 4
dic['-'] = 4
dic['*'] = 4
dic['/'] = 4
dic['\"'] = 5
dic['_'] = 6
dic['{'] = 7
dic['}'] = 8
dic[' '] = 11
dic['<'] = 13
dic['>'] = 14
dic['='] = 15
dic['('] = 16
dic[')'] = 17
dic[';'] = 18

const final_states = {
    1: 'num',
    3: 'num',
    6: 'num',
    8: 'Literal',
    9: 'id',
    11: 'Comentário',
    12: 'Tab|Salto|Espaço',
    13: 'EOF',
    14: 'OPR',
    15: 'OPR',
    16: 'OPR',
    17: 'OPR',
    18: 'OPR',
    19: 'RCB',
    20: 'OPM',
    21: 'AB_P',
    22: 'FC_P',
    23: 'PT_V'
}