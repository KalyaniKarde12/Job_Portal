import express from 'express'
import { getJobById, getJobs } from '../controllers/jobController.js'
const router = express.Router()

//Route to get all jobs data
router.get('/', (req, res) => {
  console.log("GET /api/jobs called")
  getJobs(req, res)
})


//Route to get a single job by ID
router.get('/:id', getJobById)


export default router;