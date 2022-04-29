import React, { useEffect, useState } from "react";
import {Table, Tag, Button, Modal, Form, Select, Input} from "antd";
import {Category, CategoryForm} from "../types/category";
import { useDispatch, useSelector } from "react-redux";
import {addCategories, getCategories} from "../store/actions/categoryActions";
import { AppState } from "../store";
// import {SketchPicker} from "react-color"
const {SketchPicker} = require("react-color")

type Mode = "new" | "edit";

const emptyForm: CategoryForm = {
  name: "",
  type: "income",
  color: "black"
}


function Categories() {
  const { data } = useSelector((state: AppState) => state.categories);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<CategoryForm>(emptyForm)

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };
  const handleOk = () => {
    dispatch<any>(addCategories(form))
    setIsModalVisible(false);
    setMode("new")
    setForm(emptyForm)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm)
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
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (text, record) => (
    //         <Space size="middle">
    //             <a>Invite {record.name}</a>
    //             <a>Delete</a>
    //         </Space>
    //     ),
    // },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(getCategories());
  }, []);

  return (
    <React.Fragment>
      <div style={{textAlign: "right"}}>
        <Button type="primary" onClick={() => showModal('new')}>
          New Category
        </Button>
          <Modal title={"new" ? "Create New Category" : "Update Category"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form>
              <Form.Item label="Category Name" rules={[{ required: true }]}>
                <Input name={"name"} value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </Form.Item>
              <Form.Item name="type" label="Category Type" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option and change input text above"
                    defaultValue={"income"}
                    onChange={(value) => setForm({...form, type: value})}
                    allowClear
                >
                  <Select.Option value="income">income</Select.Option>
                  <Select.Option value="expense">expense</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label={"Color"}>
                <SketchPicker onChange={(color: any) => {
                  setForm({...form, color: color})
                  console.log(color)
                }} />
              </Form.Item>
            </Form>
          </Modal>
      </div>
      <Table columns={columns} dataSource={data} />
    </React.Fragment>
  );
}

export default Categories;
