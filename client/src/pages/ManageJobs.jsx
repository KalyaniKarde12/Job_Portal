import React from 'react';
import { manageJobsData } from '../assets/assets';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const ManageJobs = () => {
  const navigate = useNavigate(); // <-- FIX: now it's properly initialized

  return (
    <div className="p-1 max-w-6xl mx-auto">
      {/* <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Jobs</h2> */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-purple-700 text-white">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Job Title</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Applicants</th>
              <th className="px-6 py-3">Visible</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {manageJobsData.map((job, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 font-medium">{index + 1}</td>
                <td className="px-6 py-4">{job.title}</td>
                <td className="px-6 py-4">{moment(job.date).format('ll')}</td>
                <td className="px-6 py-4">{job.location}</td>
                <td className="px-6 py-4">{job.applicants}</td>
                <td className="px-6 py-4">
                  <input type="checkbox" className="accent-purple-700 scale-110" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Job Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => navigate('/dashboard/add-job')}
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
        >
          Add New Job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
