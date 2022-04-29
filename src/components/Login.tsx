import React, { useEffect } from "react";
import { Form, Input, Button, Result } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "../types/user";
import { login } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import showError from "../utils/showError";
import showSuccess from "../utils/showSuccess";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state: AppState) => state.user);

  const onFinish = (values: LoginForm) => {
    dispatch<any>(login(values));
  };

  useEffect(() => {
    error && showError(error);
  }, [error]);

  useEffect(() => {
    data.username && showSuccess("You have successfully Logged in");
  }, [data.username]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [data]);

  return (
    <>
      {location.state ? (
        <Result
          status="success"
          title="You Successfully Signup. Please Login."
        />
      ) : (
        <h1 style={{ textAlign: "center", paddingBottom: "50px" }}>
          Login Page
        </h1>
      )}
      <Form
        style={{ display: "grid", justifyContent: "center" }}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
