// Enumerator of order status options
const OrderStatusOpts = Object.freeze({
    0: "Purchased",
    1: "Ready for Delivery",
    2: "Delivering",
    3: "Refund Requested",
    4: "Refunded"
});

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
        status: ${OrderStatusOpts[this.status]}`;

        return outputString;
    }
}

export { OrderStatusOpts, Order };