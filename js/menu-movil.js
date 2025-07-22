/* ========================================= */
/* FUNCIONALIDAD DEL MENÚ MÓVIL */
/* ========================================= */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener elementos del DOM
    const botonHamburguesa = document.getElementById('boton-hamburguesa');
    const menuMovil = document.getElementById('menu-movil');
    const overlayMenuMovil = document.getElementById('overlay-menu-movil');
    const cerrarMenuMovil = document.getElementById('cerrar-menu-movil');
    const iconoHamburguesa = document.getElementById('icono-hamburguesa');

    // Función para abrir el menú móvil
    function abrirMenuMovil() {
        // Remover clase que oculta el menú
        menuMovil.classList.remove('translate-x-full');
        menuMovil.classList.add('translate-x-0');
        
        // Mostrar overlay oscuro
        overlayMenuMovil.classList.remove('hidden');
        
        // Cambiar icono de hamburguesa a X
        iconoHamburguesa.classList.remove('fa-bars');
        iconoHamburguesa.classList.add('fa-times');
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
        
        console.log('Menú móvil abierto');
    }

    // Función para cerrar el menú móvil
    function cerrarMenuMovil() {
        // Ocultar el menú
        menuMovil.classList.remove('translate-x-0');
        menuMovil.classList.add('translate-x-full');
        
        // Ocultar overlay
        overlayMenuMovil.classList.add('hidden');
        
        // Cambiar icono de X a hamburguesa
        iconoHamburguesa.classList.remove('fa-times');
        iconoHamburguesa.classList.add('fa-bars');
        
        // Restaurar scroll del body
        document.body.style.overflow = 'auto';
        
        console.log('Menú móvil cerrado');
    }

    // Event listener para abrir menú móvil
    botonHamburguesa.addEventListener('click', function() {
        // Verificar si el menú está abierto o cerrado
        if (menuMovil.classList.contains('translate-x-full')) {
            abrirMenuMovil();
        } else {
            cerrarMenuMovil();
        }
    });

    // Event listener para cerrar menú con botón X
    cerrarMenuMovil.addEventListener('click', cerrarMenuMovil);

    // Event listener para cerrar menú al hacer clic en overlay
    overlayMenuMovil.addEventListener('click', cerrarMenuMovil);

    // Manejar clics en categorías móviles
    const categoriesMoviles = document.querySelectorAll('.categoria-movil');
    categoriesMoviles.forEach(categoria => {
        categoria.addEventListener('click', function() {
            const nombreCategoria = this.dataset.categoria;
            console.log(`Categoría seleccionada: ${nombreCategoria}`);
            
            // Cerrar menú móvil
            cerrarMenuMovil();
            
            // Navegar a la categoría
            irACategoria(nombreCategoria);
        });
    });

    // Cerrar menú móvil al hacer clic en enlaces de navegación
    const enlacesNavegacionMovil = document.querySelectorAll('#menu-movil a');
    enlacesNavegacionMovil.forEach(enlace => {
        enlace.addEventListener('click', function() {
            // Cerrar menú después de hacer clic en un enlace
            cerrarMenuMovil();
        });
    });

    // Cerrar menú móvil al cambiar el tamaño de pantalla a desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 640) { // 640px es el breakpoint sm de Tailwind
            cerrarMenuMovil();
        }
    });

    console.log('Sistema de menú móvil inicializado correctamente');
});