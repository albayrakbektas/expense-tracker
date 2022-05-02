import React, { useEffect } from "react";
import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../store/actions/userActions";
import { AppState } from "../store";
import { Link } from "react-router-dom";

function AppHeader() {
  const { data, loading } = useSelector((state: AppState) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(isLoggedIn());
  }, []);

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        {data.username ? (
          <React.Fragment>
            <Menu.Item key={"/categories"}>
              <Link to={"/categories"}>Categories</Link>
            </Menu.Item>
            <Menu.Item key={"/records"}>
              <Link to={"/records"}>Records</Link>
            </Menu.Item>
            <Menu.Item key={"/logout"}>
              <Link to={"/logout"}>Logout</Link>
            </Menu.Item>
          </React.Fragment>
        ) : loading ? null : (
          <Menu.Item key={"/login"}>
              <Link to={'/login'}>Login</Link>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
}

export default AppHeader;
