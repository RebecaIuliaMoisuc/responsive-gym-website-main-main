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

document.addEventListener('DOMContentLoaded', function() {
  const linksWithAnchors = document.querySelectorAll('a[href*="#"]');
  
  linksWithAnchors.forEach(function(link) {
      link.addEventListener('click', function(e) {
          e.preventDefault(); // Previne comportamentul implicit de derulare a paginii

          const targetId = this.getAttribute('href').substring(1); // Obține ID-ul țintei fără semnul '#'
          const targetElement = document.getElementById(targetId); // Găsește elementul țintă

          if (targetElement) {
              let offset = 0; // Offset-ul implicit

              // Verifică dacă linkul are atributul "data-offset"
              if (this.hasAttribute('data-offset')) {
                  offset = parseInt(this.getAttribute('data-offset')); // Obține valoarea offset-ului din atribut
              }

              const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
              
              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth' // Derulează lin
              });
          }
      });
  });
});

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

/* ===== GALLERY 2 ===== */

// triangulation using https://github.com/ironwallaby/delaunay

const TWO_PI = Math.PI * 2;

var images = [],
    imageIndex = 0;

var image,
    imageWidth = 768,
    imageHeight = 485;

var vertices = [],
    indices = [],
    fragments = [];

var container = document.getElementById('container1');

var clickPosition = [imageWidth * 0.5, imageHeight * 0.5];

window.onload = function() {
    TweenMax.set(container, {perspective:500});

    // images from reddit/r/wallpapers
    var urls = [
           
            'assets/img/poza1galerie2.jpg',
            'assets/img/poza6galerie2.jpg',
            'assets/img/poza13.1.jpg',
            'assets/img/poza14.1.jpg',
            'assets/img/poza15.1.jpg',
            'assets/img/poza16.1.jpg',
           
          ],
        image,
        loaded = 0;
    // very quick and dirty hack to load and display the first image asap
    images[0] = image = new Image();
        image.onload = function() {
            if (++loaded === 1) {
                imagesLoaded();
                for (var i = 1; i < 6; i++) {
                    images[i] = image = new Image();

                    image.src = urls[i];
                }
            }
        };
        image.src = urls[0];
};

function imagesLoaded() {
    placeImage(false);
    triangulate();
    shatter();
}

function placeImage(transitionIn) {
    image = images[imageIndex];

    if (++imageIndex === images.length) imageIndex = 0;
    
    image.addEventListener('click', imageClickHandler);
    container.appendChild(image);

    if (transitionIn !== false) {
        TweenMax.fromTo(image, 0.4, {y:0}, {y:0, ease:Back.easeIn});
    }
}

function imageClickHandler(event) {
    var box = image.getBoundingClientRect(),
        top = box.top,
        left = box.left;

    clickPosition[0] = event.clientX - left;
    clickPosition[1] = event.clientY - top;

    triangulate();
    shatter();
}

function triangulate() {
    var rings = [
            {r:50, c:12},
            {r:150, c:12},
            {r:300, c:12},
            {r:1200, c:12} // very large in case of corner clicks
        ],
        x,
        y,
        centerX = clickPosition[0],
        centerY = clickPosition[1];

    vertices.push([centerX, centerY]);

    rings.forEach(function(ring) {
        var radius = ring.r,
            count = ring.c,
            variance = radius * 0.25;

        for (var i = 0; i < count; i++) {
            x = Math.cos((i / count) * TWO_PI) * radius + centerX + randomRange(-variance, variance);
            y = Math.sin((i / count) * TWO_PI) * radius + centerY + randomRange(-variance, variance);
            vertices.push([x, y]);
        }
    });

    vertices.forEach(function(v) {
        v[0] = clamp(v[0], 0, imageWidth);
        v[1] = clamp(v[1], 0, imageHeight);
    });

    indices = Delaunay.triangulate(vertices);
}

function shatter() {
    var p0, p1, p2,
        fragment;

    var tl0 = new TimelineMax({onComplete:shatterCompleteHandler});

    for (var i = 0; i < indices.length; i += 3) {
        p0 = vertices[indices[i + 0]];
        p1 = vertices[indices[i + 1]];
        p2 = vertices[indices[i + 2]];

        fragment = new Fragment(p0, p1, p2);

        var dx = fragment.centroid[0] - clickPosition[0],
            dy = fragment.centroid[1] - clickPosition[1],
            d = Math.sqrt(dx * dx + dy * dy),
            rx = 30 * sign(dy),
            ry = 90 * -sign(dx),
            delay = d * 0.003 * randomRange(0.9, 1.1);
        fragment.canvas.style.zIndex = Math.floor(d).toString();

        var tl1 = new TimelineMax();


        tl1.to(fragment.canvas, 1, {
            z:-500,
            rotationX:rx,
            rotationY:ry,
            ease:Cubic.easeIn
        });
        tl1.to(fragment.canvas, 0.3,{alpha:0}, 0.2);

        tl0.insert(tl1, delay);

        fragments.push(fragment);
        container.appendChild(fragment.canvas);
    }

    container.removeChild(image);
    image.removeEventListener('click', imageClickHandler);
}

