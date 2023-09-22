import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsgEmail, setErrMsgEmail] = useState("");
  const [errMsgPwd, setErrMsgPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem("isLoggedIn");
    if (login) {
      window.location.href = '/home';;
    }
  }, [navigate]);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSignInHandler = () => {
    setIsLoading(true);

    axios
      .post("http://localhost:8000/api/user-login", {
        email: email,
        password: password,
      })
      .then((response) => {
        setIsLoading(false);

        if (response.data.status === 200) {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userData", JSON.stringify(response.data.data));
          setMsg(response.data.message);
          window.location.href = '/home';
        }
        
        if (
          response.data.status === "failed" &&
          response.data.success === undefined
        ) {
          setErrMsgEmail(response.data.validation_error.email);
          setErrMsgPwd(response.data.validation_error.password);
          setTimeout(() => {
            setErrMsgEmail("");
            setErrMsgPwd("");
          }, 2000);
        } else if (
          response.data.status === "failed" &&
          response.data.success === false
        ) {
          setErrMsg(response.data.message);
          setTimeout(() => {
            setErrMsg("");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Form className="containers">
        <FormGroup>
          <Label for="email">Email id</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={onChangeHandler}
          />
          <span className="text-danger">{msg}</span>
          <span className="text-danger">{errMsgEmail}</span>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={onChangeHandler}
          />
          <span className="text-danger">{errMsgPwd}</span>
        </FormGroup>
        <p className="text-danger">{errMsg}</p>
        <Button
          className="text-center mb-4"
          color="success"
          onClick={onSignInHandler}
        >
          Sign In
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm ml-5"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <span></span>
          )}
        </Button>
      </Form>
    </div>
  );
}
