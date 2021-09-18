import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Products() {
    const [products, setProducts] = useState([]);
    const [productThirds, setProductThirds] = useState([]);
    const [didLoad, setDidLoad] = useState(false);

    useEffect(() => {
        if (!didLoad)
        {
            fetch("http://carttech.tech/api/products?store_id=" + localStorage.getItem("storeId")).then(response => response.json()).then(data => {
                setProducts(data.response.products);
                var threes = [];
                for (var i = 0, j = 0; i < products.length; i ++) {
                    if (i >= 3 && i % 3 === 0)
                    {
                        j++;
                    }
                    threes[j] = threes[j] || [];
                    threes[j].push(products[i]);
                }
    
                setProductThirds(threes);
                return true;
            }).then(info => setDidLoad(info));
        }
    }, [products, productThirds, didLoad]);

    return (
        <div id="products" className="container">
            <div className="row text-center">
                <h1 className="display-1 mt-4">Products</h1>
            </div>
            <div className="row text-center my-3">
                <p className="h3">Here are all the products available here:</p>
            </div>
            {productThirds.map(function(productList) {
                return(
                    <div className="row">
                        {productList.map(function(product, i) {
                            return (
                                <div className="col" key={i}>
                                    <ProductCard
                                        productId={product.id}
                                        productImage={product.image_link}
                                        productName={product.name}
                                        productPrice={product.price}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default Products;