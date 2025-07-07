import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import kconvert from 'k-convert';
import moment from 'moment';
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';

const ApplyJob = () => {
  const { id } = useParams();
  const [JobData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);

  // Fetch the job with the matching id
  const fetchJob = async () => {
    const data = jobs.filter(job => job._id === id);
    if (data.length !== 0) {
      setJobData(data[0]);
      console.log(data[0]);
    }
  };

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob();
    }
  }, [id, jobs]);

  return JobData ? (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-20">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
            <img
              src={JobData.companyId.image}
              alt="Company Logo"
              className="w-24 h-24 object-cover rounded-full border"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {JobData.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                <span className="flex items-center gap-2">
                  <img src={assets.suitcase_icon} className="w-4 h-4" alt="Company" />
                  {JobData.companyId.name}
                </span>
                <span className="flex items-center gap-2">
                  <img src={assets.location_icon} className="w-4 h-4" alt="Location" />
                  {JobData.location}
                </span>
                <span className="flex items-center gap-2">
                  <img src={assets.person_icon} className="w-4 h-4" alt="Level" />
                  {JobData.level}
                </span>
                <span className="flex items-center gap-2">
                  <img src={assets.money_icon} className="w-4 h-4" alt="Salary" />
                  CTC: {kconvert.convertTo(JobData.salary)}
                </span>
              </div>
            </div>
          </div>

          {/* Apply Button & Posted Date Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button className="w-full sm:w-auto bg-purple-800 hover:bg-purple-700 text-white px-6 py-3 rounded shadow-lg transition-colors duration-200">
              Apply Now
            </button>
            <p className="w-full sm:w-auto text-center text-sm text-gray-500">
              Posted {moment(JobData.date).fromNow()}
            </p>
          </div>

          {/* Job Description */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Job Description
            </h2>
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: JobData.description }}
            />
          </div>

          {/* More Jobs from the Same Company */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              More jobs from {JobData.companyId.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {jobs
                .filter(job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
                .slice(0, 4)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
