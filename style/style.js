// NAVBAR BURGER
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }
});

$(document).ready(function () {
    // Retour haut de page
    $(this).scrollTop(0);
});
//Get arrow and go to section
$("#arrowClick").click(function (e) {
    $('html, body').animate({ scrollTop: $("#gotoBio").offset().top }, 10);
});

// COLOR JAUNE CATEGORIES
const x = window.matchMedia("(max-width: 1023px)")
let bio = document.getElementById("bio")
let competences = document.getElementById("competences")
let qualifs = document.getElementById("qualifs")
let projets = document.getElementById("projets")
let blog = document.getElementById("blog")
let exp = document.getElementById("exp")
let spancolor = [...document.getElementsByClassName('spancolor')]

bio.style.transition = "all 1s";
competences.style.transition = "all 1s";
qualifs.style.transition = "all 1s";
exp.style.transition = "all 1s";
projets.style.transition = "all 1s";
blog.style.transition = "all 1s";


window.addEventListener('scroll', () => {
    if (window.scrollY < 750 && x.matches) {
        spancolor.forEach((item)=>{
            item.style.color = 'white'
        });
    }
    if (window.scrollY >= 750 && x.matches) {
        spancolor.forEach((item)=>{
            item.style.color = 'black'
        });
    }
    if (window.scrollY < 750 && !x.matches) {
        competences.style.color = 'white';
        qualifs.style.color = 'white';
        projets.style.color = 'white';
        blog.style.color = 'white';
        exp.style.color = 'white';
        bio.style.color = 'white';
    }
    if (window.scrollY >= 750 && !x.matches) {
        bio.style.color = 'var(--yellow)';
        competences.style.color = 'black';
        qualifs.style.color = 'black';
        exp.style.color = 'black';
        projets.style.color = 'black';
        blog.style.color = 'black';
    }
    if (window.scrollY >= 1600 && !x.matches) {
        bio.style.color = 'black';
        competences.style.color = 'var(--yellow)';
        qualifs.style.color = 'black';
        exp.style.color = 'black';
        projets.style.color = 'black';
        blog.style.color = 'black';
    }
    if (window.scrollY >= 2500 && !x.matches) {
        competences.style.color = 'black';
        exp.style.color = 'black';
        qualifs.style.color = 'var(--yellow)';
        projets.style.color = 'black';
        blog.style.color = 'black';
        bio.style.color = 'black';
    } 
    if (window.scrollY >= 3000 && !x.matches) {
        competences.style.color = 'black';
        exp.style.color = 'var(--yellow)';
        qualifs.style.color = 'black';
        projets.style.color = 'black';
        blog.style.color = 'black';
        bio.style.color = 'black';
    } 
    if (window.scrollY >= 4000 && !x.matches) {
        competences.style.color = 'black';
        exp.style.color = 'var(--yellow)';
        qualifs.style.color = 'black';
        projets.style.color = 'black';
        blog.style.color = 'black';
        bio.style.color = 'black';
    } 
});