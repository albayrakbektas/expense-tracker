import React from "react";
import {Form, Input, Button} from "antd";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import showError from "../utils/showError";
import Loader from "../utils/loader";

function SignUp() {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  let isLoading: boolean = false;
  const history = useNavigate();

  const onFinish = async (values: any) => {
    try {
      isLoading = true
      await api.post("/users/register", values);
      isLoading = false
      history("/login", { state: true });
    } catch (error) {
      isLoading = true
      showError((error as any).response.data.errorMessage);
      isLoading = false
    }
  };

  return (
      <>
        {
          isLoading ?? <Loader />
        }
        <h2 style={{textAlign: "center", paddingBottom: "50px"}}>Please Signup</h2>
        <Form
            style={{display: "grid", justifyContent: "center"}}
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
          <Form.Item
              name={"username"}
              label="Username"
              rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              name={"email"}
              label="Email"
              rules={[{ type: "email", required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={"full_name"} label="Full Name">
            <Input />
          </Form.Item>
          <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!", min: 6 },
              ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
  );
}

export default SignUp;
