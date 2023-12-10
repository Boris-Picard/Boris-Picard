// VANTA.NET({
//     el: "#home",
//     mouseControls: true,
//     touchControls: true,
//     gyroControls: false,
//     minHeight: 200.00,
//     minWidth: 200.00,
//     scale: 1.00,
//     scaleMobile: 1.00,
//     color: 0xe6e6e6,
//     backgroundColor: 0x111111,
//     points: 5.00,
//     maxDistance: 14.00,
//     spacing: 20.00
// })

// Capturer l'élément canvas de Vanta.js par son ID
const canvasElement = document.getElementById('home');

// Initialisation de l'animation Vanta.js (assurez-vous d'avoir correctement configuré Vanta.js au préalable)
const vantaEffect = VANTA.NET({
  el: canvasElement,
  mouseControls: true, // Activez les contrôles de la souris
});

// Écouter l'événement de mouvement de la souris
canvasElement.addEventListener('mousemove', (event) => {
  // Mettre à jour les propriétés de l'animation Vanta.js en fonction de la souris
  // Par exemple, vous pouvez ajuster la rotation en fonction de la position de la souris
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = (event.clientY / window.innerHeight) * 2 - 1;

  // Mettez à jour l'angle de la caméra en fonction de la position de la souris
  vantaEffect.setOptions({
    tiltX: mouseX, // Angle de rotation horizontale
    tiltY: mouseY, // Angle de rotation verticale
  });
});




const navToggler = document.querySelector(".jsNavToggler");
const nav = document.querySelector(".jsNav");
const linkNav = document.querySelectorAll("li")

// FONCTION POUR L'OVERLAY
const togglerNav = () => {
    navToggler.classList.toggle("active");
    nav.classList.toggle("open");
}

linkNav.forEach(link => {
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

// SCROLL TRIGGER 
gsap.registerPlugin(ScrollTrigger) 

// gsap.to(".textAbout", {
//     scrollTrigger: {
//         trigger: ".textAbout",
//         start: "top 80%", 
//         end: "bottom 20%", 
//         toggleActions: "restart pause restart pause" 
//         },
//     opacity: 1, 
//     duration: 1, 
//     ease: "power2.out" 
// });


// gsap.from(".imgAbout", {
//     scrollTrigger: {
//         trigger: ".imgAbout",
//         start: "top 75%", 
//         toggleActions: "restart pause restart pause" 
//     },
//     x: -200, 
//     opacity: 0, 
//     duration: 1.5, 
//     ease: "expo.out" 
// });

// gsap.from(".titleAbout", {
//     scrollTrigger: {
//         trigger: ".titleAbout",
//         start: "top 90%", 
//         toggleActions: "restart pause restart pause"
//     },
//     scale: 0.5, 
//     opacity: 0, 
//     duration: 1, 
//     ease: "back.out(1.7)" 
// });

// gsap.from(".heroTitle", {
//     opacity: 0,      
//     scale: 0.8,      
//     y: -50,          
//     duration: 1.5,  
//     ease: "power2.out", 
//     delay: 0.5      
// });

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

