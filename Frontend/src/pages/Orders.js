import React, { useEffect, useState } from "react";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [orderThirds, setOrderThirds] = useState([]);
    const [didLoad, setDidLoad] = useState(false);

    useEffect(() => {
        if (!didLoad) {
            fetch("http://carttech.tech/api/orders").then(response => response.json()).then(data => {
                setOrders(data.response.orders);

                //split products into groups of three for rendering
                var threes = [];
                for (var i = 0, j = 0; i < orders.length; i ++) {
                    if (i >= 3 && i % 3 === 0)
                    {
                        j++;
                    }
                    threes[j] = threes[j] || [];
                    threes[j].push(orders[i]);
                }
                
                setOrderThirds(threes);
                return true;
            }).then(info => setDidLoad(info));
        }
    }, [orders, orderThirds, didLoad]);

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