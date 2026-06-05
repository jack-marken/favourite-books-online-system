import { Book } from "./book.js"

class BookController {
    constructor() {
        this.book = null;
        this.dbPath = "/static/data/books.json";
    }

    async newBook({ title, author, price, originalPrice, cover, genre, description, badge, stock }) {
        const badgeOpts = ["none", "preorder", "bestseller", "featured"]

        // Get the maximum ID value in the database and increment by 1 to create a unique ID
        try {
            const response = await fetch(this.dbPath);
            const data = await response.json();
            var maxId = 0
            data.values().forEach(book => {
                if (book.id > maxId) {
                    maxId = book.id;
                }
            })
            const uniqueId = maxId + 1;

            const book = new Book({
                id: uniqueId,
                title: title,
                author: author,
                price: price,
                originalPrice: originalPrice,
                cover: cover,
                genre: genre,
                description: description,
                badge: badge,
                stock: 1
            });
            console.log(book);
            // TODO update JSON file
        } catch (error) {
            console.error("Error loading book details:", error)
        }
    }

    /**
    * Updates the values.
    * @param {number} orderNum - the unique identifier
    * @param {number} newValues - Values to update; takes a JSON Object; { status: 'delivering' }
    * @returns {Order} The formatted total.
    */
    async loadBook(id) {
        try {
            const response = await fetch(this.dbPath);
            const data = await response.json();
            const book = data.values().find(b => b.id == id)
            this.book = new Book(book);
            return this.book;
        } catch (error) {
            console.error("Error loading book details:", error)
        }
    }
}

export { BookController }