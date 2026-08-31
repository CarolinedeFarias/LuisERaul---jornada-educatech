/* ================================
   NAVEGAÇÃO E MENU MOBILE
================================ */
const menu = document.getElementById("menu");
const menuMobile = document.getElementById("menuMobile");

menuMobile.addEventListener("click", () => {
    menu.classList.toggle("active");
});

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
    });
});

document.querySelectorAll("[data-scroll]").forEach(button => {
    button.addEventListener("click", () => {
        const target = document.querySelector(button.dataset.scroll);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

/* ================================
   MODAL
================================ */
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const fecharModal = document.getElementById("fecharModal");

function abrirModal(titulo, texto) {
    modalTitle.textContent = titulo;
    modalText.textContent = texto;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
}

function fecharJanela() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
}

const btnProjeto = document.getElementById("btnProjeto");
if (btnProjeto) {
    btnProjeto.addEventListener("click", () => {
        abrirModal(
            "Thynk Unlimited",
            "Sports and Unity é uma iniciativa voltada à aproximação de pessoas através do esporte, destacando a diversidade cultural, igualdade, diplomacia esportiva e impacto social positivo."
        );
    });
}

document.querySelectorAll(".info-card").forEach(card => {
    card.addEventListener("click", () => {
        abrirModal(
            card.dataset.modalTitle,
            card.dataset.modalText
        );
    });
});

fecharModal.addEventListener("click", fecharJanela);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        fecharJanela();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        fecharJanela();
    }
});