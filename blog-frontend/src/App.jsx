import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetail from "./components/PostDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-bg min-vh-100 d-flex flex-column">
        <nav className="navbar navbar-expand-lg glass-nav sticky-top">
          <div className="container py-2">
            <Link className="navbar-brand fw-bold fs-4 text-dark" to="/">
              ✨ BlogSphere
            </Link>
            <div className="d-flex gap-2 ms-auto">
              <Link
                className="btn btn-sm btn-outline-dark rounded-pill px-3"
                to="/"
              >
                Home
              </Link>
              <Link
                className="btn btn-sm btn-primary rounded-pill px-3"
                to="/create"
              >
                New Post
              </Link>
            </div>
          </div>
        </nav>

        <header className="hero-wrap py-5">
          <div className="container text-center">
            <h1 className="display-5 fw-bold mb-2">Write. Share. Inspire.</h1>
            <p className="lead text-secondary mb-0">
              A modern fullstack blog powered by React + Laravel.
            </p>
          </div>
        </header>

        <main className="container pb-5 flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/posts/:id" element={<PostDetail />} />
          </Routes>
        </main>

        <footer className="text-center py-3 text-muted small">
          Built with React, Laravel, and your creativity.
        </footer>
      </div>
    </Router>
  );
}

export default App;
