/* ========================================= */
/* SISTEMA DE CHECKOUT */
/* ========================================= */

let pasoActual = 1
let carrito = []

// Inicializar checkout
document.addEventListener("DOMContentLoaded", () => {
  cargarCarritoDesdeStorage()
  mostrarProductosCheckout()
  calcularTotalesCheckout()
  configurarFormularios()
})

// Cargar carrito desde localStorage
function cargarCarritoDesdeStorage() {
  try {
    const carritoGuardado = localStorage.getItem("otechnology_carrito")
    if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado)
    }
  } catch (error) {
    console.error("Error al cargar carrito:", error)
    carrito = []
  }
}

// Mostrar productos en checkout
function mostrarProductosCheckout() {
  const contenedor = document.getElementById("productos-checkout")

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p class="text-gray-500 text-center">No hay productos en el carrito</p>'
    return
  }

  contenedor.innerHTML = carrito
    .map(
      (item) => `
        <div class="flex items-center gap-3 py-2">
            <img src="/placeholder.svg?height=50&width=50&text=${encodeURIComponent(item.nombre)}" 
                 alt="${item.nombre}" class="w-12 h-12 object-cover rounded">
            <div class="flex-1">
                <h4 class="font-semibold text-sm">${item.nombre}</h4>
                <p class="text-xs text-gray-500">Cantidad: ${item.cantidad}</p>
            </div>
            <span class="font-bold text-sm">$${(item.precio * item.cantidad).toLocaleString()}</span>
        </div>
    `,
    )
    .join("")
}

// Calcular totales en checkout
function calcularTotalesCheckout() {
  const subtotal = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0)
  const iva = Math.round(subtotal * 0.19)
  const costoEnvio = subtotal >= 100000 ? 0 : 15000
  const total = subtotal + iva + costoEnvio

  document.getElementById("subtotal-checkout").textContent = `$${subtotal.toLocaleString()}`
  document.getElementById("iva-checkout").textContent = `$${iva.toLocaleString()}`
  document.getElementById("costo-envio-checkout").textContent =
    costoEnvio === 0 ? "Gratis" : `$${costoEnvio.toLocaleString()}`
  document.getElementById("total-checkout").textContent = `$${total.toLocaleString()}`
}

// Configurar formularios
function configurarFormularios() {
  // Formatear número de tarjeta
  const numeroTarjeta = document.getElementById("numero-tarjeta")
  if (numeroTarjeta) {
    numeroTarjeta.addEventListener("input", function () {
      const valor = this.value.replace(/\s/g, "").replace(/[^0-9]/gi, "")
      const valorFormateado = valor.match(/.{1,4}/g)?.join(" ") || valor
      this.value = valorFormateado
    })
  }

  // Formatear fecha de vencimiento
  const fechaVencimiento = document.getElementById("fecha-vencimiento")
  if (fechaVencimiento) {
    fechaVencimiento.addEventListener("input", function () {
      let valor = this.value.replace(/\D/g, "")
      if (valor.length >= 2) {
        valor = valor.substring(0, 2) + "/" + valor.substring(2, 4)
      }
      this.value = valor
    })
  }

  // Formatear CVV
  const cvv = document.getElementById("cvv")
  if (cvv) {
    cvv.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "")
    })
  }
}

// Siguiente paso
function siguientePaso() {
  if (validarPasoActual()) {
    pasoActual++
    actualizarPasos()
    actualizarBarraProgreso()
  }
}

// Paso anterior
function anteriorPaso() {
  if (pasoActual > 1) {
    pasoActual--
    actualizarPasos()
    actualizarBarraProgreso()
  }
}

// Validar paso actual
function validarPasoActual() {
  switch (pasoActual) {
    case 1:
      return validarInformacionPersonal()
    case 2:
      return validarInformacionPago()
    default:
      return true
  }
}

// Validar información personal
function validarInformacionPersonal() {
  const campos = [
    "nombre",
    "apellido",
    "email",
    "telefono",
    "documento",
    "tipo-documento",
    "direccion",
    "ciudad",
    "departamento",
  ]

  for (const campo of campos) {
    const elemento = document.getElementById(campo)
    if (!elemento.value.trim()) {
      mostrarNotificacion(`Por favor completa el campo ${campo.replace("-", " ")}`, "error")
      elemento.focus()
      return false
    }
  }

  // Validar email
  const email = document.getElementById("email").value
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    mostrarNotificacion("Por favor ingresa un email válido", "error")
    return false
  }

  return true
}

