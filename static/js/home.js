document.addEventListener("DOMContentLoaded", () => {
    // grab books + filter into bestselles/preorder/featured
    fetch("data/books.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load books data");
            }
            return response.json();
        })
        .then(books => {
            const bestsellers = books.filter(book => book.badge === "bestseller");
            const preorders = books.filter(book => book.badge === "preorder");
            const featuredAuthorBooks = books.filter(book => book.author === "Suzanne Collins");

            renderBooks(bestsellers, "bestsellers-row");
            renderBooks(preorders, "preorders-row");
            renderBooks(featuredAuthorBooks, "featured-row");
        })
        .catch(error => console.error("Error population homepage rows:", error));

    // search here
    const searchForm = document.getElementById("search-form");
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const query = document.getElementById("search-input").value.trim();
            if (query) {
                // Relocate to the pages folder passing along the search string
                window.location.href = `pages/search.html?query=${encodeURIComponent(query)}`;
            }
        });
    }
});

// render based on category
function renderBooks(booksList, elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;

    container.innerHTML = "";

    if (booksList.length === 0) {
        container.innerHTML = `<div class="col-12"><p class="text-muted">No books found in this category.</p></div>`;
        return;
    }

    // book card here
    booksList.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.className = "col-12 col-md-4 col-lg-3";

        bookCard.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${book.cover}" class="card-img-top p-3" alt="${book.title}" style="height: 300px; object-fit: contain;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fs-6 text-truncate mb-1" title="${book.title}">${book.title}</h5>
                    <p class="card-text text-muted small mb-2">By ${book.author}</p>
                    <div class="mt-auto">
                        <p class="mb-2">
                            <span class="fw-bold text-danger">$${book.price.toFixed(2)}</span>
                            ${book.originalPrice ? `<span class="text-decoration-line-through text-muted small ms-2">$${book.originalPrice.toFixed(2)}</span>` : ""}
                        </p>
                        <a href="pages/book.html?id=${book.id}" class="btn btn-outline-primary btn-sm w-100">View Details</a>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(bookCard);
    });
}