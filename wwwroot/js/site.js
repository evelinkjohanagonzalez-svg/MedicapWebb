// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
"use strict";


/* ========================================================= */
/* ELEMENTOS */
/* ========================================================= */

const loginScreen = document.getElementById("loginScreen");
const registerScreen = document.getElementById("registerScreen");
const appScreen = document.getElementById("appScreen");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const loginMessage = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");


/* ========================================================= */
/* DATOS DEL USUARIO */
/* ========================================================= */

let currentUser = {
    name: "Usuario",
    email: "demo@medicap.co",
    phone: "+57 310 000 0000",
    address: "Bogotá",
    eps: "Sura EPS"
};


/* ========================================================= */
/* INICIO */
/* ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const savedUser = localStorage.getItem("medicapUser");

    if (savedUser) {

        try {

            currentUser = JSON.parse(savedUser);

        } catch (error) {

            console.log("No se pudo recuperar el usuario.");

        }

    }

});


/* ========================================================= */
/* LOGIN */
/* ========================================================= */

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {

        showMessage(
            loginMessage,
            "Por favor completa todos los campos.",
            "error"
        );

        return;
    }

    currentUser.email = email;

    if (!currentUser.name || currentUser.name === "Usuario") {

        currentUser.name = email
            .split("@")[0]
            .replace(/[._-]/g, " ");

    }

    localStorage.setItem(
        "medicapUser",
        JSON.stringify(currentUser)
    );

    openApplication();

});


/* ========================================================= */
/* ABRIR APLICACIÓN */
/* ========================================================= */

function openApplication() {

    loginScreen.classList.add("hidden");

    registerScreen.classList.add("hidden");

    appScreen.classList.remove("hidden");

    updateUserInformation();

}


/* ========================================================= */
/* ACTUALIZAR INFORMACIÓN */
/* ========================================================= */

function updateUserInformation() {

    const nameElement =
        document.getElementById("userNameHome");

    const avatarElement =
        document.getElementById("avatarLetters");

    if (nameElement) {

        nameElement.textContent =
            capitalizeWords(currentUser.name);

    }

    if (avatarElement) {

        avatarElement.textContent =
            getInitials(currentUser.name);

    }

}


/* ========================================================= */
/* REGISTRO */
/* ========================================================= */

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    currentUser = {

        name:
            document.getElementById("registerName").value.trim()
            + " "
            + document.getElementById("registerLastName").value.trim(),

        email:
            document.getElementById("registerEmail").value.trim(),

        phone:
            document.getElementById("registerPhone").value.trim(),

        address:
            document.getElementById("registerAddress").value.trim(),

        eps: "Sura EPS"

    };

    localStorage.setItem(
        "medicapUser",
        JSON.stringify(currentUser)
    );

    showMessage(
        registerMessage,
        "Cuenta creada correctamente. Entrando a Medicap...",
        "success"
    );

    setTimeout(function () {

        openApplication();

    }, 1000);

});


/* ========================================================= */
/* MOSTRAR REGISTRO */
/* ========================================================= */

function showRegister() {

    loginScreen.classList.add("hidden");

    registerScreen.classList.remove("hidden");

}


/* ========================================================= */
/* VOLVER AL LOGIN */
/* ========================================================= */

function showLogin() {

    registerScreen.classList.add("hidden");

    appScreen.classList.add("hidden");

    loginScreen.classList.remove("hidden");

}


/* ========================================================= */
/* CONTRASEÑA */
/* ========================================================= */

function togglePassword() {

    const password =
        document.getElementById("password");

    const icon =
        document.getElementById("passwordIcon");

    if (password.type === "password") {

        password.type = "text";

        icon.classList.remove("fa-eye");

        icon.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        icon.classList.remove("fa-eye-slash");

        icon.classList.add("fa-eye");

    }

}


/* ========================================================= */
/* OLVIDÉ MI CONTRASEÑA */
/* ========================================================= */

function forgotPassword() {

    openModal(`
        <div class="modal-icon card-icon green">
            <i class="fa-solid fa-lock"></i>
        </div>

        <h2 style="margin-top:18px;">
            Recuperar contraseña
        </h2>

        <p style="margin:10px 0 20px;color:#94a3b8;">
            Escribe tu correo electrónico y te enviaremos
            las instrucciones para recuperar tu cuenta.
        </p>

        <input
            id="recoveryEmail"
            type="email"
            placeholder="correo@ejemplo.com"
        />

        <button
            class="main-button"
            style="margin-top:15px;"
            onclick="sendRecovery()">

            Enviar instrucciones

        </button>
    `);

}


function sendRecovery() {

    const email =
        document.getElementById("recoveryEmail").value.trim();

    if (!email) {

        alert("Escribe tu correo electrónico.");

        return;

    }

    alert(
        "Se han enviado las instrucciones de recuperación a "
        + email
    );

    closeModal();

}


/* ========================================================= */
/* LOGIN SOCIAL */
/* ========================================================= */

