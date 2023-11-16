import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Issues from "./pages/Issues";
import Elements from "./pages/Elements";
import Words from "./pages/Words";
import Horoscope from "./pages/Horoscope";
import ContactDetails from "./pages/ContactDetails";
import GemstoneResult from "./pages/GemstoneResult";
import "./App.css";

function App() {
  return (
    <main className="main__container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/elements" element={<Elements />} />
        <Route path="/words" element={<Words />} />
        <Route path="/contact-details" element={<ContactDetails />} />
        <Route path="/horoscope" element={<Horoscope />} />
        <Route path="/gemstone-result" element={<GemstoneResult />} />
      </Routes>
    </main>
  );
}

export default App;
