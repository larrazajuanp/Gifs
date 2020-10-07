//Sliders
document.querySelector('.slider-left').addEventListener('click', () => {
    numero--;
    trendingGif(numero)
})

document.querySelector('.slider-right').addEventListener('click', () => {
    numero++;
    trendingGif(numero)
})