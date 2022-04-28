import React from 'react';
import {Table, Tag} from "antd";
import {Category} from "../types/category";

function Category() {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (text: string, category: Category) => <Tag color={category.color}>{text.toUpperCase() }</Tag>
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

    return (
        <Table columns={columns} dataSource={data} />
    );
}

export default Category;