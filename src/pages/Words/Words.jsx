import { Button, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserOption } from "../../store/slices/userOptions";
import { wordsRepresented } from "../../utils/constants";
import styles from "./styles.module.css";

const Words = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnNavigate = (word) => {
    dispatch(
      addUserOption({
        word,
      })
    );
    navigate("/contact-details");
  };

  return (
    <Row
      gutter={8}
      justify="center"
      align="middle"
      className={styles.words__container}
    >
      <Col span={20}>
        <h2 className={styles.words__title}>
          With which words do you feel most represented?
        </h2>
        <Row
          gutter={8}
          justify="center"
          className={styles.wordsSection__buttons}
        >
          {wordsRepresented.map((word, index) => {
            return (
              <Col span={12} key={index}>
                <Button type="primary" onClick={() => handleOnNavigate(word)}>
                  {word}
                </Button>
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default Words;
