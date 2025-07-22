/* ========================================= */
/* SISTEMA DE CARRITO DE COMPRAS */
/* ========================================= */

// Variables globales del carrito
let carrito = [];
let contadorProductos = 0;

// Elementos del DOM
let botonCarrito, vistaCarrito, listaProductosCarrito, totalCarrito, contadorCarrito;

// Inicializar sistema de carrito cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarCarrito();
});

// Función para inicializar el carrito
function inicializarCarrito() {
    // Obtener elementos del DOM
    botonCarrito = document.getElementById('boton-carrito');
    vistaCarrito = document.getElementById('vista-carrito');
    listaProductosCarrito = document.getElementById('lista-productos-carrito');
    totalCarrito = document.getElementById('total-carrito');
    contadorCarrito = document.getElementById('contador-carrito');

    // Configurar event listeners
    configurarEventListeners();
    
    // Cargar carrito desde localStorage
    cargarCarritoDesdeStorage();
    
    console.log('Sistema de carrito inicializado correctamente');
}

// Función para configurar event listeners
function configurarEventListeners() {
    // Toggle vista del carrito al hacer clic en el botón
    botonCarrito.addEventListener('click', function(evento) {
        evento.stopPropagation(); // Prevenir que se cierre inmediatamente
        alternarVistaCarrito();
    });

    // Cerrar carrito al hacer clic fuera de él
    document.addEventListener('click', function(evento) {
        if (!evento.target.closest('#vista-carrito') && !evento.target.closest('#boton-carrito')) {
            cerrarVistaCarrito();
        }
    });

    // Cerrar carrito con tecla Escape
    document.addEventListener('keydown', function(evento) {
        if (evento.key === 'Escape') {
            cerrarVistaCarrito();
        }
    });
}

// Función para alternar la vista del carrito
function alternarVistaCarrito() {
    vistaCarrito.classList.toggle('hidden');
    console.log('Vista del carrito alternada');
}

// Función para cerrar la vista del carrito
function cerrarVistaCarrito() {
    vistaCarrito.classList.add('hidden');
    console.log('Vista del carrito cerrada');
}

// Función para abrir la vista del carrito
function abrirVistaCarrito() {
    vistaCarrito.classList.remove('hidden');
    console.log('Vista del carrito abierta');
}

// Función principal para agregar producto al carrito
function agregarAlCarrito(producto) {
    console.log('Agregando producto al carrito:', producto);
    
    // Verificar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
        // Si existe, incrementar cantidad
        productoExistente.cantidad += 1;
        console.log(`Cantidad actualizada para ${producto.nombre}: ${productoExistente.cantidad}`);
    } else {
        // Si no existe, agregarlo con cantidad 1
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
        console.log(`Nuevo producto agregado: ${producto.nombre}`);
    }
    
    // Actualizar vista del carrito
    actualizarVistaCarrito();
    
    // Guardar en localStorage
    guardarCarritoEnStorage();
    
    // Mostrar notificación
    mostrarNotificacionCarrito(`${producto.nombre} agregado al carrito`);
}

// Función para eliminar producto del carrito
function eliminarDelCarrito(idProducto) {
    const indiceProducto = carrito.findIndex(item => item.id === idProducto);
    
    if (indiceProducto !== -1) {
        const nombreProducto = carrito[indiceProducto].nombre;
        carrito.splice(indiceProducto, 1);
        
        console.log(`Producto eliminado del carrito: ${nombreProducto}`);
        
        // Actualizar vista
        actualizarVistaCarrito();
        
        // Guardar cambios
        guardarCarritoEnStorage();
        
        // Mostrar notificación
        mostrarNotificacionCarrito(`${nombreProducto} eliminado del carrito`, 'error');
    }
}

// Función para actualizar cantidad de un producto
function actualizarCantidadProducto(idProducto, nuevaCantidad) {
    const producto = carrito.find(item => item.id === idProducto);
    
    if (producto && nuevaCantidad > 0) {
        producto.cantidad = nuevaCantidad;
        console.log(`Cantidad actualizada para ${producto.nombre}: ${nuevaCantidad}`);
        
        // Actualizar vista
        actualizarVistaCarrito();
        
        // Guardar cambios
        guardarCarritoEnStorage();
    } else if (nuevaCantidad <= 0) {
        // Si la cantidad es 0 o menor, eliminar producto
        eliminarDelCarrito(idProducto);
    }
}

