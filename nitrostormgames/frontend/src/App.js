import MainPage from "./pages/MainPage";
import ChatsPage from "./pages/SelectChat";
import RoomPage from "./pages/RoomPage";
import LoginPage from "./pages/LoginPage";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { convertProductToDict } from "./constant";

function getProduct(name, products) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase() == name.toLowerCase()) {
      return products[i];
    }
  }
  return null;
}
function App() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("/api/all-products/", {
      method: "GET",
    })
      .then((r) => r.json())
      .then((response) => {
        const products = response.products;
        var copy = [];
        for (var i = 0; i < products.length; i++) {
          copy.push(convertProductToDict(products[i]));
        }
        setProducts(copy);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {!loading && (
        <Router>
          <Routes>
            <Route path="/" element={<MainPage products={products} />} />
            {/* <Route path="/about" element={<AboutPage />} /> */}
            <Route path="/login" element={<LoginPage />} />
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
