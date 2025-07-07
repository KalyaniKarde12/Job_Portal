import React from 'react';
import { assets, viewApplicationsPageData } from '../assets/assets';

const ViewApplications = () => {
  return (
    <div className="p-1 max-w-6xl mx-auto">
      {/* <h2 className="text-2xl font-semibold mb-4 text-gray-800">View Applications</h2> */}

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left text-gray-700 bg-white">
          <thead className="text-xs uppercase bg-purple-700 text-white">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">User Name</th>
              <th className="px-6 py-3">Job Title</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Resume</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{index + 1}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={applicant.imgSrc}
                    alt="user"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{applicant.name}</span>
                </td>
                <td className="px-6 py-4">{applicant.jobTitle}</td>
                <td className="px-6 py-4">{applicant.location}</td>
                <td className="px-6 py-4">
                  <a
                    href={applicant.resumeLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    Resume
                    <img
                      src={assets.resume_download_icon}
                      alt="Download"
                      className="w-4 h-4"
                    />
                  </a>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">
                      Accept
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700">
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
