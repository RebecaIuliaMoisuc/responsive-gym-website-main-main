/* MENU */
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*=============== SHOW MENU ===============*/
/*validate if constant exists*/
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}
/*=============== MENU CLOSE ===============*/
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}
/*=============== MENU MOBILE ===============*/
/*remove menu list on click on items*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));
/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
  const header = document.getElementById("header");
  this.scrollY >= 50
    ? header.classList.add("bg-header")
    : header.classList.remove("bg-header");
};
window.addEventListener("scroll", scrollHeader);
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll("section [id]");
const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        " .nav__menu  a[href*=" + sectionId + "]"
      );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
  window.addEventListener("scroll", scrollActive);
};
/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);
/*=============== SCROLL REVEAL ANIMATION ===============*/
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

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

/* =========== GALLERY ========*/

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

/*=============== EMAIL JS ===============*/
//

const contactForm = document.querySelector("#contact-form");
const submitBtn = document.querySelector(".submit-btn");
const nameInput = document.querySelector("#user-name1");
const nameInput2 = document.querySelector("#user-name2");
const emailInput = document.querySelector("#user-email");
const phoneInput = document.querySelector("#user-phone");

// get data from EmailJS
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
  };
  emailjs.send(serviceID, templateID, inputFields).then(
    () => {
      submitBtn.innerText = "Mesaj Trimis!";
      nameInput.value = "";
      nameInput2.value = "";
      emailInput.value = "";
      phoneInput.value = "";
      // Display success notification
      alert("Mesaj trimis cu succes!");
      // Reset button text after a delay (e.g., 2000 milliseconds or 2 seconds)
      setTimeout(() => {
        submitBtn.innerText = "Trimite ";
      }, 2000);
    },
    (error) => {
      console.log(error);
      submitBtn.innerText = "Eroare trimitere mesaj!";
      // Display error notification
      alert("Eroare la trimiterea mesajului. Vă rugăm să încercați din nou.");
    }
  );

  // Prevent the default form submission
  return false; // or e.preventDefault();
});
