const express=require("express");
const router=express.Router();
const {loginCandidate,loginRecruiter,registerCandidate,registerRecruiter,logout,loginAdmin,registerAdmin}=require("../controllers/authController");

//candidate authroutes
router.post("/candidateregister",registerCandidate);
router.post("/candidatelogin",loginCandidate);

//recruter authroutes
router.post("/recruiterregister",registerRecruiter);
router.post("/recruiterlogin",loginRecruiter);

//admin 
router.post("/adminregister",registerAdmin);
router.post("/adminlogin",loginAdmin);

//logout in commn for both
router.post("/logout",logout);


module.exports=router;
