import { Button, Col, Row, Space } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserOption } from "../../store/slices/userOptions";
import { elements } from "../../utils/constants";
import styles from "./styles.module.css";

const Elements = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnNavigate = (element) => {
    dispatch(
      addUserOption({
        element,
      })
    );
    navigate("/words");
  };

  return (
    <Row
      gutter={8}
      justify="center"
      align="middle"
      className={styles.elements__container}
    >
      <Col xl={20} md={20} xs={22}>
        <h2 className={styles.elements__title}>
          Which of the four elements are you most attuned to?
        </h2>
        <Space
          className={styles.elements__row}
          direction="vertical"
          size="large"
        >
          {elements.map((element, index) => {
            return (
              <Button
                type="primary"
                key={index}
                onClick={() => handleOnNavigate(element)}
              >
                {element}
              </Button>
            );
          })}
        </Space>
      </Col>
    </Row>
  );
};

export default Elements;
