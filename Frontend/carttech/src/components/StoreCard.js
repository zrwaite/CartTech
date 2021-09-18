import React from "react";

//component for storefront card

function StoreCard(props) {
    return (
        <div id="storeCard" className="card m-2 text-center">
            <h4 className="display-4 my-4">{props.storeName}</h4>
            <p className="lead my-2">{props.storeInfo}</p>
            <p className="lead my-2">Carts Available: {props.storeAvailable} / {props.storeTotal}</p>
        </div>
    );
}

export default StoreCard;