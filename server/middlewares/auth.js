const jwt = require("jsonwebtoken");
const Candidate=require("../models/candidate");
const Recruiter=require("../models/recruiter");
const Admin=require("../models/admin");

const authorizeCandidate = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(403).send("Token is required for authentication");
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const candidate = await Candidate.findById(decoded.candidateId);

        if (!candidate) {
            return res.status(401).send("Invalid token");
        }

        req.candidate = candidate;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).send("Invalid token");
    }
};

const authorizeRecruiter = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(403).send("Token is required for authentication");
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const recruiter = await Recruiter.findById(decoded.recruiterId);

        if (!recruiter) {
            return res.status(401).send("Invalid token");
        }

        req.recruiter = recruiter;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).send("Invalid token");
    }
};

const authorizeAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(403).send("Token is required for authentication");
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const isadmin = await Admin.findOne({email:decoded.email});

        if (!isadmin ) {
            return res.status(401).send("Only admin can access");
        }

        req.admin =isadmin;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).send("Invalid token");
    }
};

module.exports ={authorizeCandidate,authorizeRecruiter,authorizeAdmin};