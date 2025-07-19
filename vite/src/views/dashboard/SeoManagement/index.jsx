import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  message, 
  Space, 
  Popconfirm,
  Card
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { seoService } from 'api/seo';

const SeoManagement = () => {
  const [seoData, setSeoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  const fetchSeoData = async () => {
    try {
      setLoading(true);
      const data = await seoService.getAllSeo();
      setSeoData(data);
    } catch (error) {
      message.error('Failed to fetch SEO data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeoData();
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
      await seoService.deleteSeo(id);
      message.success('SEO entry deleted successfully');
      fetchSeoData();
    } catch (error) {
      message.error('Failed to delete SEO entry');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingId) {
        await seoService.updateSeo(editingId, values);
        message.success('SEO entry updated successfully');
      } else {
        await seoService.createSeo(values);
        message.success('SEO entry created successfully');
      }
      setModalVisible(false);
      fetchSeoData();
    } catch (error) {
      message.error('Failed to save SEO entry');
    }
  };

  const columns = [
    {
      title: 'Page Title',
      dataIndex: 'pageTitle',
      key: 'pageTitle',
    },
    {
      title: 'Meta Description',
      dataIndex: 'metaDescription',
      key: 'metaDescription',
      ellipsis: true,
    },
    {
      title: 'Keywords',
      dataIndex: 'keywords',
      key: 'keywords',
      ellipsis: true,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
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
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this entry?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card title="SEO Management" style={{ margin: '20px' }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: '20px' }}
      >
        Add New SEO Entry
      </Button>

      <Table
        columns={columns}
        dataSource={seoData}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingId ? 'Edit SEO Entry' : 'Add New SEO Entry'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="pageTitle"
            label="Page Title"
            rules={[{ required: true, message: 'Please enter page title' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="metaDescription"
            label="Meta Description"
            rules={[{ required: true, message: 'Please enter meta description' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="keywords"
            label="Keywords"
            rules={[{ required: true, message: 'Please enter keywords' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="url"
            label="URL"
            rules={[{ required: true, message: 'Please enter URL' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingId ? 'Update' : 'Create'}
              </Button>
              <Button onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default SeoManagement; 