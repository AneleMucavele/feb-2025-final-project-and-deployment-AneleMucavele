const addToCartButtons = document.querySelectorAll('.add-to-cart');
let cartCount = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        alert(`Added to cart. You have ${cartCount} items in your cart.`);
    });
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price) {
  const existingItem = cart.find(item => item.productName === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ productName, price, quantity: 1 });
  }
  saveCart();
  updateCartDisplay();
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.productName !== productName);
  saveCart();
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.productName} (x${item.quantity}) - R${item.price * item.quantity}
      <button onclick="removeFromCart('${item.productName}')" style="margin-left: 10px;">Remove</button>
    `;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Total: R${total}`;
}



function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart on page load
document.addEventListener("DOMContentLoaded", updateCartDisplay);


   