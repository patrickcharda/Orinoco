class Order {
    constructor() {
        this.arrayOrders = [];
        //localStorage.removeItem('orders');
    }
    createOrdersArray() {
        var orders = localStorage.getItem("orders");
        //console.log(orders);
        if (orders === null) {
            //localStorage.setItem('furnitures',JSON.stringify(this.arrayFurnitures));
            //console.log(JSON.parse(localStorage.getItem('furnitures')));
            console.log('aucun historique de commandes');
        } else {
            this.arrayOrders = JSON.parse(orders);
            //console.log(this.arrayOrders);
        } 
    } 

    appendOrder(order) {
        this.arrayOrders.push(order);
        //console.log(this.arrayOrders);
        localStorage.removeItem('orders');
        localStorage.setItem('orders', JSON.stringify(this.arrayOrders));
        //console.log(`commandes : ${this.arrayOrders}`);
        //console.log(JSON.parse(localStorage.getItem('orders')));
    }

    returnArrayOrders() {
        return this.arrayOrders;
    }
    
    returnArrayOrdersLastRecord() {
        return this.arrayOrders[this.arrayOrders.length - 1];
    }

    static returnOrdersTable() {
        let oldOrders = JSON.parse(localStorage.getItem('orders'));
        console.log(oldOrders);
        return oldOrders;
    }

}