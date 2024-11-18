import { Button, Col, Row, Space } from "antd";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import allPieces from "../../assets/videos/allPieces.webm";

import styles from "./styles.module.css";

const Home = () => {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");

  const currentLanguage = i18n.language;

  const videoRef = useRef(null);

  const handleOnNavigate = () => {
    navigate(`/${currentLanguage || "en"}/issues`);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <section className={styles.home__container}>
      <Row
        gutter={8}
        align="bottom"
        justify="center"
        className={styles.home__rowContainer}
      >
        <Col span={24}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            width="100%"
            className={styles.home__video}
          >
            <source src={allPieces} type="video/webm" />
            Tu navegador no soporta el elemento de video.
          </video>
          <Space direction="vertical" className={styles.home__spaceContainer}>
            <h2 className={styles.home__title}>SUOT STUDIO</h2>
            <Button
              className={styles.home__button}
              type="primary"
              onClick={handleOnNavigate}
            >
              {t("home.findGemstone").toUpperCase()}
            </Button>
          </Space>
        </Col>
      </Row>
    </section>
  );
};

export default Home;
