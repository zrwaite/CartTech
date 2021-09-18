import React, { useState, useEffect } from "react";
import StoreCard from "../components/StoreCard";

function Stores() {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        fetch("http://carttech.tech/api/stores").then(response => response.json()).then(data => setStores(data.response.stores));
    });

    return (
        <div id="stores" className="container">
            <div className="row text-center">
                <h1 className="display-1 mt-4">Stores</h1>
            </div>
            <div className="row text-center my-3">
                <p className="h3">Here are all the stores you can shop at!</p>
            </div>
            <div className="row">
                {stores.map(function(store, i) {
                    return (
                        <div className="col" key={i}>
                            <StoreCard
                                storeId={store.id}
                                storeName={store.name}
                                storeInfo={store.info}
                                storeAvailable={store.available_carts}
                                storeTotal={store.total_carts}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Stores;