import React, { ReactNode, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import routesConfig, { RouteConfig } from '../src/Routets/routesConfig';
import Sidebar from './Components/Sidebar/Index';
import './App.css';

interface BreadcrumbItem {
  path: string;
  name: string;
}

const LoadingIndicator = (): JSX.Element => {
  return <div>Loading...</div>; // Replace with your own loading indicator UI
};

const Main = (): JSX.Element => {
  const { pathname } = useLocation();

  const findRoute = (path: string, routes: RouteConfig[]): RouteConfig | null => {
    for (let route of routes) {
      if (route.path === path) {
        return route;
      } else if (route.routes) {
        const nestedRoute = findRoute(path, route.routes);
        if (nestedRoute) {
          return nestedRoute;
        }
      }
    }
    return null;
  };

  const generateBreadcrumbs = (
    path: string,
    routes: RouteConfig[],
    breadcrumbItems: BreadcrumbItem[] = []
  ): BreadcrumbItem[] | null => {
    const route = findRoute(path, routes);
    if (route) {
      const updatedBreadcrumbItems: BreadcrumbItem[] = [
        { path: route.redirect || route.path, name: route.name },
        ...breadcrumbItems,
      ];

      if (route.parentKey) {
        return generateBreadcrumbs(path, routes, updatedBreadcrumbItems);
      }

      return updatedBreadcrumbItems;
    }

    return null;
  };

  const currentRoute = findRoute(pathname, routesConfig);

  if (!currentRoute) {
    return <></>; // Return null or provide fallback UI for cases when the current route is not found
  }

  return (
    <div>
      <Breadcrumb>
        {generateBreadcrumbs(pathname, routesConfig)?.map((breadcrumbItem, index) => (
          <Breadcrumb.Item key={index}>
            {breadcrumbItem.path !== pathname ? (
              <Link to={breadcrumbItem.path}>{breadcrumbItem.name}</Link>
            ) : (
              breadcrumbItem.name
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <h1>{currentRoute.name}</h1>
      <Suspense fallback={<LoadingIndicator />}>
        <Routes>
          {currentRoute.routes?.map((subRoute, index) => (
            <Route
              key={index}
              path={subRoute.path}
              element={React.createElement(subRoute.component || (() => null))}
            />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
};

const App = (): JSX.Element => {
  return (
    <Router>
      <div className="app-container">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="main-container">
          <Routes>
            {routesConfig.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <Suspense fallback={<LoadingIndicator />}>
                    <Main />
                  </Suspense>
                }
              />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
