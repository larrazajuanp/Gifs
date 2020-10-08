// Variables

// Api key
const apiKey = 'H3aHz0JfkpHAYratenErxZDfQObTUM9H';
//Api Url
const apiURL = "https://api.giphy.com/v1/gifs/";

//lupa
const lupa = document.getElementById('lupa');
// Input busqueda
const searchGifos = document.getElementById('searchGifos');
//Suggestion Container
const containerSuggestions = document.getElementById('suggestion-container');
// Contenedor Gifs
const contenedorGifs = document.querySelector('.contenedor-gifs');

//Inicializamos numero
let numero = 0;




//FETCH
const fetchGiphy = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data
}
const getGif = async (url) => {
    const result = await fetchGiphy(url);
    return result
}

const getGifTemplate = (gif, clase) => {

    let arrayGif = gif;
    const divContenedor = document.createElement('div');

    /*if (idFavoritos.indexOf(gif.id) !== -1) { estadoFavorito = "corazon corazonActivo"; }
    else { estadoFavorito = "corazon"; }*/

    const template =
        `<div class="${clase}">
					<img src="${gif.url}" alt="${gif.title}" class=""/>
					<div class="overlay"></div>
					<div class="usuario">${gif.user}</div>
                    <div class="titulo">${gif.title}</div>
                    <div class="heart"><img src="/img/icon-fav-hover.svg" alt="heart"></div>
					<div class="download"><img src="/img/icon-download.svg" alt="download"></div>
					<div class="max" id_gif="${gif.url}"><img src="/img/icon-max.svg" alt="max-icon"></div>
					<div class="url" id_gif="${gif.url}"></div>
				</div>`;

    let urlGif = gif.url;
    const downloadGif = (() => { open(urlGif, "_blank"); });


    divContenedor.innerHTML = template;
    //Eventos sobre iconos favorito/descarga/maximizar
    //divContenedor.querySelector('.heart').addEventListener("click", addFavourites);
    divContenedor.querySelector('.download').addEventListener("click", downloadGif, false);
    divContenedor.querySelector('.max').addEventListener("click", (gif) => {
        maxGif(gif);
    });
    return divContenedor;

}


//Busqueda Gif
const gifSearch = async (search) => {
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}`

    const searchGifObject = await getGif(url);
    localStorage.setItem('search', JSON.stringify(searchGifObject));
    const gifAmount = searchGifObject.data.length;

    let searchList = document.querySelector('.contenedor-gifs');

    if (gifAmount > 12) { document.querySelector('.button-gif').style.display = "block"; }
    const clase = 'img-search-result';
    for (i = 0; i < gifAmount; i++) {
        let searchGif = {
            'id': searchGifObject.data[i].id,
            'title': searchGifObject.data[i].title,
            'user': searchGifObject.data[i].username,
            'url': searchGifObject.data[i].images.fixed_height.url
        };
        searchList.appendChild(getGifTemplate(searchGif, clase))
    }
    let items = Array.from(document.querySelectorAll(".img-search-result"));
    cantidad = 12;
    items.forEach(function (item, index) {
        if (index > cantidad - 1) {
            item.classList.add('ocultar');
        }
    });

}



// Trending
const trendingGif = async numero => {
    let url = `${apiURL}trending?api_key=${apiKey}`;

    const trending = await getGif(url);
    localStorage.setItem('trending', JSON.stringify(trending));
    document.querySelector(".contenedor-trending").innerHTML = '';
    newGifAmount = numero + 4;
    const amountGif = trending.data.length;

    for (i = numero; i < newGifAmount; i++) {
        let fav = {
            'id': trending.data[i].id,
            'title': trending.data[i].title,
            'user': trending.data[i].username,
            'url': trending.data[i].images.original.url
        };
        const clase = 'img-results';
        if ((numero < amountGif) && (numero >= 0)) {
            listadoTrending.appendChild(getGifTemplate(fav, clase))
        }
        numero++;
    }

}

trendingGif(numero)
let listadoTrending = document.querySelector('.contenedor-trending');



// Sugerencias
const getSuggestions = async letters => {
    const url = await fetch(`https://api.giphy.com/v1/tags/related/${letters}?api_key=${apiKey}&limit=5`);
    const response = await url.json();
    return response;
}
const getSuggestionsElems = suggestions => {
    let arraySuggetions = [];
    suggestions.data.forEach(sug => {
        const div = document.createElement('div');
        div.innerHTML = `<li class="icono-busqueda">${sug.name}</li>`;
        div.addEventListener('click', (e) => {
            let input = document.getElementById("searchGifos");
            input.value = e.target.textContent;
            let evento = document.createEvent('Event');
            evento.initEvent('keypress');
            evento.which = evento.keyCode = 13;
            input.dispatchEvent(evento);
            document.querySelector('.contenedor-gifs').innerHTML = '';
        })
        arraySuggetions.push(div)
    })
    return arraySuggetions;
}
const updateSuggestions = async (e) => {
    const container = document.getElementById('suggestion-container');
    const input = document.getElementById('searchGifos');
    const terms = e.target.value;

    if (terms == "") {
        container.innerHTML = '';
        input.style.borderBottom = '0px solid #9CAFC3';
        document.querySelector('.contenedor-gifs').innerHTML = '';
        document.querySelector('.contenedor-gifs').style.margin = '0';
        document.querySelector('.textoBusqueda').innerHTML = '';
        document.querySelector('.button-gif').style.display = "none";
        document.querySelector('.trending-result').style.display = "flex";
    }

    if (terms.length <= 3) return;
    searchGifos.style.borderBottom = '1px solid #9CAFC3';
    const suggestionsJson = await getSuggestions(terms);
    const suggestions = getSuggestionsElems(suggestionsJson);
    container.innerHTML = '';
    suggestions.forEach(sug => {
        container.appendChild(sug);
    })
}


function maxGif(gif) {
    document.querySelector('header').style.display = 'none';
    document.querySelector('html').style.borderTop = '0px';
    document.querySelector('section').style.display = 'none';
    document.querySelector('.trending').style.display = 'none';
    document.querySelector('footer').style.display = 'none';


    /*const template = document.createElement('div');
    template.innerHTML = `
    <body>
    <header style="background: white;">
    
    <h2> Moriras Willy </h2>
    <img src="${gif.url}" alt="Miguel" class=""/>
    
    </header>
    </body>
    
    `
    document.querySelector('.modal-gif').appendChild(template)
    console.log(template)*/
    //localStorage.getItem(JSON.parse(trending));
}


