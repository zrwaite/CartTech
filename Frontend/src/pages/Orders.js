import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import OrderCard from "../components/OrderCard";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [orderThirds, setOrderThirds] = useState([]);
    const [didLoad, setDidLoad] = useState(false);
    const [stores, setStores] = useState([]);
    const [location, setLocation] = useLocation();

    useEffect(() => {
        if (!didLoad) {
            fetch("http://carttech.tech/api/orders?username=129032699zw@gmail.com").then(response => response.json()).then(data => {
                setOrders(data.response);

                /*//split products into groups of three for rendering
                var threes = [];
                for (var i = 0, j = 0; i < orders.length; i++) {
                    if (i >= 3 && i % 3 === 0)
                    {
                        j++;
                    }
                    threes[j] = threes[j] || [];
                    threes[j].push(orders[i]);
                }

                setOrderThirds(threes);*/
                return true;
            }).then(info => setDidLoad(info));
            fetch("http://carttech.tech/api/stores").then(response => response.json()).then(data => setStores(data.response.stores));
        }
    }, [orders, orderThirds, didLoad]);

    function changePage(){
        localStorage.setItem("storeOrder", "61460e30981149a3c03b1393");
        setLocation("/newOrder");
    }

    return (
        <div id="orders" className="container">
            <div className="row text-center">
                <h3>New Order</h3>
                    {stores.map((store, i) => {
                        var button;
                        if (i === 1) {
                            button = (<button onClick={changePage} key={i} className="btn btn-primary">{store.name}</button>)
                        } else {
                            button = (<button onClick={changePage} key={i} className="btn btn-primary" disabled>{store.name}</button>)
                        }
                        return button;
                    })}
            </div>
            <div className="row text-center">
                <h1 className="display-1 mt-4">Orders</h1>
            </div>
            <div className="row text-center my-3">
                <p className="h3">Here are all your orders (both past and in progress):</p>
            </div>
            {/*orderThirds.map((orderList, i) => {
                return (*/}
                <div className="row">
                        {orders.map((order, j) => {
                            return(<OrderCard
                                key={j}
                                orderStore={order.store_id}
                                orderStatus={order.status}
                                subtotal={order.price}
                                total={order.taxed_price}
                                orderProducts={order.products}
                            />)
                        })}
                    </div>
                {/*});
            })}*/}
        </div>
    );
}

export default Orders;