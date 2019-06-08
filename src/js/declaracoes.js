// ANALISADOR LÉXICO:
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

// COntrole de erros:

var linha = 0
var coluna = 0

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
    1: 'Num',
    3: 'Num',
    6: 'Num',
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

// ANALISADOR SINTÁTICO:
var pilha = []
var tabela_sintatica
var tabela_erros_sintaticos
var tabela_recuperacao_erros_sintaticos

pos_ponteiro = 0
string_lida = undefined

tabela_sintatica = {

    /* Estado 0 */
    [[0, 'P']]: 1,
    [[0, 'inicio']]: 'S2',

    /* Estado 1 */
    [[1, '$']]: 'ACCEPT',

    /* Estado 2 */
    [[2, 'V']]: 3,
    [[2, 'varinicio']]: 'S4',

    /* Estado 3 */
    [[3, 'A']]: 5,
    [[3, 'ES']]: 6,
    [[3, 'CMD']]: 7,
    [[3, 'COND']]: 8,
    [[3, 'ER']]: 9,
    [[3, 'fim']]: 'S10',
    [[3, 'leia']]: 'S11',
    [[3, 'escreva']]: 'S12',
    [[3, 'id']]: 'S13',
    [[3, 'CABEÇALHO']]: 14,
    [[3, 'enquanto']]: 'S15',
    [[3, 'se']]: 'S16',

    /* Estado 4 */
    [[4, 'LV']]: 17,
    [[4, 'D']]: 18,
    [[4, 'varfim']]: 'S19',
    [[4, 'id']]: 'S20',

    /* Estado 5 */
    [[5, 'inicio']]: 'S2',
    [[5, '$']]: 'R2',

    /* Estado 6 */
    [[6, 'A']]: 21,
    [[6, 'ES']]: 6,
    [[6, 'CMD']]: 7,
    [[6, 'COND']]: 8,
    [[6, 'ER']]: 9,
    [[6, 'fim']]: 'S10',
    [[6, 'leia']]: 'S11',
    [[6, 'escreva']]: 'S12',
    [[6, 'id']]: 'S13',
    [[6, 'CABEÇALHO']]: 14,
    [[6, 'enquanto']]: 'S15',
    [[6, 'se']]: 'S16',

    /* Estado 7 */
    [[7, 'A']]: 22,
    [[7, 'ES']]: 6,
    [[7, 'CMD']]: 7,
    [[7, 'COND']]: 8,
    [[7, 'ER']]: 9,
    [[7, 'fim']]: 'S10',
    [[7, 'leia']]: 'S11',
    [[7, 'escreva']]: 'S12',
    [[7, 'id']]: 'S13',
    [[7, 'CABEÇALHO']]: 14,
    [[7, 'enquanto']]: 'S15',
    [[7, 'se']]: 'S16',

    /* Estado 8 */
    [[8, 'A']]: 23,
    [[8, 'ES']]: 6,
    [[8, 'CMD']]: 7,
    [[8, 'COND']]: 8,
    [[8, 'ER']]: 9,
    [[8, 'fim']]: 'S10',
    [[8, 'leia']]: 'S11',
    [[8, 'escreva']]: 'S12',
    [[8, 'id']]: 'S13',
    [[8, 'CABEÇALHO']]: 14,
    [[8, 'enquanto']]: 'S15',
    [[8, 'se']]: 'S16',

    /* Estado 9 */
    [[9, 'A']]: 24,
    [[9, 'ES']]: 6,
    [[9, 'CMD']]: 7,
    [[9, 'COND']]: 8,
    [[9, 'ER']]: 9,
    [[9, 'fim']]: 'S10',
    [[9, 'leia']]: 'S11',
    [[9, 'escreva']]: 'S12',
    [[9, 'id']]: 'S13',
    [[9, 'CABEÇALHO']]: 14,
    [[9, 'enquanto']]: 'S15',
    [[9, 'se']]: 'S16',

    /* Estado 10 */
    [[10, '$']]: 'R30',

    /* Estado 11 */
    [[11, 'id']]: 'S25',

    /* Estado 12 */
    [[12, 'ARG']]: 26,
    [[12, 'Literal']]: 'S27',
    [[12, 'Num']]: 'S28',
    [[12, 'id']]: 'S29',

    /* Estado 13 */
    [[13, 'RCB']]: 'S30',

    /* Estado 14 */
    [[14, 'CORPO']]: 31,
    [[14, 'ES']]: 32,
    [[14, 'CMD']]: 33,
    [[14, 'COND']]: 34,
    [[14, 'ER']]: 35,
    [[14, 'fimse']]: 'S36',
    [[14, 'leia']]: 'S11',
    [[14, 'escreva']]: 'S12',
    [[14, 'id']]: 'S13',
    [[14, 'CABEÇALHO']]: 14,
    [[14, 'enquanto']]: 'S15',
    [[14, 'se']]: 'S16',

    /* Estado 15 */
    [[15, 'AB_P']]: 'S37',

    /* Estado 16 */
    [[16, 'AB_P']]: 'S38',

    /* Estado 17 */
    [[17, 'leia']]: 'R3',
    [[17, 'escreva']]: 'R3',
    [[17, 'id']]: 'R3',
    [[17, 'se']]: 'R3',
    [[17, 'fim']]: 'R3',
    [[17, 'enquanto']]: 'R3',

    /* Estado 18 */
    [[18, 'LV']]: 39,
    [[18, 'D']]: 18,
    [[18, 'varfim']]: 'S19',
    [[18, 'id']]: 'S20',

    /* Estado 19 */
    [[19, 'PT_V']]: 'S40',

    /* Estado 20 */
    [[20, 'TIPO']]: 41,
    [[20, 'inteiro']]: 'S42',
    [[20, 'real']]: 'S43',
    [[20, 'lit']]: 'S44',

    /* Estado 21 */
    [[21, '$']]: 'R10',

    /* Estado 22 */
    [[22, '$']]: 'R16',

    /* Estado 23 */
    [[23, '$']]: 'R22',

    /* Estado 24 */
    [[24, '$']]: 'R32',

    /* Estado 25 */
    [[25, 'PT_V']]: 'S45',

    /* Estado 26 */
    [[26, 'PT_V']]: 'S77',

    /* Estado 27 */
    [[27, 'PT_V']]: 'R13',

    /* Estado 28 */
    [[28, 'PT_V']]: 'R14',

    /* Estado 29 */
    [[29, 'PT_V']]: 'R15',

    /* Estado 30 */
    [[30, 'LD']]: 46,
    [[30, 'OPRD']]: 47,
    [[30, 'id']]: 'S48',
    [[30, 'Num']]: 'S49',

    /* Estado 31 */
    [[31, 'leia']]: 'R23',
    [[31, 'escreva']]: 'R23',
    [[31, 'id']]: 'R23',
    [[31, 'se']]: 'R23',
    [[31, 'fim']]: 'R23',
    [[31, 'enquanto']]: 'R23',
    [[31, 'fimse']]: 'R23',
    [[31, 'fimenquanto']]: 'R23',

    /* Estado 32 */
    [[32, 'CORPO']]: 50,
    [[32, 'ES']]: 32,
    [[32, 'CMD']]: 33,
    [[32, 'COND']]: 34,
    [[32, 'ER']]: 35,
    [[32, 'fimse']]: 'S36',
    [[32, 'leia']]: 'S11',
    [[32, 'escreva']]: 'S12',
    [[32, 'id']]: 'S13',
    [[32, 'CABEÇALHO']]: 14,
    [[32, 'enquanto']]: 'S15',
    [[32, 'se']]: 'S16',

    /* Estado 33 */
    [[33, 'CORPO']]: 51,
    [[33, 'ES']]: 32,
    [[33, 'CMD']]: 33,
    [[33, 'COND']]: 34,
    [[33, 'ER']]: 35,
    [[33, 'fimse']]: 'S36',
    [[33, 'leia']]: 'S11',
    [[33, 'escreva']]: 'S12',
    [[33, 'id']]: 'S13',
    [[33, 'CABEÇALHO']]: 14,
    [[33, 'enquanto']]: 'S15',
    [[33, 'se']]: 'S16',

    /* Estado 34 */
    [[34, 'CORPO']]: 52,
    [[34, 'ES']]: 32,
    [[34, 'CMD']]: 33,
    [[34, 'COND']]: 34,
    [[34, 'ER']]: 35,
    [[34, 'fimse']]: 'S36',
    [[34, 'leia']]: 'S11',
    [[34, 'escreva']]: 'S12',
    [[34, 'id']]: 'S13',
    [[34, 'CABEÇALHO']]: 14,
    [[34, 'enquanto']]: 'S15',
    [[34, 'se']]: 'S16',

    /* Estado 35 */
    [[35, 'CORPO']]: 53,
    [[35, 'ES']]: 32,
    [[35, 'CMD']]: 33,
    [[35, 'COND']]: 34,
    [[35, 'ER']]: 35,
    [[35, 'fimse']]: 'S36',
    [[35, 'leia']]: 'S11',
    [[35, 'escreva']]: 'S12',
    [[35, 'id']]: 'S13',
    [[35, 'CABEÇALHO']]: 14,
    [[35, 'enquanto']]: 'S15',
    [[35, 'se']]: 'S16',

    /* Estado 36 */
    [[36, 'leia']]: 'R29',
    [[36, 'escreva']]: 'R29',
    [[36, 'id']]: 'R29',
    [[36, 'se']]: 'R29',
    [[36, 'fim']]: 'R29',
    [[36, 'enquanto']]: 'R29',
    [[36, 'fimse']]: 'R29',
    [[36, 'fimenquanto']]: 'R29',

    /* Estado 37 */
    [[37, 'EXP_R']]: 54,
    [[37, 'OPRD']]: 55,
    [[37, 'id']]: 'S48',
    [[37, 'Num']]: 'S49',

    /* Estado 38 */
    [[38, 'EXP_R']]: 56,
    [[38, 'OPRD']]: 55,
    [[38, 'id']]: 'S48',
    [[38, 'Num']]: 'S49',

    /* Estado 39 */
    [[39, 'leia']]: 'R4',
    [[39, 'escreva']]: 'R4',
    [[39, 'id']]: 'R4',
    [[39, 'se']]: 'R4',
    [[39, 'fim']]: 'R4',
    [[39, 'enquanto']]: 'R4',

    /* Estado 40 */
    [[40, 'leia']]: 'R5',
    [[40, 'escreva']]: 'R5',
    [[40, 'id']]: 'R5',
    [[40, 'se']]: 'R5',
    [[40, 'fim']]: 'R5',
    [[40, 'enquanto']]: 'R5',

    /* Estado 41 */
    [[41, 'PT_V']]: 'S57',

    /* Estado 42 */
    [[42, 'PT_V']]: 'R7',

    /* Estado 43 */
    [[43, 'PT_V']]: 'R8',

    /* Estado 44 */
    [[44, 'PT_V']]: 'R9',

    /* Estado 45 */
    [[45, 'leia']]: 'R11',
    [[45, 'escreva']]: 'R11',
    [[45, 'id']]: 'R11',
    [[45, 'se']]: 'R11',
    [[45, 'fim']]: 'R11',
    [[45, 'enquanto']]: 'R11',

    /* Estado 46 */
    [[46, 'PT_V']]: 'S58',

    /* Estado 47 */
    [[47, 'OPM']]: 'S59',
    [[47, 'PT_V']]: 'R19',

    /* Estado 48 */
    [[48, 'PT_V']]: 'R20',
    [[48, 'FC_V']]: 'R20',
    [[48, 'OPM']]: 'R20',
    [[48, 'OPR']]: 'R20',

    /* Estado 49 */
    [[49, 'PT_V']]: 'R21',
    [[49, 'FC_P']]: 'R21',
    [[49, 'OPM']]: 'R21',
    [[49, 'OPR']]: 'R21',

    /* Estado 50 */
    [[50, 'leia']]: 'R26',
    [[50, 'escreva']]: 'R26',
    [[50, 'id']]: 'R26',
    [[50, 'se']]: 'R26',
    [[50, 'fim']]: 'R26',
    [[50, 'enquanto']]: 'R26',
    [[50, 'fimse']]: 'R26',
    [[50, 'fimenquanto']]: 'R26',

    /* Estado 51 */
    [[51, 'leia']]: 'R27',
    [[51, 'escreva']]: 'R27',
    [[51, 'id']]: 'R27',
    [[51, 'se']]: 'R27',
    [[51, 'fim']]: 'R27',
    [[51, 'enquanto']]: 'R27',
    [[51, 'fimse']]: 'R27',
    [[51, 'fimenquanto']]: 'R27',

    /* Estado 52 */
    [[52, 'leia']]: 'R28',
    [[52, 'escreva']]: 'R28',
    [[52, 'id']]: 'R28',
    [[52, 'se']]: 'R28',
    [[52, 'fim']]: 'R28',
    [[52, 'enquanto']]: 'R28',
    [[52, 'fimse']]: 'R28',
    [[52, 'fimenquanto']]: 'R28',

    /* Estado 53 */
    [[53, 'leia']]: 'R31',
    [[53, 'escreva']]: 'R31',
    [[53, 'id']]: 'R31',
    [[53, 'se']]: 'R31',
    [[53, 'fim']]: 'R31',
    [[53, 'enquanto']]: 'R31',
    [[53, 'fimse']]: 'R31',
    [[53, 'fimenquanto']]: 'R31',

    /* Estado 54 */
    [[54, 'FC_P']]: 'S60',

    /* Estado 55 */
    [[55, 'OPR']]: 'S61',

    /* Estado 56 */
    [[56, 'FC_P']]: 'S62',

    /* Estado 57 */
    [[57, 'id']]: 'R6',
    [[57, 'varfim']]: 'R6',

    /* Estado 58 */
    [[58, 'leia']]: 'R17',
    [[58, 'escreva']]: 'R17',
    [[58, 'id']]: 'R17',
    [[58, 'se']]: 'R17',
    [[58, 'fim']]: 'R17',
    [[58, 'enquanto']]: 'R17',
    [[58, 'fimse']]: 'R17',
    [[58, 'fimenquanto']]: 'R17',

    /* Estado 59 */
    [[59, 'OPRD']]: 63,
    [[59, 'id']]: 'S48',
    [[59, 'Num']]: 'S49',

    /* Estado 60 */
    [[60, 'faça']]: 'S64',

    /* Estado 61 */
    [[61, 'OPRD']]: 65,
    [[61, 'id']]: 'S48',
    [[61, 'Num']]: 'S49',

    /* Estado 62 */
    [[62, 'entao']]: 'S66',

    /* Estado 63 */
    [[63, 'PT_V']]: 'R18',

    /* Estado 64 */
    [[64, 'CORPO_ER']]: 67,
    [[64, 'ES']]: 68,
    [[64, 'CMD']]: 69,
    [[64, 'COND']]: 70,
    [[64, 'ER']]: 71,
    [[64, 'fimenquanto']]: 'S72',
    [[64, 'leia']]: 'S11',
    [[64, 'escreva']]: 'S12',
    [[64, 'id']]: 'S13',
    [[64, 'CABEÇALHO']]: 14,
    [[64, 'enquanto']]: 'S15',
    [[64, 'se']]: 'S16',

    /* Estado 65 */
    [[65, 'FC_P']]: 'R25',

    /* Estado 66 */
    [[66, 'leia']]: 'R24',
    [[66, 'escreva']]: 'R24',
    [[66, 'id']]: 'R24',
    [[66, 'se']]: 'R24',
    [[66, 'fimse']]: 'R24',
    [[66, 'enquanto']]: 'R24',

    /* Estado 67 */
    [[67, 'leia']]: 'R33',
    [[67, 'escreva']]: 'R33',
    [[67, 'id']]: 'R33',
    [[67, 'se']]: 'R33',
    [[67, 'fim']]: 'R33',
    [[67, 'enquanto']]: 'R33',
    [[67, 'fimse']]: 'R33',
    [[67, 'fimenquanto']]: 'R33',

    /* Estado 68 */
    [[68, 'CORPO_ER']]: 73,
    [[68, 'ES']]: 68,
    [[68, 'CMD']]: 69,
    [[68, 'COND']]: 70,
    [[68, 'ER']]: 71,
    [[68, 'fimenquanto']]: 'S72',
    [[68, 'leia']]: 'S11',
    [[68, 'escreva']]: 'S12',
    [[68, 'id']]: 'S13',
    [[68, 'CABEÇALHO']]: 14,
    [[68, 'enquanto']]: 'S15',
    [[68, 'se']]: 'S16',

    /* Estado 69 */
    [[69, 'CORPO_ER']]: 74,
    [[69, 'ES']]: 68,
    [[69, 'CMD']]: 69,
    [[69, 'COND']]: 70,
    [[69, 'ER']]: 71,
    [[69, 'fimenquanto']]: 'S72',
    [[69, 'leia']]: 'S11',
    [[69, 'escreva']]: 'S12',
    [[69, 'id']]: 'S13',
    [[69, 'CABEÇALHO']]: 14,
    [[69, 'enquanto']]: 'S15',
    [[69, 'se']]: 'S16',

    /* Estado 70 */
    [[70, 'CORPO_ER']]: 75,
    [[70, 'ES']]: 68,
    [[70, 'CMD']]: 69,
    [[70, 'COND']]: 70,
    [[70, 'ER']]: 71,
    [[70, 'fimenquanto']]: 'S72',
    [[70, 'leia']]: 'S11',
    [[70, 'escreva']]: 'S12',
    [[70, 'id']]: 'S13',
    [[70, 'CABEÇALHO']]: 14,
    [[70, 'enquanto']]: 'S15',
    [[70, 'se']]: 'S16',

    /* Estado 71 */
    [[71, 'CORPO_ER']]: 76,
    [[71, 'ES']]: 68,
    [[71, 'CMD']]: 69,
    [[71, 'COND']]: 70,
    [[71, 'ER']]: 71,
    [[71, 'fimenquanto']]: 'S72',
    [[71, 'leia']]: 'S11',
    [[71, 'escreva']]: 'S12',
    [[71, 'id']]: 'S13',
    [[71, 'CABEÇALHO']]: 14,
    [[71, 'enquanto']]: 'S15',
    [[71, 'se']]: 'S16',

    /* Estado 72 */
    [[72, 'leia']]: 'R38',
    [[72, 'escreva']]: 'R38',
    [[72, 'id']]: 'R38',
    [[72, 'se']]: 'R38',
    [[72, 'fim']]: 'R38',
    [[72, 'enquanto']]: 'R38',

    /* Estado 73 */
    [[73, 'leia']]: 'R34',
    [[73, 'escreva']]: 'R34',
    [[73, 'id']]: 'R34',
    [[73, 'se']]: 'R34',
    [[73, 'fim']]: 'R34',
    [[73, 'enquanto']]: 'R34',

    /* Estado 74 */
    [[74, 'leia']]: 'R35',
    [[74, 'escreva']]: 'R35',
    [[74, 'id']]: 'R35',
    [[74, 'se']]: 'R35',
    [[74, 'fim']]: 'R35',
    [[74, 'enquanto']]: 'R35',

    /* Estado 75 */
    [[75, 'leia']]: 'R36',
    [[75, 'escreva']]: 'R36',
    [[75, 'id']]: 'R36',
    [[75, 'se']]: 'R36',
    [[75, 'fim']]: 'R36',
    [[75, 'enquanto']]: 'R36',

    /* Estado 76 */
    [[76, 'leia']]: 'R37',
    [[76, 'escreva']]: 'R37',
    [[76, 'id']]: 'R37',
    [[76, 'se']]: 'R37',
    [[76, 'fim']]: 'R37',
    [[76, 'enquanto']]: 'R37',

    /* Estado 77 */
    [[77, 'leia']]: 'R12',
    [[77, 'escreva']]: 'R12',
    [[77, 'id']]: 'R12',
    [[77, 'se']]: 'R12',
    [[77, 'fim']]: 'R12',
    [[77, 'enquanto']]: 'R12',
    [[77, 'fimse']]: 'R12',
    [[77, 'fimenquanto']]: 'R12',
}

