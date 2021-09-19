import './App.css';
import { Router, Link } from "wouter";
import { useState, useEffect } from 'react';
import useHashLocation from './hooks/wouter-hash';
import PageRouter from "./components/router"
import "./LogoIdea1.png"

//basic app component where the other components go when rendered

function App() {
  const [navigation, setNavigation] = useState();
  const [didLoad, setDidLoad] = useState(false);
  
  useEffect(() => {
    if (false && !didLoad)
    {
      fetch("http://carttech.tech/api/user").then(response => response.json()).then(data => {
          console.log(data.response)
          console.log(data.response.authorized);
          if (data.response.authorized) {
          setNavigation(<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                          <div className="container-fluid">
                            <Link className="navbar-brand" href="/"><img src="LogoIdea1.png" alt="" width="30" className="mx-2" /><button type="button" className="btn btn-outline-light">CartTech</button></Link>
                            <ul className="navbar-nav">
                              <li className="nav-item mx-2">
                                <Link className="nav-link" href="/about">About</Link>
                              </li>
                              <li className="nav-item mx-2">
                                <Link className="nav-link" href="/stores">Stores</Link>
                              </li>
                              <li className="nav-item mx-2">
                                <p className="nav-link" href="/orders">{data.auth.nickname}</p>
                              </li>
                            </ul>
                          </div>
                        </nav>);
        } else {
          setNavigation(<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                          <div className="container-fluid">
                            <Link className="navbar-brand" href="/"><img src="LogoIdea1.png" alt="" width="30" className="mx-2" /><button type="button" className="btn btn-outline-light">CartTech</button></Link>
                            <ul className="navbar-nav">
                              <li className="nav-item mx-2">
                                <Link className="nav-link" href="/about">About</Link>
                              </li>
                              <li className="nav-item mx-2">
                                <a className="nav-link" href="http://carttech.tech/login">Login/Register</a>
                              </li>
                              {/*to be removed later*/}
                              <li className="nav-item mx-2">
                                <Link className="nav-link" href="/stores">Stores</Link>
                              </li>
                              <li className="nav-item mx-2">
                                <Link className="nav-link" href="/orders">Orders</Link>
                              </li>
                            </ul>
                          </div>
                        </nav>);
        }
      });
      setDidLoad(true);
    }
  }, [didLoad, navigation]);

  return (
    <Router hook={useHashLocation}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/"><img src="LogoIdea1.png" alt="" width="30" className="mx-2" /><button type="button" className="btn btn-outline-light">CartTech</button></Link>
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <Link className="nav-link" href="/about">About</Link>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="http://carttech.tech/login">Login/Register</a>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" href="/stores">Stores</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" href="/orders">Orders</Link>
            </li>
          </ul>
        </div>
    </nav>
      {navigation}
      <main role="main" className="wrapper">
        <div className="content">
          <PageRouter />
        </div>
      </main>
    </Router>
  );
}

export default App;
