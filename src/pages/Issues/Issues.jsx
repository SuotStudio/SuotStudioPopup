import { Button, Col, Row, Space } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserOption } from "../../store/slices/userOptions";
import { issues } from "../../utils/constants";
import styles from "./styles.module.css";

const Issues = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnNavigate = (issue) => {
    console.log("ISSUE", issue);
    dispatch(
      addUserOption({
        issue,
      })
    );
    navigate("/elements");
  };

  return (
    <Row
      gutter={8}
      justify="center"
      align="middle"
      className={styles.issues__container}
    >
      <Col span={20}>
        <h2 className={styles.issues__title}>
          What issues have you been focusing on lately?
        </h2>
        <Space className={styles.issues__row} direction="vertical" size="large">
          {issues.map((issue, index) => {
            return (
              <Button
                type="primary"
                key={index}
                onClick={() => handleOnNavigate(issue)}
              >
                {issue}
              </Button>
            );
          })}
        </Space>
      </Col>
    </Row>
  );
};

export default Issues;
