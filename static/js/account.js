document.addEventListener('DOMContentLoaded', function() {
    const notLogged = document.getElementById('notLogged');
    const loggedIn = document.getElementById('loggedIn');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userPhone = document.getElementById('userPhone');
    const logoutBtn = document.getElementById('logoutBtn');

    function showLoggedIn(user) {
        notLogged.classList.add('d-none');
        loggedIn.classList.remove('d-none');
        userName.textContent = user.name || '';
        userEmail.textContent = user.email || '';
        userPhone.textContent = user.phone || '';
    }

    function showNotLogged() {
        notLogged.classList.remove('d-none');
        loggedIn.classList.add('d-none');
    }

    const raw = localStorage.getItem('currentUser');
    if (!raw) {
        showNotLogged();
        return;
    }

    try {
        const user = JSON.parse(raw);
        showLoggedIn(user);
        // load and render orders for this user
        ensureOrders().then(function(orders) {
            renderOrdersForUser(user, orders);
        });
    } catch (e) {
        showNotLogged();
    }

    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
    
    // Helpers: ensure we have orders in localStorage (fetch from data/orders.json if empty)
    function ensureOrders() {
        return new Promise(function(resolve) {
            const stored = localStorage.getItem('orders');
            if (stored) return resolve(JSON.parse(stored));
            fetch('../data/orders.json').then(function(res) {
                if (!res.ok) return [];
                return res.json();
            }).then(function(data) {
                const arr = Array.isArray(data) ? data : [];
                localStorage.setItem('orders', JSON.stringify(arr));
                resolve(arr);
            }).catch(function() {
                resolve([]);
            });
        });
    }

    function renderOrdersForUser(user, orders) {
        const list = document.getElementById('ordersList');
        list.innerHTML = '';
        if (!orders || !orders.length) {
            list.innerHTML = '<p class="text-muted">You have no orders yet.</p>';
            return;
        }

        // match by user id or email
        const matches = orders.filter(function(o) {
            if (!o) return false;
            if (user.id && o.userId && o.userId === user.id) return true;
            if (o.email && user.email && o.email.toLowerCase() === user.email.toLowerCase()) return true;
            if (o.userEmail && user.email && o.userEmail.toLowerCase() === user.email.toLowerCase()) return true;
            return false;
        });

        if (!matches.length) {
            list.innerHTML = '<p class="text-muted">You have no orders yet.</p>';
            return;
        }

        matches.sort(function(a,b){ return new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0); });

        matches.forEach(function(order) {
            const card = document.createElement('div');
            card.className = 'card mb-3';
            const date = order.date || order.createdAt || '';
            const status = order.status || 'Unknown';
            const total = order.total || order.amount || '';
            let itemsHtml = '';
            if (Array.isArray(order.items) && order.items.length) {
                itemsHtml = '<ul class="mb-0">' + order.items.map(function(it){
                    const title = it.title || it.name || it.product || 'Item';
                    const qty = it.qty || it.quantity || it.count || 1;
                    const price = it.price ? ' — ' + it.price : '';
                    return '<li>' + title + ' × ' + qty + price + '</li>';
                }).join('') + '</ul>';
            } else {
                itemsHtml = '<p class="mb-0 text-muted">No item details</p>';
            }

            card.innerHTML = '<div class="card-body">'
                + '<div class="d-flex justify-content-between align-items-start">'
                + '<div><h6>Order #' + (order.id || order.orderId || '') + '</h6>'
                + '<small class="text-muted">' + (date ? new Date(date).toLocaleString() : '') + '</small></div>'
                + '<div><span class="badge bg-secondary">' + status + '</span></div>'
                + '</div>'
                + '<div class="mt-2">' + itemsHtml + '</div>'
                + (total ? '<div class="mt-2"><strong>Total:</strong> ' + total + '</div>' : '')
                + '</div>';

            list.appendChild(card);
        });
    }
});