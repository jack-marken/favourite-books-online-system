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
    async update(newVals) {
        try {
            Object.keys(newVals).forEach(key => {
                if (Object.keys(this).includes(key)) {
                    this[key] = newVals[key];
                }
            })
        } catch (error) {
            console.error('Key not recognised in new data:', newVals);
        }

        // /update-dataset/<dataset>/<newValues>/
        // TODO: Use this route to update the json dataset
        url = "/update-dataset/order/" + this.status

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": this.id,
                    "books": this.books,
                    "totalCost": this.totalCost,
                    "status": this.status
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
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