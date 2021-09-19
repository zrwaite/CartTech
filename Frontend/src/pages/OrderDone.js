import React, { useEffect, useState } from "react";

function OrderDone() {
    const [didLoad, setDidLoad] = useState(false);

    useEffect(() => {
        if (!didLoad) {
            var products = localStorage.getItem("products");
            console.log(products[0]);
        }
    }, [didLoad])

    return (
        <div id="orderDone" className="container text-center">
            <h1 className="display-2 m-2">Your order is complete!</h1>
        </div>
    );
}

export default OrderDone;