import express from 'express';
import {createUser, getUserData, applyForJob, getUserJobApplications, updateUserResume } from '../controllers/userController.js';
import upload from '../config/multer.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();

// create user
router.post('/create', createUser);

//get user data
router.get('/user', requireAuth(), getUserData);

//Apply for a job
router.post('/apply', requireAuth(), applyForJob); // Add auth middleware

//Get applied jobs data
router.get('/applications', requireAuth(), getUserJobApplications); // Add auth middleware

//update user profile(resume)
router.post('/update-resume', requireAuth(), upload.single('resume'), updateUserResume); // Add auth middleware

export default router;