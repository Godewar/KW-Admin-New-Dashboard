import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, Space, Popconfirm, message, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { seoService } from 'api/seo';
import { pagesService } from 'api/pages';

const { Title } = Typography;

const SeoManagement = () => {
  const [seoData, setSeoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [pages, setPages] = useState([]);
  const [search, setSearch] = useState('');

  const fetchSeoData = async () => {
    try {
      setLoading(true);
      const data = await seoService.getAllSEO();
      setSeoData(data);
    } catch (error) {
      message.error('Failed to fetch SEO data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeoData();
    // Fetch pages for the select dropdown
    const fetchPages = async () => {
      try {
        const data = await pagesService.getAll();
        setPages(data);
      } catch (error) {
        message.error('Failed to fetch pages');
      }
    };
    fetchPages();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingId(record._id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await seoService.deleteSEO(id);
      message.success('SEO entry deleted successfully');
      fetchSeoData();
    } catch (error) {
      message.error('Failed to delete SEO entry');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingId) {
        await seoService.updateSEO(editingId, values);
        message.success('SEO entry updated successfully');
      } else {
        await seoService.createSEO(values);
        message.success('SEO entry created successfully');
      }
      setModalVisible(false);
      fetchSeoData();
    } catch (error) {
      message.error('Failed to save SEO entry');
    }
  };

  // Filter SEO data by search
  const filteredData = seoData.filter(entry =>
    entry.pageName?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: 'Page Name',
      dataIndex: 'pageName',
      key: 'pageName',
      sorter: (a, b) => a.pageName.localeCompare(b.pageName),
      render: text => <b>{text}</b>
    },
    {
      title: 'Meta Description',
      dataIndex: 'metaDescription',
      key: 'metaDescription',
      ellipsis: true,
    },
    {
      title: 'Meta Keyword',
      dataIndex: 'metaKeyword',
      key: 'metaKeyword',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this entry?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={<Title level={4} style={{ margin: 0 }}>SEO Management</Title>}
      style={{ margin: '20px', boxShadow: '0 2px 8px #f0f1f2' }}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add SEO
        </Button>
      }
    >
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by Page Name"
          prefix={<SearchOutlined />}
          value={search}
          onChange={e => setSearch(e.target.value)}
          allowClear
          style={{ width: 240 }}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        bordered
        size="middle"
        style={{ background: '#fff', borderRadius: 8 }}
      />
      <Modal
        title={editingId ? 'Edit SEO Entry' : 'Add SEO Entry'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ pageName: '', metaDescription: '', metaKeyword: '' }}
        >
          <Form.Item
            name="pageName"
            label="Page Name"
            rules={[{ required: true, message: 'Please select a page' }]}
          >
            <Select
              showSearch
              placeholder="Select a page"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {pages.map(page => (
                <Select.Option key={page._id} value={page.name || page.title || page.pageName}>
                  {page.name || page.title || page.pageName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="metaDescription"
            label="Meta Description"
            rules={[{ required: true, message: 'Please enter meta description' }]}
          >
            <Input.TextArea rows={4} placeholder="Meta description for SEO..." />
          </Form.Item>
          <Form.Item
            name="metaKeyword"
            label="Meta Keyword"
            rules={[{ required: true, message: 'Please enter meta keyword' }]}
          >
            <Input placeholder="Meta keywords, comma separated" />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Space>
              <Button onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingId ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default SeoManagement; 