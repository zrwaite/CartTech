import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function OrderCard(props) {
    const [products, setProducts] = useState([]);
    const [goodProducts, setGoodProducts] = useState([]);
    const [didLoad, setDidLoad] = useState(false);

    useEffect(() => {
        if (!didLoad) {
            console.log(props.orderStore);
            fetch("http://carttech.tech/api/products?store_id=" + props.orderStore).then(response => response.json()).then(data => {
                setProducts(data.response.products);

                console.log(products);

                var validProducts = [];
                for (var i = 0; i < props.orderProducts.length; i++) {
                    for (var j = 0; j < products.length; j++) {
                        if (props.orderProducts[i].id == products[j]._id) {
                            validProducts.push({
                                image_id: products[j].image_link,
                                name: products[j].name,
                                price: products[j].price
                            });
                        }
                    }
                }

                setGoodProducts(validProducts);
                return true;
            }).then(info => setDidLoad(info));
        }
    }, [didLoad, products]);

    return (
        <div id="orderCard" className="container card">
            <h4>Order From: {props.orderStore}</h4>
            <h4>Order Status: {props.orderStatus}</h4>
            <p className="lead">Subtotal: {props.subtotal}</p>
            <p className="lead">Total: {props.total}</p>
            {goodProducts.map((product, i) => {
                console.log(product.image_link)
                return (
                    <div className="row">
                        <div className="lead">{props.orderProducts[i].quantity} of </div>
                        <ProductCard
                            key={i}
                            productImage={product.image_id}
                            productName={product.name}
                            productPrice={product.price}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default OrderCard;