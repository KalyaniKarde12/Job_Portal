import React, { useContext, useEffect, useState } from 'react';
import { assets, jobsApplied } from '../assets/assets';
import { useUser } from '@clerk/clerk-react';
import { useAuth } from '@clerk/clerk-react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Applications = () => {

  const { user } = useUser()
  const { getToken } = useAuth()
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const { backendUrl, userData, userApplication, fetchUserData, fetchUserApplications } = useContext(AppContext)

  const handleSave = async () => {
    if (!resume) {
      toast.error("Please select a resume first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('resume', resume);

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/users/update-resume`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Resume uploaded successfully");
        await fetchUserData(); // fetch updated user data
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setIsEdit(false);
    setResume(null);
  };
useEffect(()=>{
if(user){
  fetchUserApplications()
}
},[user])

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-2xl font-semibold mb-6">Your Resume</h2>

        <div className="flex gap-4 items-center flex-wrap mb-10">
          {
            isEdit || (userData && !userData.resume) ? (
              <>
                <label className="flex items-center gap-3 cursor-pointer bg-blue-100 text-blue-600 px-4 py-2 rounded-lg">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                    className="hidden"
                  />
                  <img src={assets.profile_upload_icon} alt="upload" className="w-5 h-5" />
                  <span>{resume ? resume.name : 'Select Resume'}</span>
                </label>

                <button
                  onClick={handleSave}
                  className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <a
                  href={userData?.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-200 transition"
                >
                  View Resume
                </a>
                <button
                  onClick={() => setIsEdit(true)}
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-200 transition"
                >
                  Edit
                </button>
              </>
            )
          }

        </div>

        <h2 className="text-2xl font-semibold mb-4">Jobs Applied</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Job Title</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {userApplication.map((job, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <img src={job.companyId.image} alt="Logo" className="w-6 h-6 rounded" />
                    {job.companyId.name}
                  </td>
                  <td className="py-3 px-4">{job.jobId.title}</td>
                  <td className="py-3 px-4">{job.jobId.location}</td>
                <td className="py-3 px-4">{new Date(job.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`${job.status === 'Accepted'
                        ? 'bg-green-100 text-green-700'
                        : job.status === 'Rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-blue-100 text-blue-700'
                        } px-3 py-1 rounded-full text-sm font-medium`}
                    >
                      {job.status}
                    </span>

                  </td>
                </tr>
              ))}
            </tbody>


          </table>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Applications;
