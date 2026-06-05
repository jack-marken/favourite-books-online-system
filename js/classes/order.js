// Enumerator of order status options
const OrderStatusOpts = Object.freeze({
    PURCHASED: 0,
    READY_FOR_DELIVERY: 1,
    DELIVERING: 2,
    REFUND_REQUESTED: 3,
    REFUNDED: 4
});

class Order {
    constructor(data) {
        this.id = data.id;
        this.books = data.books
        this.totalCost = data.totalCost;
        this.status = data.status;
    }

    /**
    * Updates the Order's values, and reflects this update in the database
    * @param {number} newValues - Values to update; takes a JSON Object; { status: OrderStatusOpts.PURCHASED }
    */
    update(newVals) {
        Object.keys(newVals).forEach(key => {
            if (Object.keys(this).includes(key)) {
                this[key] = newVals[key];
            }
        })
    }

    toHTML() {
        const outputHTML = `<p>===<br>
        Order<br>
        ---<br>
        id: ${this.id}<br>
        books: ${JSON.stringify(this.books)}<br>
        total cost: ${this.totalCost}<br>
        status: ${this.status}<br>
        </p>`;

        return outputHTML;
    }
}

export { OrderStatusOpts, Order };