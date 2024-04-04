const Candidate=require("../models/candidate");
const Job=require("../models/jobs");

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


module.exports={getAllJobs};