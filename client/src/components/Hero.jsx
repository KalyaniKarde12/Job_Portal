import React, { useRef, useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
     console.log("Search button clicked!"); // ✅ Add this
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value
    });
    setIsSearched(true);
    console.log({
      title: titleRef.current.value,
      location: locationRef.current.value
    });
  };

  return (
    <div className='container 2xl:px-20 px-4 mx-auto my-10'>
      <div className='bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl'>
        <h2 className='text-3xl font-semibold mb-4'>Over 10,000+ jobs to apply</h2>
        <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>
          Connecting Talent with Opportunity – Seamlessly and Smartly.
        </p>

        <div className='flex flex-col sm:flex-row justify-center items-center gap-4 max-w-3xl mx-auto px-4'>
          <div className='flex items-center bg-white rounded p-2 w-full sm:w-1/2'>
            <img src={assets.search_icon} alt="" className='w-5 h-5 mr-2' />
            <input
              type="text"
              placeholder='Search for jobs'
              className='text-black text-sm w-full outline-none'
              ref={titleRef}
            />
          </div>
          <div className='flex items-center bg-white rounded p-2 w-full sm:w-1/2'>
            <img src={assets.location_icon} alt="" className='w-5 h-5 mr-2' />
            <input
              type="text"
              placeholder='Location'
              className='text-black text-sm w-full outline-none'
              ref={locationRef}
            />
          </div>
          <button onClick={onSearch} className='bg-white text-purple-900 font-medium px-6 py-2 rounded hover:bg-purple-100'>
            Search
          </button>
        </div>
      </div>

      <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6'>
        <div className='flex justify-center gap-10 lg:gap-16 flex-wrap items-center'>
          <p className='font-medium'>Trusted by</p>
          <img src={assets.microsoft_logo} alt="Microsoft" className='h-8' />
          <img src={assets.accenture_logo} alt="Accenture" className='h-8' />
          <img src={assets.samsung_logo} alt="Samsung" className='h-8' />
          <img src={assets.walmart_logo} alt="Walmart" className='h-8' />
          <img src={assets.amazon_logo} alt="Amazon" className='h-8' />
          <img src={assets.adobe_logo} alt="Adobe" className='h-8' />
        </div>
      </div>
    </div>
  );
};

export default Hero;
