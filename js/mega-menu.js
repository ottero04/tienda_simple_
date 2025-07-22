/* ========================================= */
/* FUNCIONALIDAD DEL MEGA MENÚ */
/* ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Obtener todos los contenedores de mega menú
  const megaMenuContainers = document.querySelectorAll(".mega-menu-container")

  megaMenuContainers.forEach((container) => {
    const trigger = container.querySelector(".mega-menu-trigger")
    const menu = container.querySelector(".mega-menu")

    if (trigger && menu) {
      // Mostrar mega menú al pasar el mouse
      container.addEventListener("mouseenter", () => {
        menu.classList.remove("hidden")
        menu.classList.add("block")
        console.log("Mega menú mostrado")
      })

      // Ocultar mega menú al quitar el mouse
      container.addEventListener("mouseleave", () => {
        menu.classList.remove("block")
        menu.classList.add("hidden")
        console.log("Mega menú ocultado")
      })

      // Manejar clics en enlaces del mega menú
      const enlaces = menu.querySelectorAll("a")
      enlaces.forEach((enlace) => {
        enlace.addEventListener("click", function () {
          // Ocultar el mega menú
          menu.classList.remove("block")
          menu.classList.add("hidden")
          console.log(`Navegando a: ${this.href}`)
        })
      })
    }
  })

  // Cerrar todos los mega menús al hacer clic fuera
  document.addEventListener("click", (evento) => {
    if (!evento.target.closest(".mega-menu-container")) {
      const todosLosMegaMenus = document.querySelectorAll(".mega-menu")
      todosLosMegaMenus.forEach((menu) => {
        menu.classList.remove("block")
        menu.classList.add("hidden")
      })
    }
  })

  // Cerrar mega menús con tecla Escape
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      const todosLosMegaMenus = document.querySelectorAll(".mega-menu")
      todosLosMegaMenus.forEach((menu) => {
        menu.classList.remove("block")
        menu.classList.add("hidden")
      })
    }
  })

  console.log("Sistema de mega menú inicializado correctamente")
})
