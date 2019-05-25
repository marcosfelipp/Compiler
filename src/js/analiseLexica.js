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
}

/* Movimentar barra de progresso e mostrar a tabela de tokens gerada */
function compilar() {

    // limpar o conteúdo do log de erros sempre que clicar em compilar
    document.getElementById('log_erro').value = ''
    document.getElementById('table-token-body').innerText = ''
    
    recomple()
    
    var element = document.getElementById("myprogressBar");
    var width = 1;
    var identity = setInterval(scene, 25);
    function scene() {
        if (width >= 100) {
            clearInterval(identity);
            
            analiseLR()
            // Para testar funcionamento da função:
            // while(proximoToken() != 'FIM'){
            //     console.log(pos_ponteiro)
            // }
            
            console.log(tabela_de_simbolos);
        } else {
            width++;
            element.style.width = width + '%';
            element.innerText = width + '%';
        }
    }

}

// Zera variáveis quando for recompilar
function recomple(){
    pos_ponteiro = 0
}

function log_erros(linha, coluna, erro) {
    texto = document.getElementById("log_erro").value
    texto += "ERRO NA LINHA " + linha + ", COLUNA " + coluna + " " + erro + '\n' 
    document.getElementById("log_erro").value = texto
}


function automato(string_lida) {
    var i = 0
    var state = 0

    while (string_lida[i] != undefined && state != undefined) {

        // Captura o erro de caractere invalido
        if (dic[string_lida[i]] == undefined) {
            log_erros('1', '2', string_lida[i])
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

    return [string_lida, final_states[state], "-"]

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
inserir_tabela_simbolo(["inteiro", "inteiro", "-"])
inserir_tabela_simbolo(["lit", "lit", "-"])
inserir_tabela_simbolo(["real", "real", "-"])