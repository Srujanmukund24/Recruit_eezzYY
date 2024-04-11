const express=require("express");
const router=express.Router();
const {authorizeCandidate}=require("../middlewares/auth")
const {getAllJobs, getMyApplications, getJobById, getRecruiterDetails, getApplicationById, createApplicationForJobId}=require("../controllers/candidateController");

//get all the jobs posted by any of the recruiter and particular job
router.get("/alljobs",authorizeCandidate,getAllJobs)
router.get("/alljobs/:jobId",authorizeCandidate,getJobById);

//apply for the job
router.post("/alljobs/:jobId/apply",authorizeCandidate,createApplicationForJobId);
router.post("/myapplication/:applicationId/cancel",authorizeCandidate,);
//get the company details who posted the job
router.get("/recruiterdetails/:recruiterId",authorizeCandidate,getRecruiterDetails);
//get all my applications and the particular application .
router.get("/myapplications",authorizeCandidate,getMyApplications);
router.get("/myapplications/:applicationId",authorizeCandidate,getApplicationById);

router.get("/shortlistedfor",authorizeCandidate);

module.exports=router;