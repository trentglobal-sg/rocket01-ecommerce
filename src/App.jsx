import "./App.css"

import Navbar from "./Navbar";
import ProductCard from "./ProductCard"

// imports from wouter
import { Route, Switch} from "wouter";

// pages
import ProductPage from "./ProductPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import HomePage from "./HomePage";
import RegisterPage from "./RegisterPage";
import ShoppingCartPage from "./ShoppingCartPage";
import UserLogin from "./UserLogin";
import Profile from "./Profile";

// flash message
import FlashMessageDisplay from "./FlashMessageDisplay";

export default function App() {

  return <>

    <Navbar/>
    <FlashMessageDisplay/>

    <Switch>
      <Route path="/" component={HomePage}/>
      <Route path="/products" component={ProductPage}/>
      <Route path="/about-us" component={AboutPage}/>
      <Route path="/contact-us" component={ContactPage}/>
      <Route path="/register" component={RegisterPage}/>
      <Route path="/cart" component={ShoppingCartPage}/>
      <Route path="/login" component={UserLogin}/>
      <Route path="/profile" component={Profile}/>
    </Switch>
  

    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p>&copy; 2023 E-Shop. All rights reserved.</p>
      </div>
    </footer>

  </>
}