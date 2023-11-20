import { Button, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserOption } from "../../store/slices/userOptions";
import { horoscope } from "../../utils/constants";
import styles from "./styles.module.css";

const Horoscope = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnNavigate = (horoscope) => {
    dispatch(
      addUserOption({
        horoscope,
      })
    );
    navigate("/gemstone-result");
  };

  return (
    <Row
      gutter={8}
      justify="center"
      align="middle"
      className={styles.horoscope__container}
    >
      <Col span={22}>
        <h2 className={styles.horoscope__title}>What´s your horoscope sign?</h2>
        <Row
          gutter={8}
          justify="center"
          className={styles.horoscopeSection__buttons}
        >
          {horoscope.map((horoscope, index) => {
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
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default Horoscope;
