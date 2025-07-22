/* ========================================= */
/* SISTEMA DE PRODUCTOS CELULARES */
/* ========================================= */

// Base de datos de productos celulares
const productosDB = [
  // iPhones
  {
    id: "cel_001",
    nombre: "iPhone 16 Pro Max",
    marca: "iphone",
    precio: 1599000,
    capacidad: "256gb",
    imagen: "/placeholder.svg?height=300&width=300&text=iPhone+16+Pro+Max",
    categoria: "smartphone",
  },
  {
    id: "cel_002",
    nombre: "iPhone 16 Pro",
    marca: "iphone",
    precio: 1299000,
    capacidad: "128gb",
    imagen: "/placeholder.svg?height=300&width=300&text=iPhone+16+Pro",
    categoria: "smartphone",
  },
  {
    id: "cel_003",
    nombre: "iPhone 16",
    marca: "iphone",
    precio: 999000,
    capacidad: "128gb",
    imagen: "/placeholder.svg?height=300&width=300&text=iPhone+16",
    categoria: "smartphone",
  },
  {
    id: "cel_004",
    nombre: "iPhone 15",
    marca: "iphone",
    precio: 849000,
    capacidad: "128gb",
    imagen: "/placeholder.svg?height=300&width=300&text=iPhone+15",
    categoria: "smartphone",
  },

  // Samsung
  {
    id: "cel_005",
    nombre: "Samsung Galaxy S24 Ultra",
    marca: "samsung",
    precio: 1399000,
    capacidad: "256gb",
    imagen: "/placeholder.svg?height=300&width=300&text=Galaxy+S24+Ultra",
    categoria: "smartphone",
  },
  {
    id: "cel_006",
    nombre: "Samsung Galaxy S24+",
    marca: "samsung",
    precio: 1199000,
    capacidad: "256gb",
    imagen: "/placeholder.svg?height=300&width=300&text=Galaxy+S24+Plus",
    categoria: "smartphone",
  },
  {
    id: "cel_007",
    nombre: "Samsung Galaxy S24",
    marca: "samsung",
    precio: 899000,
    capacidad: "128gb",
    imagen: "/placeholder.svg?height=300&width=300&text=Galaxy+S24",
    categoria: "smartphone",
  },
  {
    id: "cel_008",
    nombre: "Samsung Galaxy A55",
    marca: "samsung",
    precio: 599000,
    capacidad: "128gb",
    imagen: "/placeholder.svg?height=300&width=300&text=Galaxy+A55",
    categoria: "smartphone",
  },

  // Xiaomi
  {
    id: "cel_009",
    nombre: "Xiaomi 14 Ultra",
    marca: "xiaomi",
    precio: 899000,
    capacidad: "256gb",
    imagen: "/placeholder.svg?height=300&width=300&text=Xiaomi+14+Ultra",
    categoria: "smartphone",
  },
  {
    id: "cel_010",
    nombre: "Xiaomi 14",
    marca: "xiaomi",
    precio: 699000,
    capacidad: "128gb",
    imagen: "/placeholder.svg?height=300&width=300&text=Xiaomi+14",
    categoria: "smartphone",
  },
  {
    id: "cel_011",
    nombre: "Xiaomi Redmi Note 13",
    marca: "xiaomi",
    precio: 399000,
    capacidad: "128gb",
    imagen: "/placeholder.svg?height=300&width=300&text=Redmi+Note+13",
    categoria: "smartphone",
  },

  // Motorola
  {
    id: "cel_012",
    nombre: "Motorola Edge 50 Pro",
    marca: "motorola",
    precio: 649000,
    capacidad: "256gb",
    imagen: "/placeholder.svg?height=300&width=300&text=Edge+50+Pro",
    categoria: "smartphone",
  },
  {
    id: "cel_013",
    nombre: "Motorola Edge 50",
    marca: "motorola",
    precio: 499000,
    capacidad: "128gb",
    imagen: "/placeholder.svg?height=300&width=300&text=Edge+50",
    categoria: "smartphone",
  },
  {
    id: "cel_014",
    nombre: "Motorola Moto G84",
    marca: "motorola",
    precio: 349000,
    capacidad: "128gb",
    imagen: "/placeholder.svg?height=300&width=300&text=Moto+G84",
    categoria: "smartphone",
  },

  // Huawei
  {
    id: "cel_015",
    nombre: "Huawei P60 Pro",
    marca: "huawei",
    precio: 799000,
    capacidad: "256gb",
    imagen: "/placeholder.svg?height=300&width=300&text=P60+Pro",
    categoria: "smartphone",
  },
  {
    id: "cel_016",
    nombre: "Huawei Nova 12",
    marca: "huawei",
    precio: 549000,
    capacidad: "128gb",
    imagen: "/placeholder.svg?height=300&width=300&text=Nova+12",
    categoria: "smartphone",
  },

  // Tabletas
  {
    id: "tab_001",
    nombre: 'iPad Pro 12.9"',
    marca: "iphone",
    precio: 1299000,
    capacidad: "128gb",
    imagen: "/placeholder.svg?height=300&width=300&text=iPad+Pro",
    categoria: "ipad",
  },
  {
    id: "tab_002",
    nombre: "iPad Air",
    marca: "iphone",
    precio: 899000,
    capacidad: "64gb",
    imagen: "/placeholder.svg?height=300&width=300&text=iPad+Air",
    categoria: "ipad",
  },
  {
    id: "tab_003",
    nombre: "Samsung Galaxy Tab S9",
    marca: "samsung",
    precio: 799000,
    capacidad: "128gb",
    imagen: "/placeholder.svg?height=300&width=300&text=Galaxy+Tab+S9",
    categoria: "android-tablet",
  },

  // Smartwatch
  {
    id: "watch_001",
    nombre: "Apple Watch Series 9",
    marca: "apple-watch",
    precio: 499000,
    capacidad: "64gb",
    imagen: "/placeholder.svg?height=300&width=300&text=Apple+Watch+9",
    categoria: "smartwatch",
  },
  {
    id: "watch_002",
    nombre: "Samsung Galaxy Watch 6",
    marca: "samsung-watch",
    precio: 399000,
    capacidad: "16gb",
    imagen: "/placeholder.svg?height=300&width=300&text=Galaxy+Watch+6",
    categoria: "smartwatch",
  },
  {
    id: "watch_003",
    nombre: "Huawei Watch GT 4",
    marca: "huawei-watch",
    precio: 299000,
    capacidad: "4gb",
    imagen: "/placeholder.svg?height=300&width=300&text=Huawei+Watch+GT4",
    categoria: "smartwatch",
  },
]

