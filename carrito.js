// Variables globales
let cart = [];
const products = [
    {
        id: 1,
        name: "Manzanas",
        price: 100,
        image: "https://img.freepik.com/foto-gratis/manzanas-rojas-frescas-suaves-jugosas-enteras-perfectas-escritorio-blanco_179666-271.jpg",
    },
    {
        id: 2,
        name: "Bananas",
        price: 150,
        image: "https://media.istockphoto.com/id/1291262112/es/foto/pl%C3%A1tano.jpg?s=612x612&w=0&k=20&c=0YLYIzD_0LhPof41htYcq0Lw_T798Qwuom2E0G59XpE=",
    },
    {
        id: 3,
        name: "Zanahorias",
        price: 230,
        image: "https://soycomocomo.es/media/2019/03/zanahorias.jpg",
    },
    {
        id: 4,
        name: "Sandia",
        price: 500,
        image: "https://watermark.lovepik.com/photo/20211118/large/lovepik-fresh-watermelon-picture_500081480.jpg",
    },
    {
        id: 5,
        name: "Tomate",
        price: 180,
        image: "https://thumbs.dreamstime.com/b/tomates-y-tomate-de-la-mitad-aislado-en-blanco-136961939.jpg",
    },
    // Puedes agregar más productos aquí
];

// Función para mostrar los productos en la página
function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name}</p>
            <p>Precio: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Añadir al Carrito</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Función para agregar un producto al carrito
function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
    }
}

// Función para actualizar el carrito
function updateCart() {
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");
    cartList.innerHTML = "";
    
    let totalPrice = 0;
    cart.forEach((product) => {
        const cartItem = document.createElement("li");
        cartItem.textContent = product.name;
        cartList.appendChild(cartItem);
        totalPrice += product.price;
    });
    
    totalPriceElement.textContent = totalPrice.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Función para finalizar la compra
function checkout() {
    Swal.fire({
        title: 'Compra finalizada',
        text: `Total a pagar: $${document.getElementById("total-price").textContent}`,
        icon: 'success',
    }).then((result) => {
        if (result.isConfirmed) {
            cart = [];
            updateCart();
        }
    });
}

// Evento para el botón de Finalizar Compra
document.getElementById("checkout-button").addEventListener("click", checkout);

// Inicializar la página
displayProducts();
const storedCart = JSON.parse(localStorage.getItem("cart"));
if (Array.isArray(storedCart)) {
    cart = storedCart;
    updateCart();
}
