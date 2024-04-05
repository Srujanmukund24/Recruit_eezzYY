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
            appliedApplications: [], // Initial empty object
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


module.exports={addJob}
