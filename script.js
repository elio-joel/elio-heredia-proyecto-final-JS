const stockProductos = [
    {
        id: "bazar-uno",
        titulo: "Difusor de ambientes + palillos",
        imagen: "img/bazar-uno.jpeg",
        categoria: {
            nombre: "Bazar",
            id: "bazar"
        },
        precio: 1200

    },
    {

        id: "bazar-dos",
        titulo: "Palo Santo Linea Sagrada Madre",
        imagen: "img/bazar-dos.jpeg",
        categoria: {
            nombre: "Bazar",
            id: "bazar"
        },
        precio: 1500
    },
    {
        id: "bazar-tres",
        titulo: "Fragancia para ambientes",
        imagen: "img/bazar-tres.jpeg",
        categoria: {
            nombre: "Bazar",
            id: "bazar"
        },
        precio: 1550
    },
    {
        id: "deco-uno",
        titulo: "Lampara de sal",
        imagen: "img/deco-uno.jpeg",
        categoria: {
            nombre: "Deco",
            id: "deco"
        },
        precio: 2000
    },
    {
        id: "deco-dos",
        titulo: "Lampara de sal",
        imagen: "img/deco-dos.jpeg",
        categoria: {
            nombre: "Deco",
            id: "deco"
        },
        precio: 2000
    },
    {
        id: "deco-tres",
        titulo: "Lampara de sal",
        imagen: "img/deco-tres.jpeg",
        categoria: {
            nombre: "Deco",
            id: "deco"
        },
        precio: 1500
    },
    {
        id: "deco-cuatro",
        titulo: "Lampara de sal",
        imagen: "img/deco-cuatro.jpeg",
        categoria: {
            nombre: "Deco",
            id: "deco"
        },
        precio: 1500
    },
    {
        id: "hogar-uno",
        titulo: "Mate de madera con bombilla",
        imagen: "img/hogar-uno.jpeg",
        categoria: {
            nombre: "Hogar",
            id: "hogar"
        },
        precio: 1200
    },
    {
        id: "hogar-dos",
        titulo: "Mate de calabaza con bombilla",
        imagen: "img/hogar-dos.jpeg",
        categoria: {
            nombre: "Hogar",
            id: "hogar"
        },
        precio: 1400
    },
    {
        id: "hogar-tres",
        titulo: "Mate de calabaza con bombilla",
        imagen: "img/hogar-tres.jpeg",
        categoria: {
            nombre: "Hogar",
            id: "hogar"
        },
        precio: 1300

    },
];
// ELEMENTOS DEL DOM ///
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

// MOSTRAR PRODUCTOS DE JS EN HTML //

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id= "${producto.id}">Agregar al carrito </button>
            </div>
        
        `;
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
}

// FILTRAR POR CATEGORIA ///

cargarProductos(stockProductos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {

            const productoCategoria = stockProductos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = stockProductos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);

        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(stockProductos);
        }
    })
});

// AGREGAR AL CARRITO //

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)

    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}





function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = stockProductos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;

}

