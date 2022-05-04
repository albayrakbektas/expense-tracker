import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { Button, Form, Input, Modal, Select, Space, Table, Tag } from "antd";
import { Category } from "../types/category";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Record, RecordForm } from "../types/record";
import {
  addRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "../store/actions/recordActions";
import { Mode } from "../types/general";
import { getCategories } from "../store/actions/categoryActions";

const emptyForm: RecordForm = {
  title: "",
  amount: 0,
  category_id: 0,
};

function Records() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<RecordForm>(emptyForm);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, loading } = useSelector((state: AppState) => state.records);

  const { data: categories } = useSelector(
    (state: AppState) => state.categories
  );

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    if (mode === "new") dispatch<any>(addRecord(form));
    else if (mode === "edit" && typeof updateId === "number")
      dispatch<any>(updateRecord(form, updateId));
    else if (mode === "delete" && typeof deleteId === "number")
      dispatch<any>(deleteRecord(deleteId));
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(getRecords());
    !categories.length && dispatch<any>(getCategories());
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount ",
      render: (amount: Record["amount"], record: Record) => {
        return (
          <>
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount)}
          </>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: Category, record: Record) => (
        <Tag color={category.color}>{category.name.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Last Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string, record: Record) => (
        <>
          {new Date(updatedAt).toLocaleDateString()}{" "}
          {new Date(updatedAt).toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Record) => {
        const { title, amount } = record;
        const category_id = record.category.id;
        return (
          <Space size="middle">
            <EditOutlined
              style={{ cursor: "pointer", color: "#0390fc " }}
              onClick={() => {
                showModal("edit");
                setForm({ title, amount, category_id });
                setUpdateId(record.id);
              }}
            />
            <DeleteOutlined
              style={{ cursor: "pointer", color: "#c20808" }}
              onClick={() => {
                showModal("delete");
                setDeleteId(record.id);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const isFormValid = !(
    !form.title ||
    form.amount === 0 ||
    form.category_id === 0
  );

  return (
    <React.Fragment>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <Button
          type="primary"
          onClick={() => {
            showModal("new");
          }}
        >
          New Record
        </Button>
        <Modal
          title={"new" ? "Create New Record" : "Update Record"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !(mode === "delete") && !isFormValid }}
        >
          {mode === "edit" || mode === "new" ? (
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="Title" required rules={[{ required: true }]}>
                <Input
                  name={"title"}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Amount" required rules={[{ required: true }]}>
                <Input
                  name={"amount"}
                  value={form.amount}
                  type={"number"}
                  onChange={(e) =>
                    setForm({ ...form, amount: Number(e.target.value) })
                  }
                />
              </Form.Item>
              <Form.Item
                name="type"
                label="Category Type"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  defaultValue={form.category_id}
                  value={form.category_id}
                  onChange={(category_id: any) =>
                    setForm({ ...form, category_id })
                  }
                  allowClear
                >
                  <Select.Option value={0} disabled>
                    Select a category
                  </Select.Option>
                  {categories.map((category) => {
                    return (
                      <Select.Option value={category.id} key={category.id}>
                        {category.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Form>
          ) : mode === "delete" ? (
            <>Are you sure?</>
          ) : null}
        </Modal>
      </div>
      <Table loading={loading} columns={columns} dataSource={data} key={"id"} />
    </React.Fragment>
  );
}

export default Records;
