import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import { Layout } from "antd";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Categories from "./components/Categories";
import Records from "./components/Records";
import AppHeader from "./components/AppHeader";
import Logout from "./components/Logout";

const { Content, Footer } = Layout;
function App() {
  return (
    <Layout>
      <AppHeader />
      <Content
        className="site-layout"
        style={{ padding: "50px", marginTop: 64 }}
      >
        <Routes>
          <Route path={"/register"} element={<SignUp />} />
          <Route path={"/login"} element={<Login />} />
          <Route
            path={"/categories"}
            element={<PrivateRoute component={Categories} />}
          />
          <Route
            path={"/records"}
            element={<PrivateRoute component={Records} />}
          />
          <Route path={"/logout"} element={<Logout />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>Expense Tracker</Footer>
    </Layout>
  );
}

export default App;
