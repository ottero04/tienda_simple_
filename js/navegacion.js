/* ========================================= */
/* SISTEMA DE NAVEGACIÓN Y GESTIÓN DE SECCIONES */
/* ========================================= */

// Variables globales de navegación
let seccionActual = 'inicio';
let historialNavegacion = [];

// Inicializar sistema de navegación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarNavegacion();
});

// Función para inicializar el sistema de navegación
function inicializarNavegacion() {
    // Configurar enlaces de navegación
    configurarEnlacesNavegacion();
    
    // Configurar búsqueda
    configurarSistemaBusqueda();
    
    // Mostrar sección inicial
    mostrarSeccion('inicio');
    
    console.log('Sistema de navegación inicializado correctamente');
}

// Función para configurar enlaces de navegación
function configurarEnlacesNavegacion() {
    // Obtener todos los enlaces que empiezan con #
    const enlacesNavegacion = document.querySelectorAll('a[href^="#"]');
    
    enlacesNavegacion.forEach(enlace => {
        enlace.addEventListener('click', function(evento) {
            evento.preventDefault(); // Prevenir comportamiento por defecto
            
            const targetId = this.getAttribute('href').substring(1); // Remover #
            const textoEnlace = this.textContent.trim();
            
            console.log(`Navegando a: ${textoEnlace} (${targetId})`);
            
            // Navegar a la sección
            mostrarSeccion(targetId);
        });
    });
    
    console.log(`Configurados ${enlacesNavegacion.length} enlaces de navegación`);
}

// Función principal para mostrar una sección específica
function mostrarSeccion(idSeccion) {
    console.log(`Mostrando sección: ${idSeccion}`);
    
    // Lista de todas las secciones disponibles
    const secciones = ['inicio', 'promociones', 'novedades', 'garantia', 'contactanos'];
    
    // Ocultar todas las secciones
    secciones.forEach(id => {
        const seccion = document.getElementById(id);
        if (seccion) {
            seccion.classList.add('hidden');
        }
    });
    
    // Ocultar sección de productos si existe
    const seccionProductos = document.getElementById('productos-categoria');
    if (seccionProductos) {
        seccionProductos.remove();
    }
    
    // Mostrar la sección objetivo
    const seccionObjetivo = document.getElementById(idSeccion);
    if (seccionObjetivo) {
        seccionObjetivo.classList.remove('hidden');
        
        // Hacer scroll suave a la sección
        seccionObjetivo.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Actualizar título de la página
        actualizarTituloPagina(idSeccion);
        
        // Guardar en historial
        agregarAlHistorial(idSeccion);
        
        // Actualizar sección actual
        seccionActual = idSeccion;
        
        console.log(`Sección mostrada exitosamente: ${idSeccion}`);
    } else {
        console.error(`Sección no encontrada: ${idSeccion}`);
    }
}

// Función para navegar a una categoría de productos
function irACategoria(categoria) {
    console.log(`Navegando a categoría: ${categoria}`);
    
    // Mostrar estado de carga
    mostrarEstadoCarga();
    
    // Simular tiempo de carga (en una app real, aquí harías una petición al servidor)
    setTimeout(() => {
        ocultarEstadoCarga();
        mostrarProductosCategoria(categoria);
    }, 1000);
}

