const Candidate=require("../models/candidate");
const Recruiter=require("../models/recruiter");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const registerCandidate = async (req, res) => {  //created a new candidate and saved in the database.
    const { name, email, resume, profile, skills, education, experience, contact, password } = req.body;

    try {
        if (!name || !email || !resume || !profile || !skills || !education || !experience || !contact || !password) {
            return res.status(400).send("Fill complete details");
        }
        const existingCandidate = await Candidate.findOne({ email: email });
        if (existingCandidate) {
            return res.status(400).send("Candidate already exists with the same email");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newCandidate = new Candidate({
            name: name,
            email: email,
            resume: resume,
            profile: profile,
            skills: skills,
            education: education,
            experience: experience,
            contact: contact,
            password: hashedPassword
        });

        await newCandidate.save();
        res.status(200).json(newCandidate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const loginCandidate = async (req, res) => { //checked the paswaord and email and cookie is assigned...
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).send("Fill All Details");
        }
        const candidate = await Candidate.findOne({ email });
        if (!candidate) {
            return res.status(409).send("Candidate does not exist");
        }

        const isMatch = await bcrypt.compare(password, candidate.password);

        if (!isMatch) {
            return res.status(401).send("Invalid Password");
        }

        const token = jwt.sign(
            { email, candidateId: candidate._id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
         // Set JWT token in cookie
        res.cookie("jwt", token, { httpOnly: true, secure: true, maxAge: 3600000 });
        // candidate.token = token;
        return res.status(200).json(candidate);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

const registerRecruiter = async (req, res) => {//new company gets registered 
    const { name, email, contact, bio, companyDescription, place, password } = req.body;

    try {
        if (!name || !email || !contact || !place || !password) {
            return res.status(400).send("Fill complete details");
        }
        const existingRecruiter = await Recruiter.findOne({ email: email });
        if (existingRecruiter) {
            return res.status(400).send("Recruiter already exists with the same email");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newRecruiter = new Recruiter({
            name: name,
            email: email,
            contact: contact,
            bio: bio,
            companyDescription: companyDescription,
            place: place,
            password: hashedPassword
        });

        await newRecruiter.save();

        res.status(200).json(newRecruiter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const loginRecruiter = async (req, res) => {  // jwt cokkie gets assign to the login company..
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).send("Fill All Details");
        }

        const recruiter = await Recruiter.findOne({ email });

        if (!recruiter) {
            return res.status(409).send("Recruiter does not exist");
        }
        const isMatch = await bcrypt.compare(password, recruiter.password);
        if (!isMatch) {
            return res.status(401).send("Invalid Password");
        }

        const token = jwt.sign(
            { email, recruiterId: recruiter._id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' } // Set expiration to 1 hour
        );
        // Set JWT token in cookie
        res.cookie("jwt", token, { httpOnly: true, secure: true, maxAge: 3600000 });
        // recruiter.token = token;
        return res.status(200).json(recruiter);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};
const logout = (req, res) => {
    // Clear JWT token from cookies
    res.clearCookie('jwt', { httpOnly: true, secure: true });

    res.status(200).json({ message: "Logout successful" });
};

module.exports={registerCandidate,loginCandidate,registerRecruiter,loginRecruiter,logout};