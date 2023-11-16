import { Button, Col, Row, Space } from "antd";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

const Home = () => {
  const navigate = useNavigate();

  const handleOnNavigate = () => {
    navigate("/issues");
  };

  return (
    <section className={styles.home__container}>
      <Row
        gutter={8}
        align="bottom"
        justify="center"
        className={styles.home__rowContainer}
      >
        <Col span={10}>
          <Space direction="vertical">
            <h2 className={styles.home__title}>SUOT STUDIO</h2>
            <Button
              className={styles.home__button}
              type="primary"
              onClick={handleOnNavigate}
            >
              FIND YOUR GEMSTONE
            </Button>
          </Space>
        </Col>
      </Row>
    </section>
  );
};

export default Home;
