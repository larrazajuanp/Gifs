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
//Contenedor trending
const trendingContainer = document.querySelector(".contenedor-trending");

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

    let favouritesArray = [];
    if (favouritesArray[0]) {

        if (favouritesArray.find(f => f.id == gif.id)) { state = "actHeart"; } else { state = "heart"; }


    } else {

        state = "heart";

    }

    const template =
        `<div class="${clase}">
                    <img src="${gif.url}" alt="${gif.title}" class="imagen" id_gif="${gif.id}" user_gif="${gif.user}" title_gif="${gif.title} "url_gif="${gif.url}" />
					<div class="overlay"></div>
					<div class="user">${gif.user}</div>
                    <div class="title">${gif.title}</div>
                    <div class="${state}" id="heart"><img src="/img/icon-fav-hover.svg" alt="heart"></div>
                    <div class="download"><img src="/img/icon-download.svg" alt="download"></div>
                    <div id_gif="${gif.id}" user_gif="${gif.user}" title_gif="${gif.title} "url_gif="${gif.url}"></div>
                    <div class="max"  id_gif="${gif.id}" user_gif="${gif.user}" title_gif="${gif.title} "url_gif="${gif.url}"><img src="/img/icon-max.svg" alt="max-icon"></div>
					<div class="url" id_gif="${gif.url}"></div>
				</div>`;

    let urlGif = gif.url;
    //const downloadGif = (() => { open(urlGif, "_blank"); });

    divContenedor.innerHTML = template;
    //Eventos sobre iconos favorito/descarga/maximizar
    divContenedor.querySelector('#heart').addEventListener("click", addFavourites);
    divContenedor.querySelector('.download').addEventListener("click", downloadGif, false);
    divContenedor.querySelector('.max').addEventListener("click", maxGif)
    return divContenedor;

}


