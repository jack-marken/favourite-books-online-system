document.addEventListener('DOMContentLoaded', () => {
    const depth = document.currentScript?.dataset.depth ||
        document.querySelector('script[src*="navbar.js"]')?.dataset.depth || 'pages'

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
            <li><a class="dropdown-item" href="${base}/account/login">Login</a></li>
            <li><a class="dropdown-item" href="${base}/account/register">Register</a></li>
        </ul>
        </li>
    `

    // cart button w/ num   
    const makeCartButton = (extraClasses = "") => `
        <a href="${base}/pages/cart.html" class="btn btn-primary position-relative nav-cart-btn ${extraClasses}">
        <i class="bi bi-cart"></i>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger nav-cart-count">0</span>
        </a>
    `

    const navbar = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="${base}/index.html">Favourite Books</a>

            <div class="d-flex align-items-center d-lg-none gap-2 order-lg-2">
            ${makeCartButton("me-1")}
            <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navMenu">
                <span class="navbar-toggler-icon"></span>
            </button>
            </div>

            <div class="collapse navbar-collapse" id="navMenu">
            
            <form class="d-flex my-2 my-lg-0 ms-lg-3 flex-grow-1 max-w-search" id="nav-search-form">
                <div class="input-group input-group-sm w-100 style="max-width: 400px;">
                <input class="form-control" type="search" placeholder="Search title/author..." id="nav-search-input" required>
                <button class="btn btn-outline-light" type="submit"><i class="bi bi-search"></i></button>
                </div>
            </form>

            <ul class="navbar-nav ms-auto align-items-lg-center gap-2">
                <li class="nav-item d-none d-lg-block">
                ${makeCartButton("me-2")}
                </li>
                <li class="nav-item"><a class="nav-link" href="${base}">Home</a></li>
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

    // search bar logic here
    document.getElementById('nav-search-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = document.getElementById('nav-search-input').value.trim();
        if (query) {
        // window.location.href = `${base}/pages/search.html?query=${encodeURIComponent(query)}`;
        window.location.href = `${base}/search?query=${encodeURIComponent(query)}`;
        }
    });

    // Calculate Cart items count
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)
    
    // update cart num for both icons
    document.querySelectorAll('.nav-cart-count').forEach(el => {
        el.textContent = count;
    });
})