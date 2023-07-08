import React from 'react';
import './index.css';
import routesConfig, { RouteConfig } from '../../Routets/routesConfig';
import { Link } from 'react-router-dom';

const Sidebar = (): JSX.Element => {
    return (
        <div className='sidebar-main-container'>
          <div className='sidebard-header-text'><h3>AWS Solutions</h3></div>
      <ul>
        {routesConfig.map((route, index) => (
          <li key={index}>
            <div className='sidebar-route'><Link className='text' to={route.path}>{route.name}</Link> </div>
            {route.routes && (
              <ul>
                {route.routes.map((subRoute, subIndex) => (
                  <li key={subIndex}>
                    <div className='sidebar-sub-route'><Link className='text' to={subRoute.path}>{subRoute.name}</Link></div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      </div>
    );
  };

  export default Sidebar;
  