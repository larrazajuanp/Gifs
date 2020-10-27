//Eventos para buscar gif
const inputSearch = document.getElementById('searchGifos');
if (inputSearch) {

    inputSearch.addEventListener('input', updateSuggestions);

    inputSearch.addEventListener('keypress', searchGif);

}

function searchGif(e) {
    if ((e.key === 'Enter') || (e.keyCode === 13)) {
        const text = document.getElementById('searchGifos').value;
        if (text == '') { return; }
        gifSearch(text)
        showSearch(text)
    }
    const btnClose = document.getElementById('close');
    btnClose.style.display = 'block';
    btnClose.addEventListener('click', () => {
        showSearch('')
        inputSearch.value = '';
    })
    document.getElementById('lupa').style.display = 'none';
    document.getElementById('lupaActive').style.display = 'block';
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