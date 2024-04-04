const express=require("express");
const router=express.Router();
const {authorizeCandidate}=require("../middlewares/auth")
const {getAllJobs}=require("../controllers/candidateController");

//get all the jobs posted by any of the recruiter
router.get("/alljobs",authorizeCandidate,getAllJobs)
router.get("/alljobs/:jobId",authorizeCandidate,);
router.get("/recruiterdetails/:recruiterId",authorizeCandidate,);

module.exports=router;