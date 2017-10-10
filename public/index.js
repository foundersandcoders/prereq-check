var burger = document.getElementById('js-navbar');
var navbar = document.getElementById('js-navbar__list');

burger.addEventListener('click', function(){
    burger.classList.toggle("change");
    navbar.classList.toggle("navbar__list--visible");
});

navbar.addEventListener('click', function(){
    burger.classList.toggle("change");
    navbar.classList.toggle("navbar__list--visible");
});
