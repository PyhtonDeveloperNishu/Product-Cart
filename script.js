const products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
];

const cart = {};

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cartList = document.getElementById('cart-list');
    const totalDisplay = document.getElementById('total');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    function updateCart() {
        cartList.innerHTML = '';
        let total = 0;
        for (let id in cart) {
            const product = cart[id];
            total += product.price * product.quantity;

            const li = document.createElement('li');
            li.innerHTML = `
                ${product.name} - ${product.quantity} x $${product.price}
                <button onclick="removeFromCart(${id})">-</button>
            `;
            cartList.appendChild(li);
        }
        totalDisplay.innerText = `Total: $${total}`;
        emptyCartMessage.style.display = Object.keys(cart).length === 0 ? 'block' : 'none';
    }

    function updateProductQuantity(id) {
        const quantitySpan = document.getElementById(`quantity-${id}`);
        if (quantitySpan) {
            quantitySpan.innerText = cart[id] ? cart[id].quantity : 0;
        }
    }

    window.addToCart = (id) => {
        if (!cart[id]) {
            cart[id] = { ...products.find(p => p.id === id), quantity: 0 };
        }
        cart[id].quantity++;
        updateProductQuantity(id);
        updateCart();
    };

    window.removeFromCart = (id) => {
        if (cart[id]) {
            cart[id].quantity--;
            if (cart[id].quantity === 0) {
                delete cart[id];
            }
            updateProductQuantity(id);
            updateCart();
        }
    };

    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${product.name} - $${product.price}
            <button onclick="removeFromCart(${product.id})">-</button>
            <span id="quantity-${product.id}">0</span>
            <button onclick="addToCart(${product.id})">+</button>
        `;
        productList.appendChild(li);
    });

    updateCart();
});
