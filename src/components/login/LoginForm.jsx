import * as YUP from "yup";
import { useFormik } from "formik";
import { FormInputField } from "../ui_element/forms/FormInputField";
import { useAuthContext } from "../../context/Auth.context";
import { Login } from "../../pages/Login";
import { LoginButtonBox } from "./LoginButtonBox";

const schema = YUP.object({
  email: YUP.string().email().required(),
  password: YUP.string().required(),
});
const initialValues = {
  email: "",
  password: "",
};

export function LoginForm() {
  const { login } = useAuthContext();

  const onSubmit = (values) => {
    console.log(values);
    login(values.email, values.password);
  };
  const handleClickLogin = () => {
    formik.handleSubmit();
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    validateOnMount: true,
    onSubmit,
  });

  return (
    <>
      <div className="login-form-box">
        <form onSubmit={formik.handleSubmit}>
          <FormInputField
            id="email"
            name="email"
            label="Email"
            type="text"
            formik={formik}
          />

          <FormInputField
            id="password"
            name="password"
            label="Password"
            type="text"
            formik={formik}
          />
        </form>
        <LoginButtonBox handleClickLogin={handleClickLogin} />
      </div>
    </>
  );
}