function socialLogin(provider) {

    alert(
        "Inicio de sesión con "
        + provider
        + " seleccionado.\n\n"
        + "Esta función queda preparada para conectar "
        + "posteriormente con el servicio de autenticación."
    );

}


/* ========================================================= */
/* NAVEGACIÓN */
/* ========================================================= */

function navigateTo(section) {

    const content =
        document.getElementById("dynamicContent");

    document.querySelectorAll(".nav-item")
        .forEach(function (item) {

            item.classList.remove("active");

        });


    if (section === "inicio") {

        content.innerHTML = "";

        document.querySelectorAll(".nav-item")[0]
            .classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;
    }


    if (section === "historial") {

        content.innerHTML = `

            <div class="dynamic-card">

                <h2>Historial médico</h2>

                <div class="data-list">

                    <div class="data-row">
                        <strong>RC-0481</strong>
                        <span>12 Sep 2026</span>
                    </div>

                    <div class="data-row">
                        <strong>RC-0438</strong>
                        <span>25 Ago 2026</span>
                    </div>

                    <div class="data-row">
                        <strong>RC-0395</strong>
                        <span>18 Jul 2026</span>
                    </div>

                    <div class="data-row">
                        <strong>RC-0321</strong>
                        <span>15 Jun 2026</span>
                    </div>

                </div>

            </div>
        `;

        document.querySelectorAll(".nav-item")[1]
            .classList.add("active");
    }


    if (section === "medicamentos") {

        content.innerHTML = `

            <div class="dynamic-card">

                <h2>Mis medicamentos</h2>

                <div class="data-list">

                    <div class="data-row">
                        <strong>Metformina 500 mg</strong>
                        <span>Activo</span>
                    </div>

                    <div class="data-row">
                        <strong>Lisinopril 10 mg</strong>
                        <span>Activo</span>
                    </div>

                    <div class="data-row">
                        <strong>Atorvastatina 20 mg</strong>
                        <span>Activo</span>
                    </div>

                    <div class="data-row">
                        <strong>Omeprazol 20 mg</strong>
                        <span>Activo</span>
                    </div>

                </div>

            </div>
        `;

        document.querySelectorAll(".nav-item")[2]
            .classList.add("active");
    }


    if (section === "agendar") {

        content.innerHTML = `

            <div class="dynamic-card">

                <h2>Agendar colección</h2>

                <p style="color:#94a3b8;margin-bottom:20px;">
                    Selecciona el medicamento que deseas recoger.
                </p>

                <div class="data-list">

                    <button
                        class="data-row"
                        onclick="scheduleMedication('Metformina 500 mg')">

                        <strong>Metformina 500 mg</strong>

                        <span>
                            <i class="fa-solid fa-chevron-right"></i>
                        </span>

                    </button>

                    <button
                        class="data-row"
                        onclick="scheduleMedication('Lisinopril 10 mg')">

                        <strong>Lisinopril 10 mg</strong>

                        <span>
                            <i class="fa-solid fa-chevron-right"></i>
                        </span>

                    </button>

                    <button
                        class="data-row"
                        onclick="scheduleMedication('Atorvastatina 20 mg')">

                        <strong>Atorvastatina 20 mg</strong>

                        <span>
                            <i class="fa-solid fa-chevron-right"></i>
                        </span>

                    </button>

                </div>

            </div>
        `;

        document.querySelectorAll(".nav-item")[3]
            .classList.add("active");
    }


    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

}


/* ========================================================= */
/* AGENDAR MEDICAMENTO */
/* ========================================================= */

function scheduleMedication(medicine) {

    openModal(`

        <h2>Agendar colección</h2>

        <p style="margin:10px 0 20px;color:#94a3b8;">
            Medicamento seleccionado:
            <strong>${medicine}</strong>
        </p>

        <div class="form-group">

            <label>Fecha</label>

            <input
                id="appointmentDate"
                type="date"
            />

        </div>

        <div class="form-group">

            <label>Hora</label>

            <select
                id="appointmentTime"
                style="
                    width:100%;
                    height:55px;
                    border:1px solid #e0e7eb;
                    border-radius:14px;
                    padding:0 15px;
                ">

                <option>08:00 AM</option>
                <option>09:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>02:00 PM</option>
                <option>03:00 PM</option>
                <option>04:00 PM</option>

            </select>

        </div>

        <button
            class="main-button"
            onclick="confirmAppointment('${medicine}')">

            Confirmar cita

        </button>

    `);

}


/* ========================================================= */
/* CONFIRMAR CITA */
/* ========================================================= */

