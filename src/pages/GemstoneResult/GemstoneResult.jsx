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
// import qz from "qz-tray";
import { useReactToPrint } from "react-to-print";
import logoSuotStudio from "../../assets/logoSuotStudio.png";
import styles from "./styles.module.css";
import { supabase } from "../../supabase";

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

  const handleCreateUser = async () => {
    const { error } = await supabase.from("users").insert([
      {
        name: userOptions?.userContactDetails?.name,
        email: userOptions?.userContactDetails?.email,
        phone: userOptions?.userContactDetails?.phone,
        city: userOptions?.userContactDetails?.city,
        horoscope: userOptions?.userOptions?.horoscope,
      },
    ]);

    if (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleCreateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleOnPrintTicket = () => {
  //   qz.websocket
  //     .connect()
  //     .then(() => {
  //       return qz.printers.find();
  //     })
  //     .then((printers) => {
  //       console.log("PRINTERS", printers);
  //       let config = qz.configs.create("epson");
  //       return qz.print(config, [
  //         {
  //           type: "pixel",
  //           format: "html",
  //           flavor: "plain",
  //           data: "<h1>Hello JavaScript!</h1>",
  //         },
  //       ]);
  //     })
  //     .then(() => {
  //       return qz.websocket.disconnect();
  //     })
  //     .then(() => {
  //       // process.exit(0);
  //     })
  //     .catch((err) => {
  //       console.error("PRINTER ERROR", err);
  //       // process.exit(1);
  //     });
  // };

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
            loop
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
              style={{
                color: "black",
                position: "absolute",
                paddingTop: "18rem",
              }}
              ref={componentRef}
            >
              <img
                style={{ width: "100%" }}
                src={logoSuotStudio}
                alt="gemstone img"
              />

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
