const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));
document.addEventListener("click", function (event) {
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");

  if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
    navMenu.classList.remove("show-menu");
  }
});

const scrollHeader = () => {
  const header = document.getElementById("header");
  this.scrollY >= 50
    ? header.classList.add("bg-header")
    : header.classList.remove("bg-header");
};
window.addEventListener("scroll", scrollHeader);

document.addEventListener("DOMContentLoaded", function () {
  const linksWithAnchors = document.querySelectorAll('a[href*="#"]');

  linksWithAnchors.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        let offset = 0;

        if (this.hasAttribute("data-offset")) {
          offset = parseInt(this.getAttribute("data-offset"));
        }

        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
});

sr.reveal(`.home__data`);
sr.reveal(`.home__img`, { delay: 700, origin: "bottom" });
sr.reveal(`.logos__img, .program__card, .pricing__card`, { interval: 100 });
sr.reveal(`.choose__img, .calculate__content`, { origin: "left" });
sr.reveal(`.choose__content, .calculate__img`, { origin: "right" });

let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

const contactForm = document.querySelector("#contact-form");
const submitBtn = document.querySelector(".submit-btn");
const nameInput = document.querySelector("#user-name1");
const nameInput2 = document.querySelector("#user-name2");
const emailInput = document.querySelector("#user-email");
const phoneInput = document.querySelector("#user-phone");
const msgInput = document.querySelector("#user-message");
const publicKey = "KnCU0selKCpZGVcQn";
const serviceID = "service_bkejs4l";
const templateID = "template_h6xt9i8";

emailjs.init(publicKey);

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  submitBtn.innerText = "Trimitere ";

  const inputFields = {
    name1: nameInput.value,
    name2: nameInput2.value,
    email: emailInput.value,
    phone: phoneInput.value,
    msg: msgInput.value,
  };

  console.log("fields: ", inputFields);
  emailjs.send(serviceID, templateID, inputFields).then(
    () => {
      submitBtn.innerText = "Mesaj Trimis!";
      nameInput.value = "";
      nameInput2.value = "";
      emailInput.value = "";
      phoneInput.value = "";
      msgInput.value = "";
      alert("Mesaj trimis cu succes!");
      setTimeout(() => {
        submitBtn.innerText = "Trimite ";
      }, 2000);
    },
    (error) => {
      console.log(error);
      submitBtn.innerText = "Eroare trimitere mesaj!";
      alert("Eroare la trimiterea mesajului. Vă rugăm să încercați din nou.");
    }
  );
  return false;
});

function coverFlowEfx(e) {
  if ($(".owl-dots")) {
    $(".owl-dots").remove();
  }
  idx = e.item.index;
  $(".owl-item.big").removeClass("big");
  $(".owl-item.medium").removeClass("medium");
  $(".owl-item.mdright").removeClass("mdright");
  $(".owl-item.mdleft").removeClass("mdleft");
  $(".owl-item.smallRight").removeClass("smallRight");
  $(".owl-item.smallLeft").removeClass("smallLeft");
  $(".owl-item")
    .eq(idx - 1)
    .addClass("medium mdleft");
  $(".owl-item").eq(idx).addClass("big");
  $(".owl-item")
    .eq(idx + 1)
    .addClass("medium mdright");
  $(".owl-item")
    .eq(idx + 2)
    .addClass("smallRight");
  $(".owl-item")
    .eq(idx - 2)
    .addClass("smallLeft");
}

var click = false;

$("#play-carousel").click(function (evt) {
  click = !click;
  if (click) {
    $(".status").html("Autoplay: ON");
    $(".owl-carousel").trigger("play.owl.autoplay", [1000, 1000]);
    $(this).html("Stop");
  } else {
    $(".owl-carousel").trigger("stop.owl.autoplay");
    $(this).html("Play");
    $(".status").html("Autoplay: OFF");
  }
});
lightbox.option({
  resizeDuration: 200,
  wrapAround: true,
});

