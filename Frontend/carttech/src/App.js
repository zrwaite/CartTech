import './App.css';
import { Router, Link } from "wouter"
import useHashLocation from './hooks/wouter-hash';
import PageRouter from "./components/router"

//basic app component where the other components go when rendered

function App() {
  return (
    <Router hook={useHashLocation}>
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
