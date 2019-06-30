function readProg(that) {
    if (that.files && that.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            string_lida = e.target.result + '$';
        };
        reader.readAsText(that.files[0]);
    }
}

/* Inserindo tuplas na tabela de visualização */
function inserir_tabela_view(tupla) {
    var table = document.getElementById('table-tokens')
    var row = document.createElement('tr');
    var cell_lexema = document.createElement('td');
    var cell_token = document.createElement('td');
    var cell_tipo = document.createElement('td');

    cell_lexema.innerText = tupla[0];
    cell_token.innerText = tupla[1];
    cell_tipo.innerText = tupla[2];
    row.appendChild(cell_lexema);
    row.appendChild(cell_token);
    row.appendChild(cell_tipo);
    table.tBodies[0].appendChild(row);

    /* Inserindo também na tabela de simbolos geral */
    if (tupla[1] != 'Num' && tupla[1] != 'Literal' && tupla[1] != 'id') {
        tabela_de_simbolos_geral[tupla[0]] = [tupla[0], tupla[1], tupla[2]]
    }
}

/* Movimentar barra de progresso e mostrar a tabela de tokens gerada */
function compilar() {

    recomple()

    var element = document.getElementById("myprogressBar");
    var width = 1;
    var identity = setInterval(scene, 25);
    function scene() {
        if (width >= 100) {
            clearInterval(identity);
            analiseLR()

            console.log(tabela_de_simbolos);
        } else {
            width++;
            element.style.width = width + '%';
            element.innerText = width + '%';
        }
    }

}

// Zera variáveis quando for recompilar
function recomple() {
    // limpar o conteúdo do log de erros sempre que clicar em compilar
    document.getElementById('log_erro').value = ''
    document.getElementById('table-token-body').innerText = ''
    document.getElementById('log_producoes').value = ''

    pos_ponteiro = 0
}

function log_erros(erro) {
    texto = document.getElementById("log_erro").value
    texto += erro + " na linha " + linha + "\n"
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
        } else {
            if (dic[string_lida[i]] == undefined && string_lida[i] != "\n" && string_lida[i] != "$") {
                log_erros("ERRO LEXICO " + string_lida[i])
            }
        }

        i += 1;
    }

    return [string_lida, final_states[state], verifica_tipo(string_lida, final_states[state])]

}

function verifica_tipo(lexema, token) {

    if (token == 'OPR' || token == 'OPM') {
        return lexema
    } else if (token == 'RCB') {
        return '='
    } else if (token == 'Num') {

        if(lexema % 1 === 0){
            return 'int'
        }else{
            return 'double'
        }
    }
    else {
        return token
    }
}


function inserir_tabela_simbolo(tupla) {
    tabela_de_simbolos[tupla[0]] = [tupla[0], tupla[1], tupla[2]]
}

inserir_tabela_simbolo(["inicio", "inicio", "-"])
inserir_tabela_simbolo(["varinicio", "varinicio", "-"])
inserir_tabela_simbolo(["varfim", "varfim", "-"])
inserir_tabela_simbolo(["escreva", "escreva", "-"])
inserir_tabela_simbolo(["leia", "leia", "-"])
inserir_tabela_simbolo(["se", "se", "-"])
inserir_tabela_simbolo(["entao", "entao", "-"])
inserir_tabela_simbolo(["fimse", "fimse", "-"])
inserir_tabela_simbolo(["fim", "fim", "-"])
inserir_tabela_simbolo(["inteiro", "inteiro", "int"])
inserir_tabela_simbolo(["lit", "lit", "literal"])
inserir_tabela_simbolo(["real", "real", "double"])
inserir_tabela_simbolo(["enquanto", "enquanto", "-"])
inserir_tabela_simbolo(["faca", "faca", "-"])
inserir_tabela_simbolo(["fimenquanto", "fimenquanto", "-"])