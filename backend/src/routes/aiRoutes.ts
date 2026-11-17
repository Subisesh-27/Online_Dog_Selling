import { Router } from 'express';
import {
  getBreedRecommendation,
  handleAiChat,
  runBatchTestDataset,
  matchBreederWithKNN,
  getBreederMLDataset,
} from '../controllers/aiController.js';

const router = Router();

router.post('/breed-recommendation', getBreedRecommendation);
router.post('/chat', handleAiChat);
router.get('/batch-test-dataset', runBatchTestDataset);
router.post('/batch-test-dataset', runBatchTestDataset);

// Machine Learning: K-Nearest Neighbors (KNN) Breeder Matching
router.post('/match-breeder', matchBreederWithKNN);
router.get('/breeders-dataset', getBreederMLDataset);

export default router;
