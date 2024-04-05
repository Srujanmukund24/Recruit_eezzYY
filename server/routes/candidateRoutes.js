const express=require("express");
const router=express.Router();
const {authorizeCandidate}=require("../middlewares/auth")
const {getAllJobs}=require("../controllers/candidateController");

//get all the jobs posted by any of the recruiter and particular job
router.get("/alljobs",authorizeCandidate,getAllJobs)
router.get("/alljobs/:jobId",authorizeCandidate,);

//apply for the job
router.post("/alljobs/:jobId/apply",authorizeCandidate);
//get the company details who posted the job
router.get("/recruiterdetails/:recruiterId",authorizeCandidate,);
//get all my applications and the particular application .
router.get("/myapplications",authorizeCandidate,);
router.get("myapplications/:applicationId",authorizeCandidate);

router.get("/shortlistedfor",authorizeCandidate);

module.exports=router;