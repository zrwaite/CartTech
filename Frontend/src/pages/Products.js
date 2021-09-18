import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Products() {
    const [products, setProducts] = useState([]);
    const [productThirds, setProductThirds] = useState([]);

    useEffect(() => {
        fetch("http://carttech.tech/api/products").then(response => response.json()).then(data => {
            setProducts(data.response.products);
            var threes = [];
            for (var i = 0, j = 0; i < products.length; i ++) {
                if (i >= 3 && i % 3 === 0)
                {
                    j++;
                }
                threes[j] = threes[j] || [];
                threes[j].push(products[i])
                /*threes[i/3].push(products[i]);
                threes[i/3].push(products[i + 1]);
                threes[i/3].push(products[i + 2]);*/
            }

            setProductThirds(threes);
        });
    });

    return (
        <div id="products" className="container">
            {productThirds.map(function(productList) {
                return(
                    <div className="row">
                        {productList.map(function(product, i) {
                            return (
                                <div className="col" key={i}>
                                    <ProductCard
                                        productImage={product.image_link}
                                        productName={product.name}
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