import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState(null); // null initially so we can show loader

  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/company/applicants',
        { headers: { token: companyToken } }
      );

      if (data.success) {
        // backend returns "applications", not "applicants"
        setApplicants((data.applications || []).reverse());
      } else {
        toast.error(data.message);
        setApplicants([]); // prevent stuck loader
      }
    } catch (error) {
      toast.error(error.message);
      setApplicants([]); // prevent stuck loader
    }
  };
  // Function to update job applicATION STSTUS
 const changeJobApplicationStatus = async (id, status) => {
  try {
    const { data } = await axios.post(
      backendUrl + '/api/company/change-status',
      { id, status }, // ✅ body
      { headers: { token: companyToken } } // ✅ headers
    );

    if (data.success) {
      toast.success(data.message);
      fetchCompanyJobApplications();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  if (applicants === null) {
    return <Loading />;
  }

  if (applicants.length === 0) {
    return <div className="p-6 text-gray-600">No applications found</div>;
  }

  return applicants? applicants.length === 0 ? (<div className='flex items-center justify-center h-[70vh]'>
    <p className='text-xl sm:text-2xl'>No Applications Available</p>
  </div>):(
    <div className="p-1 max-w-6xl mx-auto">
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
            {applicants
              .filter(item => item.jobId && item.userId)
              .map((applicant, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{index + 1}</td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={applicant.userId.image}
                      alt="user"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{applicant.userId.name}</span>
                  </td>
                  <td className="px-6 py-4">{applicant.jobId.title}</td>
                  <td className="px-6 py-4">{applicant.jobId.location}</td>
                  <td className="px-6 py-4">
                    <a
                      href={applicant.userId.resume || '#'}
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
                    {applicant.status === "Pending"
                      ? <div className="flex gap-2">
                        <button onClick={() => changeJobApplicationStatus(applicant._id, 'Accepted')} className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">
                          Accept
                        </button>
                        <button onClick={() => changeJobApplicationStatus(applicant._id, 'Rejected')} className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700">
                          Reject
                        </button>
                      </div>
                      : <div>{applicant.status}</div>
                    }
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  ):<Loading/>
};

export default ViewApplications;
