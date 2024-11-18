import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const currentLanguage = i18n.language;
  const isHomeLocation =
    location.pathname === "/es/" || location.pathname === "/en/";

  const isWearLocation =
    location.pathname === "/en/wear-gemstone" ||
    location.pathname === "/es/wear-gemstone";

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  const handleGoBack = () => {
    navigate(-1);
  };


  return (
    <header
      className={`${styles.header} ${isHomeLocation ? styles.homeHeader : ""}`}
    >
      {!isWearLocation && (
        <ul>
          <li
            onClick={() => handleLanguageChange("en")}
            className={currentLanguage === "en" ? styles.active : ""}
          >
            EN
          </li>
          <li
            onClick={() => handleLanguageChange("es")}
            className={currentLanguage === "es" ? styles.active : ""}
          >
            ES
          </li>
        </ul>
      )}
      {!isHomeLocation && !isWearLocation && (
        <Button type="link" onClick={handleGoBack}>
          <p>&#x2190; {t("header.title")}</p>
        </Button>
      )}
    </header>
  );
};

export default Header;
