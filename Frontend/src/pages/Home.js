import React from "react";
import '../styles/home.css';

//making the home component
function Home() {
    //return the page
    return (
        <div id="home">
            <div className="mt-4">
                <h1 className="fw-bolder proj-name">CartTech</h1>
                <h3 className="cursor text-center fw-bolder">Where you don't move the cart, the cart moves you!</h3>
            </div>
        </div>
    );
}

//export the component
export default Home;