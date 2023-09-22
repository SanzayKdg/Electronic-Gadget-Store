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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  // login Function
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginAsync({ email, password }));
  };

  // useEffect
  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (isAuthenticated) {
      alert.success("Login Success");
      navigate("/dashboard");
      // localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    }
  }, [alert, navigate, error, isAuthenticated]);

  return (
    <div className="adminLogin__formContainer">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="loginHeader">Login</h1>
          <form className="adminLogin__form" onSubmit={loginHandler}>
            <FormControl className="adminLogin__form1">
              <InputGroup className="form__item" size="md">
                <FormLabel htmlFor="email">Email: </FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="email__input"
                  id="email"
                  name="email"
                />
              </InputGroup>

              <InputGroup className="form__item" size="md">
                <FormLabel htmlFor="password">Password: </FormLabel>
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
