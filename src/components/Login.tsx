import React from 'react';
import { Form, Input, Button, Result } from 'antd';
// import showError from "../utils/showError";
// import api from "../utils/api";
import {useLocation} from "react-router-dom";
import {LoginForm} from "../types/user";
import {login} from "../store/actions/userActions";
import {useDispatch} from "react-redux";

function Login() {
    // const history = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const onFinish = (values: LoginForm) => {
        dispatch(login(values))
    }


    // const onFinish = async (values: any) => {
    //     try {
    //         await api.post("/users/login", values)
    //         history('/')
    //     } catch (e) {
    //         // showError({e});
    //         console.log(e);
    //     }
    //     console.log('Success:', values);
    // };
    //
    // const onFinishFailed = (errorInfo: any) => {
    //     showError(errorInfo);
    //     console.log('Failed:', errorInfo);
    // };

    return (
        <>
            {location.state ?
                <Result
                    status="success"
                    title="You Successfully Signup. Please Login."
                /> : <h1 style={{textAlign: "center", paddingBottom: "50px"}}>Login Page</h1>
            }
            <Form
                style={{display: "grid", justifyContent: "center"}}
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
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
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