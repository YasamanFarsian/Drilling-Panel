import Authenticate from '@dt-advisory/components/Authenticate';
import LoadingPage from '@dt-advisory/pages/LoadingPage';
import NotFoundPage from '@dt-advisory/pages/NotFoundPage';
import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

const LazyDashboardPage = React.lazy(() => import('@dt-advisory/pages/DashboardPage'));

const DashboardPage = () => (
  <Suspense fallback={<LoadingPage />}>
    <LazyDashboardPage />
  </Suspense>
);
const routes = [
  {
    path: '/',
    element: <Authenticate />,
    children: [
      {
        path: '/',
        exact: true,
        element: <DashboardPage />,
      },
      {
        path: '/operation/:id',
        exact: true,
        element: <DashboardPage />,
      },
      {
        path: '/widget/:widgetName',
        exact: true,
        element: <DashboardPage />,
      },
      {
        path: '/operation/:id/widget/:widgetName',
        exact: true,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

const Routes = () => {
  return useRoutes(routes);
};

export default Routes;
