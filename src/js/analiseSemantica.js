function aplicar_regra_semantica(numero_regra, tupla) {

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
            //console.log(tupla)
            tabela_de_simbolos[tupla[0]] = [tupla[0], tupla[1], tabela_de_nao_terminais['TIPO'][2]]
            add_codigo_objeto(tabela_de_nao_terminais['TIPO'][2] + ' ' + tabela_de_simbolos[tupla[0]][0] + ';')
            break;
        case 7:
            tabela_de_nao_terminais['TIPO'][2] = tabela_de_simbolos['inteiro'][2] //Arrumar o tipo das palavras reservadas
            break;
        case 8:
            tabela_de_nao_terminais['TIPO'][2] = tabela_de_simbolos['real'][2] //Arrumar o tipo das palavras reservadas
            break;
        case 9:
            tabela_de_nao_terminais['TIPO'][2] = tabela_de_simbolos['lit'][2] //Arrumar o tipo das palavras reservadas
            break;
        case 10:
            break;
        case 11:
            //Como pegar o id nesse caso???
            //console.log(tupla)
            break;
        case 12:
           add_codigo_objeto('printf("'+tabela_de_nao_terminais['ARG'][0]+');')
            break;
        case 13:
            console.log(tupla)
            break;
        case 14:
            break;
        case 15:
            break;
        case 16:
            break;
        case 17:
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