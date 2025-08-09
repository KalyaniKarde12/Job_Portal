import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
// import connectCloudinary from "../config/cloudinary.js";
import cloudinary from '../config/cloudinary.js'; // Adjust path as needed

// Use cloudinary.uploader.upload()

// Create or sync user from Clerk webhook/signup
export const createUser = async (req, res) => {
    try {
        const {
            userId,
            emailAddresses,
            firstName,
            lastName,
            imageUrl,
            username
        } = req.body;

        console.log('Creating user with data:', req.body);

        // Check if user already exists - Fixed: use clerkId instead of req.userId
        let existingUser = await User.findOne({ clerkId: userId });

        if (existingUser) {
            return res.json({
                success: true,
                message: 'User already exists',
                user: existingUser
            });
        }

        // Create new user with all required fields
        const newUser = new User({
            clerkId: userId,
            email: emailAddresses[0]?.emailAddress || emailAddresses[0],
            name: `${firstName || ''} ${lastName || ''}`.trim() || username || 'User',
            image: imageUrl || '',
            // Add default values for other required fields based on your schema
            resume: '', // assuming this might be required
            skills: [], // if skills is required
            // Add other required fields here based on your schema
        });

        await newUser.save();

        console.log('New user created successfully:', newUser._id);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: newUser
        });

    } catch (error) {
        console.error('Error creating user:', error);

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//get user data - Fixed: use clerkId instead of MongoDB _id
export const getUserData = async (req, res) => {
    const userId = req.auth.userId; // This is the Clerk user ID
    try {
        const user = await User.findOne({ clerkId: userId }); // Fixed: query by clerkId
        if (!user) {
            return res.json({ success: false, message: 'User Not Found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//apply for a job - Fixed: use clerkId for userId queries
export const applyForJob = async (req, res) => {
    const { jobId } = req.body;
    const userId = req.auth.userId; // This is the Clerk user ID

    try {
        // Get the user's MongoDB _id from their Clerk ID
        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Check if already applied using the MongoDB user _id
        const isAlreadyApplied = await JobApplication.findOne({
            jobId: jobId,
            userId: user._id // Use MongoDB _id for JobApplication
        });

        if (isAlreadyApplied) {
            return res.json({ success: false, message: 'Already Applied' });
        }

        const jobData = await Job.findById(jobId);

        if (!jobData) {
            return res.json({ success: false, message: 'Job not found' });
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId: user._id, // Use MongoDB _id
            jobId,
            date: Date.now()
        });

        res.json({ success: true, message: "Applied successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//Get user applied applications - Fixed: use clerkId to get user, then use MongoDB _id
export const getUserJobApplications = async (req, res) => {
    try {
        const clerkUserId = req.auth.userId; // This is the Clerk user ID

        // Get the user's MongoDB _id from their Clerk ID
        const user = await User.findOne({ clerkId: clerkUserId });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Find applications using the MongoDB user _id
        const applications = await JobApplication.find({ userId: user._id })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec();

        if (!applications || applications.length === 0) {
            return res.json({ success: false, message: 'No job applications' });
        }

        return res.json({ success: true, applications });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//update user profile resume - Fixed: use clerkId to find user
export const updateUserResume = async (req, res) => {
    try {
        const clerkUserId = req.auth.userId; // This is the Clerk user ID
        const resumeFile = req.file;

        // Find user by Clerk ID
        const userData = await User.findOne({ clerkId: clerkUserId });

        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
            userData.resume = resumeUpload.secure_url;
        }

        await userData.save();

        return res.json({ success: true, message: 'Resume Updated' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};