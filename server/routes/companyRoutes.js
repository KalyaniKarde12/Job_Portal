import express from 'express'
import { getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany,  ChangeJobApplicationStatus, changeVisibility } from '../controllers/companyControllers.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middlewares/authMiddleware.js'
const router = express.Router()

//Register a company
router.post('/register', upload.single('image'), registerCompany)

//company login
router.post('/login', loginCompany)
router.get('/verify', protectCompany, (req, res) => {
    res.json({ success: true, company: req.company })
})
router.get('/company',protectCompany, getCompanyData)

router.post('/post-job', protectCompany, postJob)

router.get('/applicants',protectCompany, getCompanyJobApplicants)

router.get('/lists-jobs',protectCompany, getCompanyPostedJobs)

router.post('/change-status',protectCompany, ChangeJobApplicationStatus)

router.post('/change-visibility',protectCompany, changeVisibility)


export default router
