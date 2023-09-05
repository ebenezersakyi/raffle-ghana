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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<HousesList />} />
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
        </AuthProvider>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
