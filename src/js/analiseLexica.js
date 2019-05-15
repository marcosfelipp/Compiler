function readProg(that) {
    if (that.files && that.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            output = e.target.result;
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
}

/* Movimentar barra de progresso e mostrar a tabela de tokens gerada */
function compilar() {

    // limpar o conteúdo do log de erros sempre que clicar em compilar
    document.getElementById('log_erro').value = ''

    var element = document.getElementById("myprogressBar");
    var width = 1;
    var identity = setInterval(scene, 25);
    function scene() {
        if (width >= 100) {
            clearInterval(identity);
            addLexemas(output)
            console.log(tabela_de_simbolos)
        } else {
            width++;
            element.style.width = width + '%';
            element.innerText = width + '%';
        }
    }

}

function log_erros(linha, coluna) {
    texto = document.getElementById("log_erro").value
    texto += "ERRO NA LINHA " + linha + ", COLUNA " + coluna + '\n'
    document.getElementById("log_erro").value = texto
}


function automato(string_lida) {
    var i = 0
    var state = 0

    while (string_lida[i] != undefined && state != undefined) {

        // Captura o erro de caractere invalido
        if (dic[string_lida[i]] == undefined){
            log_erros('1', '2')
        }

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
    
    

    return [string_lida, final_states[state], "-" ]

}


function inserir_tabela_simbolo(tupla) {
    tabela_de_simbolos[tupla[0]] = [tupla[0], tupla[1], tupla[2]]
}

function lexico(lexema) {
    return tabela_de_simbolos[lexema]
}

function addLexemas(string_lida) {

    i = 0
    lex = ''
    tupla_atual = []

    /* Ler espaços, tabulações e pular linha, porém ignorar */
    while (string_lida[i] != undefined) {
        lex += string_lida[i]

        if (lex == ' ' || lex == '\t' || lex == '\n') {

            lex = ''
            tupla_atual = []
            i += 1
            //inserir_tabela_view(retorno = automato(lex)) Verificar se é preciso mostrar na tela
            continue
        }

        /* Símbolos que já estão na tabela de simbolos */
        if (tabela_de_simbolos[lex] != undefined) {

            // Porem pode ser um id:
            retorno = automato(lex + string_lida[i + 1])
            //console.log(retorno)
            if (retorno[1] != 'id') {
                inserir_tabela_view(tabela_de_simbolos[lex])
                lex = ''
                tupla_atual = []
                i += 1
                continue
            } else {
                i += 1
                continue
            }
        }

        retorno = automato(lex)

        /* Tratamento para numeros seguidos de '.' ou '^' */
        if (retorno[1] == 'Num') {
            if (string_lida[i + 1] == '.' || string_lida[i + 1] == '^') {
                lex += string_lida[i + 1]
                i += 2
                continue
            }
        }

        if (retorno[1] != undefined) {
            tupla_atual = retorno
            if (string_lida[i + 1] == ' ' || string_lida[i + 1] == '\n'
                || string_lida[i + 1] == '\t') {

                //Se o lexema nao existir na tabela e for identificador, inserir e mostrar
                if (tupla_atual[1] == 'id') {
                    inserir_tabela_simbolo(tupla_atual)
                    inserir_tabela_view(tupla_atual)
                    //mostrar o que foi inserido
                } else { // Caso seja diferente de indentificador so mostrar na tela
                    inserir_tabela_view(tupla_atual)
                }

                tupla_atual = []
                lex = ''
                i += 2
                continue
            }
            i += 1
            continue
        }

        if (retorno[1] == undefined) {
            if (tupla_atual.length != 0) {

                //Se o lexema nao existir na tabela e for identificador, inserir e mostrar
                if (tupla_atual[1] == 'id') {
                    inserir_tabela_simbolo(tupla_atual)
                    //mostrar o que foi inserido
                } else { // Caso seja diferente de indentificador so mostrar na tela
                    inserir_tabela_view(tupla_atual)
                }

                tupla_atual = []
                lex = ''

            } else { //todo olhar a respota com erros
                if (string_lida[i + 1] == ' ' && lex[0] != '\"') {
                    log_erros(linha, i)
                    lex = ''
                    i += 2
                    continue
                }
                if (string_lida[i + 1] == '\r') {
                    //log_erros(linha, i)
                    return
                }
                i += 1
            }
        }

    }
}


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