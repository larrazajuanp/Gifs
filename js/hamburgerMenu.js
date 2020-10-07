//Menu Hamburguesa
const hamburger = document.querySelector(".menu-hamburguesa");
const list = document.querySelector(".list");
hamburger.addEventListener("click", () => {
    list.classList.toggle("open");
});