// Validar información de pago
function validarInformacionPago() {
  const metodoPago = document.querySelector('input[name="metodo-pago"]:checked').value

  if (metodoPago === "tarjeta") {
    const campos = ["numero-tarjeta", "fecha-vencimiento", "cvv", "nombre-tarjeta"]

    for (const campo of campos) {
      const elemento = document.getElementById(campo)
      if (!elemento.value.trim()) {
        mostrarNotificacion(`Por favor completa el campo ${campo.replace("-", " ")}`, "error")
        elemento.focus()
        return false
      }
    }

    // Validar número de tarjeta (básico)
    const numeroTarjeta = document.getElementById("numero-tarjeta").value.replace(/\s/g, "")
    if (numeroTarjeta.length < 16) {
      mostrarNotificacion("Número de tarjeta inválido", "error")
      return false
    }
  }

  return true
}

// Actualizar pasos
function actualizarPasos() {
  // Ocultar todos los pasos
  document.getElementById("paso-1").classList.add("hidden")
  document.getElementById("paso-2").classList.add("hidden")
  document.getElementById("paso-3").classList.add("hidden")

  // Mostrar paso actual
  document.getElementById(`paso-${pasoActual}`).classList.remove("hidden")

  // Si es el paso 3, generar resumen
  if (pasoActual === 3) {
    generarResumenPedido()
  }
}

// Actualizar barra de progreso
function actualizarBarraProgreso() {
  const pasos = document.querySelectorAll(".progress-bar .step")
  const barras = document.querySelectorAll(".progress-bar .bar")

  pasos.forEach((paso, index) => {
    if (index < pasoActual) {
      paso.classList.add("completed")
    } else if (index === pasoActual - 1) {
      paso.classList.add("active")
    } else {
      paso.classList.remove("completed", "active")
    }
  })

  barras.forEach((barra, index) => {
    if (index < pasoActual - 1) {
      barra.classList.add("completed")
    } else {
      barra.classList.remove("completed")
    }
  })
}

// Generar resumen del pedido
function generarResumenPedido() {
  const resumen = document.getElementById("resumen-pedido")

  const datosPersonales = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    email: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
    direccion: document.getElementById("direccion").value,
    ciudad: document.getElementById("ciudad").value,
    departamento: document.getElementById("departamento").value,
  }

  const metodoPago = document.querySelector('input[name="metodo-pago"]:checked').value

  resumen.innerHTML = `
        <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 class="font-bold mb-2">Información Personal</h4>
            <p><strong>Nombre:</strong> ${datosPersonales.nombre} ${datosPersonales.apellido}</p>
            <p><strong>Email:</strong> ${datosPersonales.email}</p>
            <p><strong>Teléfono:</strong> ${datosPersonales.telefono}</p>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 class="font-bold mb-2">Dirección de Envío</h4>
            <p>${datosPersonales.direccion}</p>
            <p>${datosPersonales.ciudad}, ${datosPersonales.departamento}</p>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 class="font-bold mb-2">Método de Pago</h4>
            <p class="capitalize">${metodoPago === "tarjeta" ? "Tarjeta de Crédito/Débito" : metodoPago.toUpperCase()}</p>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-bold mb-2">Productos</h4>
            ${carrito
              .map(
                (item) => `
                <div class="flex justify-between py-1">
                    <span>${item.nombre} x${item.cantidad}</span>
                    <span>$${(item.precio * item.cantidad).toLocaleString()}</span>
                </div>
            `,
              )
              .join("")}
        </div>
    `
}

// Confirmar pedido
function confirmarPedido() {
  const aceptoTerminos = document.getElementById("acepto-terminos").checked

  if (!aceptoTerminos) {
    mostrarNotificacion("Debes aceptar los términos y condiciones", "error")
    return
  }

  // Mostrar loading
  mostrarLoading()

  // Simular procesamiento de pago
  setTimeout(() => {
    ocultarLoading()

    // Limpiar carrito
    localStorage.removeItem("otechnology_carrito")

    // Redirigir a página de confirmación
    window.location.href = "confirmacion.html?pedido=" + generarNumeroPedido()
  }, 3000)
}

// Generar número de pedido
function generarNumeroPedido() {
  return "OT" + Date.now().toString().slice(-8)
}

// Mostrar loading
function mostrarLoading() {
  const overlay = document.createElement("div")
  overlay.id = "loading-overlay"
  overlay.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  overlay.innerHTML = `
        <div class="bg-white rounded-lg p-8 text-center">
            <div class="spinner mx-auto mb-4"></div>
            <h3 class="text-xl font-bold mb-2">Procesando tu pago...</h3>
            <p class="text-gray-600">Por favor no cierres esta ventana</p>
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

console.log("Sistema de checkout inicializado correctamente")
