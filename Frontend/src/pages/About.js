import React from "react";
import team from "../carttech-teamphoto.png";
import '../styles/home.css'

//making the home component
function About() {
    //return the page
    return (
        <div id="about">
            <img src={team} className="opacity-50 w-100 image" alt="team" />
            <p>Grocery Shopping is a repetive, menial task, which means it is ripe for automation. Also, as we learned in the past 2 years, having these warehouse-like stores as a congregation point comes with many drawbacks. CartTech is here to make the process easier than ever.</p>
        </div>
    );
}

//export the component
export default About;