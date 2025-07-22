/* ========================================= */
/* SISTEMA DE CARRITO COMPLETO */
/* ========================================= */

let carrito = []

// Inicializar carrito completo
document.addEventListener("DOMContentLoaded", () => {
  cargarCarritoDesdeStorage()
  mostrarProductosCarrito()
  calcularTotales()
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

// Mostrar productos en el carrito
function mostrarProductosCarrito() {
  const contenedorProductos = document.getElementById("carrito-productos")
  const carritoVacio = document.getElementById("carrito-vacio")

  if (carrito.length === 0) {
    contenedorProductos.classList.add("hidden")
    carritoVacio.classList.remove("hidden")
    return
  }

  contenedorProductos.classList.remove("hidden")
  carritoVacio.classList.add("hidden")

  contenedorProductos.innerHTML = carrito
    .map(
      (item) => `
        <div class="carrito-item flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
            <img src="/placeholder.svg?height=80&width=80&text=${encodeURIComponent(item.nombre)}" 
                 alt="${item.nombre}" class="w-20 h-20 object-cover rounded">
            
            <div class="flex-1">
                <h3 class="font-bold text-gray-800">${item.nombre}</h3>
                <p class="text-orange-600 font-semibold">$${item.precio.toLocaleString()}</p>
            </div>
            
            <div class="flex items-center gap-3">
                <button onclick="actualizarCantidad('${item.id}', ${item.cantidad - 1})" 
                        class="w-8 h-8 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition">
                    <i class="fas fa-minus text-xs"></i>
                </button>
                <span class="w-12 text-center font-semibold">${item.cantidad}</span>
                <button onclick="actualizarCantidad('${item.id}', ${item.cantidad + 1})" 
                        class="w-8 h-8 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition">
                    <i class="fas fa-plus text-xs"></i>
                </button>
            </div>
            
            <div class="text-right">
                <p class="font-bold text-lg">$${(item.precio * item.cantidad).toLocaleString()}</p>
                <button onclick="eliminarProducto('${item.id}')" 
                        class="text-red-500 hover:text-red-700 transition text-sm">
                    <i class="fas fa-trash mr-1"></i>Eliminar
                </button>
            </div>
        </div>
    `,
    )
    .join("")
}

// Actualizar cantidad de producto
function actualizarCantidad(idProducto, nuevaCantidad) {
  if (nuevaCantidad <= 0) {
    eliminarProducto(idProducto)
    return
  }

  const producto = carrito.find((item) => item.id === idProducto)
  if (producto) {
    producto.cantidad = nuevaCantidad
    guardarCarritoEnStorage()
    mostrarProductosCarrito()
    calcularTotales()
    mostrarNotificacion("Cantidad actualizada", "info")
  }
}

// Eliminar producto del carrito
function eliminarProducto(idProducto) {
  const indice = carrito.findIndex((item) => item.id === idProducto)
  if (indice !== -1) {
    const nombreProducto = carrito[indice].nombre
    carrito.splice(indice, 1)
    guardarCarritoEnStorage()
    mostrarProductosCarrito()
    calcularTotales()
    mostrarNotificacion(`${nombreProducto} eliminado del carrito`, "error")
  }
}

// Calcular totales
function calcularTotales() {
  const subtotal = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0)
  const iva = Math.round(subtotal * 0.19)
  const costoEnvio = subtotal >= 100000 ? 0 : 15000 // Envío gratis por compras mayores a $100.000
  const total = subtotal + iva + costoEnvio

  // Actualizar elementos del DOM
  document.getElementById("subtotal-carrito").textContent = `$${subtotal.toLocaleString()}`
  document.getElementById("iva-carrito").textContent = `$${iva.toLocaleString()}`
  document.getElementById("costo-envio").textContent = costoEnvio === 0 ? "Gratis" : `$${costoEnvio.toLocaleString()}`
  document.getElementById("total-carrito").textContent = `$${total.toLocaleString()}`
}

// Aplicar cupón de descuento
function aplicarCupon() {
  const codigoCupon = document.getElementById("codigo-cupon").value.trim().toUpperCase()

  // Cupones de ejemplo
  const cupones = {
    DESCUENTO10: { descuento: 0.1, descripcion: "10% de descuento" },
    BIENVENIDO: { descuento: 0.05, descripcion: "5% de descuento" },
    BLACKFRIDAY: { descuento: 0.25, descripcion: "25% de descuento" },
  }

  if (cupones[codigoCupon]) {
    const cupon = cupones[codigoCupon]
    mostrarNotificacion(`Cupón aplicado: ${cupon.descripcion}`, "success")
    // Aquí aplicarías el descuento a los totales
    document.getElementById("codigo-cupon").value = ""
  } else if (codigoCupon) {
    mostrarNotificacion("Cupón no válido", "error")
  } else {
    mostrarNotificacion("Ingresa un código de cupón", "info")
  }
}

// Guardar carrito en localStorage
function guardarCarritoEnStorage() {
  try {
    localStorage.setItem("otechnology_carrito", JSON.stringify(carrito))
  } catch (error) {
    console.error("Error al guardar carrito:", error)
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

console.log("Sistema de carrito completo inicializado correctamente")
