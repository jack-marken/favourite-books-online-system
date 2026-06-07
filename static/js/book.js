document.addEventListener("DOMContentLoaded", () => {
    //id from url
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    console.log(bookId);

    let currentBook = null;

    if (!bookId) {
        document.getElementById('book-title').innerText = "No book selected";
        return;
    }

    // grab books + match w/id + load details into page
    fetch("static/data/books.json")
        .then(response => response.json())
        .then(books => {
            
            currentBook = books.find(b => b.id == bookId);

            if (currentBook) {
                document.getElementById('book-title').innerText = currentBook.title;
                document.getElementById('book-author').innerText = currentBook.author;
                document.getElementById('book-genre').innerText = currentBook.genre;
                document.getElementById('book-description').innerText = currentBook.description;
                document.getElementById('book-price').innerText = `$${currentBook.price.toFixed(2)}`;
                document.getElementById('book-cover').src = currentBook.cover;
                document.getElementById('book-cover').alt = currentBook.title;
                document.getElementById('book-stock').innerText = `${currentBook.stock} copies available`;

                // Handle Badge here (like bestseller/preorder)
                const  badge = document.getElementById('book-badge');
                if (currentBook.badge && currentBook.badge !== "none") {
                    badge.innerText = currentBook.badge.toUpperCase();
                    badge.classList.remove('d-none');
                }
            } else {
                document.getElementById('book-title').innerText = "Book not found";
            }
        })
        .catch(error => console.error("Error loading book details:", error));

    // add to cart here tmp for Travis
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            if (!currentBook) return;

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // push book to cart array
            cart.push({
                id: currentBook.id,
                title: currentBook.title,
                price: currentBook.price,
                cover: currentBook.cover
            });

            //using local storage
            localStorage.setItem('cart', JSON.stringify(cart));

            alert(`"${currentBook.title}" has been added to your cart!`);
            location.reload();
        });
    }
});