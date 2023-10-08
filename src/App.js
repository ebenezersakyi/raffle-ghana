import "./App.css";

// import Home from "./componenet/home/Home";
import Home from "./components/home/Home.jsx";
// import Header from "./componenet/common/header/Header.jsx";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import Auth from "./components/auth/Auth.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import HousesList from "./components/pages/houseslist/HousesList";
import HouseDetails from "./components/pages/houseDetails/HouseDetails";
// import Announcements from "./components/pages/announcements/Announements";
import Checkout from "./components/pages/checkout/Checkout";
import Admin from "./components/pages/admin/Admin";
import NextDraw from "./components/common/nextDraw/NextDraw";
import Winners from "./components/pages/winners/Winners";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<HousesList />} />
            <Route path="/house-detail" element={<HouseDetails />} />
            {/* <Route path="/announcements" element={<Announcements />} /> */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/winners" element={<Winners />} />
            {/* <PrivateRoute path="/search" element={<Search/>}/> */}

            {/* <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<UserProfile />} />
            </Route>

            <Route path="/search" element={<Search />} /> */}
            <Route path="/auth" element={<Auth />} />
            {/* <Route path="/houseinfo/:id" element={<HouseDetails />} />
            <Route
              path="/currencydisclaimer"
              element={<CurrencyDisclaimer />}
            />
            <Route path="/downloadplatform" element={<ChoosePlatform />} /> */}
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
