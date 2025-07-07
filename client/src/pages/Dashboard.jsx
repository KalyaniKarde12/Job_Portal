import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="shadow py-4 bg-white">
        <div className="px-6 flex items-center justify-between">
          <img
            onClick={() => navigate('/')}
            className="w-36 max-sm:w-28 cursor-pointer"
            src={assets.logo}
            alt="logo"
          />

          <div className="flex items-center gap-3">
            <p className="hidden sm:block text-gray-600">Welcome, Job Portal</p>
            <div className="relative group">
              <img
                src={assets.company_icon}
                alt="Company"
                className="w-10 h-10 rounded-full border object-cover cursor-pointer"
              />
              <div className="absolute hidden group-hover:block top-12 right-0 z-20 bg-white shadow-lg rounded-md border w-28 text-sm">
                <ul className="py-2 px-3 text-gray-700">
                  <li className="hover:text-purple-700 cursor-pointer">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="w-56 min-h-screen bg-purple-600 text-white pt-8 px-4 space-y-6">
          <NavLink
            to="/dashboard/add-job"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-purple-800 transition ${
                isActive ? 'bg-white text-purple-700 font-semibold' : ''
              }`
            }
          >
            <img src={assets.add_icon} alt="Add Job" className="w-5 h-5" />
            <span>Add Job</span>
          </NavLink>

          <NavLink
            to="/dashboard/manage-jobs"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-purple-800 transition ${
                isActive ? 'bg-white text-purple-700 font-semibold' : ''
              }`
            }
          >
            <img src={assets.home_icon} alt="Manage Job" className="w-5 h-5" />
            <span>Manage Jobs</span>
          </NavLink>

          <NavLink
            to="/dashboard/view-applications"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-purple-800 transition ${
                isActive ? 'bg-white text-purple-700 font-semibold' : ''
              }`
            }
          >
            <img src={assets.person_tick_icon} alt="View Applications" className="w-5 h-5" />
            <span>View Applications</span>
          </NavLink>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-6 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
