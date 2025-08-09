import React, { useContext, useEffect, useState } from 'react';
import { manageJobsData } from '../assets/assets';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../components/Loading';

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const { backendUrl, companyToken } = useContext(AppContext);

  // Function to fetch company job applications data
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/lists-jobs', {
        headers: { token: companyToken } // Fixed: changed "header" to "headers"
      });
      
      if (data.success) {
        setJobs(data.jobsData.reverse()); // Fixed: changed "jobsata" to "jobsData"
        console.log(data.jobsData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
//Function to chng job visibility
const changeJobVisibility = async (id) => {
  try {
    const { data } = await axios.post(
      backendUrl + '/api/company/change-visibility',
      { id },
      { headers: { token: companyToken } }
    );

    if (data.success) {
      toast.success(data.message);
      fetchCompanyJobs(); // refresh job list
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  return jobs ? jobs.length === 0 ? ( <div className='flex items-center justify-center h-[70vh]'>
    <p className='text-xl sm:text-2xl'>No Jobs Available or posted </p>
  </div>): (
    <div className="p-1 max-w-6xl mx-auto">
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
            {jobs.map((job, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 font-medium">{index + 1}</td>
                <td className="px-6 py-4">{job.title}</td>
                <td className="px-6 py-4">{moment(job.date).format('ll')}</td>
                <td className="px-6 py-4">{job.location}</td>
                <td className="px-6 py-4">{job.applicants}</td>
                <td className="px-6 py-4">
                  <input onChange={()=>changeJobVisibility(job._id)}  type="checkbox" className="accent-purple-700 scale-110" checked={job.visible}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Job Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => navigate('../add-job')}
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
        >
          Add New Job
        </button>
      </div>
    </div>
  ): <Loading/>
};

export default ManageJobs;