import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Issues from "./pages/Issues";
import Elements from "./pages/Elements";
import Words from "./pages/Words";
import Horoscope from "./pages/Horoscope";
import ContactDetails from "./pages/ContactDetails";
import GemstoneResult from "./pages/GemstoneResult";
import WearGemstone from "./pages/WearGemstone";
import "./App.css";

function App() {
  const location = useLocation();

  const isPrintStep = location?.pathname.includes("/wear-gemstone");

  console.log("LOCATION", location, isPrintStep);
  return (
    <main className={isPrintStep ? "step__container" : "main__container"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/elements" element={<Elements />} />
        <Route path="/words" element={<Words />} />
        <Route path="/contact-details" element={<ContactDetails />} />
        <Route path="/horoscope" element={<Horoscope />} />
        <Route path="/gemstone-result" element={<GemstoneResult />} />
        <Route path="/wear-gemstone" element={<WearGemstone />} />
      </Routes>
    </main>
  );
}

export default App;
