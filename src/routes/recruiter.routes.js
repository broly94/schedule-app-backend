import { Router } from "express";
const router = Router();

import { getRecruiter, postRecruiter, putRecruiter, deleteRecruiter, getRecruiters } from '../controllers/recruitersController.js';
import { verifyToken } from '../middlewares/validateToken.js';

router
    .route('/')
    .get(verifyToken, getRecruiters)
    .post(postRecruiter)
    
    router
    .route('/:recruiter_id')
    .get(verifyToken, getRecruiter)
    .put(verifyToken, putRecruiter)
    .delete(verifyToken, deleteRecruiter)

export {
    router as recruiterRoutes
}