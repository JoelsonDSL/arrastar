/* ======================================================
TUBARÕES SEM MISTÉRIO
SCRIPT PRINCIPAL
====================================================== */

/* ==========================
ELEMENTOS DA PÁGINA
========================== */

const btnStart = document.getElementById("btnStart");
const capa = document.getElementById("capa");
const jogo = document.getElementById("jogo");

const cards = document.querySelectorAll(".card");
const zones = document.querySelectorAll(".zone");

const mensagem = document.getElementById("mensagem");

/* ==========================
BOTÃO COMEÇAR
========================== */

btnStart.addEventListener("click", () => {

    capa.style.display = "none";
    jogo.style.display = "block";

});

/* ==========================
CONTADOR DE ACERTOS
========================== */

let acertos = 0;

/* ==========================
INÍCIO DO ARRASTE
========================== */

cards.forEach(card => {

    card.addEventListener("dragstart", iniciarArraste);

});

function iniciarArraste(event){

    event.dataTransfer.setData("text/plain", event.target.id);

}

/* ==========================
CONFIGURAÇÃO DAS ZONAS
========================== */

zones.forEach(zone => {

    zone.addEventListener("dragover", permitirSoltar);

    zone.addEventListener("dragenter", destacarZona);

    zone.addEventListener("dragleave", removerDestaque);

    zone.addEventListener("drop", soltarCard);

});

/* ==========================
PERMITE SOLTAR
========================== */

function permitirSoltar(event){

    event.preventDefault();

}

/* ==========================
DESTACA A ZONA
========================== */

function destacarZona(event){

    event.preventDefault();

    event.currentTarget.style.transform = "scale(1.03)";

}

/* ==========================
REMOVE DESTAQUE
========================== */

function removerDestaque(event){

    event.currentTarget.style.transform = "scale(1)";

}

/* ==========================
SOLTA O CARD
========================== */

function soltarCard(event){

    event.preventDefault();

    event.currentTarget.style.transform = "scale(1)";

    const idCard = event.dataTransfer.getData("text/plain");

    const card = document.getElementById(idCard);

    const respostaCorreta = card.dataset.answer;

    const zonaAtual = event.currentTarget.dataset.zone;

    if(respostaCorreta === zonaAtual){

        event.currentTarget.appendChild(card);

        event.currentTarget.classList.remove("wrong");
        event.currentTarget.classList.add("correct");

        card.draggable = false;

        card.style.cursor = "default";

        acertos++;

        if(acertos === cards.length){

            mensagem.innerHTML = "🎉 Parabéns! Você concluiu o jogo!";

        }

    }else{

        event.currentTarget.classList.add("wrong");

        setTimeout(() => {

            event.currentTarget.classList.remove("wrong");

        },500);

    }

}