var producoes_gramatica = {

    1: ['P\'', 'P'],
    2: ['P', 'inicio', 'V', 'A'],
    3: ['V', 'varinicio', 'LV'],
    4: ['LV', 'D', 'LV'],
    5: ['LV', 'varfim', ';'],
    6: ['D', 'id', 'TIPO', ';'],
    7: ['TIPO', 'inteiro'],
    8: ['TIPO', 'real'],
    9: ['TIPO', 'lit'],
    10: ['A', 'ES', 'A'],
    11: ['ES', 'leia', 'id', ';'],
    12: ['ES', 'escreva', 'ARG', ';'],
    13: ['ARG', 'Literal'],
    14: ['ARG', 'num'],
    15: ['ARG', 'id'],
    16: ['A', 'CMD', 'A'],
    17: ['CMD', 'id', 'rcb', 'LD', ';'],
    18: ['LD', 'OPRD', 'opm', 'OPRD'],
    19: ['LD', 'OPRD'],
    20: ['OPRD', 'id'],
    21: ['OPRD', 'num'],
    22: ['A', 'COND', 'A'],
    23: ['COND', 'CABEÇALHO', 'CORPO'],
    24: ['CABEÇALHO', 'se', '(', 'EXP_R', ')', 'entao'],
    25: ['EXP_R', 'OPRD', 'opr', 'OPRD'],
    26: ['CORPO', 'ES', 'CORPO'],
    27: ['CORPO', 'CMD', 'CORPO'],
    28: ['CORPO', 'COND', 'CORPO'],
    29: ['CORPO', 'fimse'],
    30: ['A', 'fim'],
    31: ['CORPO', 'ER', 'CORPO'],
    32: ['A', 'ER', 'A'],
    33: ['ER', 'enquanto', '(', 'EXP_R', ')', 'faça', 'CORPO_ER'],
    34: ['CORPO_ER', 'ES', 'CORPO_ER'],
    35: ['CORPO_ER', 'CMD', 'CORPO_ER'],
    36: ['CORPO_ER', 'COND', 'CORPO_ER'],
    37: ['CORPO_ER', 'ER', 'CORPO_ER'],
    38: ['CORPO_ER', 'fimenquanto'],
}

