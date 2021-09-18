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
          <Link className="navbar-brand" href="/"><img src="LogoIdea1.png" width="30" className="mx-2" /><button type="button" className="btn btn-outline-light">CartTech</button></Link>
          <ul class="navbar-nav">
            <li class="nav-item mx-2">
              <Link className="nav-link" href="/about">About</Link>
            </li>
            <li class="nav-item mx-2">
              <Link className="nav-link" href="/login">Login</Link>
            </li>
            <li class="nav-item mx-2">
              <Link className="nav-link" href="/register">Register</Link>
            </li>
          </ul>
        </div>
      </nav>
      <main role="main" className="wrapper">
        <div className="content">
          <PageRouter />
        </div>
      </main>
      <footer className="footer">
        <div className="links">
          <Link href="/">Home</Link>
          <span className="divider">|</span>
          <Link href="/about">How it Works</Link>
        </div>
      </footer>
    </Router>
  );
}

export default App;