function shatterCompleteHandler() {
    // add pooling?
    fragments.forEach(function(f) {
        container.removeChild(f.canvas);
    });
    fragments.length = 0;
    vertices.length = 0;
    indices.length = 0;

    placeImage();
}

//////////////
// MATH UTILS
//////////////

function randomRange(min, max) {
    return min + (max - min) * Math.random();
}

function clamp(x, min, max) {
    return x < min ? min : (x > max ? max : x);
}

function sign(x) {
    return x < 0 ? -1 : 1;
}

//////////////
// FRAGMENT
//////////////

Fragment = function(v0, v1, v2) {
    this.v0 = v0;
    this.v1 = v1;
    this.v2 = v2;

    this.computeBoundingBox();
    this.computeCentroid();
    this.createCanvas();
    this.clip();
};
Fragment.prototype = {
    computeBoundingBox:function() {
        var xMin = Math.min(this.v0[0], this.v1[0], this.v2[0]),
            xMax = Math.max(this.v0[0], this.v1[0], this.v2[0]),
            yMin = Math.min(this.v0[1], this.v1[1], this.v2[1]),
            yMax = Math.max(this.v0[1], this.v1[1], this.v2[1]);

        this.box ={
            x:xMin,
            y:yMin,
            w:xMax - xMin,
            h:yMax - yMin
        };
    },
    computeCentroid:function() {
        var x = (this.v0[0] + this.v1[0] + this.v2[0]) / 3,
            y = (this.v0[1] + this.v1[1] + this.v2[1]) / 3;

        this.centroid = [x, y];
    },
    createCanvas:function() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.box.w;
        this.canvas.height = this.box.h;
        this.canvas.style.width = this.box.w + 'px';
        this.canvas.style.height = this.box.h + 'px';
        this.canvas.style.left = this.box.x + 'px';
        this.canvas.style.top = this.box.y + 'px';
        this.ctx = this.canvas.getContext('2d');
    },
    clip:function() {
        this.ctx.translate(-this.box.x, -this.box.y);
        this.ctx.beginPath();
        this.ctx.moveTo(this.v0[0], this.v0[1]);
        this.ctx.lineTo(this.v1[0], this.v1[1]);
        this.ctx.lineTo(this.v2[0], this.v2[1]);
        this.ctx.closePath();
        this.ctx.clip();
        this.ctx.drawImage(image, 0, 0);
    }
};

/*=============== EMAIL JS ===============*/
//

const contactForm = document.querySelector("#contact-form");
const submitBtn = document.querySelector(".submit-btn");
const nameInput = document.querySelector("#user-name1");
const nameInput2 = document.querySelector("#user-name2");
const emailInput = document.querySelector("#user-email");
const phoneInput = document.querySelector("#user-phone");
const msgInput = document.querySelector("#user-message");

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
    msg: msgInput.value,
  };

  console.log('fields: ', inputFields)
  emailjs.send(serviceID, templateID, inputFields).then(
    () => {
      submitBtn.innerText = "Mesaj Trimis!";
      nameInput.value = "";
      nameInput2.value = "";
      emailInput.value = "";
      phoneInput.value = "";
      msgInput.value = "";
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
$('.owl-carousel').owlCarousel({
  center: true,
  loop: true,
  nav: true,
  items: 5,
  navText: ['<i class="fas fa-chevron-left"></i>','<i class="fas fa-chevron-right"></i>'],
  responsive:{
    0:{
      items: 2,
    },
    768:{
      items: 3,
    },
    990:{
      items: 5,
    }
  },
  onInitialized: coverFlowEfx,
  onTranslate: coverFlowEfx,
});

function coverFlowEfx(e){
  if ($('.owl-dots')) {
    $('.owl-dots').remove();
  }
  idx = e.item.index;
  $('.owl-item.big').removeClass('big');
  $('.owl-item.medium').removeClass('medium');
  $('.owl-item.mdright').removeClass('mdright');
  $('.owl-item.mdleft').removeClass('mdleft');
  $('.owl-item.smallRight').removeClass('smallRight');
  $('.owl-item.smallLeft').removeClass('smallLeft');
  $('.owl-item').eq(idx -1).addClass('medium mdleft');
  $('.owl-item').eq(idx).addClass('big');
  $('.owl-item').eq(idx + 1).addClass('medium mdright');
  $('.owl-item').eq(idx + 2).addClass('smallRight');
  $('.owl-item').eq(idx - 2).addClass('smallLeft');
}

var click = false;

$('#play-carousel').click(function(evt) {
  click = !click;
  if(click){
    $('.status').html('Autoplay: ON');
    $('.owl-carousel').trigger('play.owl.autoplay', [1000, 1000]);
    $(this).html("Stop");
  } else {
    $('.owl-carousel').trigger('stop.owl.autoplay');
    $(this).html("Play");
    $('.status').html('Autoplay: OFF');
  }

});





