const Candidate=require("../models/candidate");
const Recruiter=require("../models/recruiter");
const Job=require("../models/jobs");
const Application=require("../models/applications");

const getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        if (!candidates || candidates.length === 0) {
            return res.status(404).json({ message: "No jobs found" });
        }

        res.status(200).json(candidates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllRecruiters = async (req, res) => {
    try {
        const recruiters = await Recruiter.find();
        if (!recruiters || recruiters.length === 0) {
            return res.status(404).json({ message: "No jobs found" });
        }

        res.status(200).json(recruiters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports={getAllCandidates,getAllRecruiters};