import { useState } from 'react';
import {
  FiMenu,
  FiHelpCircle,
  FiPlusCircle,
  FiLock,
  FiChevronDown,
  FiChevronUp,
  FiBell,
  FiSettings
} from 'react-icons/fi';
import AppauraLogo from '../../../assets/AppauraLogo.png';

export default function Navbar() {
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
  const [openRightSubMenu, setOpenRightSubMenu] = useState(null);

  const toggleLeftMenu = () => {
    setIsLeftMenuOpen(!isLeftMenuOpen);
  };

  const toggleRightSubMenu = (menu) => {
    setOpenRightSubMenu(openRightSubMenu === menu ? null : menu);
  };

  const rightMenuItems = [
    {
      id: 1,
      name: 'Support',
      icon: <FiHelpCircle className="mr-2 text-3xl" />,
      onClick: () => {}
    },
    {
      id: 2,
      name: 'Create',
      icon: <FiPlusCircle className="mr-2 text-3xl" />,
      onClick: () => toggleRightSubMenu('create')
    },
    {
      id: 3,
      name: 'Setup',
      icon: <FiSettings className="mr-2 text-3xl" />,
      onClick: () => toggleRightSubMenu('setup')
    },
    {
      id: 4,
      icon: <FiBell className="mr-2 text-3xl" />,
      onClick: () => {}
    },
    {
      id: 5,
      name: 'Appuara',
      icon: <FiLock className="mr-2 text-3xl" />,
      subItems: [],
      onClick: () => toggleRightSubMenu('appuara')
    }
  ];

  return (
    <header className="bg-white shadow-md fixed w-full">
      <div className="px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Hamburger and Logo */}
          <div className="flex items-center">
            <button
              onClick={toggleLeftMenu}
              className="text-gray-700 hover:text-blue-600"
            >
              <FiMenu className="w-7 h-7" />
            </button>

            {/* Divider after hamburger */}
            <div className="w-px h-14 bg-gray-300 mx-6" />

            <img src={AppauraLogo} alt="AppauraLogo.png" className="w-[15%]" />
            <h3 className='text-green-300 font-extrabold text-2xl ml-4'>APPAURA <span className='text-blue-300'>ANALYTICS</span></h3>
          </div>

          {/* Right side - Menu items */}
          <div className="flex items-center space-x-4 relative">
            {rightMenuItems.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-2 relative">
                <button
                  onClick={item.onClick}
                  className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium"
                >
                  {item.icon}
                  {item.name}
                  {item.subItems && (
                    openRightSubMenu === item.name.toLowerCase() ? (
                      <FiChevronUp className="ml-1" />
                    ) : (
                      <FiChevronDown className="ml-1" />
                    )
                  )}
                </button>

                {/* Divider after Support and Create */}
                {[1, 2,3, 4].includes(item.id) && (
                  <div className="w-px h-16 bg-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
