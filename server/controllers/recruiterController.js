const Candidate=require("../models/candidate");
const Recruiter=require("../models/recruiter");
const Job=require("../models/jobs");
const Application=require("../models/applications");

const addJob = async (req, res) => {
    const { jobTitle, maxPositions, maxApplicants, deadline, skillSet, duration, jobDescription, salary, jobLocation } = req.body;
    const recruiterId = req.recruiter._id;
    try {
        // Create a new job instance with key-value pairs
        const newJob = new Job({
            jobTitle: jobTitle,
            recruiterId: recruiterId,
            maxPositions: maxPositions,
            maxApplicants: maxApplicants,
            deadline: deadline,
            jobDescription: jobDescription,
            skillSet: skillSet,
            duration: duration,
            salary: salary,
            jobLocation: jobLocation,
            acceptedCandidates: []   // Initial empty object
        });

        // Save the job to the database
        await newJob.save();

        // Return success response
        res.status(201).json(newJob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getJobsPosted = async (req, res) => {
    try {
        const jobs = await Job.find({recruiterId:req.recruiter._id});
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found posted yet" });
        }

        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getApplicationsForJobs=async(req,res)=>{
    try {
        const { jobId }=req.params;
        if(!jobId){
            return res.status(404).json({message:"No params"});  
        }
        const applications = await Application.find({jobId:jobId});
        if(!applications){
            return res.status(404).json({message:"No applications for the jobs applied yet."})
        }
        res.status(200).json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });       
    }
}

const acceptRejectApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        if (!applicationId || !status) {
            return res.status(400).json({ message: "Application ID or status is missing" });
        }
        if (status !== 'accepted' && status !== 'rejected') {
            return res.status(400).json({ message: "Invalid status. Status must be 'accepted' or 'rejected'" });
        }
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        if (application.status !== 'applied') {
            return res.status(400).json({ message: "Cannot update status. Application is not in 'applied' status" });
        }

        application.status = status;
        await application.save();

        if (status === 'accepted') {
            const jobId = application.jobId;
            const job = await Job.findById(jobId);
            if (job) {
                job.acceptedCandidates.push(application.candidateId);
                await job.save();
            }
        }

        res.status(200).json({message:`Application ${status} successfully`});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const getAcceptedCandidates = async (req, res) => {
    try {
        const recruiterId = req.recruiter._id;
        const jobs = await Job.find({ recruiterId });

        let acceptedCandidatesByJob = [];

        for (const job of jobs) {
            acceptedCandidatesByJob.push({
                jobId: job._id,
                candidates: job.acceptedCandidates
            });
        }
        res.status(200).json(acceptedCandidatesByJob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const getCandidateById = async (req, res) => {
    try {
      const { candidateId } = req.params;
      if (!candidateId) {
        return res.status(404).json({ message: "No params" });
      }
      const candidate = await Candidate.findById(candidateId);
      if (!candidate) {
        return res
          .status(404).json({ message: "No applications found for this candidate" });
      }
      res.status(200).json(candidate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };


module.exports={addJob,getJobsPosted,getApplicationsForJobs,acceptRejectApplication,getAcceptedCandidates,getCandidateById}
