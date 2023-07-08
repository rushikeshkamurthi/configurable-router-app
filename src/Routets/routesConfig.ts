import { lazy, LazyExoticComponent } from 'react';

export interface RouteConfig {
  name: string;
  locale?: string;
  path: string;
  component?: LazyExoticComponent<any>;
  hideInMenu?: boolean;
  icon?: string;
  exact?: boolean;
  redirect?: string;
  routes?: RouteConfig[];
  accessTo?: string[];
  parentKey?: string;
  key?: string;
}

const routesConfig: RouteConfig[] = [
  {
    path: '/dashboard',
    locale: 'dashboard',
    name: 'Dashboard',
    icon: 'dashboard',
    exact: true,
    component: lazy(() => import('../Components/Pages/dashboard')),
    routes: [
      {
        path: '/dashboard/analysis',
        locale: 'dashboard.analysis',
        name: 'Analysis',
        component: lazy(() => import('../Components/Pages/analysis')),
        exact: true,
        accessTo: ['admin'],
      },
      {
        path: '/dashboard/monitor',
        locale: 'dashboard.monitor',
        name: 'Monitor',
        component: lazy(() => import('../Components/Pages/Dashboard/monitor')),
        exact: true,
      },
      {
        path: '/dashboard/workplace',
        locale: 'dashboard.workplace',
        name: 'Workplace',
        component: lazy(() => import('../Components/Pages/Dashboard/workplace')),
        exact: true,
      },
    ],
  },

  {
    path: '/projects',
    locale: 'projects',
    name: 'Projects',
    icon: 'projects',
    redirect: '/projects/list',
    routes: [
      {
        path: '/projects/list',
        locale: 'projects.list',
        name: 'Projects',
        icon: 'projects',
        exact: true,
      },
      {
        path: '/projects/:id',
        locale: 'projects.details',
        name: 'Project Details',
        hideInMenu: true,
        icon: 'projects',
        key: 'projects',
        exact: true,
      },
      {
        path: '/projects/:id/settings',
        locale: 'projects.settings',
        icon: 'settings',
        name: 'Settings',
        parentKey: 'details',
        exact: true,
      },
    ],
  },
  {
    name: 'Login',
    locale: 'user.login',
    path: '/',
    component: lazy(() => import('../Components/User/Login')),
    hideInMenu: true,
  },
];

export default routesConfig;
