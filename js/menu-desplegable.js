/* ========================================= */
/* FUNCIONALIDAD DE MENÚS DESPLEGABLES DESKTOP */
/* ========================================= */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener todos los contenedores de dropdown
    const contenedoresDropdown = document.querySelectorAll('.contenedor-dropdown');

    // Configurar cada dropdown
    contenedoresDropdown.forEach(contenedor => {
        const activador = contenedor.querySelector('.activador-dropdown');
        const menu = contenedor.querySelector('.menu-dropdown');

        // Mostrar dropdown al pasar el mouse por encima
        contenedor.addEventListener('mouseenter', function() {
            menu.classList.remove('hidden');
            menu.classList.add('block');
            console.log('Dropdown mostrado');
        });

        // Ocultar dropdown al quitar el mouse
        contenedor.addEventListener('mouseleave', function() {
            menu.classList.remove('block');
            menu.classList.add('hidden');
            console.log('Dropdown ocultado');
        });

        // Manejar clics en enlaces del dropdown
        const enlacesDropdown = menu.querySelectorAll('a');
        enlacesDropdown.forEach(enlace => {
            enlace.addEventListener('click', function(evento) {
                evento.preventDefault(); // Prevenir navegación por defecto
                
                const href = this.getAttribute('href');
                const textoEnlace = this.textContent.trim();
                
                console.log(`Enlace clickeado: ${textoEnlace} (${href})`);
                
                // Ocultar el dropdown
                menu.classList.remove('block');
                menu.classList.add('hidden');
                
                // Navegar a la sección correspondiente
                if (href.startsWith('#')) {
                    const seccionId = href.substring(1); // Remover el #
                    mostrarSeccion(seccionId);
                }
            });
        });
    });

    // Cerrar todos los dropdowns al hacer clic fuera de ellos
    document.addEventListener('click', function(evento) {
        // Verificar si el clic fue fuera de cualquier dropdown
        if (!evento.target.closest('.contenedor-dropdown')) {
            const todosLosDropdowns = document.querySelectorAll('.menu-dropdown');
            todosLosDropdowns.forEach(dropdown => {
                dropdown.classList.remove('block');
                dropdown.classList.add('hidden');
            });
            console.log('Todos los dropdowns cerrados por clic externo');
        }
    });

    // Cerrar dropdowns al presionar la tecla Escape
    document.addEventListener('keydown', function(evento) {
        if (evento.key === 'Escape') {
            const todosLosDropdowns = document.querySelectorAll('.menu-dropdown');
            todosLosDropdowns.forEach(dropdown => {
                dropdown.classList.remove('block');
                dropdown.classList.add('hidden');
            });
            console.log('Dropdowns cerrados con tecla Escape');
        }
    });

    console.log('Sistema de menús desplegables inicializado correctamente');
});