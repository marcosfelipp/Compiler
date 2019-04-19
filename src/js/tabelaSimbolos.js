function readFile(that) {
    if (that.files && that.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var output = e.target.result;
            var output = output.split("\n");
            
            for(i in output){
                inserir_tabela_simbolo([output[i], output[i], "-"])
            }
            
        };
        reader.readAsText(that.files[0]);
    }
}

function automato(string_lida){
    var tabela_de_transicao = []

    // TODO: Adicionar outros símobolos
    var dic = {
        "a": 0,
        "b": 0,
        "c": 0,
        "d": 0,
        "e": 0,
        "f": 0,
        "g": 0,
        "h": 0,
        "i": 0,
        "j": 0,
        "k": 0,
        "l": 0,
        "m": 0,
        "n": 0,
        "o": 0,
        "p": 0,
        "q": 0,
        "r": 0,
        "s": 0,
        "t": 0,
        "u": 0,
        "v": 0,
        "w": 0,
        "x": 0,
        "y": 0,
        "z": 0,
        "1": 1,
        "2": 1,
        "3": 1,
        "4": 1,
        "5": 1,
        "6": 1,
        "7": 1,
        "8": 1,
        "9": 1,
        "0": 1,
        ".": 2,
        "^": 3,
        "+": 4,
        "-": 4
    }

    // TODO: Adicionar as outras transições:

    tabela_de_transicao[[0,0]] = -1;
    tabela_de_transicao[[0,1]] = 1;

    tabela_de_transicao[[1,0]] = -1;
    tabela_de_transicao[[1,1]] = 1; //Aceitacao
    tabela_de_transicao[[1,2]] = 2

    tabela_de_transicao[[2,0]] = -1
    tabela_de_transicao[[2,1]] = 3

    tabela_de_transicao[[3,0]] = -1
    tabela_de_transicao[[3,1]] = 3 //Aceitacao
    tabela_de_transicao[[3,2]] = -1 //Rejeicao
    tabela_de_transicao[[3,3]] = 4

    tabela_de_transicao[[4,0]] = -1
    tabela_de_transicao[[4,1]] = 6
    tabela_de_transicao[[4,2]] = -1
    tabela_de_transicao[[4,3]] = -1
    tabela_de_transicao[[4,4]] = 5

    tabela_de_transicao[[5,0]] = -1
    tabela_de_transicao[[5,1]] = 6

    tabela_de_transicao[[6,0]] = -1
    tabela_de_transicao[[6,1]] = 6 //Aceitacao

    var i = 0
    var state = 0
    while(string_lida[i] != undefined && state != -1){
        state = tabela_de_transicao[[state,dic[string_lida[i]]]]
        console.log(state);
        i += 1;
    }

    if(state == 1 || state == 3 || state == 6){
        return [string_lida, "num", "-"]
    }
    else{
        return [string_lida, "ERRO", "-"]
    }



}

function inserir_tabela_simbolo(tupla){
    tabela_de_simbolos[tupla[0]] = [tupla[0], tupla[1], tupla[2]]
}

// ALORITMO:
// Ler simbolo por simbolo
// Enquanto rejeitar, rejeite
// Se aceitar, armazene a tupla e continue
// Se aceitar novamente, armazene a tupla e continue
// Se rejeitar, adicione na tabela e volte um simbolo e continue

function addLexemas(line){
    i = 0
    lex = ''

    while(line[i] != '\n'){
        lex += line[i]

        // TODO: Verificar se string já se encontra na tabela de simbolos

        retorno = automato(lex)
        console.log(retorno)

        if(retorno[1] != "ERRO" && line[i+1] == " "){
            inserir_tabela_simbolo(retorno)
            lex = ''
            i+=2
            continue
        }

        if(retorno[1] != "ERRO" && line[i+1] == "\n"){
            inserir_tabela_simbolo(retorno)
            return
        }

        if(retorno[1] != "ERRO"){
            tupla_atual = retorno
            i+=1
            continue
        }
        if(retorno[1] == "ERRO" && lex != ''){
            inserir_tabela_simbolo(retorno)
            lex = ''
            i-=1
            continue
        }
        if(line[i+1] == '\n' && retorno[1] == "ERRO"){
            console.log("ERRO")
            return
        }

        if(retorno[1] == "ERRO" && line[i+1] == " "){
            console.log("ERRO ESPACO")
            return
        }
         
    }
}


tabela_de_simbolos = {}

// Fazer isso para cada linha do arquivo:
addLexemas('12345\n')


console.log(tabela_de_simbolos)
