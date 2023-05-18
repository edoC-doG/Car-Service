import React, { useState } from "react";
import "../../styles/signin.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Icon } from "@mui/material";

const SignIn = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
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
            height="40px"
            className="z-index-2"
            // 'src="https://6valley.6amtech.com/storage/app/public/company/2022-04-20-625fa32105ddf.png"
            src="https://i.imgur.com/IbQr6kf.png"
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
                      <h1 className="display-4">Sign in</h1>
                      <br />
                      <span>Welcome back Admin</span>
                    </div>
                  </div>
                  {/* EMAIL INPUT */}
                  <div className="js-form-message form-group">
                    <label className="input-label" htmlFor="signinSrEmail">
                      Your email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      name="email"
                      id="signinSrEmail"
                      tabIndex="1"
                      placeholder="email@address.com"
                      aria-label="email@address.com"
                      required=""
                      data-msg="Please enter a valid email address."
                    />
                  </div>

                  {/* PASSWORD INPUT */}
                  <div className="js-form-message form-group">
                    <label
                      className="input-label email"
                      htmlFor="signinSrPassword"
                      tabIndex={"0"}
                    >
                      <span className="d-flex justify-content-between align-items-center">
                        Password
                      </span>
                    </label>
                    <div className="input-group input-group-merge">
                      <input
                        type={passwordShown ? "text" : "password"}
                        className="js-toggle-password form-control form-control-lg"
                        name="password"
                        id="signinSrPassword"
                        placeholder="8+ characters required"
                        aria-label="8+ characters required"
                        required=""
                        // data-msg="Your password is invalid. Please try again."
                      />
                      <div id="changePassTarget" className="input-group-append">
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

                  {/* Recaptcha */}
                  <div
                    id="recaptcha_element"
                    className="w-100"
                    datatype="image"
                  >
                    <div style={{ width: "304px", height: "78px" }}>
                      <div>
                        <iframe
                          title="reCAPTCHA"
                          src="https://www.google.com/recaptcha/api2/anchor?ar=2&amp;k=6LfMARoeAAAAAAITvA-le6X9IElSWX6CncicwEfY&amp;co=aHR0cHM6Ly82dmFsbGV5LjZhbXRlY2guY29tOjQ0Mw..&amp;hl=en&amp;type=image&amp;v=1h-hbVSJRMOQsmO_2qL9cO0z&amp;size=normal&amp;cb=us7wzgnvpoj0"
                          width="304"
                          height="78"
                          role="presentation"
                          name="a-upari3xcziom"
                          frameBorder="0"
                          scrolling="no"
                          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
                        ></iframe>
                      </div>
                      <textarea
                        id="g-recaptcha-response"
                        name="g-recaptcha-response"
                        className="g-recaptcha-response"
                        style={{
                          width: "250px",
                          height: "40px",
                          border: "1px solid rgb(193, 193, 193)",
                          margin: "10px 25px",
                          padding: "0px",
                          resize: "none",
                          display: "none",
                        }}
                      ></textarea>
                      <iframe
                        style={{ display: "none" }}
                        title="hello"
                      ></iframe>
                    </div>
                  </div>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-lg btn-block btn--primary"
                  >
                    Sign in
                  </button>
                </form>
              </div>
              <div className="card-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
