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

function proximoToken() {
    lex = ''
    tupla_atual = []

    while (true) {
        if (string_lida[pos_ponteiro] == '$') {
            return ["$", "$", "-"]
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
                /* Precisa fazer o retorno pegar a tupla direto da tabela sintatica
                no caso de palavras reservadas para o campo token nao ser nulo */
                retorno = tabela_de_simbolos[lex]
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
                // Se o lexema nao existir na tabela e for identificador, inserir e mostrar
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
                pos_ponteiro += 1
            }
        }

    }
}

function analiseLR() {

    insereElementoPilha(0)
    a = proximoToken()
    antigo_a = undefined

    while (1) {
        
        s = topoPilha()
        acao = tabela_sintatica[[s, a[1]]] 
        
        if(acao != undefined){
            if (acao.indexOf('S') != -1) {
                insereElementoPilha(parseInt(acao.split('S')[1]))
                // Tratamento de recuperação da análise sintatica:
                a = antigo_a == undefined ? proximoToken() : antigo_a 
                antigo_a = undefined
            
            } else if (acao.indexOf('R') != -1) {
    
                numero_regra = acao.split('R')[1]
                tamanho_producao = producoes_gramatica[numero_regra].length - 1
    
                // Desempilhar simbolos |B| da pilha
                for(i=0; i< tamanho_producao; i++){
                    removeElementoPilha()
                }
                
                s = topoPilha()
    
                novo_estado = tabela_sintatica[[s, producoes_gramatica[numero_regra][0]]]
                insereElementoPilha(novo_estado)
                log_producoes(producoes_gramatica[numero_regra])
            
            } else if (acao == 'ACCEPT') {
                return
            }

        }else {
            // Tratamento e recuperação de erros
            antigo_a = a
            a = tabela_recuperacao_erros_sintaticos[s]

            log_erros(tabela_erros_sintaticos[s])
            
        }

    }
}

