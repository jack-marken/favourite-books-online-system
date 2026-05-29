document.addEventListener('DOMContentLoaded', () => {
  const depth = document.currentScript?.dataset.depth ||
    document.querySelector('script[src*="navbar.js"]')?.dataset.depth || 'pages'

//   const base = depth === 'root' ? '' : depth === 'pages' ? '..' : '../..'
    const base = depth === 'root' ? '.' : depth === 'pages' ? '..' : '../..'

  const user = JSON.parse(localStorage.getItem('currentUser'))
  const isStaff = user?.role === 'staff'

  const staffLinks = isStaff ? `
    <li><a class="dropdown-item" href="${base}/pages/staff/catalogue.html">Catalogue</a></li>
    <li><a class="dropdown-item" href="${base}/pages/staff/orders.html">Orders</a></li>
    <li><hr class="dropdown-divider"></li>
  ` : ''

  const accountLinks = user ? `
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">${user.name}</a>
      <ul class="dropdown-menu dropdown-menu-end">
        ${staffLinks}
        <li><a class="dropdown-item" href="${base}/pages/account/account.html">My Account</a></li>
        <li><a class="dropdown-item" href="#" id="logout-btn">Logout</a></li>
      </ul>
    </li>
  ` : `
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Account</a>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="${base}/pages/account/login.html">Login</a></li>
        <li><a class="dropdown-item" href="${base}/pages/account/register.html">Register</a></li>
      </ul>
    </li>
  `

  const navbar = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="${base}/index.html">📚 Favourite Books</a>

        <a href="${base}/pages/cart.html" class="btn btn-primary position-relative me-2">
          <i class="bi bi-cart"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cart-count">0</span>
        </a>

        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="${base}/index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="${base}/pages/search.html">Search</a></li>
            ${accountLinks}
          </ul>
        </div>
      </div>
    </nav>
  `

  document.getElementById('navbar-placeholder').innerHTML = navbar

  document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('currentUser')
    window.location.href = `${base}/index.html`
  })

  const cart = JSON.parse(localStorage.getItem('cart')) || []
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  document.getElementById('cart-count').textContent = count
})