import { Button, Checkbox, Col, Row } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserOption } from "../../store/slices/userOptions";
import { wordsRepresented } from "../../utils/constants";
import styles from "./styles.module.css";

const Words = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    navigate("/contact-details");
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
          With which words do you feel most represented?
        </h2>
        <Row
          gutter={8}
          justify="center"
          className={styles.wordsSection__buttons}
        >
          {wordsRepresented.map((word) => {
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
          <Col span={24}>
            <Checkbox style={{ fontSize: "32px" }} onChange={handleOnSelectAll}>
              All of the above
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
                Continue
              </Button>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default Words;
