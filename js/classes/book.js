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
        Book
        ---
        id: ${this.id}
        title: ${this.title}
        author: ${this.author}
        price: ${this.price}
        originalPrice: ${this.originalPrice}
        cover: ${this.cover}
        genre: ${this.genre}
        descriptino: ${this.genre}
        description: ${this.description}
        badge: ${this.badge}
        stock: ${this.stock}`;

        return outputString;
    }
}

export { Book };