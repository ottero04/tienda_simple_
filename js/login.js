/* ========================================= */
/* SISTEMA DE LOGIN Y REGISTRO */
/* ========================================= */

// Inicializar sistema de login
document.addEventListener("DOMContentLoaded", () => {
  configurarTabs()
  configurarFormularios()
})

// Configurar tabs
function configurarTabs() {
  const tabLogin = document.getElementById("tab-login")
  const tabRegister = document.getElementById("tab-register")
  const formLogin = document.getElementById("form-login")
  const formRegister = document.getElementById("form-register")

  tabLogin.addEventListener("click", () => {
    // Activar tab login
    tabLogin.classList.add("bg-orange-600", "text-white")
    tabLogin.classList.remove("bg-gray-200", "text-gray-700")

    // Desactivar tab register
    tabRegister.classList.remove("bg-orange-600", "text-white")
    tabRegister.classList.add("bg-gray-200", "text-gray-700")

    // Mostrar formulario login
    formLogin.classList.remove("hidden")
    formRegister.classList.add("hidden")
  })

  tabRegister.addEventListener("click", () => {
    // Activar tab register
    tabRegister.classList.add("bg-orange-600", "text-white")
    tabRegister.classList.remove("bg-gray-200", "text-gray-700")

    // Desactivar tab login
    tabLogin.classList.remove("bg-orange-600", "text-white")
    tabLogin.classList.add("bg-gray-200", "text-gray-700")

    // Mostrar formulario register
    formRegister.classList.remove("hidden")
    formLogin.classList.add("hidden")
  })
}

// Configurar formularios
function configurarFormularios() {
  // Formulario de login
  const formLogin = document.querySelector("#form-login form")
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault()
    procesarLogin()
  })

  // Formulario de registro
  const formRegister = document.querySelector("#form-register form")
  formRegister.addEventListener("submit", (e) => {
    e.preventDefault()
    procesarRegistro()
  })
}

// Procesar login
function procesarLogin() {
  const email = document.getElementById("login-email").value
  const password = document.getElementById("login-password").value

  if (!email || !password) {
    mostrarNotificacion("Por favor completa todos los campos", "error")
    return
  }

  // Validar email
  if (!validarEmail(email)) {
    mostrarNotificacion("Por favor ingresa un email válido", "error")
    return
  }

  // Mostrar loading
  mostrarLoading()

  // Simular autenticación
  setTimeout(() => {
    ocultarLoading()

    // Guardar sesión
    const usuario = {
      email: email,
      nombre: "Usuario",
      fechaLogin: new Date().toISOString(),
    }

    localStorage.setItem("otechnology_usuario", JSON.stringify(usuario))

    mostrarNotificacion("¡Bienvenido de vuelta!", "success")

    // Redirigir después de 1 segundo
    setTimeout(() => {
      window.location.href = "../index.html"
    }, 1000)
  }, 2000)
}

// Procesar registro
function procesarRegistro() {
  const nombre = document.getElementById("register-nombre").value
  const apellido = document.getElementById("register-apellido").value
  const email = document.getElementById("register-email").value
  const telefono = document.getElementById("register-telefono").value
  const password = document.getElementById("register-password").value
  const confirmPassword = document.getElementById("register-confirm-password").value
  const aceptoPoliticas = document.getElementById("acepto-politicas").checked

  // Validaciones
  if (!nombre || !apellido || !email || !telefono || !password || !confirmPassword) {
    mostrarNotificacion("Por favor completa todos los campos", "error")
    return
  }

  if (!validarEmail(email)) {
    mostrarNotificacion("Por favor ingresa un email válido", "error")
    return
  }

  if (password.length < 8) {
    mostrarNotificacion("La contraseña debe tener al menos 8 caracteres", "error")
    return
  }

  if (password !== confirmPassword) {
    mostrarNotificacion("Las contraseñas no coinciden", "error")
    return
  }

  if (!aceptoPoliticas) {
    mostrarNotificacion("Debes aceptar los términos y condiciones", "error")
    return
  }

  // Mostrar loading
  mostrarLoading()

  // Simular registro
  setTimeout(() => {
    ocultarLoading()

    // Guardar usuario
    const usuario = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      telefono: telefono,
      fechaRegistro: new Date().toISOString(),
    }

    localStorage.setItem("otechnology_usuario", JSON.stringify(usuario))

    mostrarNotificacion("¡Cuenta creada exitosamente!", "success")

    // Redirigir después de 1 segundo
    setTimeout(() => {
      window.location.href = "../index.html"
    }, 1000)
  }, 2000)
}

// Toggle password visibility
function togglePassword(inputId) {
  const input = document.getElementById(inputId)
  const icon = input.nextElementSibling.querySelector("i")

  if (input.type === "password") {
    input.type = "text"
    icon.classList.remove("fa-eye")
    icon.classList.add("fa-eye-slash")
  } else {
    input.type = "password"
    icon.classList.remove("fa-eye-slash")
    icon.classList.add("fa-eye")
  }
}

// Validar email
function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Mostrar loading
function mostrarLoading() {
  const overlay = document.createElement("div")
  overlay.id = "loading-overlay"
  overlay.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  overlay.innerHTML = `
        <div class="bg-white rounded-lg p-8 text-center">
            <div class="spinner mx-auto mb-4"></div>
            <h3 class="text-xl font-bold mb-2">Procesando...</h3>
            <p class="text-gray-600">Por favor espera un momento</p>
        </div>
    `
  document.body.appendChild(overlay)
}

// Ocultar loading
function ocultarLoading() {
  const overlay = document.getElementById("loading-overlay")
  if (overlay) {
    overlay.remove()
  }
}

// Mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = "success") {
  const notificacion = document.createElement("div")
  notificacion.className = `notificacion-carrito ${tipo === "error" ? "bg-red-600" : tipo === "info" ? "bg-blue-600" : "bg-green-600"}`
  notificacion.textContent = mensaje

  document.body.appendChild(notificacion)

  setTimeout(() => {
    notificacion.classList.add("mostrar")
  }, 100)

  setTimeout(() => {
    notificacion.classList.remove("mostrar")
    setTimeout(() => {
      if (document.body.contains(notificacion)) {
        document.body.removeChild(notificacion)
      }
    }, 300)
  }, 3000)
}

console.log("Sistema de login inicializado correctamente")
