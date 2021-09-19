import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import ProductCard from "../components/ProductCard";

function NewOrder() {
    const [didLoad, setDidLoad] = useState(false);
    const [products, setProducts] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]);
    const [location, setLocation] = useLocation();

    useEffect(() => {
        if (!didLoad) {
            fetch("http://carttech.tech/api/products?store_id=" + localStorage.getItem("storeOrder")).then(response => response.json()).then(data => {
                setProducts(data.response.products)
                return true;
            }).then(info => {
                setDidLoad(info);
            });
        }
    }, [didLoad, products, orderProducts]);

    function findPrice(productList) {
        var total = 0;

        for (var i = 0; i < products.length; i++) {
            var productPrice;
            for (var j = 0; j < products.length; j++) {
                if (products[j]._id == productList[i].id) {
                    productPrice = products[j].price;
                }
            }
            total += (productList[i].quantity) * productPrice;
        }

        return total;
    }

    function sendOrder() {
        var productQuantities = [];

        for (var i = 0; i < products.length; i++) {
            if (document.getElementById("a" + products[i]._id).value === "") {
                document.getElementById("a" + products[i]._id).value = 0;
            }
            productQuantities.push({
                id: products[i]._id,
                quantity: parseInt(document.getElementById("a" + products[i]._id).value) > 0 ? parseInt(document.getElementById("a" + products[i]._id).value) : 0
            })
        }
        console.log(productQuantities);

        setOrderProducts(productQuantities);
        setTimeout(function() {
            fetch("http://carttech.tech/api/orders", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "password":"HTN420",
                    "store_id":"61460e30981149a3c03b1393",
                    "price": findPrice(productQuantities),
                    "username":"129032699zw@gmail.com",
                    "products": productQuantities
                })
            }).then(response => {
                console.log(response)
                localStorage.setItem("products", productQuantities);
                setLocation("/orderDone");
            });
        }, 2000);
    }

    return(
        <div id="newOrder" className="container">
            <div className="row">
                {products.map((product, i) => {
                    return (
                        <div className="col" align="center">
                            <ProductCard
                                productId={product._id}
                                productImage={product.image_link}
                                productName={product.name}
                                productPrice={product.price}
                            />
                            <input type="number" id={"a" + product._id} min="0" placeholder="0" />
                        </div>
                    );
                })}
            </div>
            <div className="row">
                <button className="btn btn-primary m-4" onClick={sendOrder}>Send Order</button>
            </div>
        </div>
    );
}

export default NewOrder;