class Order {
    constructor(data) {
        this.id = data.id;
        this.books = data.books
        this.totalCost = data.totalCost;
        this.status = data.status;
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

export { Order };