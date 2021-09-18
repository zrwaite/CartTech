import React from "react";

function ProductCard(props) {
    return (
        <div id="productCard" className="card m-4 text-center">
            <img src={"http://carttech.tech/files/" + props.productImage} alt={"Image of " + props.productName} className="img-fluid" />
            <h3 className="display-3">{props.productName}</h3>
            <h3>Price: {props.productPrice}</h3>
        </div>
    );
}

export default ProductCard;