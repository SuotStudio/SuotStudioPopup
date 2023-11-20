import { useEffect, useRef } from "react";
import { Button, Col, Row, Space } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  gemstoneResult,
  gemstoneResultImgToPrint,
  gemstoneResultToPrint,
  gemstoneVideoResult,
} from "./constants";
import qz from "qz-tray";
import { useReactToPrint } from "react-to-print";
import styles from "./styles.module.css";

const GemstoneResult = () => {
  const navigate = useNavigate();
  const userOptions = useSelector((state) => state);
  const videoRef = useRef(null);
  const componentRef = useRef();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => navigate("/wear-gemstone"),
  });

  const handleOnPrintTicket = () => {
    qz.websocket
      .connect()
      .then(() => {
        return qz.printers.find();
      })
      .then((printers) => {
        console.log("PRINTERS", printers);
        let config = qz.configs.create("epson");
        return qz.print(config, [
          {
            type: "pixel",
            format: "html",
            flavor: "plain",
            data: "<h1>Hello JavaScript!</h1>",
          },
        ]);
      })
      .then(() => {
        return qz.websocket.disconnect();
      })
      .then(() => {
        // process.exit(0);
      })
      .catch((err) => {
        console.error("PRINTER ERROR", err);
        // process.exit(1);
      });
  };

  return (
    <section className={styles.gemstoneResult__container}>
      <Row
        gutter={8}
        align="bottom"
        justify="center"
        git
        className={styles.gemstoneResult__rowContainer}
      >
        <Col lg={10} md={22} xs={22}>
          <video
            ref={videoRef}
            autoPlay
            muted
            width="100%"
            className={styles.gemstoneResult__video}
          >
            <source
              src={gemstoneVideoResult[userOptions?.userOptions.horoscope]}
              type="video/webm"
            />
            Tu navegador no soporta el elemento de video.
          </video>
          <Space
            direction="vertical"
            className={styles.gemstoneResult__spaceContainer}
          >
            <h2 className={styles.gemstoneResult__title}>SUOT STUDIO</h2>
            <div className={styles.gemstoneResult__result}>
              <p>Your gemstone is</p>
              <p>{gemstoneResult[userOptions?.userOptions.horoscope]}</p>
            </div>
            <div className={styles.gemstoneResult__action}>
              <p>DISCOVER MORE</p>
              <Button
                className={styles.gemstoneResult__button}
                type="primary"
                onClick={handlePrint}
              >
                PRINT
              </Button>
            </div>
            <div
              style={{ color: "black", position: "absolute", padding: "2rem" }}
              ref={componentRef}
            >
              <img
                style={{ width: "100%" }}
                src="https://suotstudio.com/cdn/shop/files/logo_suot.png?height=628&pad_color=fff&v=1668421178&width=1200"
                alt="gemstone img"
              />
              <p>
                <strong>www.suotstudio.com</strong>
              </p>

              <img
                style={{ width: "100%" }}
                src={
                  gemstoneResultImgToPrint[userOptions?.userOptions.horoscope]
                }
                alt="gemstone img"
              />
              <p>
                The stone that corresponds to you is:{" "}
                <strong>
                  {gemstoneResult[userOptions?.userOptions.horoscope]}
                </strong>
              </p>
              <p style={{ marginBottom: "20px" }}>
                {gemstoneResultToPrint[userOptions?.userOptions.horoscope]}
              </p>
              <p style={{ marginBottom: "20px", textAlign: "center" }}>
                <strong>www.suotstudio.com</strong>
              </p>
            </div>
          </Space>
        </Col>
      </Row>
    </section>
  );
};

export default GemstoneResult;
