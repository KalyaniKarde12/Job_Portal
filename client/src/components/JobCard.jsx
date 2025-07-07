import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/apply/jobs/${job._id}`);
    scrollTo(0, 0);
  };

  return (
    <div className='border border-gray-300 shadow-md rounded p-4 flex flex-col gap-3 bg-white'>
      <div className='flex items-center gap-3'>
        <img src={assets.company_icon} alt="Company" className='w-10 h-10' />
        <h4 className='text-lg font-semibold'>{job.title}</h4>
      </div>

      <div className='flex justify-between text-sm text-gray-600'>
        <span>{job.location}</span>
        <span>{job.level}</span>
      </div>

      <p className='text-sm text-gray-700'>
        {job.description.slice(0, 150)}...
      </p>

      <div className='flex gap-4 mt-2'>
        <button onClick={handleNavigate} className='bg-purple-800 text-white px-4 py-1 rounded hover:bg-purple-700'>
          Apply Now
        </button>
        <button onClick={handleNavigate} className='border border-purple-800 text-purple-800 px-4 py-1 rounded hover:bg-purple-50'>
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
