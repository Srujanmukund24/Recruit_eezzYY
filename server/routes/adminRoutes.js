const express=require("express");
const router=express.Router();
const { getAllCandidates, getAllRecruiters }=require('../controllers/adminController');
const { authorizeAdmin } = require("../middlewares/auth");


router.get('/allcandidates',authorizeAdmin,getAllCandidates);
router.get('/allrecruiters',authorizeAdmin,getAllRecruiters);

module.exports=router;
