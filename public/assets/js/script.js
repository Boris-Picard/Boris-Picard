/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', '/public/assets/js/particlesjs-config.json', function() {
    console.log('callback - particles.js config loaded');
});

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
toggleCircle("#portfolio", ".verticalCircle3");
toggleCircle("#contact", ".verticalCircle4");

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
    scrollToSection('#portfolio');
});

document.querySelector('.verticalCircle4').addEventListener('click', () => {
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

// SLIDER LOGOS
const slider = document.querySelector('.slider');
const slides = Array.from(slider.children);
// Fonction pour mettre en pause l'animation
function pauseAnimation() {
    slider.style.animationPlayState = 'paused';
}

function resumeAnimation() {
    slider.style.animationPlayState = 'running';
}

slider.addEventListener('mouseenter', pauseAnimation);

slider.addEventListener('mouseleave', resumeAnimation);

slides.forEach(slide => {
    slide.addEventListener('click', () => {
        alert('Vous avez cliqué sur un logo !'); 
    });
});

// FORMULAIRE DYNAMIQUE REGEX 
const firstName = document.getElementById("firstname");
const regFirstName = /^[A-Za-z-éèêëàâäôöûüç' ]+$/;
const lastName = document.getElementById("lastname")
const lastnameMsgError = document.getElementById("lastnameMsgError")
const msgError = document.getElementById("nameMsgError")
const email = document.getElementById("email");
const mailMsgError = document.getElementById("emailMsgError")
const regEmail = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\-]+\.[a-zA-Z]{2,5}$/;

const validFirstName = () => {
    firstName.classList.remove("success", "error");
    msgError.style.display = "none";
    if (firstName.value.length < 2 && firstName.value == "") {
        return;
    };
    if (regFirstName.test(firstName.value) != true) {
        msgError.textContent = "Caractères non autorisés";
        msgError.style.display = "block"
        msgError.classList.add("error");
    } else {
        msgError.style.display = "none";
    };
};

const validLastname = () => {
    lastName.classList.remove("success", "error");
    lastnameMsgError.style.display = "none";
    if (lastName.value.length < 2 && lastName.value == "") {
        return;
    };
    if (regFirstName.test(lastName.value) != true) {
        lastnameMsgError.textContent = "Caractères non autorisés";
        lastnameMsgError.style.display = "block"
        lastnameMsgError.classList.add("error");
    } else {
        lastnameMsgError.style.display = "none";
    };
};

const validEmail = () => {
    email.classList.remove("success", "error");
    mailMsgError.style.display = "none";
    if (email.value.length < 2 && email.value == "") {
        return;
    };
    if (regEmail.test(email.value) != true) {
        mailMsgError.textContent = "Veuillez entrer un mail valide";
        mailMsgError.style.display = "block"
        mailMsgError.classList.add("error");
    } else {
        mailMsgError.style.display = "none";
    };
};

lastName.addEventListener("input", validLastname);
firstName.addEventListener("input", validFirstName);
email.addEventListener("input", validEmail);

// SCROLL TRIGGER ET GSAP
gsap.registerPlugin(ScrollTrigger) 


// FONCTION POUR REMPLACER DYNAMIQUEMENT UN MOT
const texts = ["mobile", "programmation"];
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
            toggleActions: "restart pause restart pause"
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
            toggleActions: "restart pause restart pause"
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
    .from(".fa-linkedin", { opacity: 0, y: 50 }, "-=0.20")
    .from(".fa-github", { opacity: 0, y: 50 }, "-=0.20")
    .from(".verticalCircle1", { opacity: 0, y: 50 }, "-=0.20")
    .from(".verticalCircle2", { opacity: 0, y: 50 }, "-=0.20")
    .from(".verticalCircle3", { opacity: 0, y: 50 }, "-=0.20")
    .from(".verticalCircle4", { opacity: 0, y: 50 }, "-=0.20")
