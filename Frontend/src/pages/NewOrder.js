import React from "react";

function NewOrder() {
    function sendOrder() {
        fetch("http://carttech.tech/api/orders", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "password":"HTN420",
                "store_id":"61460e30981149a3c03b1393",
                "price":"4.20",
                "username":"129032699zw@gmail.com",
                "products":[
                    {
                        "id": "6146203f981149a3c03b1394",
                        "quantity": 3
                    }
                ]
            })
        }).then(response => console.log(response));
    }

    return(
        <div id="newOrder">
            <button onClick={sendOrder}>Send Order</button>
        </div>
    );
}

export default NewOrder;