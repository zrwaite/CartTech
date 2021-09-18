import React, { useEffect, useState } from "react";

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => fetch("http://carttech.tech/api/orders").then(response => response.json()).then(data => {
        setOrders(data.response.orders);
    }));

    return (
        <div id="orders">
            <div className="row text-center">
                <h1 className="display-1 mt-4">Orders</h1>
            </div>
            <div className="row text-center my-3">
                <p className="h3">Here are all your orders (both past and in progress):</p>
            </div>

        </div>
    );
}

export default Orders;