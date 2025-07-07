import React from 'react';
import { assets } from '../assets/assets';

const AppDownload = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto my-20">
      <div className="relative bg-gradient-to-r from-violet-50 p-10 rounded-lg flex flex-col lg:flex-row items-center justify-between">
        {/* Text + Buttons */}
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold mb-6 max-w-md">
            Download Mobile App for a Better Experience
          </h1>
          <div className="flex gap-4">
            <a href="#" aria-label="Download on Play Store">
              <img className="h-12" src={assets.play_store} alt="Play Store" />
            </a>
            <a href="#" aria-label="Download on App Store">
              <img className="h-12" src={assets.app_store} alt="App Store" />
            </a>
          </div>
        </div>

        {/* Mobile App Image (Hidden on smaller screens) */}
        <img
          className="absolute w-80 right-0 bottom-0 mr-32 max-lg:hidden"
          src={assets.app_main_img}
          alt="Mobile App Preview"
        />
      </div>
    </div>
  );
};

export default AppDownload;
