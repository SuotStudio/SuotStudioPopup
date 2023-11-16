import { Button, Col, Row, Space } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qz from "qz-tray";
import styles from "./styles.module.css";

const GemstoneResult = () => {
  const navigate = useNavigate();
  const userOptions = useSelector((state) => state);

  console.log("USER OPTIONS", userOptions);

  const ThermalPrintButton = async () => {
    try {
      await qz.printers.find();

      const printer = "epson"; // Reemplaza con el nombre de tu impresora térmica
      const data = ["Hello, Thermal Printer!", "\x1D\x56\x41"]; // Código de corte de papel

      await qz.print({ printer, data });

      console.log("Impresión exitosa");
    } catch (error) {
      console.error("Error printing:", error.message);
    }
  };

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

  const handleOnNavigate = () => {
    navigate("/");
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
        <Col span={10}>
          <Space direction="vertical">
            <h2 className={styles.gemstoneResult__title}>SUOT STUDIO</h2>
            <div className={styles.gemstoneResult__result}>
              <p>Your gemstone is</p>
              <p>LAPISLAZULI</p>
            </div>
            <div className={styles.gemstoneResult__action}>
              <p>DISCOVER MORE</p>
              <Button
                className={styles.gemstoneResult__button}
                type="primary"
                onClick={handleOnPrintTicket}
              >
                PRINT
              </Button>
            </div>
          </Space>
        </Col>
      </Row>
    </section>
  );
};

export default GemstoneResult;
