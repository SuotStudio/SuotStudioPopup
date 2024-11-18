import { Button, Col, Row, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserOption } from "../../store/slices/userOptions";
import { issues, esIssues } from "../../utils/constants";
import styles from "./styles.module.css";

const Issues = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");

  const currentLanguage = i18n.language;

  const handleOnNavigate = (issue) => {
    dispatch(
      addUserOption({
        issue,
      })
    );
    navigate(`/${currentLanguage || "en"}/elements`);
  };

  return (
    <Row
      gutter={8}
      justify="center"
      align="middle"
      className={styles.issues__container}
    >
      <Col xl={20} md={20} xs={22}>
        <h2 className={styles.issues__title}>{t("issues.title")}</h2>
        <Space className={styles.issues__row} direction="vertical" size="large">
          {(currentLanguage === "en" ? issues : esIssues).map(
            (issue, index) => {
              return (
                <Button
                  type="primary"
                  key={index}
                  onClick={() => handleOnNavigate(issue)}
                >
                  {issue}
                </Button>
              );
            }
          )}
        </Space>
      </Col>
    </Row>
  );
};

export default Issues;
