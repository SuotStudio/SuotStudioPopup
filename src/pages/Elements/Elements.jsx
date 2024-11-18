import { Button, Col, Row, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserOption } from "../../store/slices/userOptions";
import { elements, esElements } from "../../utils/constants";
import styles from "./styles.module.css";

const Elements = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");

  const currentLanguage = i18n.language;

  const handleOnNavigate = (element) => {
    dispatch(
      addUserOption({
        element,
      })
    );
    navigate(`/${currentLanguage || "en"}/words`);
  };

  return (
    <Row
      gutter={8}
      justify="center"
      align="middle"
      className={styles.elements__container}
    >
      <Col xl={20} md={20} xs={22}>
        <h2 className={styles.elements__title}>{t("elements.title")}</h2>
        <Space
          className={styles.elements__row}
          direction="vertical"
          size="large"
        >
          {(currentLanguage === "en" ? elements : esElements).map(
            (element, index) => {
              return (
                <Button
                  type="primary"
                  key={index}
                  onClick={() => handleOnNavigate(element)}
                >
                  {element}
                </Button>
              );
            }
          )}
        </Space>
      </Col>
    </Row>
  );
};

export default Elements;
