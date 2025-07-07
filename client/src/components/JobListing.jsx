import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const jobsPerPage = 6;

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(filteredJobs.length / jobsPerPage) - 1;
    if (currentPage < maxPage) setCurrentPage((prev) => prev + 1);
  };

  const paginatedJobs = filteredJobs.slice(
    currentPage * jobsPerPage,
    (currentPage + 1) * jobsPerPage
  );

  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 || selectedCategories.includes(job.category);

    const matchesLocation = (job) =>
      selectedLocations.length === 0 || selectedLocations.includes(job.location);

    const matchesTitle = (job) =>
      searchFilter.title === '' || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = (job) =>
      searchFilter.location === '' || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter((job) =>
        matchesCategory(job) &&
        matchesLocation(job) &&
        matchesTitle(job) &&
        matchesSearchLocation(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(0);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  return (
    <div className='container 2xl:px-20 px-4 mx-auto py-6'>

      {/* Current Search Tags */}
      {isSearched && (searchFilter.title || searchFilter.location) && (
        <div className='mb-4'>
          <h3 className='font-semibold mb-2 text-lg'>Current Search</h3>
          <div className='flex gap-2 flex-wrap'>
            {searchFilter.title && (
              <span className='flex items-center bg-gray-200 px-3 py-1 rounded gap-2 text-sm'>
                {searchFilter.title}
                <img
                  onClick={() => setSearchFilter((prev) => ({ ...prev, title: '' }))}
                  className='w-4 h-4 cursor-pointer'
                  src={assets.cross_icon}
                  alt="Remove title"
                />
              </span>
            )}
            {searchFilter.location && (
              <span className='flex items-center bg-gray-200 px-3 py-1 rounded gap-2 text-sm'>
                {searchFilter.location}
                <img
                  onClick={() => setSearchFilter((prev) => ({ ...prev, location: '' }))}
                  className='w-4 h-4 cursor-pointer'
                  src={assets.cross_icon}
                  alt="Remove location"
                />
              </span>
            )}
          </div>
        </div>
      )}

      {/* Filter and Jobs Grid */}
      <div className='flex flex-col lg:flex-row gap-6'>

        {/* Filters */}
        <div className='lg:hidden'>
          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className='bg-blue-500 text-white px-4 py-2 rounded mb-4'
          >
            {showFilter ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className={`${showFilter ? '' : 'hidden'} w-full lg:w-1/4`}>
          <h4 className='font-medium text-lg pb-2'>Search by Categories</h4>
          <ul className='space-y-4 text-gray-600'>
            {JobCategories.map((category, index) => (
              <li key={index} className='flex gap-3 items-center'>
                <input
                  className='scale-125'
                  type='checkbox'
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                {category}
              </li>
            ))}
          </ul>

          <div className='mt-6'>
            <h4 className='font-medium text-lg py-4 pt-14'>Search by Locations</h4>
            <ul className='space-y-4 text-gray-600'>
              {JobLocations.map((location, index) => (
                <li key={index} className='flex gap-3 items-center'>
                  <input
                    className='scale-125'
                    type='checkbox'
                    onChange={() => handleLocationChange(location)}
                    checked={selectedLocations.includes(location)}
                  />
                  {location}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Job Listings */}
        <section className='w-full lg:w-3/4 text-gray-800'>
          <h3 className='font-medium text-3xl pb-2'>Latest Jobs</h3>
          <p className='mb-6'>Get your desired job from top company</p>

          <div id='job-list' className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {paginatedJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>

          {/* Pagination */}
          {filteredJobs.length > 0 && (
            <div className='flex items-center gap-2 mt-6 flex-wrap'>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className={`p-2 rounded ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
              >
                <img src={assets.left_arrow_icon} alt='Previous' />
              </button>

              {Array.from({ length: Math.ceil(filteredJobs.length / jobsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`px-3 py-1 rounded border ${currentPage === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(filteredJobs.length / jobsPerPage) - 1}
                className={`p-2 rounded ${currentPage === Math.ceil(filteredJobs.length / jobsPerPage) - 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-200'}`}
              >
                <img src={assets.right_arrow_icon} alt='Next' />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default JobListing;
