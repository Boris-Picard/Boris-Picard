/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', '/public/assets/js/particlesjs-config.json', function() {
    console.log('callback - particles.js config loaded');
});

// SCREEN WIDTH BACKGROUND
if(window.screen.width <= 320 || window.screen.width <= 480) {
    const particleJs = document.getElementById('particles-js')
    const backgroundHero = document.getElementById('home')
    const imgAbout = document.querySelector('.imgAbout')
    particleJs.style.display = 'none';
    backgroundHero.style.background = '#222222'
    imgAbout.src = "/public/assets/img/mobileAbout.png"
}

// TRACK CHANGEMENT DE SECTION
const toggleCircle = (sceneSelector, circleClass) => {
    gsap.timeline({
        scrollTrigger: {
            trigger: sceneSelector,
            start: "top center", 
            end: () => "+=" + document.querySelector(sceneSelector).offsetHeight,
            onEnter: () => {
                document.querySelector(circleClass).classList.add("visibleCircle");
                document.querySelector(circleClass).classList.remove("hiddenCircle");
            },
            onLeave: () => {
                document.querySelector(circleClass).classList.remove("visibleCircle");
                document.querySelector(circleClass).classList.add("hiddenCircle");
            },
            onEnterBack: () => {
                document.querySelector(circleClass).classList.add("visibleCircle");
                document.querySelector(circleClass).classList.remove("hiddenCircle");
            },
            onLeaveBack: () => {
                document.querySelector(circleClass).classList.remove("visibleCircle");
                document.querySelector(circleClass).classList.add("hiddenCircle");
            },
        }
    });
}

toggleCircle("#home", ".verticalCircle1");
toggleCircle("#about", ".verticalCircle2");
toggleCircle("#experiences", ".verticalCircle3");
toggleCircle("#portfolio", ".verticalCircle4");
toggleCircle("#contact", ".verticalCircle5");

// MODAL
const open = document.querySelectorAll('.open');
const modalContainer = document.querySelectorAll('.modalContainer');
const close = document.querySelectorAll('.close');

open.forEach((button, index) => {
    button.addEventListener('click', () => {
        modalContainer[index].classList.add('show');
    });
});

close.forEach(element => {
    element.addEventListener('click', () => {
        element.closest('.modalContainer').classList.remove('show'); 
    })
});

// FONCTION POUR SCROLL A LA BONNE SECTION AU CLICK SUR UN CERCLE
const scrollToSection = (selector) => {
    const targetSection = document.querySelector(selector);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

document.querySelector('.verticalCircle1').addEventListener('click', () => {
    scrollToSection('#home');
});

document.querySelector('.verticalCircle2').addEventListener('click', () => {
    scrollToSection('#about');
});

document.querySelector('.verticalCircle3').addEventListener('click', () => {
    scrollToSection('#experiences');
});

document.querySelector('.verticalCircle4').addEventListener('click', () => {
    scrollToSection('#portfolio');
});

document.querySelector('.verticalCircle5').addEventListener('click', () => {
    scrollToSection('#contact');
});

// FONCTION NAV MENU TOGGLE
const navToggler = document.querySelector(".jsNavToggler");
const nav = document.querySelector(".jsNav");
const navLinks = document.querySelectorAll('.li-nav');

// FONCTION POUR L'OVERLAY
const togglerNav = () => {
    navToggler.classList.toggle("active");
    nav.classList.toggle("open");
}

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        togglerNav();
    });
});

navToggler.addEventListener("click", togglerNav);

// FILTER SECTION
const filterButtons = document.querySelectorAll("#filter-buttons button");
const filterableCards = document.querySelectorAll("#filterable-cards .card");

const filterCards = (e) => {
    document.querySelector("#filter-buttons .active").classList.remove("active");
    e.target.classList.add("active");
    filterableCards.forEach(card => {
        if (card.dataset.name === e.target.dataset.filter || e.target.dataset.filter === "all") {
            return card.classList.replace("hide", "show");
        }
        card.classList.add("hide");
    });
}

filterButtons.forEach(button => button.addEventListener("click", filterCards));

// SCROLL TRIGGER ET GSAP
gsap.registerPlugin(ScrollTrigger) 


// FONCTION POUR REMPLACER DYNAMIQUEMENT UN MOT
const texts = ["et web mobile", "front-end", "back-end"];
let textIndex = 0;
let charIndex = 0;
const typingSpeed = 0.1;
const delayBetweenTexts = 2;
const typewriterText = document.getElementById('typewriter-text');
const cursor = document.getElementById('cursor');

const typeWriter = () => {
    if (charIndex < texts[textIndex].length) {
        typewriterText.textContent += texts[textIndex].charAt(charIndex);
        charIndex++;
        gsap.delayedCall(typingSpeed, typeWriter);
    } else {
        gsap.delayedCall(delayBetweenTexts, eraseText);
    }
}

const eraseText = () => {
    if (typewriterText.textContent.length > 0) {
        typewriterText.textContent = typewriterText.textContent.slice(0, -1);
        gsap.delayedCall(typingSpeed, eraseText);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        charIndex = 0;
        gsap.delayedCall(typingSpeed, typeWriter);
    }
}

gsap.to(cursor, { opacity: 0, repeat: -1, yoyo: true, duration: 0.5 });

window.onload = typeWriter;


gsap.utils.toArray('.from-left').forEach((element, i) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top bottom",
            toggleActions: "play play none none"
        },
        x: -window.innerWidth, 
        duration: 1.5,
        delay: i * 0.3, 
        ease: "power2.out", 
    });
});

// Éléments venant de la droite
gsap.utils.toArray('.from-right').forEach((element, i) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top bottom",
            toggleActions: "play none none none"
        },
        x: window.innerWidth, 
        duration: 1.5,
        delay: i * 0.3,
        ease: "power2.out",
    });
});



const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

tl.from(".heroTitle", { opacity: 0, y: 50, delay:0.5 })
    .from(".heroText", { opacity: 0, y: 50 }, "-=0.20")
    .from(".heroButton", { opacity: 0, y: 50 }, "-=0.20")
    .from(".navToggler", { opacity: 0, y: 50 }, "-=0.20")
    .from("#social-media-icons", { opacity: 0, y: 50 }, "-=0.20")
    .from([".fa-linkedin", ".github", ".verticalCircle1", ".verticalCircle2", ".verticalCircle3", ".verticalCircle4",".verticalCircle5"], 
    { opacity: 0, y: 50 }, "-=0.20");


