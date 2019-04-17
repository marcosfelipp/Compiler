function readFile(that) {
    if (that.files && that.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var output = e.target.result;
            var output = output.split("\n");
            
            for(i in output){
                insert_table([output[i], output[i], "-"])
            }
            
        };
        reader.readAsText(that.files[0]);
    }
}

function automato(string_lida){
    var tabela_de_transicao = []

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

    if(state == 1){
        return [string_lida, "num", "-"]
    }

}
console.log(automato("<-"))

// Ler simbolo por simbolo
// Enquanto rejeitar, rejeite
// Se aceitar, armazene a tupla e continue
//      Se aceitar, armazene a tupla e continue
//      Se rejeitar, adicione na tabela e volte um simbolo e continue

tabela_de_simbolos = {}


function insert_table(tupla){
    tabela_de_simbolos[tupla[0]] = [tupla[0], tupla[1], tupla[2]]
}

