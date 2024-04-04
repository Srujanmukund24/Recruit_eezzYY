const express=require("express");
const router=express.Router();
const {loginCandidate,loginRecruiter,registerCandidate,registerRecruiter,logout}=require("../controllers/authController");

//candidate authroutes
router.post("/candidateregister",registerCandidate);
router.post("/candidatelogin",loginCandidate);

//recruter authroutes
router.post("/recruiterregister",registerRecruiter);
router.post("/recruiterlogin",loginRecruiter);

//logout in commn for both
router.post("/logout",logout);


module.exports=router;
