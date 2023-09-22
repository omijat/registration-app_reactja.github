import React, { Component } from "react";
import "./App.css";
import Signup from "./Components/signUp/Signup";
import Signin from "./Components/SignIn/Signin";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom"; // Import 'Routes'
import List from "./Components/product/list.component";
import Sidbar from "./Components/Home/Sidbar";
import Header from "./Components/Home/Header";
import CreateProduct from "./Components/product/create.component";
import EditProduct from "./Components/product/edit.component";
import Footer from "./Components/Home/Footer";

class App extends Component {
  render() {
    let navLink = (
      <div className="Tab">
        <NavLink to="/sign-in" activeClassName="activeLink" className="signIn">
          Sign In
        </NavLink>
        <NavLink exact to="/" activeClassName="activeLink" className="signUp">
          Sign Up
        </NavLink>
      </div>
    );
    const login = localStorage.getItem("isLoggedIn");

    return (
      <div className="App">
        {login ? (
          <Router>
            <Header></Header>
            <Sidbar></Sidbar>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/list" element={<List />} />
              <Route path="/product/edit/:id" element={<EditProduct />} />
              <Route path="/product/create" element={<CreateProduct />} />
              <Route path="/Sidbar" element={<Sidbar />} />
              <Route path="/Header" element={<Header />} />
              <Route path="/Footer" element={<Footer />} />
            </Routes>
            <Footer></Footer>
          </Router>
        ) : (
          <Router>
            {navLink}
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/sign-in" element={<Signin />} />
            </Routes>
          </Router>
        )}
      </div>
    );
  }
}

export default App;
