

document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("productList");
    const changeColorButton = document.getElementById("changeColorButton");
    const cartCount = document.getElementById("cartCount");
    const cartList = document.getElementById("cartList");
    const totalPrice = document.getElementById("totalPrice");

    const products = [
        { id: 1, name: "Camiseta", price: 19.99 },
        { id: 2, name: "Pantalones", price: 29.99 },
        { id: 3, name: "Zapatos", price: 49.99 },
        { id: 4, name: "Sombrero", price: 9.99 },
        { id: 5, name: "Bufanda", price: 14.99 },
    ];

    function displayProducts() {
        productList.innerHTML = "";
        products.forEach(product => {
            const listItem = document.createElement("li");
            listItem.className = "product-item";
            listItem.innerHTML = `
                <span class="product-name">${product.name}</span>
                <span class="product-price">$${product.price}</span>
                <button class="add-to-cart">Agregar al carrito</button>
            `;
            productList.appendChild(listItem);
        });
    }

    displayProducts();

    const cart = {
        items: [],
        addItem: function (product) {
            this.items.push(product);
            sessionStorage.setItem("cartItems", JSON.stringify(this.items));
            console.log("Producto agregado al carrito:", product);
            this.updateCartCount();
            this.displayCartItems();
            this.calculateTotal();
        },
        getItems: function () {
            return JSON.parse(sessionStorage.getItem("cartItems")) || [];
        },
        updateCartCount: function () {
            const itemCount = this.items.length;
            cartCount.textContent = itemCount;
        },
        displayCartItems: function () {
            cartList.innerHTML = "";
            this.items.forEach(item => {
                const listItem = document.createElement("li");
                listItem.textContent = `${item.name} - $${item.price}`;
                cartList.appendChild(listItem);
            });
        },
        calculateTotal: function () {
            const total = this.items.reduce((acc, item) => acc + item.price, 0);
            totalPrice.textContent = `Total: $${total.toFixed(2)}`;
        },
    };

    productList.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart")) {
            const productContainer = event.target.closest(".product-item");
            const productIndex = Array.from(productList.children).indexOf(productContainer);
            const clickedProduct = products[productIndex];
            if (clickedProduct) {
                cart.addItem(clickedProduct);
                console.log("Carrito actual:", cart.getItems());
            }
        }
    });

    // Actualizar la cantidad de productos en el carrito al cargar la página
    cart.updateCartCount();
    cart.displayCartItems();
    cart.calculateTotal();
});

