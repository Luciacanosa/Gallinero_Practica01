// ----- cursor personalizado (punto rojo) -----
$(document).mousemove(function (e) {
  $(".cursor-index").css({ left: e.clientX + "px", top: e.clientY + "px" });
});
// con "on" funciona también en botones creados desde JS
$(document).on(
  "mouseenter",
  "a, button, label, input, select, textarea, .burger > i",
  function () {
    $(".cursor-index")
      .addClass("scale-180 bg-transparent")
      .removeClass("bg-butaca");
  },
);
$(document).on(
  "mouseleave",
  "a, button, label, input, select, textarea, .burger > i",
  function () {
    $(".cursor-index")
      .removeClass("scale-180 bg-transparent")
      .addClass("bg-butaca");
  },
);
// menu hambuerguesa para movill

let burger = document.querySelector(".burger > i");
let menu_opt = document.querySelector(".menu");
// definimos evneto click sobre le botón del menú
burger.addEventListener("click", function () {
  burger.classList.toggle("fa-bars");
  burger.classList.toggle("fa-times");
  menu_opt.classList.toggle("menu-show");
});

burger.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    burger.click();
  }
});

// ----- header -----
const paginaActual = window.location.pathname.split("/").pop() || "index.html";
$(".menu a").each(function () {
  if ($(this).attr("href") === paginaActual) {
    $(this).addClass("text-butaca").attr("aria-current", "page");
  }
});

// ----- modo claro y oscuro  -----
$("#btn-tema").on("click", function () {
  const oscuro = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("tema", oscuro ? "oscuro" : "claro");
  } catch (e) {}
});

// ----- footer -----
$(".anio").text(new Date().getFullYear());
$(".arriba").on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, 600);
});

// AOS: hace visibles los elementos con data-aos al hacer scroll
AOS.init({ duration: 800, once: true, offset: 60 });

// Typed.js: el final del titular se escribe solo
new Typed("#typed", {
  strings: [
    "tienes una duda.",
    "quieres alquilar la sala.",
    "vienes con el cole.",
    "nos propones una peli.",
    "solo quieres saludar.",
  ],
  typeSpeed: 55,
  backSpeed: 30,
  backDelay: 1600,
  loop: true,
  cursorChar: "_",
});

//  elementos plegables
$("#menu-movil, .faq-texto").removeClass("hidden").hide();

// jQuery: menú móvil
$("#btn-menu").on("click", function () {
  $("#menu-movil").slideToggle(250);
  $(this).text($(this).text().trim() === "Menú +" ? "Cerrar –" : "Menú +");
});

// jQuery: acordeón de dudas
$(".faq-btn").on("click", function () {
  const $faq = $(this).closest(".faq");
  $(".faq").not($faq).find(".faq-texto").slideUp(250);
  $(".faq").not($faq).find(".faq-icono").removeClass("rotate-45");
  $faq.find(".faq-texto").slideToggle(250);
  $faq.find(".faq-icono").toggleClass("rotate-45");
});
// ----- dudas frecuentes (acordeón con jQuery) -----

// las respuestas empiezan cerradas (jQuery controla si se ven o no)
$(".faq-texto").removeClass("hidden").hide();

// al pulsar una pregunta: se abre su respuesta y se cierran las demás
// .off("click") quita clics repetidos para que no se abra y se cierre a la vez
$(".faq-btn")
  .off("click")
  .on("click", function () {
    const $faq = $(this).closest(".faq");

    // cierra las demás
    $(".faq").not($faq).find(".faq-texto").stop(true, true).slideUp(250);
    $(".faq").not($faq).find(".faq-icono").removeClass("rotate-45");

    // abre o cierra la pulsada y gira el + para que parezca una ×
    $faq.find(".faq-texto").stop(true, true).slideToggle(250);
    $faq.find(".faq-icono").toggleClass("rotate-45");
  });
