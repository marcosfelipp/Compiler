function aplicar_regra_semantica(numero_regra, nao_terminal) {

    switch (numero_regra) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            add_codigo_objeto('\n\n\n')
            break;
        case 6:

            tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 3]][2] = tabela_de_simbolos_geral[pilha_atributos[pilha_atributos.length - 2]][2]

            add_codigo_objeto(tabela_de_simbolos_geral[pilha_atributos[pilha_atributos.length - 2]][2] + ' ' + tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 3]][0] + ';\n')
            break;
        case 7:
            tabela_de_simbolos_geral[nao_terminal][2] = tabela_de_simbolos_geral['inteiro'][2]
            break;
        case 8:
            tabela_de_simbolos_geral[nao_terminal][2] = tabela_de_simbolos_geral['real'][2]
            break;
        case 9:
            tabela_de_simbolos_geral[nao_terminal][2] = tabela_de_simbolos_geral['lit'][2]
            break;
        case 10:
            break;
        case 11:

            /* Tratando-se dos id's tem que usar a tabela de simbolos, pois pode sobrescrever os nao terminais na tabela geral */
            if (tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 2]][2] != '-') {

                switch (tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 2]][2]) {

                    case 'literal':
                        add_codigo_objeto('scanf("%s",' + tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 2]][0] + ');\n')
                        break;

                    case 'int':
                        add_codigo_objeto('scanf("%d",&' + tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 2]][0] + ');\n')
                        break;

                    case 'double':
                        add_codigo_objeto('scanf("%lf",&' + tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 2]][0] + ');\n')
                        break;
                }

            } else {/*“Erro: Variável não declarada”*/

            }

            break;
        case 12:

            add_codigo_objeto('printf("Digite ' + pilha_atributos[pilha_atributos.length - 2][0] + '");\n')

            break;
        case 13:

            tabela_de_simbolos_geral[nao_terminal] = tabela_de_simbolos_geral['lit']

            break;
        case 14:

            /* Verificar se elemento no topo da pilha de atributos é um id */
            if (automato(pilha_atributos[pilha_atributos.length - 1])[1] == 'Num') {

                tabela_de_simbolos_geral[nao_terminal] = tabela_de_simbolos_geral[pilha_atributos[pilha_atributos.length - 1]]
            }

            break;
        case 15:

            /* Verificar se elemento no topo da pilha de atributos é um id */
            if (automato(pilha_atributos[pilha_atributos.length - 1])[1] == 'id') {

                tabela_de_simbolos_geral[nao_terminal] = tabela_de_simbolos_geral[pilha_atributos[pilha_atributos.length - 1]]

            } else { /* Emitir na tela “Erro: Variável não declarada”. */

            }

            break;
        case 16:
            break;
        case 17:
            /* (11) ["inicio", "V", "ES", "ES", "ES", "ES", "COND", "B", "<-", "LD", ";"] */

            console.log('Regra 17')
            console.log(pilha_atributos)
            console.log(nao_terminal)

            if (automato(pilha_atributos[pilha_atributos.length - 4])[1] == 'id') {

                /* Verificando se os tipos do id da pilha e de LD sao os mesmos */
                if (pilha_atributos[pilha_atributos.length - 4][2] == pilha_atributos[pilha_atributos.length - 2][2]) {
                    add_codigo_objeto(tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 4]][0] + '' + tabela_de_simbolos_geral[pilha_atributos[pilha_atributos.length - 3]][2] + '' + tabela_de_simbolos_geral[pilha_atributos[pilha_atributos.length - 2]][0] + '\n')

                } else { /*Caso contrário emitir:”Erro: Tipos diferentes para atribuição”. */

                }

            } else {/* Caso contrário emitir “Erro: Variável não declarada”. */

            }

            break;
        case 18:
            break;
        case 19:
            break;
        case 20:
            break;
        case 21:
            break;
        case 22:
            break;
        case 23:
            break;
        case 24:
            break;
        case 25:
            break;
        case 26:
            break;
        case 27:
            break;
        case 28:
            break;
        case 29:
            break;
        case 30:
            break;

    }
}

function add_codigo_objeto(conteudo) {
    codigo_objeto += conteudo
}

function download(filename) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(codigo_objeto));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

document.getElementById("dwn-btn").addEventListener("click", function () {
    // Generate download of hello.txt file with some content
    var text = document.getElementById("text-val").value;
    var filename = "hello.txt";

    download(filename, text);
}, false);