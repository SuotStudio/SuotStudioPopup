import { Col, Row, Space } from "antd";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addUserContactDetails } from "../../store/slices/userContactDetails";
import styles from "./styles.module.css";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ContactSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required name"),
  email: Yup.string().email("Invalid email").required("Required email"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required phone"),
  city: Yup.string().required("Required city"),
});

const ContactDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Row
      gutter={8}
      justify="center"
      align="middle"
      className={styles.contactDetails__container}
    >
      <Col span={10}>
        <h2 className={styles.contactDetails__title}>Who you are?</h2>
        <Formik
          initialValues={{
            firstName: "",
            email: "",
            phone: "",
            city: "",
          }}
          validationSchema={ContactSchema}
          onSubmit={(values) => {
            console.log(values);
            dispatch(
              addUserContactDetails({
                name: values.firstName,
                email: values.email,
                phone: values.phone,
                city: values.city,
              })
            );

            navigate("/horoscope");
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className={styles.contactDetails__formItem}>
                <Space
                  direction="vertical"
                  size={0}
                  className={styles.contactDetails__formItemSpace}
                >
                  <label>NAME</label>
                  <Field
                    name="firstName"
                    className={styles.contactDetails__input}
                  />
                  {errors.firstName && touched.firstName ? (
                    <div className={styles.contactDetails__error}>
                      {errors.firstName}
                    </div>
                  ) : null}
                </Space>
              </div>

              <div className={styles.contactDetails__formItem}>
                <Space
                  direction="vertical"
                  size={0}
                  className={styles.contactDetails__formItemSpace}
                >
                  <label>EMAIL</label>
                  <Field
                    name="email"
                    type="email"
                    className={styles.contactDetails__input}
                  />
                  {errors.email && touched.email ? (
                    <div className={styles.contactDetails__error}>
                      {errors.email}
                    </div>
                  ) : null}
                </Space>
              </div>

              <div className={styles.contactDetails__formItem}>
                <Space
                  direction="vertical"
                  size={0}
                  className={styles.contactDetails__formItemSpace}
                >
                  <label>PHONE</label>
                  <Field
                    name="phone"
                    className={styles.contactDetails__input}
                  />
                  {errors.phone && touched.phone ? (
                    <div className={styles.contactDetails__error}>
                      {errors.phone}
                    </div>
                  ) : null}
                </Space>
              </div>

              <div className={styles.contactDetails__formItem}>
                <Space
                  direction="vertical"
                  size={0}
                  className={styles.contactDetails__formItemSpace}
                >
                  <label>CITY</label>
                  <Field name="city" className={styles.contactDetails__input} />
                  {errors.city && touched.city ? (
                    <div className={styles.contactDetails__error}>
                      {errors.city}
                    </div>
                  ) : null}
                </Space>
              </div>

              <button
                type="submit"
                className={styles.contactDetails__submitButton}
              >
                SUBMIT
              </button>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default ContactDetails;