tabela_erros_sintaticos = {
    0: "ERRO SINTÁTICO: Referência indefinida para 'inicio'",
    2: "ERRO SINTÁTICO: Referência indefinida para 'varinicio'",
    3: "ERRO SINTÁTICO: Referência indefinida para 'fim'",
    4: "ERRO SINTÁTICO: Declaração 'varfim' esperado",
    11: "ERRO SINTÁTICO: Identificador esperado apos 'leia'",
    12: "ERRO SINTÁTICO: Esperado literal, número ou identificador após escreva",
    13: "ERRO SINTÁTICO: Operador <- (atribuição) esperado após o identificador",
    15: "ERRO SINTÁTICO: Abre parênteses '(' esperado após enquanto",
    16: "ERRO SINTÁTICO: Abre parênteses '(' esperado após se",
    19: "ERRO SINTÁTICO: ';' esperado ao final da sentença",
    20: "ERRO SINTÁTICO: tipo de identificador não declarado",
    25: "ERRO SINTÁTICO: ';' esperado ao final da sentença",
    26: "ERRO SINTÁTICO: ';' esperado ao final da sentença",
    30: "ERRO SINTÁTICO: Identificador, número ou operação matemática esperada após o operador de atribuição (<-)",
    37: "ERRO SINTÁTICO: Operação lógica esperada dentro dos parênteses",
    38: "ERRO SINTÁTICO: Operação lógica esperada dentro dos parênteses",
    41: "ERRO SINTÁTICO: ';' esperado ao final da sentença",
    42: "ERRO SINTÁTICO: ';' esperado ao final da sentença",
    43: "ERRO SINTÁTICO: ';' esperado ao final da sentença",
    44: "ERRO SINTÁTICO: ';' esperado ao final da sentença",
    48: "ERRO SINTÁTICO: ';' esperado ao final da sentença",
    49: "ERRO SINTÁTICO: ';' esperado ao final da sentença",
    55: "ERRO SINTÁTICO: Sentença sem operador lógico", 
    56: "ERRO SINTÁTICO: Fecha parênteses ')' esperado na sentença",
    57: "ERRO SINTÁTICO: Declaração de variaveis ou 'varfim' esperados, porém não inseridos",
    59: "ERRO SINTÁTICO: Identificador ou número esperado depois de operação matemática",
    62: "ERRO SINTÁTICO: Palavra reservada 'entao' esperada no fim da sentença",

}

