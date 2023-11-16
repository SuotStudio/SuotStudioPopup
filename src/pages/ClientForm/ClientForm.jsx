import { Row } from "antd";
import styles from "./styles.module.css";

export const ClientForm = () => {
  return (
    <Row
      gutter={8}
      justify="center"
      align="middle"
      className={styles.clientForm__container}
    ></Row>
  );
};