//Busqueda Gif
const gifSearch = async (search) => {
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}`

    const searchGifObject = await getGif(url);
    //localStorage.setItem('search', JSON.stringify(searchGifObject));
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
        div.style.cursor = 'pointer';
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
    } /*else {
        const div = document.createElement('div');
        div.textContent = 'Intenta con otra búsqueda';
        document.querySelector('.contenedor-gifs').appendChild(div);
    }*/

    if (terms.length <= 3) return;
    searchGifos.style.borderBottom = '1px solid #9CAFC3';
    const suggestionsJson = await getSuggestions(terms);
    const suggestions = getSuggestionsElems(suggestionsJson);
    container.innerHTML = '';
    suggestions.forEach(sug => {
        container.appendChild(sug);
    })
}

// Ampliar Gif con un modal
function maxGif(e) {
    //Ocultando el body
    document.querySelector('header').style.display = 'none';
    document.querySelector('html').style.borderTop = '0px';
    document.querySelector('section').style.display = 'none';
    document.querySelector('.trending').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    document.querySelector('.main-favourites').style.display = 'none';
    //document.querySelector('.main-favourites').style.display = 'none';
    //Activando el modal-gif
    document.querySelector('.modal-gif').style.display = "flex";
    // Obtengo el valor del objeto
    let id_gif = e.target.parentElement.attributes.getNamedItem('id_gif').value;
    let url = e.target.parentElement.attributes.getNamedItem('url_gif').value;
    let user_gif = e.target.parentElement.attributes.getNamedItem('user_gif').value;
    let title_gif = e.target.parentElement.attributes.getNamedItem('title_gif').value;
    // Darle estilos al contenedor del modal
    const maxIcon = document.querySelector('.contenedor-modal');
    maxIcon.setAttribute("style", "background-image: url('" + url + "')");
    maxIcon.style.backgroundRepeat = "no-repeat";
    maxIcon.style.backgroundSize = "100% 100%";

    document.querySelector('.modal-gif').appendChild(maxIcon)
    document.querySelector('.title-modal').innerHTML = title_gif;
    document.querySelector('.user-modal').innerHTML = user_gif;
    // Descargar gif desde el modal
    const downloadGif = (() => { open(url, "_blank"); });
    const downloadIcon = document.querySelector('.download-modal');
    downloadIcon.addEventListener("click", downloadGif, false);
    downloadIcon.setAttribute("url_gif", url);
    downloadIcon.style.cursor = 'pointer';
}

// Descargar el gif
function downloadGif(e) {
    let url = e.target.parentElement.nextElementSibling.attributes[3].value;
    let nombre = e.target.parentElement.nextElementSibling.attributes[2].value;
    console.log(nombre)
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        let urlCreator = window.URL || window.webkitURL;
        let imageUrl = urlCreator.createObjectURL(this.response);
        let tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = nombre;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
}

// Obtengo favoritos
favouritesArray = [];
if (localStorage.getItem('favItems') !== null) {
    favouritesArray = JSON.parse(localStorage.getItem('favItems'));
} else {
    favouritesArray = new Array();
}

const favouriteContainer = document.querySelector('.save-favourite');
if (favouritesArray.length > 0) {
    if (favouriteContainer) {
        favouriteContainer.innerHTML = '';
    }
}



// Agregar a Favoritos
function addFavourites(e) {
    document.querySelector('.save-favourite').style.display = 'none';
    // Obtengo el valor del objeto
    let id_gif = e.target.parentElement.nextElementSibling.nextElementSibling.attributes[0].value;
    let user_gif = e.target.parentElement.nextElementSibling.nextElementSibling.attributes[1].value;
    let title_gif = e.target.parentElement.nextElementSibling.nextElementSibling.attributes[2].value;
    let url = e.target.parentElement.nextElementSibling.nextElementSibling.attributes[3].value;
    let heart_gif = e.target;
    console.log(heart_gif)

    if (heart_gif == 'heart') {

        //e.target.setAttribute("class", "heart");
        console.log(heart_gif)

        for (i = 0; i < favouritesArray.length; i++) {

            if (favouritesArray[i].id == id_gif) {
                favouritesArray.splice(i, 1);
            }
        }
        localStorage.setItem("favItems", JSON.stringify(favouritesArray));

    } else {
        let fav = {
            "id": id_gif,
            "titulo": title_gif,
            "usuario": user_gif,
            "url": url
        };
        console.log(fav)
        favouritesArray.push(fav);
        console.log(favouritesArray)
        localStorage.setItem("favItems", JSON.stringify(favouritesArray));

        //e.target.setAttribute("class", "actHeart");
    }
}
//Containers favoritos
const myFavs = document.querySelector('.my-favourites');
function showFavourites() {

    let amountFavs = favouritesArray.length;
    const btnMore = document.querySelector('.button-gif button');

    if (amountFavs > 12) { btnMore.style.display = "block"; }

    const clase = 'img-search-result';

    for (i = 0; i < amountFavs; i++) {

        myFavs.appendChild(getGifTemplate(favouritesArray[i], clase))

    }

    let items = Array.from(document.querySelectorAll('.img-search-result'));

    cantidad = 12;

    items.forEach(function (item, index) {
        if (index > cantidad - 1) {
            item.classList.add('ocultar');
        }
    });
}

if (myFavs) {
    showFavourites()
}

// Obtengo mis gifs
const gifosContainer = document.querySelector('.myGif-container');
const createGif = document.querySelector('.create-gif');
let ownGifArray = [];
if (localStorage.getItem('misGifos') !== null) {
    ownGifArray = JSON.parse(localStorage.getItem('misGifos'));
}
if (ownGifArray.length > 0) {
    if (gifosContainer) {
        createGif.innerHTML = '';
    }
}


//container mis gifos
function showMyGifs() {
    let amountGifs = ownGifArray.length;
    const btnMore = document.querySelector('.button-gif button');

    if (amountGifs > 12) { btnMore.style.display = "block"; }

    const clase = 'img-search-result';

    for (i = 0; i < amountGifs; i++) {

        gifosContainer.appendChild(getGifTemplate(ownGifArray[i], clase))

    }

    let items = Array.from(document.querySelectorAll('.img-search-result'));

    cantidad = 12;

    items.forEach(function (item, index) {
        if (index > cantidad - 1) {
            item.classList.add('ocultar');
        }
    });

}

if (gifosContainer) {
    showMyGifs()
}