tabela_recuperacao_erros_sintaticos = {

    0: ['inicio', 'inicio', '-'],
    2: ['varinicio', 'varinicio', '-'],
    3: ['fim', 'fim', '-'],
    4: ['varfim', 'varfim', '-'],
    11: ['leia', 'leia', '-'],
    12: ['XXX', 'Literal', '-'],
    13: ['<-', 'RCB', '-'],
    15: ['(', 'AB_P', '-'],
    16: ['(', 'AB_P', '-'],
    19: [';', 'PT_V', '-'],
    20: ['inteiro','inteiro','-'],
    25: [';', 'PT_V', '-'],
    26: [';', 'PT_V', '-'],
    30: ['X', 'id', '-'],
    37: ['>', 'OPR', '-'],
    38: ['>', 'OPR', '-'],
    41: [';', 'PT_V', '-'],
    42: [';', 'PT_V', '-'],
    43: [';', 'PT_V', '-'],
    44: [';', 'PT_V', '-'],
    48: [';', 'PT_V', '-'],
    49: [';', 'PT_V', '-'],
    57: ['varfim', 'varfim', '-'],
    59: ['XXX', 'id', '-'],
    62: ['entao', 'entao', '-'],

}

// ANALISADOR SEMÂNTICO:

pilha_atributos = []



// FUNCOES GENERICAS:

function removeElementoPilha() {
    return pilha.pop()
}

function insereElementoPilha(elemento) {
    pilha.push(elemento)
}

function topoPilha() {
    return pilha[pilha.length - 1]
}

function log_producoes(producao) {
    texto = document.getElementById("log_producoes").value
    texto += producao[0] + " -> "
    
    for(i=1; i <producao.length; i++){
        texto += producao[i] + ' '
    }

    document.getElementById("log_producoes").value = texto + '\n'
}