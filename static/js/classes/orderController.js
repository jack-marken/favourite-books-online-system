import { Order, OrderStatusOpts } from './order.js';

class OrderController {
    constructor() {
        this.statusOptions = OrderStatusOpts
        this.order = null;
    }

    newOrder(data) {
        console.log("TESTING");
        // newOrderData = {
        //     this.id = data.id;
        //     this.books = data.books
        //     this.totalCost = data.totalCost;
        //     this.status = data.status;
        // }
    }

    /**
    * Instantiates an Order object and loads it into `this.order`
    * @param {number} id - the unique identifier to find the order in the database
    * @returns {Order} - a generated Order object stored in this.order
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

    // /**
    // * Loads Order object into `this.order` and updates its values
    // * @param {number} id - the unique identifier to find the order in the database
    // * @param {number} newValues - Values to update; takes a JSON Object; { status: 'delivering' }
    // * @returns {Order} - a generated Order object stored in this.order
    // */
    async updateOrder(id, newVals) {
        const order = await this.loadOrder(id);
        order.update(newVals);
        return this.order
    }

}

export { OrderController };