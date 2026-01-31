import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Breadcrumbs from "./components/Breadcrumbs";
import AttractionsSection from "./components/AttractionsSection";
import TourDetail from "./pages/TourDetail";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Header />
      <Breadcrumbs />

      <Routes>
        <Route path="/" element={<AttractionsSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tours/:slug" element={<TourDetail />} />
        <Route path="/checkout" element={<Checkout />} />

      </Routes>
    </>
  );
}

export default App;