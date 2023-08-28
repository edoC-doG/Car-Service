import React, { useState, useEffect } from "react";
import "../../styles/signin.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { login, resetStateAuth } from "../../features/auth/authSlide";
import Notification from "../../components/Notification";

// validation input text
let schema = yup.object().shape({
  password: yup.string().required("Password must be 3 or more characters"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // console.log("values: ", values);
      dispatch(login(values));
    },
  });
  // console.log(getTokenFromLocalStorage);
  const [passwordShown, setPasswordShown] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    document.title = "Sign In";
  }, []);
  const authState = useSelector((state) => state.auth);
   
  const { user, isError, isSuccess, isLoading, message } = authState;
  useEffect(() => {
    if (isSuccess) {
      if (user?.roleName === "Admin") navigate("/admin");
      if (user?.roleName === "Manager") navigate("/manager" );
      
    } else {
      if (message?.status === 404) {
        setNotify({
          isOpen: true,
          message: message.title,
          type: "error",
        });
        navigate("");
        dispatch(resetStateAuth());
      }
    }
  }, [isSuccess, message]);


  return (
    <>
      <main className="main">
        <div className="position-fixed top-0 right-0 left-0 bg-img-hero __inline-1">
          <figure className="position-absolute right-0 bottom-0 left-0">
            <svg
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 1921 273"
            >
              <polygon fill="#fff" points="0,273 1921,273 1921,0 "></polygon>
            </svg>
          </figure>
        </div>
        <div className="container py-5 py-sm-7">
          <a className="d-flex justify-content-center " href="/">
            <img
              className="z-index-2"
              // 'src="https://6valley.6amtech.com/storage/app/public/company/2022-04-20-625fa32105ddf.png"
              // src="https://firebasestorage.googleapis.com/v0/b/book-2223b.appspot.com/o/logo.png?alt=media&token=993a2db6-7459-4fb8-967f-c139c002105a"
              src="https://firebasestorage.googleapis.com/v0/b/car-service-bf62f.appspot.com/o/logo.png?alt=media&token=ec9161af-b632-4d9e-a849-4e07dcce7ce3"
              alt="Logo"
            />
          </a>
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-5">
              <div className="card card-lg mb-5">
                <div className="card-body">
                  <form>
                    <div className="text-center">
                      <div className="mb-5">
                        <h1 className="display-4">Đăng nhập</h1>
                        <br />
                      </div>
                    </div>
                    {/* EMAIL INPUT */}
                    <div className="js-form-message form-group">
                      <label
                        className="input-label text-base"
                        htmlFor="signinSrEmail"
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        name="email"
                        id="signinSrEmail"
                        tabIndex="1"
                        placeholder="email@address.com"
                        aria-label="email@address.com"
                        required
                        data-msg="Please enter a valid email address."
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        value={formik.values.email}
                      />
                    </div>

                    {/* PASSWORD INPUT */}
                    <div className="js-form-message form-group">
                      <label
                        className="input-label email"
                        htmlFor="signinSrPassword"
                        tabIndex={"0"}
                      >
                        <span className="d-flex justify-content-between align-items-center text-base">
                          Mật khẩu:
                        </span>
                      </label>
                      <div className="input-group input-group-merge">
                        <input
                          type={passwordShown ? "text" : "password"}
                          className="js-toggle-password form-control form-control-lg"
                          name="password"
                          id="signinSrPassword"
                          placeholder="3+ characters required"
                          aria-label="3+ characters required"
                          required
                          onChange={formik.handleChange("password")}
                          onBlur={formik.handleBlur("password")}
                          value={formik.values.password}
                          // data-msg="Your password is invalid. Please try again."
                        />
                        <div
                          id="changePassTarget"
                          className="input-group-append"
                        >
                          <div
                            className="input-group-text"
                            onClick={togglePassword}
                          >
                            {passwordShown === false ? (
                              // <Icon fontSize="small">
                              <VisibilityIcon fontSize="small" />
                            ) : (
                              // </Icon>
                              <VisibilityOffIcon fontSize="small" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <br />

                    <button
                      type="submit"
                      className="btn btn-lg btn-block btn--primary"
                      onClick={formik.handleSubmit}
                    >
                      <h1 className="text-2xl text-white">Đăng nhập</h1>
                    </button>
                  </form>
                </div>
                <div className="card-footer"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default SignIn;
