document.addEventListener('DOMContentLoaded', function main() {
    var xhr = new XMLHttpRequest();
    /**
     * @type {Element}
     */
    var discoteca = null;

    xhr.open('GET', '/assets/xml/discot.xml');

    xhr.onload = function (_) {
        if (xhr.status === 200) {
            discoteca = xhr.responseXML;
            init();
        } else {
            console.error('Erro', xhr.status);
        }
    };

    xhr.onerror = function (_) {
        console.error('Erro');
    };

    xhr.send();

    function init() {

        //Selector para os albuns
        var searchAlbum = document.createElement('input');
        searchAlbum.type = "text";
        searchAlbum.addEventListener('input', function onTyping(evt) {
            var divs = document.body.querySelectorAll('div.cd');
            var l;
            for (l = 0; l < divs.length; l++) {
                if (divs[l].id.indexOf(searchAlbum.value.toUpperCase()) == -1) {
                    divs[l].style.display = "none";
                } else {
                    divs[l].style.display = "block";
                }
            }
        });
        document.body.appendChild(searchAlbum);

        //cria um div para cada cd com as suas informações
        var cds = discoteca.querySelectorAll('cd');
        for (var i = 0; i < cds.length; i++) {

            var cd = cds[i];
            var divCD = document.createElement('div');
            divCD.className = "cd";



            //titulo do cd
            var titulo = cd.getAttribute('titulo');
            var tituloContainer = document.createElement('h3');
            tituloContainer.textContent = titulo;
            divCD.appendChild(tituloContainer);

            //autor do cd
            var autoria = cd.getAttribute('autoria');
            var autoriaContainer = document.createElement('p');
            tituloContainer.textContent += ' - ' + autoria;
            divCD.appendChild(autoriaContainer);

            //capa do cd
            var capa = cd.querySelector('capa');
            var imagemContainer = document.createElement('img');
            var imagem = '/assets/images/' + capa.getAttribute('imagMini');
            imagemContainer.src = imagem;
            divCD.appendChild(imagemContainer);

            //linha em branco
            var br = document.createElement('br');
            divCD.appendChild(br);

            //seletor das faixas
            var searchFaixa = document.createElement('input');
            searchFaixa.type = "text";
            searchFaixa.id = "" + i;
            searchFaixa.addEventListener('input', function onTyping(evt) {
                var divs = document.body.querySelectorAll('div.cd');
                var i = this.id;
                faixas = divs[i].querySelectorAll('p.fai');
                var l;
                for (l = 0; l < faixas.length; l++) {
                    if (faixas[l].textContent.toUpperCase().indexOf(this.value.toUpperCase()) == -1) {
                        faixas[l].style.display = "none";
                    } else {
                        faixas[l].style.display = "block";
                    }
                }
            });
            divCD.appendChild(searchFaixa);

            //faixas
            var conteudo = cd.querySelectorAll('conteudo');
            for (h = 0; h < conteudo.length; h++) {
                var fxs = conteudo[h].querySelectorAll('faixa');
                for (var j = 0; j < fxs.length; j++) {
                    var fx = fxs[j].getAttribute('ref');
                    var faixaConteiner = document.createElement('p');
                    faixaConteiner.textContent = fx;
                    faixaConteiner.className = "fai"
                    divCD.appendChild(faixaConteiner);
                }
            }

            divCD.id = tituloContainer.textContent.toUpperCase();
            document.body.appendChild(divCD);

        }
    }

});
