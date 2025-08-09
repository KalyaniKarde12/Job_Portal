import React, { useState, useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
const RecruiterLogin = ()=>{
   const navigate = useNavigate()
   const [state, setState] = useState('Login');
   const [name, setName] = useState('');
   const [password, setPassword] = useState('');
   const [email, setEmail] = useState('');
   const [image, setImage] = useState(null);
   const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

   const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
   e.preventDefault();
   console.log("Form submitted");

   if (state === 'Signup' && !isTextDataSubmitted) {
      return setIsTextDataSubmitted(true);
      
   }

   try {
      if (state === 'Login') {
         console.log("Attempting login...");
         const { data } = await axios.post(backendUrl + '/api/company/login', { email, password });

         if (data.success) {
            console.log("Login success", data);
            setCompanyData(data.company);
            setCompanyToken(data.token);
            localStorage.setItem('companyToken', data.token);
            setShowRecruiterLogin(false);
            navigate('/dashboard');
         } else {
            console.log("Login failed with message:", data.message);
            toast.error(data.message);  // replace with toast if using toast
         }
      }
      else{
         const formData = new FormData()
         formData.append('name',name)
         formData.append('password',password)
         formData.append('email', email)
         formData.append('image', image)

         const {data}= await axios.post(backendUrl+'/api/company/register', formData)

         if(data.success){
             console.log("Login success", data);
            setCompanyData(data.company);
            setCompanyToken(data.token);
            localStorage.setItem('companyToken', data.token);
            setShowRecruiterLogin(false);
            navigate('/dashboard');
         }
         else{
            toast.error(data.message)
         }
      }
   } catch (error) {
      toast.error(error);
     // alert("Login failed. Check the backend or network."); // visible to user
   }
};

      useEffect(() => {
         document.body.style.overflow = 'hidden'
         return () => {
            document.body.style.overflow = 'unset'
         }
      }, [])

      const handleImageUpload = (e) => {
         setImage(e.target.files[0]);
      };

      return (
         <div className="absolute inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
            <form
               onSubmit={onSubmitHandler}
               className="relative bg-white p-8 w-[95%] max-w-md rounded-xl shadow-xl text-slate-700 space-y-6"
            >
               {/* Close Button */}
               {/* <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-semibold"
        >
          &times;
        </button> */}

               <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-800">
                     Recruiter {state}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                     Welcome back! Please sign in to continue
                  </p>
               </div>

               {/* Show inputs only if image upload step is not triggered */}
               {!(state === 'Signup' && isTextDataSubmitted) && (
                  <>
                     {state !== 'Login' && (
                        <div className="flex items-center border rounded px-3 py-2 gap-2">
                           <img src={assets.person_icon} alt="person" className="w-5 h-5" />
                           <input
                              type="text"
                              placeholder="Company Name"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full outline-none text-sm"
                           />
                        </div>
                     )}

                     <div className="flex items-center border rounded px-3 py-2 gap-2">
                        <img src={assets.email_icon} alt="email" className="w-5 h-5" />
                        <input
                           type="email"
                           placeholder="Email"
                           required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="w-full outline-none text-sm"
                        />
                     </div>

                     <div className="flex items-center border rounded px-3 py-2 gap-2">
                        <img src={assets.lock_icon} alt="password" className="w-5 h-5" />
                        <input
                           type="password"
                           placeholder="Password"
                           required
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className="w-full outline-none text-sm"
                        />
                     </div>
                  </>
               )}

               {/* Image Upload Section */}
               {state === 'Signup' && isTextDataSubmitted && (
                  <div className="text-center">
                     <label htmlFor="image" className="cursor-pointer inline-block">
                        <img
                           src={image ? URL.createObjectURL(image) : assets.upload_area}
                           alt="Upload Preview"
                           className="w-28 h-28 object-cover rounded-full mx-auto mb-2 border"
                        />
                        <input
                           type="file"
                           id="image"
                           accept="image/*"
                           hidden
                           onChange={handleImageUpload}
                        />
                     </label>
                     <p className="text-sm mt-2">Upload Company Logo</p>
                  </div>
               )}

               {state === 'Login' && (<p className="text-sm text-blue-600 my-4 cursor-pointer">
                  Forgot Password?
               </p>)}

               <button
                  type="submit"
                  className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
               >
                  {state === 'Login'
                     ? 'Login'
                     : isTextDataSubmitted
                        ? 'Submit'
                        : 'Create Account'}
               </button>

               <p className="text-sm text-center mt-4">
                  {state === 'Login'
                     ? "Don't have an account?"
                     : 'Already have an account?'}{' '}
                  <span
                     onClick={() => {
                        setState(state === 'Login' ? 'Signup' : 'Login');
                        setIsTextDataSubmitted(false); // reset when toggling
                     }}
                     className="text-purple-700 cursor-pointer underline"
                  >
                     {state === 'Login' ? 'Sign up' : 'Login'}
                  </span>
               </p>

               <img onClick={e => setShowRecruiterLogin(false)} className='absolute top-5 right-5 cursor-pointer ' src={assets.cross_icon} alt="" />
            </form>
         </div>
      );
   };

   export default RecruiterLogin;
