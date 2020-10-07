//Eventos para buscar gif
if (document.getElementById('searchGifos')) {

    document.getElementById('searchGifos').addEventListener('input', updateSuggestions);

    document.getElementById('searchGifos').addEventListener('keypress', searchGif);

}

function searchGif(e) {
    if ((e.key === 'Enter') || (e.keyCode === 13)) {
        const text = document.getElementById('searchGifos').value;
        if (text == '') { return; }
        gifSearch(text)
        showSearch(text)
    }
}

function showSearch(title) {

    document.querySelector('.textoBusqueda').innerHTML = title;
    document.querySelector('.trending-result').style.display = "none";
    document.querySelector('.contenedor-gifs').style.margin = "0 auto";
    document.getElementById('contenedor-gifs').innerHTML = '';
    document.getElementById('suggestion-container').innerHTML = '';

}

//Boton Ver Más
document.querySelector('.button').addEventListener('click', function () {
    ocultos = Array.from(document.querySelectorAll(".ocultar"));
    ocultos.forEach(function (item, index) {
        if (index < cantidad) {
            item.classList.remove('ocultar');
        }
        if (document.querySelectorAll('.ocultar').length === 0) {
            document.querySelector('.button').style.display = "none";
        }
    });


});