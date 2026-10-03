// ==========================================
// Funcionalidades del Gimnasio Titán
// ==========================================

// ---------- 1. Menú para celulares (mostrar / ocultar) ----------
const botonMenu = document.getElementById("botonMenu");
const menu = document.getElementById("menu");

botonMenu.addEventListener("click", function () {
    menu.classList.toggle("abierto");
});

// Cierra el menú al hacer clic en un enlace
menu.querySelectorAll("a").forEach(function (enlace) {
    enlace.addEventListener("click", function () {
        menu.classList.remove("abierto");
    });
});

// ---------- 2. Filtro de clases por tipo ----------
const filtros = document.querySelectorAll(".filtro");
const clases = document.querySelectorAll(".clase");

filtros.forEach(function (filtro) {
    filtro.addEventListener("click", function () {
        const tipo = filtro.dataset.tipo;

        // Marca el botón activo
        filtros.forEach(function (f) {
            f.classList.remove("activo");
        });
        filtro.classList.add("activo");

        // Muestra solo las clases del tipo elegido
        clases.forEach(function (clase) {
            if (tipo === "todas" || clase.dataset.tipo === tipo) {
                clase.style.display = "block";
            } else {
                clase.style.display = "none";
            }
        });
    });
});

// ---------- 3. Botón "Elegir plan" ----------
// Selecciona el plan en el formulario y baja hasta la inscripción
const botonesPlan = document.querySelectorAll(".boton-plan");
const selectPlan = document.getElementById("plan");

botonesPlan.forEach(function (boton) {
    boton.addEventListener("click", function () {
        selectPlan.value = boton.dataset.plan;
        document.getElementById("inscripcion").scrollIntoView();
        document.getElementById("nombre").focus();
    });
});

// ---------- 4. Validación del formulario ----------
const formulario = document.getElementById("formInscripcion");
const mensajeExito = document.getElementById("mensajeExito");

function mostrarError(campo, idError, mensaje) {
    document.getElementById(idError).textContent = mensaje;
    if (mensaje) {
        campo.classList.add("invalido");
    } else {
        campo.classList.remove("invalido");
    }
    return mensaje === "";
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const telefono = document.getElementById("telefono");

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoValido = /^[67]\d{7}$/; // celular boliviano: 8 dígitos, empieza con 6 o 7

    let valido = true;

    if (nombre.value.trim().length < 3) {
        valido = mostrarError(nombre, "errorNombre", "Ingresa tu nombre (mínimo 3 letras).") && valido;
    } else {
        mostrarError(nombre, "errorNombre", "");
    }

    if (!correoValido.test(correo.value.trim())) {
        valido = mostrarError(correo, "errorCorreo", "Ingresa un correo válido.") && valido;
    } else {
        mostrarError(correo, "errorCorreo", "");
    }

    if (!telefonoValido.test(telefono.value.trim())) {
        valido = mostrarError(telefono, "errorTelefono", "Ingresa un celular de 8 dígitos (ej: 71234567).") && valido;
    } else {
        mostrarError(telefono, "errorTelefono", "");
    }

    if (selectPlan.value === "") {
        valido = mostrarError(selectPlan, "errorPlan", "Selecciona un plan.") && valido;
    } else {
        mostrarError(selectPlan, "errorPlan", "");
    }

    if (valido) {
        mensajeExito.textContent =
            "¡Gracias, " + nombre.value.trim() + "! Tu inscripción al plan " +
            selectPlan.value + " fue registrada. Te contactaremos pronto.";
        formulario.reset();
    } else {
        mensajeExito.textContent = "";
    }
});
