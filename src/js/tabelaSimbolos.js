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
dic['\"'] = 5
dic['_'] = 6

var tabela_de_transicao = []

// TODO: Adicionar outros símobolos

//Transições para num
//tabela_de_transicao[[0, 0]] = -1;
tabela_de_transicao[[0, 1]] = 1;

//tabela_de_transicao[[1, 0]] = -1;
tabela_de_transicao[[1, 1]] = 1; //Aceitacao
tabela_de_transicao[[1, 2]] = 2
tabela_de_transicao[[1,3]] = 4

//tabela_de_transicao[[2, 0]] = -1
tabela_de_transicao[[2, 1]] = 3

//tabela_de_transicao[[3, 0]] = -1
tabela_de_transicao[[3, 1]] = 3 //Aceitacao
//tabela_de_transicao[[3, 2]] = -1 //Rejeicao
tabela_de_transicao[[3, 3]] = 4

//tabela_de_transicao[[4, 0]] = -1
tabela_de_transicao[[4, 1]] = 6
//tabela_de_transicao[[4, 2]] = -1
//tabela_de_transicao[[4, 3]] = -1
tabela_de_transicao[[4, 4]] = 5

//tabela_de_transicao[[5, 0]] = -1
tabela_de_transicao[[5, 1]] = 6

//tabela_de_transicao[[6, 0]] = -1
tabela_de_transicao[[6, 1]] = 6 //Aceitacao

//Transições para literal
tabela_de_transicao[[0, 5]] = 7
tabela_de_transicao[[7, 5]] = 0 //Aceitacao
    
//Transições para identificador
tabela_de_transicao[[0, 0]] = 8 //Aceitacao
tabela_de_transicao[[8, 0]] = 8 //Aceitacao
tabela_de_transicao[[8, 1]] = 8 //Aceitacao
tabela_de_transicao[[8, 6]] = 8 //Aceitacao
// Trocar posições com -1 para undefined ou seja nao colocar

function automato(string_lida) {

    var i = 0
    var state = 0
    var flag = false

    while (string_lida[i] != undefined && state != undefined) {

        state = tabela_de_transicao[[state,dic[string_lida[i]]]]
        console.log(state,dic[string_lida[i]])

        //Tratamento para Literal
        if (state == 7) {

            flag = true

            while (string_lida[i] != undefined) {
                i++
            }

            state = tabela_de_transicao[[state, dic[string_lida[i - 1]]]]
            if (state != 0) {
                state = -1
            }
        }

        i += 1;
    }

    if (state == 1 || state == 3 || state == 6) {
        return [string_lida, "num", "-"]
    }
    else if (state == 0 && flag == true) {
        return [string_lida, "literal", "-"]
    }
    else if (state == 8) {
        return [string_lida, "id", "-"]
    }
    else {
        return [string_lida, "ERRO", "-"]
    }
}


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

// var padrao_AZ = /^[a-zA-Z]*$/
// var padrao_09 = /^[0-9]*$/
// console.log(padrao_09.test('1232312746'))