// Función para actualizar la vista del carrito
function actualizarVistaCarrito() {
    // Limpiar lista actual
    listaProductosCarrito.innerHTML = '';
    
    if (carrito.length === 0) {
        // Carrito vacío
        listaProductosCarrito.innerHTML = '<li class="text-gray-500 text-center py-4">Tu carrito está vacío</li>';
        contadorCarrito.classList.add('hidden');
        totalCarrito.textContent = '$0';
        contadorProductos = 0;
    } else {
        // Carrito con productos
        let total = 0;
        contadorProductos = 0;
        
        carrito.forEach(item => {
            // Crear elemento de producto
            const elementoProducto = document.createElement('li');
            elementoProducto.className = 'flex justify-between items-center py-2 border-b border-gray-200';
            elementoProducto.innerHTML = `
                <div class="flex-1">
                    <span class="font-medium text-sm">${item.nombre}</span>
                    <div class="flex items-center gap-2 mt-1">
                        <button onclick="actualizarCantidadProducto('${item.id}', ${item.cantidad - 1})" 
                                class="w-6 h-6 bg-gray-200 text-gray-700 rounded-full text-xs hover:bg-gray-300 transition">-</button>
                        <span class="text-xs text-gray-600 min-w-[20px] text-center">${item.cantidad}</span>
                        <button onclick="actualizarCantidadProducto('${item.id}', ${item.cantidad + 1})" 
                                class="w-6 h-6 bg-gray-200 text-gray-700 rounded-full text-xs hover:bg-gray-300 transition">+</button>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="font-bold text-sm">$${(item.precio * item.cantidad).toLocaleString()}</span>
                    <button onclick="eliminarDelCarrito('${item.id}')" 
                            class="text-red-500 hover:text-red-700 transition">
                        <i class="fas fa-trash text-xs"></i>
                    </button>
                </div>
            `;
            
            listaProductosCarrito.appendChild(elementoProducto);
            
            // Calcular totales
            total += item.precio * item.cantidad;
            contadorProductos += item.cantidad;
        });
        
        // Actualizar total y contador
        totalCarrito.textContent = `$${total.toLocaleString()}`;
        contadorCarrito.textContent = contadorProductos;
        contadorCarrito.classList.remove('hidden');
    }
    
    console.log(`Carrito actualizado - ${contadorProductos} productos, Total: $${total ? total.toLocaleString() : '0'}`);
}

// Función para vaciar el carrito completamente
function vaciarCarrito() {
    carrito = [];
    contadorProductos = 0;
    
    // Actualizar vista
    actualizarVistaCarrito();
    
    // Guardar cambios
    guardarCarritoEnStorage();
    
    console.log('Carrito vaciado completamente');
    mostrarNotificacionCarrito('Carrito vaciado', 'info');
}

// Función para guardar carrito en localStorage
function guardarCarritoEnStorage() {
    try {
        localStorage.setItem('otechnology_carrito', JSON.stringify(carrito));
        console.log('Carrito guardado en localStorage');
    } catch (error) {
        console.error('Error al guardar carrito en localStorage:', error);
    }
}

// Función para cargar carrito desde localStorage
function cargarCarritoDesdeStorage() {
    try {
        const carritoGuardado = localStorage.getItem('otechnology_carrito');
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            actualizarVistaCarrito();
            console.log('Carrito cargado desde localStorage');
        }
    } catch (error) {
        console.error('Error al cargar carrito desde localStorage:', error);
        carrito = []; // Resetear carrito en caso de error
    }
}

// Función para mostrar notificaciones del carrito
function mostrarNotificacionCarrito(mensaje, tipo = 'success') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion-carrito ${tipo === 'error' ? 'bg-red-600' : tipo === 'info' ? 'bg-blue-600' : 'bg-green-600'}`;
    notificacion.textContent = mensaje;
    
    // Agregar al DOM
    document.body.appendChild(notificacion);
    
    // Mostrar notificación con animación
    setTimeout(() => {
        notificacion.classList.add('mostrar');
    }, 100);
    
    // Ocultar y eliminar notificación después de 3 segundos
    setTimeout(() => {
        notificacion.classList.remove('mostrar');
        setTimeout(() => {
            if (document.body.contains(notificacion)) {
                document.body.removeChild(notificacion);
            }
        }, 300);
    }, 3000);
    
    console.log(`Notificación mostrada: ${mensaje}`);
}

// Función de ejemplo para agregar productos (usada por los botones de categorías)
function agregarProductoEjemplo(categoria) {
    // Base de datos de productos de ejemplo
    const productosEjemplo = {
        celulares: { 
            id: 'cel_001', 
            nombre: 'iPhone 16 Pro', 
            precio: 1299000 
        },
        computadores: { 
            id: 'comp_001', 
            nombre: 'MacBook Pro M4', 
            precio: 2499000 
        },
        tv: { 
            id: 'tv_001', 
            nombre: 'Samsung OLED 55"', 
            precio: 1899000 
        },
        camaras: { 
            id: 'cam_001', 
            nombre: 'Canon EOS R5', 
            precio: 3299000 
        },
        videojuegos: { 
            id: 'game_001', 
            nombre: 'PlayStation 5', 
            precio: 699000 
        },
        audio: { 
            id: 'audio_001', 
            nombre: 'AirPods Pro', 
            precio: 299000 
        },
        accesorios: { 
            id: 'acc_001', 
            nombre: 'Cargador Inalámbrico', 
            precio: 89000 
        }
    };
    
    const producto = productosEjemplo[categoria];
    if (producto) {
        agregarAlCarrito(producto);
    } else {
        console.error(`Categoría no encontrada: ${categoria}`);
    }
}

// Función para obtener información del carrito
function obtenerInfoCarrito() {
    return {
        productos: carrito,
        totalProductos: contadorProductos,
        totalPrecio: carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0)
    };
}

console.log('Sistema de carrito de compras inicializado correctamente');