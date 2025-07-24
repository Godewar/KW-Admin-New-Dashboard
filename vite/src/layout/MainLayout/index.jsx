import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, theme, Avatar, Badge, Space, Button, Tooltip } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  UserOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  TeamOutlined,
  BellOutlined,
  SearchOutlined,
  GlobalOutlined,
  BuildOutlined,
  BookOutlined,
  ShopOutlined,
  UserSwitchOutlined,
  TeamOutlined as TeamIcon,
  SettingOutlined as SettingIcon,
  PoweroffOutlined,
  HomeOutlined,
  RocketOutlined,
  AppstoreAddOutlined,
  FileSearchOutlined,
  FileTextOutlined as FileTextIcon,
  ShopOutlined as ShopIcon,
  UserOutlined as UserIcon,
  TeamOutlined as TeamIcon2,
  SettingOutlined as SettingIcon2,
  LogoutOutlined as LogoutIcon,
  BarChartOutlined,
  PictureOutlined,
  QuestionCircleOutlined,InfoCircleOutlined, ContactsOutlined 
} from '@ant-design/icons';

// project imports
import Footer from './Footer';
import Customization from '../Customization';
import Loader from 'ui-component/Loader';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import useConfig from 'hooks/useConfig';
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

const { Header, Sider, Content } = Layout;

export default function MainLayout() {
  // All hooks at the top
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { menuMaster, menuMasterLoading } = useGetMenuMaster();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    handlerDrawerOpen(!collapsed);
  }, [collapsed]);

  // Early return after all hooks
  if (menuMasterLoading) return <Loader />;

  const menuItems = [
    {
      key: 'dashboard',
      icon: <HomeOutlined style={{ fontSize: '20px', color: '#1890ff' }} />,
      label: 'Dashboard',
      path: '/dashboard'
    },
    
    {
      type: 'divider'
    },
    {
      key: 'page-management',
      icon: <GlobalOutlined style={{ fontSize: '20px', color: '#52c41a' }} />,
      label: 'Page Management',
      children: [
        {
          key: 'seo-management',
          icon: <RocketOutlined style={{ fontSize: '18px', color: '#722ed1' }} />,
          label: 'SEO Management',
          path: '/dashboard/seo'
        },
        {
          key: 'page-builder',
          icon: <AppstoreAddOutlined style={{ fontSize: '18px', color: '#13c2c2' }} />,
          label: 'Page Management',
          path: '/dashboard/manage-page'
        },
        {
          key: 'theme-designer',
          icon: <FileSearchOutlined style={{ fontSize: '18px', color: '#fa8c16' }} />,
          label: 'Theme Designer',
          path: '/dashboard/theme'
        }
      ]
    },
    {
      key: 'blog-manager',
      icon: <FileTextIcon style={{ fontSize: '20px', color: '#eb2f96' }} />,
      label: 'Blog Management',
      path: '/dashboard/blog'
    },
    {
      key: 'user-management',
      icon: <UserIcon style={{ fontSize: '20px', color: '#f5222d' }} />,
      label: 'Manage User',
      path: '/dashboard/users'
    },
    {
      key: 'system-settings',
      icon: <SettingIcon2 style={{ fontSize: '20px', color: '#08979c' }} />,
      label: 'System Settings',
      path: '/dashboard/settings'
    },
    {
      type: 'divider'
    },
    {
      key: 'Leads',
      icon: <ContactsOutlined style={{ fontSize: '20px', color: '#1890ff' }} />,
      label: 'Leads',
      path: '/Leads'
    },
    {
      key: 'instant-valuation',
      icon: <BarChartOutlined style={{ fontSize: '20px', color: '#722ed1' }} />,
      label: 'Instant Valuation',
      path: '/dashboard/instant-valuation'
    },
    {
      key: 'appointment',
      icon: <TeamOutlined style={{ fontSize: '20px', color: '#faad14' }} />,
      label: 'Appointment',
      path: '/dashboard/appointment'
    },
    {
      key: 'team-management',
      icon: <TeamOutlined style={{ fontSize: '20px', color: '#00acc1' }} />,
      label: 'Team Management',
      path: '/dashboard/team-management'
    },
    {
      key: 'join-us',
      icon: <UserSwitchOutlined style={{ fontSize: '20px', color: '#13c2c2' }} />,
      label: 'Join Us',
      path: '/dashboard/join-us'
    },
    {
      key: 'logout',
      icon: <LogoutIcon style={{ fontSize: '20px', color: '#cf1322' }} />,
      label: 'Logout',
      path: '/logout'
    }
  ];

  const handleMenuClick = ({ key }) => {
    const item = menuItems.find(item => item.key === key) || 
                menuItems.find(item => item.children?.some(child => child.key === key));
    
    if (item) {
      if (item.path) {
        navigate(item.path);
      } else if (item.children) {
        const child = item.children.find(child => child.key === key);
        if (child?.path) {
          navigate(child.path);
        }
      }
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/pages/login', { replace: true });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        width={280}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          background: colorBgContainer,
          boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)'
        }}
        theme="light"
      >
        <div style={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
          padding: '0 24px'
        }}>
          <h1 style={{ 
            color: '#fff', 
            margin: 0,
            fontSize: collapsed ? '20px' : '24px',
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}>
            <BuildOutlined style={{ fontSize: '24px' }} />
            {collapsed ? 'KW' : 'KW Admin'}
          </h1>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={['page-management', 'listings-services']}
          style={{ 
            borderRight: 0,
            padding: '16px 8px',
            fontSize: '15px'
          }}
          items={menuItems}
          onClick={handleMenuClick}
          theme="light"
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 280, transition: 'all 0.2s' }}>
        <Header style={{ 
          padding: '0 24px', 
          background: colorBgContainer,
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {collapsed ? (
              <MenuUnfoldOutlined 
                className="trigger" 
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: '18px', cursor: 'pointer', padding: '8px' }}
              />
            ) : (
              <MenuFoldOutlined 
                className="trigger" 
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: '18px', cursor: 'pointer', padding: '8px' }}
              />
            )}
            <div style={{ marginLeft: '24px' }}>
              <Tooltip title="Search">
                <Button 
                  type="text" 
                  icon={<SearchOutlined style={{ fontSize: '16px', color: '#8c8c8c' }} />} 
                />
              </Tooltip>
            </div>
          </div>
          <Space size="large">
            <Tooltip title="Notifications">
              <Badge count={5} size="small">
                <Button 
                  type="text" 
                  icon={<BellOutlined style={{ fontSize: '18px' }} />} 
                />
              </Badge>
            </Tooltip>
            <Space>
              <Avatar 
                style={{ 
                  backgroundColor: '#1890ff',
                  verticalAlign: 'middle',
                  cursor: 'pointer'
                }} 
                size="small"
              >
                {user && user.name ? user.name[0].toUpperCase() : 'A'}
              </Avatar>
              <span>{user ? (user.name || user.email) : 'Not logged in'}</span>
              <Button type="link" onClick={handleLogout} style={{ color: '#cf1322' }}>
                Logout
              </Button>
            </Space>
          </Space>
        </Header>
        <Content style={{ 
          margin: '24px 16px', 
          padding: 24, 
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          minHeight: 280
        }}>
          <Breadcrumbs />
          <Outlet />
          <Footer />
        </Content>
      </Layout>
      <Customization />
    </Layout>
  );
}
