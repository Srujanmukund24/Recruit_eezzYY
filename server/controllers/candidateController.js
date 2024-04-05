const Candidate=require("../models/candidate");
const Job=require("../models/jobs");
const Application=require("../models/applications");

const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found" });
        }

        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ candidateId: req.candidate._id });

        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: "No applications found for this candidate" });
        }

        res.status(200).json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports={getAllJobs,getMyApplications};