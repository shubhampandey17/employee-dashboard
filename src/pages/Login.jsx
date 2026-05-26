import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [mail, setMail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [mandatoryFieldMail, setMandatoryFieldMail] = useState(false);
  const [mandatoryFieldPass, setMandatoryFieldPass] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const submitClicked = () => {
    let isValid = true;

    if (!mail.trim()) {
      setMandatoryFieldMail(true);
      isValid = false;
    }

    if (!loginPass.trim()) {
      setMandatoryFieldPass(true);
      isValid = false;
    }

    if (!isValid) return;

    if (mail === "admin@gmail.com" && loginPass === "12345") {
      navigate("/dashboard");
    } else {
      setWrongCredentials(true);
    }
  };

  return (
    <>
      <h2>Login</h2>

      <div>
        Email
        <input
          type="email"
          value={mail}
          onChange={(e) => {
            setMail(e.target.value);
            setMandatoryFieldMail(false);
            setWrongCredentials(false);
          }}
        />
        <br />
        {mandatoryFieldMail && <span style={{ color: "red" }}>This Field is mandatory *</span>}
      </div>

      <br />

      <div>
        Password
        <input
          type="password"
          value={loginPass}
          onChange={(e) => {
            setLoginPass(e.target.value);
            setMandatoryFieldPass(false);
            setWrongCredentials(false);
          }}
        />
        <br />
        {mandatoryFieldPass && <span style={{ color: "red" }}>This Field is mandatory *</span>}
      </div>

      <br />

      {wrongCredentials && <div style={{ color: "red" }}>Wrong Credentials</div>}

      <br />

      <button onClick={submitClicked}>Submit</button>
    </>
  );
};

export default Login;
