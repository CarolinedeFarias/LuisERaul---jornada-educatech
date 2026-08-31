/* ================================
   ATLETA EM FOCO — JAVASCRIPT
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

document.getElementById("btnProjeto").addEventListener("click", () => {
    abrirModal(
        "Sobre o projeto",
        "Atleta em Foco é uma proposta de plataforma web educativa voltada à disseminação de informações sobre saúde, nutrição, hidratação, recuperação, prevenção de lesões e hábitos saudáveis. O projeto utiliza HTML, CSS e JavaScript e está alinhado à ODS 3 — Saúde e Bem-Estar."
    );
});

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


/* ================================
   CALCULADORA
================================ */

const btnCalcular = document.getElementById("btnCalcular");
const resultado = document.getElementById("resultado");

btnCalcular.addEventListener("click", () => {

    const idade = Number(document.getElementById("idade").value);
    const peso = Number(document.getElementById("peso").value);
    const alturaCm = Number(document.getElementById("altura").value);
    const atividade = Number(document.getElementById("atividade").value);

    if (!idade || !peso || !alturaCm) {
        resultado.innerHTML = "<strong>Preencha todos os campos.</strong>";
        resultado.classList.add("show");
        return;
    }

    const alturaM = alturaCm / 100;

    const imc = peso / (alturaM * alturaM);

    // Estimativa educativa baseada na equação de Mifflin-St Jeor
    // Para esta demonstração, usa-se a fórmula masculina.
    const metabolismo =
        (10 * peso) +
        (6.25 * alturaCm) -
        (5 * idade) +
        5;

    const gasto = metabolismo * atividade;

    resultado.innerHTML = `
        <h3>Resultado educativo</h3>

        <div class="result-grid">

            <div class="result-item">
                <span>IMC</span>
                <strong>${imc.toFixed(1)}</strong>
            </div>

            <div class="result-item">
                <span>Metabolismo basal</span>
                <strong>${metabolismo.toFixed(0)}</strong>
                <small>kcal/dia</small>
            </div>

            <div class="result-item">
                <span>Gasto estimado</span>
                <strong>${gasto.toFixed(0)}</strong>
                <small>kcal/dia</small>
            </div>

        </div>

        <p class="warning">
            Os valores apresentados são estimativas para fins educativos
            e não substituem avaliação individual realizada por profissionais
            de saúde, nutrição ou educação física.
        </p>
    `;

    resultado.classList.add("show");
});


/* ================================
   HIDRATAÇÃO
================================ */

let quantidadeAgua = 0;
const metaAgua = 2000;

function atualizarAgua() {

    document.getElementById("agua").textContent =
        quantidadeAgua;

    const porcentagem =
        Math.min((quantidadeAgua / metaAgua) * 100, 100);

    document.getElementById("barraAgua").style.width =
        porcentagem + "%";
}

document.querySelectorAll(".water-btn[data-water]").forEach(button => {

    button.addEventListener("click", () => {

        quantidadeAgua += Number(button.dataset.water);

        if (quantidadeAgua > metaAgua) {
            quantidadeAgua = metaAgua;
        }

        atualizarAgua();
    });

});

document.getElementById("zerarAgua").addEventListener("click", () => {

    quantidadeAgua = 0;

    atualizarAgua();

});


/* ================================
   CHECKLIST DE HÁBITOS
================================ */

const habits = document.querySelectorAll(".habit");
const score = document.getElementById("score");

function atualizarScore() {

    let total = 0;

    habits.forEach(habit => {
        if (habit.checked) {
            total++;
        }
    });

    score.textContent = total;
}

habits.forEach(habit => {
    habit.addEventListener("change", atualizarScore);
});