// Función para mostrar productos de una categoría
function mostrarProductosCategoria(categoria) {
    console.log(`Mostrando productos de categoría: ${categoria}`);
    
    // Base de datos de productos de ejemplo
    const baseDatosProductos = {
        celulares: [
            { id: 'cel_001', nombre: 'iPhone 16 Pro', precio: 1299000, imagen: '/placeholder.svg?height=200&width=200&text=iPhone+16+Pro' },
            { id: 'cel_002', nombre: 'Samsung Galaxy S24', precio: 899000, imagen: '/placeholder.svg?height=200&width=200&text=Samsung+Galaxy' },
            { id: 'cel_003', nombre: 'Xiaomi 14', precio: 599000, imagen: '/placeholder.svg?height=200&width=200&text=Xiaomi+14' },
            { id: 'cel_004', nombre: 'Motorola Edge 50', precio: 449000, imagen: '/placeholder.svg?height=200&width=200&text=Motorola+Edge' }
        ],
        computadores: [
            { id: 'comp_001', nombre: 'MacBook Pro M4', precio: 2499000, imagen: '/placeholder.svg?height=200&width=200&text=MacBook+Pro' },
            { id: 'comp_002', nombre: 'Dell XPS 13', precio: 1899000, imagen: '/placeholder.svg?height=200&width=200&text=Dell+XPS' },
            { id: 'comp_003', nombre: 'HP Pavilion', precio: 1299000, imagen: '/placeholder.svg?height=200&width=200&text=HP+Pavilion' },
            { id: 'comp_004', nombre: 'Lenovo ThinkPad', precio: 1699000, imagen: '/placeholder.svg?height=200&width=200&text=Lenovo+ThinkPad' }
        ],
        tv: [
            { id: 'tv_001', nombre: 'Samsung OLED 55"', precio: 1899000, imagen: '/placeholder.svg?height=200&width=200&text=Samsung+OLED' },
            { id: 'tv_002', nombre: 'LG NanoCell 65"', precio: 2299000, imagen: '/placeholder.svg?height=200&width=200&text=LG+NanoCell' },
            { id: 'tv_003', nombre: 'Sony Bravia 50"', precio: 1699000, imagen: '/placeholder.svg?height=200&width=200&text=Sony+Bravia' }
        ],
        camaras: [
            { id: 'cam_001', nombre: 'Canon EOS R5', precio: 3299000, imagen: '/placeholder.svg?height=200&width=200&text=Canon+EOS+R5' },
            { id: 'cam_002', nombre: 'Nikon Z7 II', precio: 2899000, imagen: '/placeholder.svg?height=200&width=200&text=Nikon+Z7' },
            { id: 'cam_003', nombre: 'Sony A7 IV', precio: 2599000, imagen: '/placeholder.svg?height=200&width=200&text=Sony+A7+IV' }
        ],
        videojuegos: [
            { id: 'game_001', nombre: 'PlayStation 5', precio: 699000, imagen: '/placeholder.svg?height=200&width=200&text=PlayStation+5' },
            { id: 'game_002', nombre: 'Xbox Series X', precio: 649000, imagen: '/placeholder.svg?height=200&width=200&text=Xbox+Series+X' },
            { id: 'game_003', nombre: 'Nintendo Switch OLED', precio: 399000, imagen: '/placeholder.svg?height=200&width=200&text=Nintendo+Switch' }
        ],
        audio: [
            { id: 'audio_001', nombre: 'AirPods Pro', precio: 299000, imagen: '/placeholder.svg?height=200&width=200&text=AirPods+Pro' },
            { id: 'audio_002', nombre: 'Sony WH-1000XM5', precio: 399000, imagen: '/placeholder.svg?height=200&width=200&text=Sony+WH1000XM5' },
            { id: 'audio_003', nombre: 'Bose QuietComfort', precio: 349000, imagen: '/placeholder.svg?height=200&width=200&text=Bose+QC' }
        ],
        accesorios: [
            { id: 'acc_001', nombre: 'Cargador Inalámbrico', precio: 89000, imagen: '/placeholder.svg?height=200&width=200&text=Cargador+Inalambrico' },
            { id: 'acc_002', nombre: 'Cable USB-C', precio: 29000, imagen: '/placeholder.svg?height=200&width=200&text=Cable+USB-C' },
            { id: 'acc_003', nombre: 'Funda iPhone', precio: 49000, imagen: '/placeholder.svg?height=200&width=200&text=Funda+iPhone' }
        ]
    };
    
    const productosCategoria = baseDatosProductos[categoria] || [];
    
    // Crear sección de productos
    const main = document.querySelector('main');
    const seccionProductosExistente = document.getElementById('productos-categoria');
    
    // Eliminar sección existente si la hay
    if (seccionProductosExistente) {
        seccionProductosExistente.remove();
    }
    
    // Crear nueva sección de productos
    const seccionProductos = document.createElement('section');
    seccionProductos.id = 'productos-categoria';
    seccionProductos.className = 'py-16 px-4 bg-gray-900';
    
    seccionProductos.innerHTML = `
        <div class="max-w-6xl mx-auto">
            <div class="flex items-center justify-between mb-8">
                <h2 class="text-3xl font-bold text-orange-600 capitalize">
                    <i class="fas fa-${obtenerIconoCategoria(categoria)} mr-3"></i>${categoria}
                </h2>
                <button onclick="volverAlInicio()" class="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition flex items-center gap-2">
                    <i class="fas fa-arrow-left"></i>Volver al Inicio
                </button>
            </div>
            
            ${productosCategoria.length > 0 ? `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    ${productosCategoria.map(producto => `
                        <div class="bg-white text-black rounded-lg p-6 shadow-lg hover:shadow-xl transition transform hover:scale-105">
                            <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-48 object-cover rounded-lg mb-4">
                            <h3 class="text-xl font-bold mb-2">${producto.nombre}</h3>
                            <p class="text-2xl font-bold text-orange-600 mb-4">$${producto.precio.toLocaleString()}</p>
                            <button onclick="agregarAlCarrito({id: '${producto.id}', nombre: '${producto.nombre}', precio: ${producto.precio}})" 
                                    class="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition flex items-center justify-center gap-2">
                                <i class="fas fa-shopping-cart"></i>Agregar al Carrito
                            </button>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div class="text-center py-16">
                    <i class="fas fa-box-open text-6xl text-gray-600 mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-400 mb-2">No hay productos disponibles</h3>
                    <p class="text-gray-500">Esta categoría estará disponible próximamente</p>
                </div>
            `}
        </div>
    `;
    
    // Ocultar otras secciones
    const secciones = document.querySelectorAll('main > section');
    secciones.forEach(seccion => seccion.classList.add('hidden'));
    
    // Agregar nueva sección
    main.appendChild(seccionProductos);
    
    // Hacer scroll a la sección
    seccionProductos.scrollIntoView({ behavior: 'smooth' });
    
    // Actualizar título
    actualizarTituloPagina(`${categoria} - OTechnology`);
    
    console.log(`Productos mostrados para categoría: ${categoria} (${productosCategoria.length} productos)`);
}

// Función para obtener el icono de una categoría
function obtenerIconoCategoria(categoria) {
    const iconos = {
        celulares: 'mobile-alt',
        computadores: 'laptop',
        tv: 'tv',
        camaras: 'camera',
        videojuegos: 'gamepad',
        audio: 'headphones',
        accesorios: 'plug'
    };
    
    return iconos[categoria] || 'box';
}

// Función para volver al inicio
function volverAlInicio() {
    console.log('Volviendo al inicio');
    
    // Eliminar sección de productos
    const seccionProductos = document.getElementById('productos-categoria');
    if (seccionProductos) {
        seccionProductos.remove();
    }
    
    // Mostrar sección de inicio
    mostrarSeccion('inicio');
}

// Función para configurar el sistema de búsqueda
function configurarSistemaBusqueda() {
    const campoBusqueda = document.getElementById('campo-busqueda');
    
    // Búsqueda al presionar Enter
    campoBusqueda.addEventListener('keypress', function(evento) {
        if (evento.key === 'Enter') {
            buscarProductos();
        }
    });
    
    console.log('Sistema de búsqueda configurado');
}

// Función para realizar búsqueda de productos
function buscarProductos() {
    const campoBusqueda = document.getElementById('campo-busqueda');
    const consulta = campoBusqueda.value.trim();
    
    if (consulta) {
        console.log(`Realizando búsqueda: "${consulta}"`);
        
        // Mostrar estado de carga
        mostrarEstadoCarga();
        
        // Simular búsqueda (en una app real, harías una petición al servidor)
        setTimeout(() => {
            ocultarEstadoCarga();
            mostrarResultadosBusqueda(consulta);
        }, 1000);
    } else {
        console.log('Consulta de búsqueda vacía');
        mostrarNotificacionCarrito('Por favor ingresa un término de búsqueda', 'info');
    }
}

// Función para mostrar resultados de búsqueda
function mostrarResultadosBusqueda(consulta) {
    console.log(`Mostrando resultados para: "${consulta}"`);
    
    // Simular resultados de búsqueda
    const resultadosEjemplo = [
        { id: 'search_001', nombre: `Resultado para "${consulta}" - iPhone`, precio: 1299000, imagen: '/placeholder.svg?height=200&width=200&text=iPhone+Resultado' },
        { id: 'search_002', nombre: `Resultado para "${consulta}" - Samsung`, precio: 899000, imagen: '/placeholder.svg?height=200&width=200&text=Samsung+Resultado' }
    ];
    
    // Crear sección de resultados
    const main = document.querySelector('main');
    const seccionResultadosExistente = document.getElementById('resultados-busqueda');
    
    if (seccionResultadosExistente) {
        seccionResultadosExistente.remove();
    }
    
    const seccionResultados = document.createElement('section');
    seccionResultados.id = 'resultados-busqueda';
    seccionResultados.className = 'py-16 px-4 bg-gray-900';
    
    seccionResultados.innerHTML = `
        <div class="max-w-6xl mx-auto">
            <div class="flex items-center justify-between mb-8">
                <h2 class="text-3xl font-bold text-orange-600">
                    <i class="fas fa-search mr-3"></i>Resultados para "${consulta}"
                </h2>
                <button onclick="volverAlInicio()" class="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition flex items-center gap-2">
                    <i class="fas fa-arrow-left"></i>Volver al Inicio
                </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                ${resultadosEjemplo.map(producto => `
                    <div class="bg-white text-black rounded-lg p-6 shadow-lg hover:shadow-xl transition transform hover:scale-105">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-48 object-cover rounded-lg mb-4">
                        <h3 class="text-lg font-bold mb-2">${producto.nombre}</h3>
                        <p class="text-2xl font-bold text-orange-600 mb-4">$${producto.precio.toLocaleString()}</p>
                        <button onclick="agregarAlCarrito({id: '${producto.id}', nombre: '${producto.nombre}', precio: ${producto.precio}})" 
                                class="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition flex items-center justify-center gap-2">
                            <i class="fas fa-shopping-cart"></i>Agregar al Carrito
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Ocultar otras secciones
    const secciones = document.querySelectorAll('main > section');
    secciones.forEach(seccion => seccion.classList.add('hidden'));
    
    // Agregar sección de resultados
    main.appendChild(seccionResultados);
    seccionResultados.scrollIntoView({ behavior: 'smooth' });
    
    // Limpiar campo de búsqueda
    document.getElementById('campo-busqueda').value = '';
}

// Función para mostrar estado de carga
function mostrarEstadoCarga() {
    const overlayLoading = document.createElement('div');
    overlayLoading.id = 'overlay-carga';
    overlayLoading.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    overlayLoading.innerHTML = `
        <div class="bg-white rounded-lg p-8 text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p class="text-gray-800 font-medium">Cargando...</p>
        </div>
    `;
    document.body.appendChild(overlayLoading);
    console.log('Estado de carga mostrado');
}

// Función para ocultar estado de carga
function ocultarEstadoCarga() {
    const overlayLoading = document.getElementById('overlay-carga');
    if (overlayLoading) {
        overlayLoading.remove();
        console.log('Estado de carga ocultado');
    }
}

// Función para actualizar el título de la página
function actualizarTituloPagina(seccionId) {
    const titulos = {
        inicio: 'OTechnology - Tienda de Tecnología',
        promociones: 'Promociones - OTechnology',
        novedades: 'Novedades - OTechnology',
        garantia: 'Garantía - OTechnology',
        contactanos: 'Contáctanos - OTechnology'
    };
    
    const nuevoTitulo = titulos[seccionId] || `${seccionId} - OTechnology`;
    document.title = nuevoTitulo;
    console.log(`Título actualizado: ${nuevoTitulo}`);
}

// Función para agregar al historial de navegación
function agregarAlHistorial(seccion) {
    historialNavegacion.push({
        seccion: seccion,
        timestamp: new Date().getTime()
    });
    
    // Mantener solo los últimos 10 elementos del historial
    if (historialNavegacion.length > 10) {
        historialNavegacion.shift();
    }
    
    console.log(`Agregado al historial: ${seccion}`);
}

// Función para obtener información de navegación
function obtenerInfoNavegacion() {
    return {
        seccionActual: seccionActual,
        historial: historialNavegacion
    };
}

console.log('Sistema de navegación inicializado correctamente');