function readFile(that) {
    if (that.files && that.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var output = e.target.result;
            var output = output.split("\n");
            // for(var i = 0; i< output.length; i++){
            //     alert(output[i]);
            // }
        };//end onload()
        reader.readAsText(that.files[0]);
    }//end if html5 filelist support
}
// class Lexema {
//     constructor() {
//         var lexema;
//         var token;
//         var tipo = '-';
//         this.setLexema = setLexema;
//         this.setToken = setToken;
//         this.setTipo = setTipo;
//         this.showLexema = getLexema;
//         this.showToken = getToken;
//         this.showTipo = getTipo;
        
//         function getLexema() {
//             return lexema
//         }
//         function getToken() {
//             return token
//         }
//         function getTipo() {
//             return tipo
//         }
//         function setLexema(lex) {
//             lexema = lex;
//         }
//         function setToken(tok) {
//             token = tok;
//         }
//         function setTipo(tipo) {
//             tipo = tipo;
//         }
//     }
// }

//http://www.mojavelinux.com/articles/javascript_hashes.html

function HashTable() {

    this.length = 0;
    this.nos = new Object();

    /* Adicionando elementos na tabela hash */
    this.addNo = function (key, value) {

        var no = undefined;
        if (this.getNo(key)) {
            no = this.getNo(key);
        } else {
            this.nos[key] = value;
            no = this.nos[key];
            this.length++;
        }

        return no;
    }

    this.getNo = function (key) {
        return this.nos.hasOwnProperty(key) ? this.nos[key] : undefined;
    }
}

var tabela = new HashTable();

alert(tabela.length);
tabela.addNo('item', 'item');
tabela.addNo('kratos', 'kratos');

for (k in tabela.nos) {
    alert(tabela.nos[k] + ' == ' + k);
}
