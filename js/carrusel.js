/* ========================================= */
/* FUNCIONALIDAD DEL CARRUSEL DE IMÁGENES */
/* ========================================= */

// Variables globales del carrusel
let slideActual = 0;
const carrusel = document.getElementById('carrusel');
let slides = [];
let totalSlides = 0;
let intervaloAutomatico;

// Inicializar carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarCarrusel();
});

// Función para inicializar el carrusel
function inicializarCarrusel() {
    // Obtener todas las imágenes del carrusel
    slides = carrusel.children;
    totalSlides = slides.length;
    
    console.log(`Carrusel inicializado con ${totalSlides} slides`);
    
    // Configurar carrusel inicial
    actualizarCarrusel();
    
    // Iniciar avance automático
    iniciarAvanceAutomatico();
    
    // Manejar redimensionamiento de ventana
    window.addEventListener('resize', actualizarCarrusel);
}

// Función para actualizar la posición del carrusel
function actualizarCarrusel() {
    if (slides.length === 0) return;
    
    // Calcular el ancho de cada slide
    const anchoSlide = slides[0].clientWidth;
    
    // Aplicar transformación CSS
    carrusel.style.transform = `translateX(-${slideActual * anchoSlide}px)`;
    
    console.log(`Carrusel actualizado - Slide actual: ${slideActual + 1}/${totalSlides}`);
}

// Función para ir al siguiente slide
function siguienteSlide() {
    slideActual = (slideActual + 1) % totalSlides;
    actualizarCarrusel();
    
    // Reiniciar el timer automático
    reiniciarAvanceAutomatico();
    
    console.log('Avanzando al siguiente slide');
}

// Función para ir al slide anterior
function anteriorSlide() {
    slideActual = (slideActual - 1 + totalSlides) % totalSlides;
    actualizarCarrusel();
    
    // Reiniciar el timer automático
    reiniciarAvanceAutomatico();
    
    console.log('Retrocediendo al slide anterior');
}

// Función para ir a un slide específico
function irASlide(indice) {
    if (indice >= 0 && indice < totalSlides) {
        slideActual = indice;
        actualizarCarrusel();
        reiniciarAvanceAutomatico();
        console.log(`Navegando al slide ${indice + 1}`);
    }
}

// Función para iniciar el avance automático
function iniciarAvanceAutomatico() {
    // Avanzar cada 5 segundos
    intervaloAutomatico = setInterval(siguienteSlide, 5000);
    console.log('Avance automático del carrusel iniciado');
}

// Función para detener el avance automático
function detenerAvanceAutomatico() {
    if (intervaloAutomatico) {
        clearInterval(intervaloAutomatico);
        intervaloAutomatico = null;
        console.log('Avance automático del carrusel detenido');
    }
}

// Función para reiniciar el avance automático
function reiniciarAvanceAutomatico() {
    detenerAvanceAutomatico();
    iniciarAvanceAutomatico();
}

// Pausar carrusel cuando el mouse está sobre él
carrusel.addEventListener('mouseenter', function() {
    detenerAvanceAutomatico();
});

// Reanudar carrusel cuando el mouse sale de él
carrusel.addEventListener('mouseleave', function() {
    iniciarAvanceAutomatico();
});

// Manejar navegación con teclado
document.addEventListener('keydown', function(evento) {
    // Solo si no hay inputs activos
    if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        switch(evento.key) {
            case 'ArrowLeft':
                anteriorSlide();
                break;
            case 'ArrowRight':
                siguienteSlide();
                break;
        }
    }
});

console.log('Sistema de carrusel inicializado correctamente');