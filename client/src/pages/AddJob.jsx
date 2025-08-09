import React, { useContext, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { JobCategories, JobLocations } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';


const AddJob = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Beginner level');
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { backendUrl, companyToken } = useContext(AppContext)
 const onSubmitHandler = async (e) => {
  e.preventDefault();
   console.log("Token used:", companyToken); // Debug
  try {
    const description = quillRef.current.root.innerHTML;

    const { data } = await axios.post(
      backendUrl + '/api/company/post-job',
      { title, description, location, salary, category, level },
      { headers: { token: companyToken } }
    );

    if (data.success) {
      toast.success(data.message);
      setTitle('');
      setSalary(0);
      quillRef.current.root.innerHTML = '';
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};


  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write job description...',
      });
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-4 space-y-5">
      {/* <h2 className="text-xl font-semibold text-purple-700 text-center">Post a New Job</h2> */}
      <form onSubmit={onSubmitHandler}>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Job Title</label>
          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-1.5 border rounded-md text-sm focus:outline-none focus:ring focus:ring-purple-300"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Job Description</label>
          <div ref={editorRef} className="bg-white border rounded-md min-h-[120px] text-sm"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-2 py-1.5 border rounded-md text-sm focus:outline-none focus:ring focus:ring-purple-300"
            >
              {JobCategories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-2 py-1.5 border rounded-md text-sm focus:outline-none focus:ring focus:ring-purple-300"
            >
              {JobLocations.map((loc, i) => (
                <option key={i} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-2 py-1.5 border rounded-md text-sm focus:outline-none focus:ring focus:ring-purple-300"
            >
              <option value="Beginner level">Beginner</option>
              <option value="Intermediate level">Intermediate</option>
              <option value="Senior level">Senior</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Salary (₹)</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g. 50000"
              className="w-full px-2 py-1.5 border rounded-md text-sm focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>
        </div>

        <div className="text-right pt-2">
          <button className="bg-purple-700 text-white px-5 py-1.5 rounded-md text-sm hover:bg-purple-800 transition">
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
