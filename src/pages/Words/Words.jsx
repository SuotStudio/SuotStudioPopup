import { Button, Checkbox, Col, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserOption } from "../../store/slices/userOptions";
import { wordsRepresented, esWordsRepresented } from "../../utils/constants";
import styles from "./styles.module.css";

const Words = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");

  const currentLanguage = i18n.language;

  const [activeWords, setActiveWords] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const transformedOptions = activeWords.map((item) => item.label);

  const handleOnSelectOptions = (word) => {
    const isWordActive = activeWords.includes(word);

    if (isWordActive) {
      setActiveWords(activeWords.filter((item) => item.id !== word.id));
    } else {
      setActiveWords([...activeWords, word]);
    }
  };

  const handleOnSelectAll = () => {
    const allWords = wordsRepresented.map((word) => word);

    if (selectAll) {
      setActiveWords([]);
    } else {
      setActiveWords(allWords);
    }

    setSelectAll(!selectAll);
  };

  const handleOnNavigate = () => {
    dispatch(
      addUserOption({
        words: transformedOptions,
      })
    );
    navigate(`/${currentLanguage || "en"}/contact-details`);
  };

  return (
    <Row
      gutter={8}
      justify="center"
      align="middle"
      className={styles.words__container}
    >
      <Col span={22}>
        <h2 className={styles.words__title}>
        {t("words.title")}
        </h2>
        <Row
          gutter={8}
          justify="center"
          className={styles.wordsSection__buttons}
        >
          {(currentLanguage === "en" ? wordsRepresented : esWordsRepresented).map((word) => {
            const isWordActive = activeWords.includes(word);
            return (
              <Col span={12} key={word.id}>
                <Button
                  type="primary"
                  onClick={() => handleOnSelectOptions(word)}
                  style={{ background: isWordActive ? "#52c41a" : "" }}
                >
                  {word.label}
                </Button>
              </Col>
            );
          })}
        </Row>
        <Row justify="start">
          <Col span={24} className={styles.section__checkbox}>
            <Checkbox style={{ fontSize: "32px" }} onChange={handleOnSelectAll}>
            {t("words.allAbove")}
            </Checkbox>
          </Col>
        </Row>
        {activeWords.length > 0 && (
          <Row justify="center">
            <Col xl={6} md={12} xs={12}>
              <Button
                type="primary"
                className={styles.continue__button}
                onClick={handleOnNavigate}
              >
                {t("words.continue")}
              </Button>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default Words;