// Variables globales
let productosFiltrados = [...productosDB]
let paginaActual = 1
const productosPorPagina = 9

// Inicializar página
document.addEventListener("DOMContentLoaded", () => {
  aplicarFiltrosURL()
  configurarFiltros()
  configurarOrdenamiento()
  mostrarProductos()
  actualizarContadorCarrito()
})

// Aplicar filtros desde URL
function aplicarFiltrosURL() {
  const urlParams = new URLSearchParams(window.location.search)

  // Filtrar por marca
  const marca = urlParams.get("marca")
  if (marca) {
    const checkbox = document.querySelector(`input[value="${marca}"]`)
    if (checkbox) checkbox.checked = true
  }

  // Filtrar por categoría
  const categoria = urlParams.get("categoria")
  if (categoria) {
    productosFiltrados = productosDB.filter((producto) => producto.categoria === categoria)
  }

  // Filtrar por capacidad
  const capacidad = urlParams.get("capacidad")
  if (capacidad) {
    const checkbox = document.querySelector(`input[value="${capacidad}"]`)
    if (checkbox) checkbox.checked = true
  }

  aplicarFiltros()
}

// Configurar event listeners para filtros
function configurarFiltros() {
  // Filtros de marca
  const filtrosMarca = document.querySelectorAll(".filtro-marca")
  filtrosMarca.forEach((filtro) => {
    filtro.addEventListener("change", aplicarFiltros)
  })

  // Filtros de precio
  const filtrosPrecio = document.querySelectorAll(".filtro-precio")
  filtrosPrecio.forEach((filtro) => {
    filtro.addEventListener("change", aplicarFiltros)
  })

  // Filtros de capacidad
  const filtrosCapacidad = document.querySelectorAll(".filtro-capacidad")
  filtrosCapacidad.forEach((filtro) => {
    filtro.addEventListener("change", aplicarFiltros)
  })
}

// Configurar ordenamiento
function configurarOrdenamiento() {
  const selectOrdenar = document.getElementById("ordenar-por")
  selectOrdenar.addEventListener("change", function () {
    ordenarProductos(this.value)
    mostrarProductos()
  })
}

