const express=require("express");
const router=express.Router();
const {authorizeRecruiter}=require("../middlewares/auth")
const { addJob, getJobsPosted, getApplicationsForJobs, acceptRejectApplication, getAcceptedCandidates, getCandidateById }=require("../controllers/recruiterController");
const { getJobById, getApplicationById } = require("../controllers/candidateController");

//add jobs for recruiting
router.post("/addjobs",authorizeRecruiter,addJob);
//get the jobs posted till now and particulat
router.get("/postedjobs",authorizeRecruiter,getJobsPosted);
router.get("/postedjobs/:jobId",authorizeRecruiter,getJobById);
//all applications for the pariticualr jobs
router.get("/:jobId/applications",authorizeRecruiter,getApplicationsForJobs); //all aaplications
router.get("/applications/:applicationId",authorizeRecruiter,getApplicationById); //single application
//accept or reject the application on the bassis of the request.
router.post("/applications/:applicationId/review",authorizeRecruiter,acceptRejectApplication);

//all the accepted candisby all jobs->acceptedcandis;;;
router.get("/getacceptedcandidates",authorizeRecruiter,getAcceptedCandidates);

router.get("/getcandidate/:candidateId",authorizeRecruiter,getCandidateById)
module.exports=router;