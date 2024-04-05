const express=require("express");
const router=express.Router();
const {authorizeRecruiter}=require("../middlewares/auth")
const { addJob }=require("../controllers/recruiterController");

//add jobs for recruiting
router.post("/addjobs",authorizeRecruiter,addJob);
//get the jobs posted till now and particulat
router.get("/postedjobs".authorizeRecruiter,);
router.get("/postedjobs/:jobid",authorizeRecruiter);
//all applications for the pariticualr jobs
router.get("/postedjobs/:jobId/applications",authorizeRecruiter);
router.get("/postedjobs/:jobId/applications/:applicationId",authorizeRecruiter);
//accept or reject the application on the bassis of the request.
router.post("/postedjobs/:jobId/applications/:applicationId/check",authorizeRecruiter);

//all the accepted candisby all jobs->acceptedcandis;;;
router.get("/getacceptedcandidates",authorizeRecruiter);
module.exports=router;