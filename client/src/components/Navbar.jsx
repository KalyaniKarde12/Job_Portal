import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const Navbar = () => {
    const { openSignIn } = useClerk()
    const { user } = useUser()
    const { setShowRecruiterLogin, backendUrl, companyToken } = useContext(AppContext)
    const navigate = useNavigate()

    const [isRecruiterLoggedIn, setIsRecruiterLoggedIn] = useState(false)

    // Verify recruiter token on page load
    useEffect(() => {
        const verifyRecruiter = async () => {
            const token = localStorage.getItem("companyToken")
            if (token) {
                try {
                    const res = await axios.get(`${backendUrl}/api/company/verify`, {
                        headers: { token }
                    })
                    if (res.data.success) {
                        setIsRecruiterLoggedIn(true)
                    } else {
                        localStorage.removeItem("recruiterToken")
                        setIsRecruiterLoggedIn(false)
                    }
                } catch (err) {
                    localStorage.removeItem("recruiterToken")
                    setIsRecruiterLoggedIn(false)
                }
            }
        }
        verifyRecruiter()
    }, [backendUrl])

    // Create Clerk user in DB if signed in
    useEffect(() => {
        const createUserInDB = async () => {
            if (user) {
                try {
                    await axios.post(backendUrl + '/api/users/create', {
                        userId: user.id,
                        emailAddresses: user.emailAddresses,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        imageUrl: user.imageUrl,
                        username: user.username
                    })
                } catch (error) {
                    console.error('Error creating user in DB:', error.response?.data || error.message)
                }
            }
        }
        createUserInDB()
    }, [user, backendUrl])

    return (
        <div className='shadow py-4'>
            <div className='container px-4 2x1:px-20 mx-auto flex justify-between items-center'>
                <img
                    onClick={() => navigate('/')}
                    src={assets.logo}
                    alt="logo"
                    className="cursor-pointer h-10"
                />

                {user ? (
                    <div className='flex items-center gap-3'>
                        <Link to={'/applications'}>Applied Jobs</Link>
                        <p className='max-sm:hidden'>Hi, {user.firstName + " " + user.lastName}</p>
                        <UserButton />
                    </div>
                ) : isRecruiterLoggedIn ? (
                    <div className='flex items-center gap-3'>
                        <Link to={'/dashboard'}>Recruiter Dashboard</Link>
                        <button
                            onClick={() => {
                                localStorage.removeItem("recruiterToken")
                                setIsRecruiterLoggedIn(false)
                            }}
                            className='bg-red-500 text-white px-4 py-2 rounded-full'
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className='flex gap-4 max-sm:text-xs'>
                        <button
                            onClick={() => setShowRecruiterLogin(true)}
                            className='text-gray-600'
                        >
                            Recruiter Login
                        </button>
                        <button
                            onClick={() => openSignIn()}
                            className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
