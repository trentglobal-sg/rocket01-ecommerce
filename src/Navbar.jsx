import { useState } from "react";
import { Link, useLocation } from "wouter";
export default function Navbar() {

  const [showNavbar, setShowNavBar] = useState(false);
  const [location] = useLocation();

  return <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">E-Shop</a>
        <button onClick={() => {
          setShowNavBar(!showNavbar);
        }}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${showNavbar ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location === "/" ? "active" : ""}`} aria-current="page" href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location === "/products" ? "active" : ""} `} href="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location === "/about" ? "active" : ""}`} href="/about-us">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location === "/contact-us" ? "active" : ""}`} href="/contact-us">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location === "/register" ? "active" : ""}`} href="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location === "/login" ? "active" : ""}`} href="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location === "/profile" ? "active" : ""}`} href="/profile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location === "/cart" ? "active" : ""}`} href="/cart">Cart</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  </>
}