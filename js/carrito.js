const carrito = [];

const btnCarrito = document.getElementById('cart-btn');
const vistaCarrito = document.getElementById('cart-preview');
const listaProductos = document.getElementById('cart-items');
const totalElemento = document.getElementById('cart-total');

// Mostrar u ocultar el carrito al hacer clic en el ícono
btnCarrito.addEventListener('click', () => {
  vistaCarrito.classList.toggle('hidden');
});

// Función para agregar un producto al carrito
function agregarProducto(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarCarrito();
}

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
  listaProductos.innerHTML = '';
  let total = 0;

  carrito.forEach(producto => {
    const item = document.createElement('li');
    item.className = 'flex justify-between items-center';
    item.innerHTML = `
      <span>${producto.nombre}</span>
      <span>$${producto.precio.toLocaleString()}</span>
    `;
    listaProductos.appendChild(item);
    total += producto.precio;
  });

  totalElemento.textContent = `$${total.toLocaleString()}`;
}

// Eventos para agregar productos simulados
document.getElementById('btn-producto-1').addEventListener('click', () => {
  agregarProducto('Camiseta', 25000);
});

document.getElementById('btn-producto-2').addEventListener('click', () => {
  agregarProducto('Gorra', 15000);
});
