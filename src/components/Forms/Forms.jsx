import { Form, Field, Formik } from "formik";
import s from "./Forms.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Forms = () => {
  const initialValues = {
    username: "",
    email: "",
    date: "",
    comment: "",
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };
  return (
    <div>
      <div className={s.titleFormWrap}>
        <p className={s.titleForm}>Book your campervan now</p>
        <span className={s.titleDescription}>
          Stay connected! We are always ready to help you.
        </span>
      </div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => (
          <Form className={s.formBook}>
            <Field
              className={s.field}
              type="text"
              name="username"
              placeholder="Name*"
              required
            />
            <Field
              className={s.field}
              type="email"
              name="email"
              placeholder="Email*"
              required
            />
            <DatePicker
              className={s.field}
              placeholderText="Booking date*"
              selected={values.date}
              onChange={(date) => setFieldValue("date", date)}
              required
            />
            <Field
              className={s.fieldComment}
              as="textarea"
              name="comment"
              placeholder="Comment"
            />
            <button className={s.btn} type="submit">
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Forms;
