const cart = JSON.parse(localStorage.getItem('cart')) || []
const existing = cart.find(item => item.id === book.id)

if (existing) {
  existing.quantity++
} else {
  cart.push({ id: book.id, title: book.title, price: book.price, cover: book.cover, quantity: 1 })
}

// Display all books in cart to the user
function doShowAll() {
  // Setup for cart table
  var list = "<tr><th>Title</th><th>Quantity</th><th>Price</th><th>Remove</th></tr>\n";

  // Add each item in cart to the table
  for (i = 0; i < cart.length; i++) {
    list += (
      "<tr><td>" + cart[i].title 
      + "</td><td>" + cart[i].quantity 
      + "</td><td>" + cart[i].price * cart[i].quantity 
      + "</td><td><button onclick='removeFromCart(" + i + ")'>Remove</button></td></tr>\n"
    );
  }

  // For when cart is empty
  if (list == "<tr><th>Title</th><th>Quantity</th><th>Price</th><th>Remove</th></tr>\n") {
    list += "<tr><td><i>Empty</i></td><td><i>0</i></td><td><i>0</i></td></tr>";
  }

  // Add table data to the page
  document.getElementById("cart-table").innerHTML = list;
  // Tally price
  var totalPrice = 0;
  for (i = 0; i < cart.length; i++) {
    totalPrice += (cart[i].quantity * cart[i].price)
  }
  document.getElementById("total-price").innerHTML = "Total Price: " + totalPrice
  // Show proceed button when there are items
  if (totalPrice > 0) {
    document.getElementById("proceed-to-checkout").innerHTML = '<a href="checkout" class="btn btn-primary btn-lg px-5">Proceed to Checkout</a>'
  }
  
  localStorage.setItem('cart', JSON.stringify(cart))
}

function removeFromCart(index) {
  cart.splice(index, 1)
  localStorage.setItem('cart', JSON.stringify(cart))
  doShowAll()
}