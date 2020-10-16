// Trending
const trendingGif = async numero => {
    let url = `${apiURL}trending?api_key=${apiKey}`;

    const trending = await getGif(url);
    //localStorage.setItem('trending', JSON.stringify(trending));
    trendingContainer.innerHTML = '';
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