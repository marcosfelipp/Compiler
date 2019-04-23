function readFile(that) {
    if (that.files && that.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var output = e.target.result;
            var output = output.split("\n");

            for (i in output) {
                inserir_tabela_simbolo([output[i], output[i], "-"])
            }

        };
        reader.readAsText(that.files[0]);
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
dic['\t'] = 9
dic['\n'] = 10
dic[' '] = 11
dic['$'] = 12 // TODO: Fim de arquivo, ver posteriormente
dic['<'] = 13
dic['>'] = 14
dic['='] = 15
dic['('] = 16
dic[')'] = 17
dic[';'] = 18

var tabela_de_transicao = []

// TODO: Adicionar outros símobolos

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

//Transições para identificador
tabela_de_transicao[[0, 7]] = 10
tabela_de_transicao[[10, 8]] = 11 //Aceitacao

//Transições para Tab, Salto e Espaço, reconhecer, mas ignorar
tabela_de_transicao[[0, 9]] = 12  //Aceitacao
tabela_de_transicao[[0, 10]] = 12 //Aceitacao
tabela_de_transicao[[0, 11]] = 12 //Aceitacao

//Transições EOF
tabela_de_transicao[[0, 12]] = 13  //Aceitacao

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

            state = tabela_de_transicao[[state, dic[string_lida[i - 1]]]]
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
    }
    else {
        return [string_lida, "ERRO", "-"]
    }
}

console.log(automato(';'))

function inserir_tabela_simbolo(tupla) {
    tabela_de_simbolos[tupla[0]] = [tupla[0], tupla[1], tupla[2]]
}

// ALORITMO:
// Ler simbolo por simbolo
// Enquanto rejeitar, rejeite
// Se aceitar, armazene a tupla e continue
// Se aceitar novamente, armazene a tupla e continue
// Se rejeitar, adicione na tabela e volte um simbolo e continue

function addLexemas(line) {
    i = 0
    lex = ''

    while (line[i] != '\n') {
        lex += line[i]

        // TODO: Verificar se string já se encontra na tabela de simbolos

        retorno = automato(lex)
        console.log(retorno)

        if (retorno[1] != "ERRO" && line[i + 1] == " ") {
            inserir_tabela_simbolo(retorno)
            lex = ''
            i += 2
            continue
        }

        if (retorno[1] != "ERRO" && line[i + 1] == "\n") {
            inserir_tabela_simbolo(retorno)
            return
        }

        if (retorno[1] != "ERRO") {
            tupla_atual = retorno
            i += 1
            continue
        }
        if (retorno[1] == "ERRO" && lex != '') {
            inserir_tabela_simbolo(retorno)
            lex = ''
            i -= 1
            continue
        }
        if (line[i + 1] == '\n' && retorno[1] == "ERRO") {
            console.log("ERRO")
            return
        }

        if (retorno[1] == "ERRO" && line[i + 1] == " ") {
            console.log("ERRO ESPACO")
            return
        }

    }
}

tabela_de_simbolos = {}

// Fazer isso para cada linha do arquivo:
addLexemas('12345\n')

console.log(tabela_de_simbolos)


