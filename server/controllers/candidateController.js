const Candidate = require("../models/candidate");
const Recruiter = require("../models/recruiter");
const Job = require("../models/jobs");
const Application = require("../models/applications");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!jobId) {
      return res.status(404).json({ message: "No params" });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "No job for the id.." });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "serverError" });
  }
};

const getRecruiterDetails = async (req, res) => {
  try {
    const { recruiterId } = req.params;
    if (!recruiterId) {
      return res.status(404).json({ message: "No params" });
    }
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return re.status(404).json({ message: "No recruiter found fo the id" });
    }
    res.status(200).json(recruiter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "serverError" });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidateId: req.candidate._id,
    });

    if (!applications || applications.length === 0) {
      return res
        .status(404)
        .json({ message: "No applications found for this candidate" });
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const { applicationId } = req.params;
    if (!applicationId) {
      return res.status(404).json({ message: "No params" });
    }
    const application = await Application.findById(applicationId);
    if (!application) {
      return res
        .status(404).json({ message: "No applications found for this candidate" });
    }
    res.status(200).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createApplicationForJobId = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!jobId) {
      return res.status(404).json({ message: "No params" });
    }
    const candidateId = req.candidate._id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "No Job found for id" });
    }
    const recruiterId = job.recruiterId;

    const { coverLetter } = req.body;

    const newApplication = new Application({
      jobId: jobId,
      recruiterId: recruiterId,
      candidateId: candidateId,
      coverLetter: coverLetter,
    });

    await newApplication.save();
    res.status(200).json(newApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  getAllJobs,
  getMyApplications,
  getJobById,
  getRecruiterDetails,
  getApplicationById,
  createApplicationForJobId,
};
