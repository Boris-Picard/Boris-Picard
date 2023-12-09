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