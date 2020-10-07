// Link css
const lightTheme = document.querySelector('.lightTheme');
// MODO NOCTURNO
const darkMode = document.getElementById('darkMode');

//Modo Nocturno
darkMode.addEventListener('click', mostrarOcultarTheme);
//Modo Nocturno
function mostrarOcultarTheme() {
    console.log('aca')
    if (lightTheme.classList.contains('lighTheme')) {
        lightTheme.href = "css/style.css";
        darkMode.innerText = 'MODO NOCTURNO';
        lightTheme.classList.remove('lighTheme');
    } else {
        lightTheme.href = "css/darkMode.css"
        this.innerText = 'MODO DIURNO';
        lightTheme.classList.add('lighTheme');
    }
}