function confirmAppointment(medicine) {

    const date =
        document.getElementById("appointmentDate").value;

    const time =
        document.getElementById("appointmentTime").value;

    if (!date) {

        alert("Selecciona una fecha.");

        return;

    }

    openModal(`

        <div style="text-align:center;">

            <div
                style="
                    width:70px;
                    height:70px;
                    margin:auto;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    border-radius:50%;
                    background:#e5f8f1;
                    color:#0fa37f;
                    font-size:30px;
                ">

                <i class="fa-solid fa-check"></i>

            </div>

            <h2 style="margin-top:20px;">
                ¡Cita confirmada!
            </h2>

            <p style="margin-top:10px;color:#94a3b8;">
                ${medicine}
            </p>

            <p style="margin-top:5px;color:#94a3b8;">
                Fecha: ${date}
            </p>

            <p style="margin-top:5px;color:#94a3b8;">
                Hora: ${time}
            </p>

            <button
                class="main-button"
                style="margin-top:25px;"
                onclick="closeModal()">

                Finalizar

            </button>

        </div>

    `);

}


/* ========================================================= */
/* CAMBIAR DROGUERÍA */
/* ========================================================= */

function changePharmacy() {

    const select =
        document.getElementById("pharmacySelect");

    const pharmacy =
        select.value;

    let distance = "0,8 km";

    if (pharmacy === "Medicap Norte") {
        distance = "2,3 km";
    }

    if (pharmacy === "Medicap Sur") {
        distance = "3,5 km";
    }

    if (pharmacy === "Medicap Chapinero") {
        distance = "4,1 km";
    }

    document.getElementById(
        "selectedPharmacy"
    ).textContent =
        pharmacy + " · " + distance;

    document.getElementById(
        "collectionPharmacy"
    ).textContent =
        pharmacy;

}


/* ========================================================= */
/* PRÓXIMA RECOGIDA */
/* ========================================================= */

function viewCollection() {

    openModal(`

        <h2>Próxima recogida</h2>

        <div style="
            margin-top:20px;
            padding:18px;
            background:#f2fbf8;
            border-radius:15px;
        ">

            <strong>
                Metformina 500 mg
            </strong>

            <p style="
                margin-top:8px;
                color:#64748b;
            ">

                28 de octubre de 2026

            </p>

            <p style="
                margin-top:5px;
                color:#64748b;
            ">

                10:00 AM

            </p>

            <p style="
                margin-top:5px;
                color:#64748b;
            ">

                Medicap Centro

            </p>

        </div>

        <button
            class="main-button"
            style="margin-top:20px;"
            onclick="closeModal()">

            Cerrar

        </button>

    `);

}


/* ========================================================= */
/* PERFIL */
/* ========================================================= */

function showProfile() {

    openModal(`

        <div style="text-align:center;">

            <div
                style="
                    width:75px;
                    height:75px;
                    margin:auto;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    border-radius:50%;
                    background:#0fa37f;
                    color:white;
                    font-size:22px;
                    font-weight:900;
                ">

                ${getInitials(currentUser.name)}

            </div>

            <h2 style="margin-top:15px;">
                ${capitalizeWords(currentUser.name)}
            </h2>

            <p style="color:#94a3b8;margin-top:5px;">
                ${currentUser.email}
            </p>

        </div>

        <div style="margin-top:25px;">

            <div class="data-row">
                <strong>Teléfono</strong>
                <span>${currentUser.phone}</span>
            </div>

            <div class="data-row">
                <strong>Dirección</strong>
                <span>${currentUser.address}</span>
            </div>

            <div class="data-row">
                <strong>EPS</strong>
                <span>${currentUser.eps}</span>
            </div>

        </div>

        <button
            class="main-button"
            style="margin-top:20px;"
            onclick="logout()">

            Cerrar sesión

        </button>

    `);

}


/* ========================================================= */
/* CERRAR SESIÓN */
/* ========================================================= */

function logout() {

    closeModal();

    appScreen.classList.add("hidden");

    loginScreen.classList.remove("hidden");

    document.getElementById("password").value = "";

}


/* ========================================================= */
/* MODAL */
/* ========================================================= */

function openModal(content) {

    modalContent.innerHTML = content;

    modal.classList.remove("hidden");

}


function closeModal() {

    modal.classList.add("hidden");

    modalContent.innerHTML = "";

}


/* ========================================================= */
/* CLICK FUERA DEL MODAL */
/* ========================================================= */

modal.addEventListener("click", function (event) {

    if (event.target === modal) {

        closeModal();

    }

});


/* ========================================================= */
/* MENSAJES */
/* ========================================================= */

function showMessage(element, message, type) {

    element.textContent = message;

    if (type === "error") {

        element.style.color = "#dc2626";

    } else {

        element.style.color = "#0f9d7c";

    }

}


/* ========================================================= */
/* FUNCIONES AUXILIARES */
/* ========================================================= */

function getInitials(name) {

    const parts =
        name.trim().split(/\s+/);

    if (parts.length === 1) {

        return parts[0]
            .substring(0, 2)
            .toUpperCase();

    }

    return (
        parts[0][0]
        + parts[parts.length - 1][0]
    ).toUpperCase();

}


function capitalizeWords(text) {

    return text
        .toLowerCase()
        .replace(/\b\w/g, function (letter) {
            return letter.toUpperCase();
        });

}