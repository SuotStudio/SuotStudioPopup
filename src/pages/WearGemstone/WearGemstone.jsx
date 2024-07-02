import { Button, Col, Row, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUserOptions } from "../../store/slices/userOptions";
import { gemstones } from "./constants";
import styles from "./styles.module.css";

const WearGemstone = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state);

  const handleOnNavigate = () => {
    dispatch(resetUserOptions());
    navigate("/");
  };

  return (
    <Row
      gutter={8}
      justify="center"
      align="middle"
      className={styles.wearGemstone__container}
    >
      <Col xl={20} md={20} xs={22}>
        <h2 className={styles.wearGemstone__title}>Wear your gemstone</h2>

        <Row gutter={8}>
          {gemstones[userDetails?.userOptions?.horoscope].map(
            (gemstone, index) => {
              return (
                <Col span={8} key={index}>
                  <img
                    width="100%"
                    style={{ marginBottom: "10px" }}
                    src={gemstone}
                    alt="Gemstone"
                  />
                </Col>
              );
            }
          )}
        </Row>
        <Space
          className={styles.wearGemstone__row}
          direction="vertical"
          size="large"
        >
          <Button
            type="primary"
            onClick={handleOnNavigate}
            style={{ marginTop: "15px" }}
          >
            START AGAIN
          </Button>
        </Space>
      </Col>
    </Row>
  );
};

export default WearGemstone;
