import React, { useEffect, useState } from "react";
import "./Login.css";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader";
import { loginAsync } from "../../../features/Auth/auth";
import { loginDataValidation } from "../../../Errors/error";

const Login = () => {
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // login Function
  const loginHandler = (e) => {
    e.preventDefault();
    const validationErrors = loginDataValidation(email, password);
   
    if (email === "" || password === "") {
      alert.error("Fill all the required fields.");
    } else if (email !== user?.email || password !== user?.password) {
      alert.error("invalid credentials");
    }


    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(loginAsync({ email, password }));
  };

  // useEffect
  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (isAuthenticated && user?.role === "admin") {
      alert.success("Login Success");
    }
  }, [alert, error, isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
      localStorage.setItem("user", JSON.stringify(user?.role));

      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="adminLogin__formContainer">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="loginHeader">Login</h1>
          <form className="adminLogin__form" onSubmit={loginHandler}>
            <FormControl className="adminLogin__form1">
              <label htmlFor="Required" className="requiredText required">
                Please fill all the required fields. (*)
              </label>
              <InputGroup className="form__item" size="md">
                <FormLabel htmlFor="email">
                  Email: <span className="required">*</span>
                </FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="email__input"
                  id="email"
                  name="email"
                />
                {errors.email && <p className="span_text">{errors.email}</p>}
              </InputGroup>

              <InputGroup className="form__item" size="md">
                <FormLabel htmlFor="password">
                  Password: <span className="required">*</span>
                </FormLabel>
                <InputGroup>
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    className="password__input"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <p className="span_text">{errors.password}</p>
                )}
              </InputGroup>

              <InputGroup className="form__item">
                <Button type="submit" className="login__btn">
                  Login
                </Button>
              </InputGroup>
            </FormControl>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
