import MainPage from "./pages/MainPage";
import ChatsPage from "./pages/SelectChat";
import RoomPage from "./pages/RoomPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CheckoutPage from "./pages/CheckoutPage";
import PurchasesPage from "./pages/PurchasesPage";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { convertProductToDict } from "./constant";
import CartPage from "./pages/CartPage";
import "./index.css";

function getProduct(name, products) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase() == name.toLowerCase()) {
      return products[i];
    }
  }
  return null;
}
var loggedIn = JSON.parse(document.getElementById("logged-in").textContent);

function getProducts() {
  return fetch("/api/all-products/", {
    method: "GET",
  }).then((r) => r.json());
}

function getCart() {
  return fetch("/api/my-cart/", {
    method: "GET",
  }).then((r) => r.json());
}

function getProductsAndCart() {
  return Promise.all([getProducts(), getCart()]);
}

function App() {
  const [products, setProducts] = React.useState([]);
  const [cart, setCart] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getProductsAndCart().then(([response1, response2]) => {
      var copy = [];
      for (var i = 0; i < response1.products.length; i++) {
        copy.push(convertProductToDict(response1.products[i]));
      }
      setProducts(copy);
      var copy1 = [];
      if (loggedIn) {
        for (var i = 0; i < response2.cart.length; i++) {
          copy1.push(convertProductToDict(response2.cart[i]));
        }
      }
      setCart(copy1);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {!loading && (
        <Router>
          <Routes>
            <Route path="/" element={<MainPage products={products} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/purchases" element={<PurchasesPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/cart" element={<CartPage cart={cart} />} />
            <Route path="/chats" element={<ChatsPage products={products} />} />
            <Route
              path="/chat/sesordle"
              element={<RoomPage product={getProduct("sesordle", products)} />}
            />
            <Route
              path="/chat/milkman"
              element={<RoomPage product={getProduct("milkman", products)} />}
            />
            <Route
              path="/chat/robotTales"
              element={
                <RoomPage
                  product={getProduct("tales of the robot", products)}
                />
              }
            />
            <Route
              path="/chat/turtleClicker"
              element={
                <RoomPage product={getProduct("turtle clicker", products)} />
              }
            />
            <Route
              path="/chat/turretOverload"
              element={
                <RoomPage product={getProduct("turret overload", products)} />
              }
            />
          </Routes>
        </Router>
      )}
    </>
  );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
