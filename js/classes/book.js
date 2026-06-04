class Book {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.author = data.author;
        this.price = data.price;
        this.originalPrice = data.originalPrice;
        this.cover = data.cover;
        this.genre = data.genre;
        this.descriptino = data.genre;
        this.description = data.description;
        this.badge = data.badge;
        this.stock = data.stock;
    }

    toString() {
        const outputString = `===
        Order
        ---
        id: ${this.id}
        books: ${JSON.stringify(this.books)}
        total cost: ${this.totalCost}
        status: ${this.status}
        ===`;

        return outputString;
    }
}

export { Book };