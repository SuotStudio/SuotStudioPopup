import { Button, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserOption } from "../../store/slices/userOptions";
import { esHoroscope, horoscope } from "../../utils/constants";
import styles from "./styles.module.css";

const Horoscope = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");

  const currentLanguage = i18n.language;

  const handleOnNavigate = (horoscope) => {
    dispatch(
      addUserOption({
        horoscope,
      })
    );
    navigate(`/${currentLanguage || "en"}/gemstone-result`);
  };

  return (
    <Row
      gutter={8}
      justify="center"
      align="middle"
      className={styles.horoscope__container}
    >
      <Col span={22}>
        <h2 className={styles.horoscope__title}>{t("horoscope.title")}</h2>
        <Row
          gutter={8}
          justify="center"
          className={styles.horoscopeSection__buttons}
        >
          {(currentLanguage === "en" ? horoscope : esHoroscope).map(
            (horoscope, index) => {
              return (
                <Col span={12} key={index}>
                  <Button
                    type="primary"
                    onClick={() => handleOnNavigate(horoscope)}
                  >
                    {horoscope}
                  </Button>
                </Col>
              );
            }
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default Horoscope;