// Aplicar filtros
function aplicarFiltros() {
  productosFiltrados = [...productosDB]

  // Filtrar por marca
  const marcasSeleccionadas = Array.from(document.querySelectorAll(".filtro-marca:checked")).map((cb) => cb.value)
  if (marcasSeleccionadas.length > 0) {
    productosFiltrados = productosFiltrados.filter((producto) => marcasSeleccionadas.includes(producto.marca))
  }

  // Filtrar por precio
  const precioSeleccionado = document.querySelector(".filtro-precio:checked")
  if (precioSeleccionado) {
    const rangoPrecio = precioSeleccionado.value
    productosFiltrados = productosFiltrados.filter((producto) => {
      switch (rangoPrecio) {
        case "0-500000":
          return producto.precio <= 500000
        case "500000-1000000":
          return producto.precio > 500000 && producto.precio <= 1000000
        case "1000000-2000000":
          return producto.precio > 1000000 && producto.precio <= 2000000
        case "2000000+":
          return producto.precio > 2000000
        default:
          return true
      }
    })
  }

  // Filtrar por capacidad
  const capacidadesSeleccionadas = Array.from(document.querySelectorAll(".filtro-capacidad:checked")).map(
    (cb) => cb.value,
  )
  if (capacidadesSeleccionadas.length > 0) {
    productosFiltrados = productosFiltrados.filter((producto) => capacidadesSeleccionadas.includes(producto.capacidad))
  }

  paginaActual = 1
  mostrarProductos()
}

// Ordenar productos
function ordenarProductos(criterio) {
  switch (criterio) {
    case "precio-menor":
      productosFiltrados.sort((a, b) => a.precio - b.precio)
      break
    case "precio-mayor":
      productosFiltrados.sort((a, b) => b.precio - a.precio)
      break
    case "nombre":
      productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre))
      break
    default:
      // Relevancia (orden original)
      break
  }
}

// Mostrar productos
function mostrarProductos() {
  const grid = document.getElementById("productos-grid")
  const inicio = (paginaActual - 1) * productosPorPagina
  const fin = inicio + productosPorPagina
  const productosAPaginar = productosFiltrados.slice(inicio, fin)

  if (productosAPaginar.length === 0) {
    grid.innerHTML = `
            <div class="col-span-full text-center py-16">
                <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
                <h3 class="text-2xl font-bold text-gray-400 mb-2">No se encontraron productos</h3>
                <p class="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
                <button onclick="limpiarFiltros()" class="mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition">
                    Limpiar Filtros
                </button>
            </div>
        `
    return
  }

  grid.innerHTML = productosAPaginar
    .map(
      (producto) => `
        <div class="producto-card bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="relative">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-64 object-cover">
                <div class="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold">
                    ${producto.capacidad.toUpperCase()}
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-2">${producto.nombre}</h3>
                <p class="text-2xl font-bold text-orange-600 mb-4">$${producto.precio.toLocaleString()}</p>
                <div class="flex gap-2">
                    <button onclick="agregarAlCarrito({id: '${producto.id}', nombre: '${producto.nombre}', precio: ${producto.precio}})" 
                            class="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition text-sm font-semibold">
                        <i class="fas fa-shopping-cart mr-1"></i>Agregar
                    </button>
                    <button onclick="verDetalles('${producto.id}')" 
                            class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")

  actualizarPaginacion()
}

// Actualizar paginación
function actualizarPaginacion() {
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina)
  const prevBtn = document.getElementById("prev-page")
  const nextBtn = document.getElementById("next-page")
  const pageNumbers = document.getElementById("page-numbers")

  // Botón anterior
  prevBtn.disabled = paginaActual === 1
  prevBtn.onclick = () => {
    if (paginaActual > 1) {
      paginaActual--
      mostrarProductos()
    }
  }

  // Botón siguiente
  nextBtn.disabled = paginaActual === totalPaginas
  nextBtn.onclick = () => {
    if (paginaActual < totalPaginas) {
      paginaActual++
      mostrarProductos()
    }
  }

  // Números de página
  pageNumbers.innerHTML = ""
  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button")
    btn.textContent = i
    btn.className = `pagination-btn ${i === paginaActual ? "active" : ""}`
    btn.onclick = () => {
      paginaActual = i
      mostrarProductos()
    }
    pageNumbers.appendChild(btn)
  }
}

// Limpiar filtros
function limpiarFiltros() {
  document.querySelectorAll('input[type="checkbox"]').forEach((cb) => (cb.checked = false))
  document.querySelectorAll('input[type="radio"]').forEach((rb) => (rb.checked = false))
  document.getElementById("ordenar-por").value = "relevancia"

  productosFiltrados = [...productosDB]
  paginaActual = 1
  mostrarProductos()
}

// Ver detalles del producto
function verDetalles(idProducto) {
  // En una implementación real, esto abriría una página de detalles
  const producto = productosDB.find((p) => p.id === idProducto)
  if (producto) {
    alert(
      `Detalles de ${producto.nombre}\nPrecio: $${producto.precio.toLocaleString()}\nCapacidad: ${producto.capacidad}`,
    )
  }
}

// Actualizar contador del carrito
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("otechnology_carrito") || "[]")
  const contador = document.getElementById("contador-carrito")
  const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0)

  if (totalProductos > 0) {
    contador.textContent = totalProductos
    contador.classList.remove("hidden")
  } else {
    contador.classList.add("hidden")
  }
}

console.log("Sistema de productos celulares inicializado correctamente")
