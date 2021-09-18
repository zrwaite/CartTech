import React, { useState, useEffect } from "react";
import StoreCard from "../components/StoreCard";

function Stores() {
    const [stores, setStores] = useState([]);
    const [storeThirds, setStoreThirds] = useState([]);
    const [didLoad, setDidLoad] = useState(false);

    useEffect(() => {
            if (!didLoad)
            {
                fetch("http://carttech.tech/api/stores").then(response => response.json()).then(data => {
                    setStores(data.response.stores);
                    var threes = [];
                    for (var i = 0, j = 0; i < stores.length; i ++) {
                        if (i >= 3 && i % 3 === 0)
                        {
                            j++;
                        }
                        threes[j] = threes[j] || [];
                        threes[j].push(stores[i]);
                    }

                    setStoreThirds(threes);
                    console.log(storeThirds);
                    return true;
                }).then(info => setDidLoad(info));
            }
        }, [stores, storeThirds, didLoad]);

    return (
        <div id="stores" className="container">
            <div className="row text-center">
                <h1 className="display-1 mt-4">Stores</h1>
            </div>
            <div className="row text-center my-3">
                <p className="h3">Here are all the stores you can shop at!</p>
            </div>
            {storeThirds.map(function(storeList, j) {
                return (
                    <div className="row">
                        {storeList.map(function(store, i) {
                            return (
                                <div className="col" key={i}>
                                    <StoreCard
                                        storeId={store._id}
                                        storeName={store.name}
                                        storeInfo={store.info}
                                        storeAvailable={store.available_carts}
                                        storeTotal={store.total_carts}
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

export default Stores;