import { Route, Routes, useLocation } from "react-router-dom";
import i18next from "i18next";
import Home from "./pages/Home";
import Issues from "./pages/Issues";
import Elements from "./pages/Elements";
import Words from "./pages/Words";
import Horoscope from "./pages/Horoscope";
import ContactDetails from "./pages/ContactDetails";
import GemstoneResult from "./pages/GemstoneResult";
import WearGemstone from "./pages/WearGemstone";
import "./App.css";

import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";
import Header from "./components/Header/Header";

function App() {
  const location = useLocation();

  const currentLanguage = location.pathname.split("/")[1];

  console.log("LANG APP", currentLanguage);

  const isPrintStep = location?.pathname.includes("/wear-gemstone");

  i18next.init({
    interpolation: { escapeValue: false },
    lng: currentLanguage || "en",
    fallbackLng: "en",
    react: {
      useSuspense: true,
    },
    supportedLngs: ["es", "en", "it"],
    detection: {
      caches: ["cookie"],
    },
    resources: {
      es: {
        global: global_es,
      },
      en: {
        global: global_en,
      },
    },
  });

  return (
    <main className={isPrintStep ? "step__container" : "main__container"}>
      <Header />
      <Routes>
        <Route path="/:language?" element={<Home />} />
        <Route path=":language/issues" element={<Issues />} />
        <Route path=":language/elements" element={<Elements />} />
        <Route path=":language/words" element={<Words />} />
        <Route path=":language/contact-details" element={<ContactDetails />} />
        <Route path=":language/horoscope" element={<Horoscope />} />
        <Route path=":language/gemstone-result" element={<GemstoneResult />} />
        <Route path=":language/wear-gemstone" element={<WearGemstone />} />
      </Routes>
    </main>
  );
}

export default App;
