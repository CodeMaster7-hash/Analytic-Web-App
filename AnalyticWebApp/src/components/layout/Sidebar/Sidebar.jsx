import React, { useState } from 'react';
import {
  FiHome,
  FiPieChart,
  FiUsers,
  FiBarChart2,
  FiActivity,
  FiTrendingUp,
  FiChevronLeft,
} from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const location = useLocation();

  const isActiveRoute = (path) => location.pathname === path;

  const menuItems = [
    {
      name: 'Home',
      icon: <FiHome className="mr-3" />,
      path: '/',
    },
    {
      name: 'Dashboard',
      icon: <FiPieChart className="mr-3" />,
      path: '/dashboard',
    },
    {
      name: 'Analytics',
      icon: <FiUsers className="mr-3" />,
      children: [
        {
          name: 'Predictions Report',
          icon: <FiBarChart2 className="mr-2 text-green-600" />,
          path: '/analytics/predictions-report',
        },
        {
          name: 'Fraud Detect Report',
          icon: <FiActivity className="mr-2 text-green-600" />,
          path: '/analytics/fraud-detect-report',
        },
        {
          name: 'Analysis Report',
          icon: <FiTrendingUp className="mr-2 text-green-600" />,
          path: '/analytics/analysis-report',
        },
      ],
    },
  ];

  return (
    <div className="w-64 bg-white shadow fixed top-18 h-full overflow-y-auto">
      <ul>
        {menuItems.map((item) => {
          const isItemSelected = selectedMenu === item.name;

          return (
            <li key={item.name}>
              {item.children ? (
                <>
                 <button
                    onClick={() => {
                      setOpenMenu(openMenu === item.name ? null : item.name);
                      setSelectedMenu(item.name); 
                    }}
                    className={`w-full flex justify-between items-center py-3 px-4 text-sm transition ${
                      isItemSelected
                        ? 'text-green-600 font-semibold bg-gray-100'
                        : 'text-gray-700 hover:text-green-500 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    <FiChevronLeft
                      className={`text-gray-400 transition-transform duration-300 ${
                        openMenu === item.name ? 'rotate-[-90deg]' : ''
                      }`}
                    />
                  </button>
                  {openMenu === item.name && (
                    <ul className="ml-8 mt-1">
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <Link
                            to={child.path}
                            onClick={() => setSelectedMenu(item.name)}
                            className={`flex items-center py-2 px-2 text-sm transition ${
                              isActiveRoute(child.path)
                                ? 'text-green-600 font-semibold bg-gray-100'
                                : 'text-gray-600 hover:text-green-600'
                            }`}
                          >
                            {child.icon}
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => {
                    setOpenMenu(null);
                    setSelectedMenu(item.name);
                  }}
                  className={`flex justify-between items-center py-3 px-4 text-sm transition ${
                    isItemSelected
                      ? 'text-green-600 font-semibold bg-gray-100'
                      : 'text-gray-700 hover:text-green-500 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                </Link>
              )}
              <div className="border-b border-gray-200 ml-4 mr-4" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
