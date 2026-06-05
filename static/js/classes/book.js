class Book {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.author = data.author;
        this.price = data.price;
        this.originalPrice = data.originalPrice;
        this.cover = data.cover;
        this.genre = data.genre;
        this.description = data.description;
        this.badge = data.badge;
        this.stock = data.stock;
    }

    /**
    * Updates the Book's values, and reflects this update in the database
    * @param {number} newValues - Values to update; takes a JSON Object; { title: "New Title", genre: "Action" }
    */
    update(newVals) {
        Object.keys(newVals).forEach(key => {
            if (Object.keys(this).includes(key)) {
                this[key] = newVals[key];
            }
        })

        // TODO update JSON file
    }

    toHTML() {
        const outputHTML = `<p>===<br>
        Book<br>
        ---<br>
        id: ${this.id}<br>
        title: ${this.title}<br>
        author: ${this.author}<br>
        price: ${this.price}<br>
        originalPrice: ${this.originalPrice}<br>
        cover: ${this.cover}<br>
        genre: ${this.genre}<br>
        description: ${this.description}<br>
        badge: ${this.badge}<br>
        stock: ${this.stock}<br>
        </p>`;

        return outputHTML;
    }
}

export { Book };