import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AddAdmin from './AddAdmin';
import AlllAdmins from './AlllAdmins';
import BannerDetails from '../views/dashboard/BannerDetails';
import BlogManagement from 'views/dashboard/BlogManagement';
import UserManagement from 'views/dashboard/UserManagement';
import AgentManagement from 'views/dashboard/AgentManagement';
import PageManagement from 'views/dashboard/PageManagement/PageManagement';
import Banners from 'views/dashboard/Banners';
import Leads from 'views/pages/Contacts';
import Appointment from '../views/pages/Appointment';
import InstantValuation from '../views/pages/InstantValuation';
import JoinUs from '../views/pages/JoinUs';
import TeamManagement from '../views/pages/TeamManagement';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const SeoManagement = Loadable(lazy(() => import('views/dashboard/SeoManagement')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));





// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ProtectedRoute component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/pages/login" replace />;
  }
  return children;
}

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      )
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: (
            <ProtectedRoute>
              <DashboardDefault />
            </ProtectedRoute>
          )
        },
        {
          path: 'seo',
          element: (
            <ProtectedRoute>
              <SeoManagement/>
            </ProtectedRoute>
          )
        },
        {
          path: 'blog',
          element: (
            <ProtectedRoute>
              <BlogManagement />
            </ProtectedRoute>
          )
        },
        {
          path: 'banners',
          element: (
            <ProtectedRoute>
              <Banners />
            </ProtectedRoute>
          )
        },
        {
          path: 'users',
          element: (
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          )
        },
        {
          path: 'agents',
          element: (
            <ProtectedRoute>
              <AgentManagement />
            </ProtectedRoute>
          )
        },
        {
          path: 'manage-page',
          element: (
            <ProtectedRoute>
              <PageManagement />
            </ProtectedRoute>
          )
        },
        {
          path: 'appointment',
          element: (
            <ProtectedRoute>
              <Appointment />
            </ProtectedRoute>
          )
        },
        {
          path: 'instant-valuation',
          element: (
            <ProtectedRoute>
              <InstantValuation />
            </ProtectedRoute>
          )
        },
        {
          path: 'join-us',
          element: (
            <ProtectedRoute>
              <JoinUs />
            </ProtectedRoute>
          )
        },
        {
          path: 'team-management',
          element: (
            <ProtectedRoute>
              <TeamManagement />
            </ProtectedRoute>
          )
        },
      ]
    },
  
    {
      path: '/add/admin',
      element: (
        <ProtectedRoute>
          <AddAdmin />
        </ProtectedRoute>
      )
    },
    {
      path: '/banners/bannerdetails',
      element: (
        <ProtectedRoute>
          <BannerDetails />
        </ProtectedRoute>
      )
    },
    {
      path: '/all/admin',
      element: (
        <ProtectedRoute>
          <AlllAdmins />
        </ProtectedRoute>
      )
    },
    {
      path: '/leads',
      element: (
        <ProtectedRoute>
          <Leads />
        </ProtectedRoute>
      )
    },
    {
      path: '/appointment',
      element: (
        <ProtectedRoute>
          <Appointment />
        </ProtectedRoute>
      )
    },
  
    // {
    //   path: 'typography',
    //   element: <UtilsTypography />
    // },
    // {
    //   path: 'color',
    //   element: <UtilsColor />
    // },
    // {
    //   path: 'shadow',
    //   element: <UtilsShadow />
    // },
    // {
    //   path: '/sample-page',
    //   element: <SamplePage />
    // }
  ]
};

export default MainRoutes;
   