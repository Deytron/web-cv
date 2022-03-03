// NAVBAR BURGER
document.addEventListener("DOMContentLoaded", () => {
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

// RETURN TO TOP
$(document).ready(function () {
  // Retour haut de page
  $(this).scrollTop(0);
});

// ARROW CLICK AND GO TO SELECTION
$("#arrowClick").click(function (e) {
  $("html, body").animate({ scrollTop: $("#gotoBio").offset().top }, 10);
});

// COLOR JAUNE CATEGORIES
const x = window.matchMedia("(max-width: 1023px)");
let bio = document.getElementById("bio");
let competences = document.getElementById("competences");
let qualifs = document.getElementById("qualifs");
let projets = document.getElementById("projets");
let exp = document.getElementById("exp");
let spancolor = [...document.getElementsByClassName("spancolor")];

bio.style.transition = "all 1s";
competences.style.transition = "all 1s";
qualifs.style.transition = "all 1s";
exp.style.transition = "all 1s";
projets.style.transition = "all 1s";

// COLOR SWITCHING ON SCROLL
window.addEventListener("scroll", () => {
  if (window.scrollY < 750 && x.matches) {
    // If at top
    spancolor.forEach((item) => {
      item.style.color = "white";
    });
  }
  if (window.scrollY >= 750 && x.matches) {
    // If at bio
    spancolor.forEach((item) => {
      // All texts go black
      item.style.color = "black";
    });
  }
  if (window.scrollY < 750 && !x.matches) {
    competences.style.color = "white";
    qualifs.style.color = "white";
    projets.style.color = "white";
    exp.style.color = "white";
    bio.style.color = "white";
    // Navbar gets transparent
    document.getElementById("navbar").classList.add("is-transparent");
    document.getElementById("navbar").classList.remove("is-white");
    document.getElementById("navbar").classList.remove("has-shadow");
  }
  if (window.scrollY >= 750 && !x.matches) {
    document.getElementById("navbar").classList.remove("is-transparent");
    document.getElementById("navbar").classList.add("is-white");
    document.getElementById("navbar").classList.add("has-shadow");
  }
});
