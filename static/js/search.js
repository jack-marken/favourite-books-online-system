document.addEventListener("DOMContentLoaded", () => {
    //grab search from url
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('query');
    const queryTextSpan = document.getElementById('search-query-text');
    const resultsRow = document.getElementById('search-results-row');

    if (!searchQuery) {
        queryTextSpan.innerText = "No search query found";
        resultsRow.innerHTML = `<div class="col-12"><p class="text-muted">Please enter a search keyword in the search bar</p></div>`;
        return;
    }

    // update text to search query
    queryTextSpan.innerText = `"${searchQuery}"`;

    const lowerCaseQuery = searchQuery.toLowerCase();

    // grab books + filter + render
    fetch("static/data/books.json")
        .then(response => response.json())
        .then(books => {
            const matchedBooks = books.filter(book => 
                book.title.toLowerCase().includes(lowerCaseQuery) || 
                book.author.toLowerCase().includes(lowerCaseQuery) ||
                book.genre.toLowerCase().includes(lowerCaseQuery)
            );

            resultsRow.innerHTML = "";

            if (matchedBooks.length === 0) {
                resultsRow.innerHTML = `
                    <div class="col-12 text-center my-5">
                        <i class="bi bi-search text-muted" style="font-size: 3rem;"></i>
                        <p class="text-muted mt-3 fs-5">Sorry, we couldn't find any matching books for your search.</p>
                    </div>`;
                return;
            }

            //render cards here
            matchedBooks.forEach(book => {
                const bookCard = document.createElement("div");
                bookCard.className = "col-12 col-md-4 col-lg-3";

                bookCard.innerHTML = `
                    <div class="card h-100 shadow-sm">
                        <img src="${book.cover}" class="card-img-top p-3" alt="${book.title}" style="height: 250px; object-fit: contain;">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title fs-6 text-truncate mb-1" title="${book.title}">${book.title}</h5>
                            <p class="card-text text-muted small mb-2">By ${book.author}</p>
                            <div class="mt-auto">
                                <p class="fw-bold text-danger mb-2">$${book.price.toFixed(2)}</p>
                                <a href="book?id=${book.id}" class="btn btn-outline-primary btn-sm w-100">View Details</a>
                            </div>
                        </div>
                    </div>
                `;
                resultsRow.appendChild(bookCard);
            });
        })
        .catch(error => {
            console.error("Error executing search logic:", error);
            resultsRow.innerHTML = `<div class="col-12"><p class="text-danger">Failed to search catalog data.</p></div>`;
        });
});