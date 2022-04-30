import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Modal, Form, Select, Input, Space } from "antd";
import { Category, CategoryForm } from "../types/category";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategories, deleteCategory,
  getCategories,
  updateCategory,
} from "../store/actions/categoryActions";
import { AppState } from "../store";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {Mode} from "../types/general";
const { SketchPicker } = require("react-color");

const emptyForm: CategoryForm = {
  name: "",
  type: "income",
  color: "black",
};

function Categories() {
  const { data, loading } = useSelector((state: AppState) => state.categories);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<null | number>(null);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };
  const handleOk = () => {
    if (mode === "new") dispatch<any>(addCategories(form));
    else if (mode === "edit" && typeof updateId === "number")
      dispatch<any>(updateCategory(form, updateId));
    else if (mode === "delete" && typeof deleteId === "number")
      dispatch<any>(deleteCategory(deleteId))
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateId(null);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string, category: Category) => (
        <Tag color={category.color}>{text.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, category: Category) => (
        <Space size="middle">
          <EditOutlined
            style={{ cursor: "pointer", color: "#0390fc " }}
            onClick={() => {
              showModal("edit");
              setForm(category);
              setUpdateId(category.id);
            }}
          />
          <DeleteOutlined
            style={{ cursor: "pointer", color: "#c20808" }}
            onClick={() => {
              showModal("delete");
              setDeleteId(category.id);
            }}
          />
        </Space>
      ),
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(getCategories());
  }, []);

  return (
    <React.Fragment>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <Button type="primary" onClick={() => showModal("new")}>
          New Category
        </Button>
        <Modal
          title={"new" ? "Create New Category" : "Update Category"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !(mode === "delete") && !form.name }}
        >
          {mode === "edit" || mode === "new" ? (
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item
                label="Category Name"
                required
                rules={[{ required: true }]}
              >
                <Input
                  name={"name"}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Form.Item>
              <Form.Item
                name="type"
                label="Category Type"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  defaultValue={form.type ? form.type : "expense"}
                  value={form.type}
                  onChange={(value: any) => setForm({ ...form, type: value })}
                  allowClear
                >
                  <Select.Option value="income">income</Select.Option>
                  <Select.Option value="expense">expense</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label={"Color"}>
                <SketchPicker
                  color={form.color}
                  onChange={(color: { hex: any }) =>
                    setForm({ ...form, color: color.hex })
                  }
                />
              </Form.Item>
            </Form>
          ) : mode === "delete" ? (
            <>Are you sure?</>
          ) : null}
        </Modal>
      </div>
      <Table loading={loading} columns={columns} dataSource={data} />
    </React.Fragment>
  );
}

export default Categories;
