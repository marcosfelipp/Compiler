function readProg(that) {
    if (that.files && that.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var output = e.target.result;
            var output = output.split("\n");

            for (linha in output) {
                // console.log(output[i])
                addLexemas(output[linha] + '\r', linha)
            }
            //console.log(tabela_de_simbolos)
            log_simbolos()
        };
        reader.readAsText(that.files[0]);
    }
}

function log_simbolos() {
    texto = ''
    for (simbolo in tabela_de_simbolos) {
        texto += "Lexema: " + tabela_de_simbolos[simbolo][0] + '\t' + "token: " + tabela_de_simbolos[simbolo][1] + '\t' + "tipo: " + tabela_de_simbolos[simbolo][2]
        texto += '\n'
    }
    document.getElementById("token").value = texto
}

function log_erros(linha, coluna){
    texto = document.getElementById("log_erro").value
    texto += "ERRO NA LINHA " + linha + ", COLUNA " + coluna + '\n'

    document.getElementById("log_erro").value = texto
}

function automato(string_lida) {

    var i = 0
    var state = 0

    while (string_lida[i] != undefined && state != undefined) {

        state = tabela_de_transicao[[state, dic[string_lida[i]]]]

        //Tratamento para Literal (7) e para comentarios (10)
        if (state == 7 || state == 10) {

            while (string_lida[i] != undefined) {
                i++
            }

            //Se caracter final da string_lida for o abre aspas, então ERRO, caso contrário es
            i - 1 == 0 ? state = undefined : state = tabela_de_transicao[[state, dic[string_lida[i - 1]]]]

            if (state != 8 && state != 11) {
                state = undefined
            }
        }

        i += 1;
    }

    if (state == 1 || state == 3 || state == 6) {
        return [string_lida, "Num", "-"]
    }
    else if (state == 8) {
        return [string_lida, "Literal", "-"]
    }
    else if (state == 9) {
        return [string_lida, "id", "-"]
    }
    else if (state == 11) {
        return [string_lida, "Comentário", "-"]
    }
    else if (state == 12) {
        return [string_lida, "Tab|Salto|Espaço", "-"]
    }
    else if (state == 13) {
        return [string_lida, "EOF", "-"]
    }
    else if (state == 14 || state == 15 || state == 16 || state == 17 || state == 18) {
        return [string_lida, "OPR", "-"]
    }
    else if (state == 19) {
        return [string_lida, "RCB", "-"]
    }
    else if (state == 20) {
        return [string_lida, "OPM", "-"]
    }
    else if (state == 21) {
        return [string_lida, "AB_P", "-"]
    }
    else if (state == 22) {
        return [string_lida, "FC_P", "-"]
    }
    else if (state == 23) {
        return [string_lida, "PT_V", "-"]
    }else {
        return [string_lida, "ERRO", "-"]
    }
}

function inserir_tabela_simbolo(tupla) {
    tabela_de_simbolos[tupla[0]] = [tupla[0], tupla[1], tupla[2]]
}

function addLexemas(strig_lida, linha) {

    i = 0
    lex = ''
    tupla_atual = []
    while (strig_lida[i] != '\r') {
        lex += strig_lida[i]

        // Verifica se está na tabela de simbolos:
        if (tabela_de_simbolos[lex] != undefined) {
            //console.log('já está na tabela')
            if (strig_lida[i+1] == ' '){
                lex = ''
                i += 2
                continue
            }
            if(strig_lida[i+1] == '\r'){
                return
            }
            // Porem pode ser um id:
            retorno = automato(lex + strig_lida[i + 1])
            //console.log(retorno)
            if (retorno[1] != 'id') {
                lex = ''
                i += 1
                continue
            } else {
                i += 1
                continue
            }

        }

        retorno = automato(lex)

        if (retorno[1] != "ERRO") {
            tupla_atual = retorno
            if (strig_lida[i + 1] == " ") {
                inserir_tabela_simbolo(tupla_atual)
                tupla_atual = []
                lex = ''
                i += 2
                continue
            } if (strig_lida[i + 1] == '\r') {
                inserir_tabela_simbolo(tupla_atual)
                tupla_atual = []
                return
            }
            i += 1
            continue
        }
        
        if (retorno[1] == "ERRO") {
            if (tupla_atual.length != 0) {
                inserir_tabela_simbolo(tupla_atual)
                tupla_atual = []
                lex = ''
            } else {
                if(strig_lida[i+1] == ' ' && lex[0] != '\"'){
                    log_erros(linha, i)
                    lex = ''
                    i += 2
                    continue
                }   
                if(strig_lida[i+1] == '\r'){
                    log_erros(linha, i)
                    return
                }
                i+=1
            }
        }

    }
}

var alphabet = ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");
var numbers = ("0123456789")
var dic = {}

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

var tabela_de_transicao = []

var tabela_de_simbolos = {}

//Transições para num
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

// Trocar posições com -1 para undefined ou seja nao colocar

inserir_tabela_simbolo(["inicio", "inicio", "-"])
inserir_tabela_simbolo(["varinicio", "varinicio", "-"])
inserir_tabela_simbolo(["varfim", "varfim", "-"])
inserir_tabela_simbolo(["escreva", "escreva", "-"])
inserir_tabela_simbolo(["leia", "leia", "-"])
inserir_tabela_simbolo(["se", "se", "-"])
inserir_tabela_simbolo(["entao", "entao", "-"])
inserir_tabela_simbolo(["fimse", "fimse", "-"])
inserir_tabela_simbolo(["fim", "fim", "-"])
inserir_tabela_simbolo(["inteiro", "inteiro", "-"])
inserir_tabela_simbolo(["lit", "lit", "-"])
inserir_tabela_simbolo(["real", "real", "-"])

console.log(tabela_de_simbolos)