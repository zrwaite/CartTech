import React, { useState, useEffect } from "react";
import StoreCard from "../components/StoreCard";

function Stores() {
    const [stores, setStores] = useState(0);

    useEffect(() => {
        fetch("http://carttech.tech/api/stores").then(response => response.json()).then(data => {
            setStores(data.response.stores);
        });
    });

    return (
        <div id="stores" className="container">
            <div className="row text-center">
                <h1 className="display-1">Stores</h1>
            </div>
            <div className="row">
                {console.log(stores)}
                {stores.map(function(store, i) {
                    return (
                        <div className="col">
                            <StoreCard
                                key={i}
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