import React from "react";
import { useLocation } from "wouter";

//component for storefront card

function StoreCard(props) {
    const [location, setLocation] = useLocation();

    function setStore() {
        localStorage.setItem("storeId", props.storeId);
        setLocation("/products");
    }

    return (
        <div id="storeCard" className="card m-2 text-center">
            <button onClick={setStore} className="btn btn-primary btn-lg">{props.storeName}</button>
            <img src={"http://carttech.tech/files/" + props.storeImage} alt={"Image of " + props.storeName} className="img-fluid" />
            <p className="lead mt-4">{props.storeInfo}</p>
            <p className="lead my-2">Carts Available: {props.storeAvailable} / {props.storeTotal}</p>
        </div>
    );
}

export default StoreCard;