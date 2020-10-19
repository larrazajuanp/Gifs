
// Cerrar Modal
const btnClose = document.querySelector('.close-modal').addEventListener('click', () => {
    //Cierro el modal
    document.querySelector('.modal-gif').style.display = 'none';
    //Muestro la pagina principal de nuevo
    document.querySelector('header').style.display = 'block';
    document.querySelector('section').style.display = 'block';
    document.querySelector('.trending').style.display = 'block';
    document.querySelector('footer').style.display = 'block';

})