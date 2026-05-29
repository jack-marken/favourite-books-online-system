const cart = JSON.parse(localStorage.getItem('cart')) || []
const existing = cart.find(item => item.id === book.id)

if (existing) {
  existing.quantity++
} else {
  cart.push({ id: book.id, title: book.title, price: book.price, cover: book.cover, quantity: 1 })
}

localStorage.setItem('cart', JSON.stringify(cart))