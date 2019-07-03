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

            tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 3]][2] = tabela_de_simbolos['1' + pilha_atributos[pilha_atributos.length - 2]][2]

            add_codigo_objeto(tabela_de_simbolos['1' + pilha_atributos[pilha_atributos.length - 2]][2] + ' ' + tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 3]][0] + ';\n')
            break;
        case 7:
            tabela_de_simbolos['1' + nao_terminal][2] = tabela_de_simbolos['inteiro'][2]
            break;
        case 8:
            tabela_de_simbolos['1' + nao_terminal][2] = tabela_de_simbolos['real'][2]
            break;
        case 9:
            tabela_de_simbolos['1' + nao_terminal][2] = tabela_de_simbolos['lit'][2]
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

            } else {
                log_erros("ERRO SEMÂNTICO: Variável " + tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 2]][0] + " não declarada ")
            }

            break;
        case 12:
            if (tabela_de_simbolos['1' + pilha_atributos[pilha_atributos.length - 2]][1] == 'id') {

                switch (tabela_de_simbolos['1' + pilha_atributos[pilha_atributos.length - 2]][2]) {

                    case 'literal': add_codigo_objeto('printf("%s",' + tabela_de_simbolos['1' + pilha_atributos[pilha_atributos.length - 2]][0] + ');\n')
                        break;

                    case 'int': add_codigo_objeto('printf("%d",' + tabela_de_simbolos['1' + pilha_atributos[pilha_atributos.length - 2]][0] + ');\n')
                        break;

                    case 'double': add_codigo_objeto('printf("%lf",' + tabela_de_simbolos['1' + pilha_atributos[pilha_atributos.length - 2]][0] + ');\n')
                        break;

                }
            } else {
                add_codigo_objeto('printf(' + tabela_de_simbolos['1' + pilha_atributos[pilha_atributos.length - 2]][0] + ');\n')
            }

            break;
        case 13:

            tabela_de_simbolos['1' + nao_terminal] = automato(pilha_atributos[pilha_atributos.length - 1])
            //console.log(tabela_de_simbolos[nao_terminal])

            break;
        case 14:

            tabela_de_simbolos['1' + nao_terminal] = automato(pilha_atributos[pilha_atributos.length - 1])

            break;
        case 15:

            if (tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 1]] != undefined && tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 1]][2] != '-') {

                tabela_de_simbolos['1'+nao_terminal] = tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 1]]

            } else { /* Emitir na tela “Erro: Variável não declarada”. */
                log_erros("ERRO SEMÂNTICO: Variável " + tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 1]][0] + " não declarada ")
            }

            break;
        case 16:
            break;
        case 17:
            console.log('Regra 17')
            console.log(pilha_atributos)
            

            if (tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 4]] != undefined && tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 4]][2] != '-') {

                /* Verificando se os tipos do id da pilha e de LD sao os mesmos */
                console.log(tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 4]] +'  '+tabela_de_simbolos['1'+pilha_atributos[pilha_atributos.length - 2]])


                if (tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 4]][2] == tabela_de_simbolos['1'+pilha_atributos[pilha_atributos.length - 2]][2]) {

                    add_codigo_objeto(tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 4]][0] + ''
                        + tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 3]][2] + ''
                        + tabela_de_simbolos['1'+pilha_atributos[pilha_atributos.length - 2]][0] + ';\n')

                } else { /*Caso contrário emitir:”Erro: Tipos diferentes para atribuição”. */

                    log_erros("ERRO SEMÂNTICO:  Tipos diferentes para atribuição\n " + tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 4]][0] + "<-" + tabela_de_simbolos['1'+pilha_atributos[pilha_atributos.length - 2]][0])
                }

            } else {/* Caso contrário emitir “Erro: Variável não declarada”. */
                log_erros("ERRO SEMÂNTICO: Variável " + tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 4]][0] + " não declarada ")
            }

            break;
        case 18:

            if ((tabela_de_simbolos['1OPRD'][2] == tabela_de_simbolos['1OPRD1'][2])
                && (tabela_de_simbolos['1OPRD'][2] != 'literal')) {

                tabela_de_simbolos['1'+nao_terminal] = ['T' + cont_variaveis_temporarias,'Num','int']
                cont_variaveis_temporarias++

                add_codigo_objeto(tabela_de_simbolos['1'+nao_terminal][0] + '=' + tabela_de_simbolos['1'+pilha_atributos[pilha_atributos.length - 3]][0] + '' +
                    tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 2]][2] + '' + tabela_de_simbolos['1OPRD1'][0] + ';\n')

                tabela_de_simbolos['1OPRD1'] = ['-', '-', '-']

            } else {//Caso contrário emitir “Erro: Operandos com tipos incompatíveis”

                log_erros("ERRO SEMÂNTICO: Operandos com tipos incompatíveis para '" + tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 2]][2] +
                    "' (" + tabela_de_simbolos['1OPRD'][2] + " e " + tabela_de_simbolos['1OPRD1'][2] + ") ")
            }

            break;
        case 19:
            console.log('Regra 19')
            console.log(tabela_de_simbolos)

            if (tabela_de_simbolos['1OPRD1'][0] == '-') {
                tabela_de_simbolos['1'+nao_terminal] = tabela_de_simbolos['1'+pilha_atributos[pilha_atributos.length - 1]]
            } else {
                tabela_de_simbolos['1'+nao_terminal] = tabela_de_simbolos['1OPRD1']
            }

            break;
        case 20:

            if (tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 1]] != undefined && tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 1]][2] != '-') {
                tabela_de_simbolos['1'+nao_terminal] = tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 1]]

            } else {//Caso contrário emitir “Erro: Variável não declarada”
                console.log('Regra 20')
                log_erros("ERRO SEMÂNTICO: Variável " + tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 1]][0] + " não declarada ")
            }

            break;
        case 21:

            /* Necessida de criar um novo OPRD para nao ocorrer erro */
            if (tabela_de_simbolos['1'+nao_terminal] != ['-', '-', '-']) {
                tabela_de_simbolos['1'+nao_terminal + '1'] = automato([pilha_atributos[pilha_atributos.length - 1]])
            }

            break;
        case 22:
            break;
        case 23:
            add_codigo_objeto('}\n')
            break;
        case 24:

            add_codigo_objeto('if(' + tabela_de_simbolos['1'+pilha_atributos[pilha_atributos.length - 3]][0] + '){\n')

            break;
        case 25:

            
            if (tabela_de_simbolos['1OPRD'][2] == tabela_de_simbolos['1OPRD1'][2]) {

                tabela_de_simbolos['1'+nao_terminal][0] = 'T' + cont_variaveis_temporarias
                cont_variaveis_temporarias++
                
                //console.log('Regra 25')
               // console.log(pilha_atributos)
                //console.log(tabela_de_simbolos['1'+pilha_atributos[pilha_atributos.length - 2]])

                add_codigo_objeto(tabela_de_simbolos['1'+nao_terminal][0] + '=' + tabela_de_simbolos['1'+pilha_atributos[pilha_atributos.length - 3]][0] + '' +
                    tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 2]][2] + '' + tabela_de_simbolos['1OPRD1'][0] + ';\n')

                tabela_de_simbolos['1OPRD1'] = ['-', '-', '-']

            } else {//Caso contrário emitir “Erro: Operandos com tipos incompatíveis”
                log_erros("ERRO SEMÂNTICO: Operandos com tipos incompatíveis para '" + tabela_de_simbolos[pilha_atributos[pilha_atributos.length - 2]][0] +
                    "' (" + tabela_de_simbolos['1OPRD'][2] + " e " + tabela_de_simbolos['1OPRD1'][2] + ") ")

            }

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
        case 31:
            break;
        case 32:
            add_codigo_objeto('}\n')
            break;
        case 33:
            add_codigo_objeto('while(' + tabela_de_simbolos['1'+pilha_atributos[pilha_atributos.length - 4]][0] + '){\n')
            break;
        case 34:
            break;
        case 35:
            break;
        case 36:
            break;
        case 37:
            break;
        case 38:
            break;
    }
}

function add_codigo_objeto(conteudo) {
    codigo_objeto += conteudo
}

function ajustar_codigo_objeto(codigo_objeto) {

    let temp = '#include<stdio.h> \n' +
        'typedef char literal[256];\n' +
        'void main(void)\n' +
        '{\n' +
        '/*----Variaveis temporarias----*/\n'

    for (i = 0; i < cont_variaveis_temporarias; i++) {
        temp += 'int T' + i + ';\n'
    }

    temp += '/*-------------------------*/\n'
    temp += codigo_objeto
    temp += '}'

    return temp

}

function download(filename) {

    codigo_objeto = ajustar_codigo_objeto(codigo_objeto)

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
    //var text = document.getElementById("text-val").value;
    var filename = "PROGRAMA.c";

    download(filename);
}, false);