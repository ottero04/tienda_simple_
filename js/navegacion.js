/* ========================================= */
/* SISTEMA DE NAVEGACIÓN MEJORADO */
/* ========================================= */

// Función para hacer scroll suave a una sección
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
    console.log(`Navegando a sección: ${sectionId}`)
  } else {
    console.error(`Sección no encontrada: ${sectionId}`)
  }
}

// Función para buscar productos
function buscarProductos() {
  const campoBusqueda = document.getElementById("campo-busqueda")
  const consulta = campoBusqueda.value.trim()

  if (consulta) {
    console.log(`Realizando búsqueda: "${consulta}"`)
    // Redirigir a página de resultados de búsqueda
    window.location.href = `paginas/busqueda.html?q=${encodeURIComponent(consulta)}`
  } else {
    mostrarNotificacion("Por favor ingresa un término de búsqueda", "info")
  }
}

// Función para mostrar notificaciones
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

// Configurar búsqueda al presionar Enter
document.addEventListener("DOMContentLoaded", () => {
  const campoBusqueda = document.getElementById("campo-busqueda")
  if (campoBusqueda) {
    campoBusqueda.addEventListener("keypress", (evento) => {
      if (evento.key === "Enter") {
        buscarProductos()
      }
    })
  }
})

console.log("Sistema de navegación inicializado correctamente")
