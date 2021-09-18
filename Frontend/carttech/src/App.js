import './App.css';
import { Router, Link } from "wouter"
import useHashLocation from './hooks/wouter-hash';
import PageRouter from "./components/router"
import "./LogoIdea1.png"

//basic app component where the other components go when rendered

function App() {
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
              <Link className="nav-link" href="/login">Login</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" href="/register">Register</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" href="/stores">Stores</Link>
            </li>
          </ul>
        </div>
      </nav>
      <main role="main" className="wrapper">
        <div className="content">
          <PageRouter />
        </div>
      </main>
    </Router>
  );
}

export default App;
