import { Order } from './order.js';

// Enumerator of order status options
const OrderStatusOpts = Object.freeze({
    PURCHASED: 0,
    READY_FOR_DELIVERY: 1,
    DELIVERING: 2,
    REFUND_REQUESTED: 3,
    REFUNDED: 4
});

class OrderController {
    constructor() {
        this.statusOptions = OrderStatusOpts
        this.order = null;
    }

    newOrder() {
        console.log("TESTING");
    }

    /**
    * Instantiates an Order object and loads it into `this.order`
    * @param {number} orderNum - the unique identifier
    * @param {number} newValues - Values to update; takes a JSON Object; { status: 'delivering' }
    * @returns {Order} The formatted total.
    */
    async loadOrder(id) {
        const dbPath = window.location.origin + "/data/orders.json";
        try {
            const response = await fetch(dbPath);
            const data = await response.json();
            const order = data.values().find(o => o.id == id)
            this.order = new Order(order);
            return this.order;
        } catch (error) {
            console.error("Error loading order details:", error)
        }
    }

    updateOrder(id) {
        order = this.loadOrder(orderNum);
    }

}

export { OrderController };