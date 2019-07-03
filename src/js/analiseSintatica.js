function proximoToken() {
    lex = ''
    tupla_atual = []

    while (true) {
        if (string_lida[pos_ponteiro] == '$') {
            return ["$", "$", "-"]
        }

        lex += string_lida[pos_ponteiro]

        if (lex == ' ' || lex == '\t' || lex == '\n') {

            // Incremento de linha:
            if (lex == '\n') {
                linha += 1
            }

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

                // Setando tipos para palavras reservadas
                //tabela_de_simbolos[lex][2] = lex
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

                // Incremento de linha:
                if (string_lida[pos_ponteiro + 1] == '\n') {
                    linha += 1
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

    insereElementoPilha(pilha_estados, 0)
    a = proximoToken()

    antigo_a = undefined

    while (1) {

        s = topoPilha(pilha_estados)
        acao = tabela_sintatica[[s, a[1]]]

        if (acao != undefined) {
            if (acao.indexOf('S') != -1) {

                insereElementoPilha(pilha_estados, parseInt(acao.split('S')[1]))
                insereElementoPilha(pilha_atributos, a[0])

                // Tratamento de recuperação da análise sintatica:
                a = antigo_a == undefined ? proximoToken() : antigo_a
                antigo_a = undefined

            } else if (acao.indexOf('R') != -1) {

                numero_regra = acao.split('R')[1]
                tamanho_producao = producoes_gramatica[numero_regra].length - 1
                nao_terminal = producoes_gramatica[numero_regra][0]

                // Chamar aqui o analisador semantico passando o numero da regra
                aplicar_regra_semantica(parseInt(numero_regra, 10), nao_terminal)

                // Desempilhar simbolos |B| da pilha de estados e de atributos
                for (i = 0; i < tamanho_producao; i++) {
                    removeElementoPilha(pilha_estados)
                    removeElementoPilha(pilha_atributos)
                }

                s = topoPilha(pilha_estados)

                novo_estado = tabela_sintatica[[s, producoes_gramatica[numero_regra][0]]]

                insereElementoPilha(pilha_estados, novo_estado)
                insereElementoPilha(pilha_atributos, nao_terminal)

                log_producoes(producoes_gramatica[numero_regra])

            } else if (acao == 'ACCEPT') {
                if (flag_erro) {
                    document.getElementById('dwn-btn').disabled = false;
                }
                return
            }

        } else {
            // Tratamento e recuperação de erros
            antigo_a = a
            a = tabela_recuperacao_erros_sintaticos[s]

            log_erros(tabela_erros_sintaticos[s])

        }

    }


}

