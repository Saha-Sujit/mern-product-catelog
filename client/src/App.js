import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Products from "./components/Layouts/Products";
import AddProduct from "./components/Layouts/AddProduct";
import EditProduct from "./components/Layouts/EditProduct";
import Header from "./components/Layouts/Header";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const user = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container">
      <Routes>
        {/* {user && (
          <Route path="/" exact element={<Products products={products} />} />
        )}
        <Route
          path="/product/:id"
          render={(props) => <Product {...props} products={products} />}
        /> */}
        {user && (
          <Route path="/" exact element={<Products products={products} />} />
        )}
        {user && <Route path="/update/:id" element={<EditProduct />} />}
        {user && <Route path="/add-product" element={<AddProduct />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" exact element={<Navigate replace to="/login" />} />
        <Route
          path="/add-product"
          exact
          element={<Navigate replace to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
