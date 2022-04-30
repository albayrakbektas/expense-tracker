import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import { Layout, Menu } from "antd";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Categories from "./components/Categories";
import Records from "./components/Records";

const { Header, Content, Footer } = Layout;
function App() {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        />
      </Header>
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

          {/*<PrivateRoute path={'/categories'} component={Categories} />*/}
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>Expense Tracker</Footer>
    </Layout>
  );
}

export default App;
