// import { Order } from "./order.js"

class BookController {
    constructor() {
        this.book = null;
    }

    newBook() {
    }

    /**
    * Updates the values.
    * @param {number} orderNum - the unique identifier
    * @param {number} newValues - Values to update; takes a JSON Object; { status: 'delivering' }
    * @returns {Order} The formatted total.
    */
    async loadBook(id) {
        const dbPath = window.location.origin + "/data/books.json";
        try {
            const response = await fetch(dbPath);
            const data = await response.json();
            const book = data.values().find(b => b.id == id)
            this.book = book;
            console.log(`Book loaded`);
        } catch (error) {
            console.error("Error loading order details:", error)
        }
    }

    updateBook(id) {
    }
}

export { BookController }