function removeElementoPilha() {

}

function insereElementoPilha() {

}

function proximoToken() {
    lex = ''
    tupla_atual = []

    while (true) {
        if (string_lida[pos_ponteiro] == '$') {
            return 'FIM'
        }

        lex += string_lida[pos_ponteiro]

        if (lex == ' ' || lex == '\t' || lex == '\n') {
            lex = ''
            tupla_atual = []
            pos_ponteiro += 1
            continue
        }

        // Símbolos que já estão na tabela de simbolos:
        if (tabela_de_simbolos[lex] != undefined) {
            // Verificar se proximo simbolo forma um id:
            retorno = automato(lex + string_lida[pos_ponteiro + 1])

            if (retorno[1] == 'id') {
                pos_ponteiro += 1
                continue
            } else {
                inserir_tabela_view(tabela_de_simbolos[lex])
                pos_ponteiro += 1
                return retorno
            }
        }

        retorno = automato(lex)

        // Tratamento para numeros seguidos de '.' ou '^':
        if (retorno[1] == 'Num') {
            if (string_lida[pos_ponteiro + 1] == '.' || string_lida[pos_ponteiro + 1] == '^') {
                lex += string_lida[pos_ponteiro + 1]
                pos_ponteiro += 2
                continue
            }
        }

        if (retorno[1] != undefined) {
            tupla_atual = retorno
            if (string_lida[pos_ponteiro + 1] == ' ' ||
                string_lida[pos_ponteiro + 1] == '\n' ||
                string_lida[pos_ponteiro + 1] == '\t') {

                if (tupla_atual[1] == 'id') {
                    inserir_tabela_simbolo(tupla_atual)
                    inserir_tabela_view(tupla_atual)
                } else {
                    inserir_tabela_view(tupla_atual)
                }
                pos_ponteiro += 2
                return retorno
            }
            pos_ponteiro += 1
            continue
        }

        if (retorno[1] == undefined) {
            if (tupla_atual.length != 0) {
                //Se o lexema nao existir na tabela e for identificador, inserir e mostrar
                if (tupla_atual[1] == 'id') {
                    inserir_tabela_simbolo(tupla_atual)
                } else {
                    inserir_tabela_view(tupla_atual)
                }
                return tupla_atual
            }
            else {
                if (string_lida[i + 1] == ' ' && lex[0] != '\"') {
                    pos_ponteiro += 2
                    return 'EROO'
                }
                if (string_lida[i + 1] == '\r') {
                    return 'EROO'
                }
                i += 1
            }
        }

    }
}

// function analiseLR(programa){
//     a = proximoToken()
//     while(1){
//         s = removeElementoPilha()
//         if(ACTION[s,a] == 'shift t'){
//             insereElementoPilha(t)
//             a = proximoToken()
//         }else if(ACTION[s,a] == 'reduce A->B'){
//             // Desempilhar simbolos |B| da pilha
//             // Faça estado t ser o topo da pilha
//             insereElementoPilha()

//         }

//     }
// }