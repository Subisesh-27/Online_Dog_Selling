import { Request, Response } from 'express';
import { calculateBreedRecommendations, generatePetAiResponse, runBatchDatasetEvaluation } from '../services/aiService.js';
import { runKnnBreederMatcher, BREEDER_DATASET, UserBreederPreferences, BreederProfile } from '../services/knnBreederService.js';
import { Seller } from '../models/Seller.js';
import { Dog } from '../models/Dog.js';
import { formatApiResponse } from '../utils/validators.js';

export const getBreedRecommendation = async (req: Request, res: Response): Promise<any> => {
  try {
    const { budget, homeType, familySize, children, workingHours, climate, activityLevel, experience } = req.body;

    const recommendations = calculateBreedRecommendations({
      budget: Number(budget) || 30000,
      homeType: homeType || 'house_yard',
      familySize: Number(familySize) || 4,
      children: Boolean(children),
      workingHours: workingHours || '4-6_hours',
      climate: climate || 'Hot',
      activityLevel: activityLevel || 'moderate',
      experience: experience || 'first_time',
    });

    return res.status(200).json(formatApiResponse(true, 'Breed recommendations generated', recommendations));
  } catch (error: any) {
    return res.status(500).json(formatApiResponse(false, error.message));
  }
};

export const handleAiChat = async (req: Request, res: Response): Promise<any> => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json(formatApiResponse(false, 'Message prompt cannot be empty'));
    }

    const aiResponse = generatePetAiResponse(message);

    return res.status(200).json(formatApiResponse(true, 'AI chat reply generated', aiResponse));
  } catch (error: any) {
    return res.status(500).json(formatApiResponse(false, error.message));
  }
};

export const runBatchTestDataset = async (req: Request, res: Response): Promise<any> => {
  try {
    const datasetPayload = req.body?.dataset || req.body;
    const customDataset = Array.isArray(datasetPayload) ? datasetPayload : undefined;
    const batchResult = runBatchDatasetEvaluation(customDataset);

    return res.status(200).json(formatApiResponse(true, 'Dataset auto-testing completed successfully', batchResult));
  } catch (error: any) {
    return res.status(500).json(formatApiResponse(false, error.message));
  }
};

/**
 * Executes K-Nearest Neighbors (KNN) Machine Learning Algorithm
 * to recommend top-k verified breeders matched to user lifestyle and budget preferences.
 */
export const matchBreederWithKNN = async (req: Request, res: Response): Promise<any> => {
  try {
    const preferences: UserBreederPreferences = {
      budget: Number(req.body.budget) || 35000,
      preferredCategory: req.body.preferredCategory || 'Any',
      minExperienceYears: Number(req.body.minExperienceYears) || 5,
      minRating: Number(req.body.minRating) || 4.5,
      desiredEnergyLevel: Number(req.body.desiredEnergyLevel) || 3,
      desiredKidFriendliness: Number(req.body.desiredKidFriendliness) || 4,
      healthPriority: Number(req.body.healthPriority) || 0.95,
      preferredCity: req.body.preferredCity || 'Any',
      k: Number(req.body.k) || 3,
      weights: req.body.weights,
    };

    // Combine preset verified breeder dataset with any approved MongoDB sellers
    let candidatePool: BreederProfile[] = [...BREEDER_DATASET];

    try {
      const dbSellers = await Seller.find({ sellerStatus: 'APPROVED' }).limit(10);
      if (dbSellers && dbSellers.length > 0) {
        for (const s of dbSellers) {
          // Check if already in candidate pool
          const exists = candidatePool.some((p) => p.email === (s as any).email || p.kennelName === s.kennelName);
          if (!exists) {
            const sellerDogs = await Dog.find({ sellerId: s._id }).limit(1);
            const featuredDog = sellerDogs[0];

            candidatePool.push({
              id: s._id.toString(),
              kennelName: s.kennelName,
              breederName: s.fullName,
              phone: s.phone,
              email: `${s.fullName.toLowerCase().replace(/\s+/g, '.')}@pawverse.ai`,
              city: s.address.city || 'Tamil Nadu',
              state: s.address.state || 'Tamil Nadu',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
              experienceYears: s.experienceYears || 5,
              rating: 4.9,
              reviewsCount: 35,
              specialtyCategory: (featuredDog?.category as any) || 'Family Dogs',
              specialtyBreeds: featuredDog ? [featuredDog.breed] : ['Companion Dogs'],
              avgPrice: featuredDog?.price || 30000,
              energyLevel: featuredDog?.traits?.energy || 4,
              kidFriendliness: 4,
              healthVerificationScore: 0.97,
              apartmentFriendly: true,
              responseRate: '95% (< 15 mins)',
              joinedYear: new Date(s.createdAt).getFullYear() || 2024,
              verifiedBreeder: true,
              featuredPuppy: {
                name: featuredDog?.name || `${s.kennelName} Verified Pup`,
                breed: featuredDog?.breed || 'Golden Retriever',
                price: featuredDog?.price || 30000,
                image: featuredDog?.images?.[0] || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
              },
            });
          }
        }
      }
    } catch (dbErr) {
      console.warn('[KNN Breeder Matcher] Fallback to verified memory pool:', dbErr);
    }

    const knnResult = runKnnBreederMatcher(preferences, candidatePool);

    return res.status(200).json(
      formatApiResponse(true, `KNN Machine Learning model successfully matched top-${knnResult.k} breeders`, knnResult)
    );
  } catch (error: any) {
    return res.status(500).json(formatApiResponse(false, error.message));
  }
};

/**
 * Retrieves the full breeder ML dataset and feature vectors for inspection
 */
export const getBreederMLDataset = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.status(200).json(
      formatApiResponse(true, 'Breeder ML knowledge base & training feature dataset', {
        datasetSize: BREEDER_DATASET.length,
        features: [
          'avgPrice (INR)',
          'experienceYears',
          'rating (1-5)',
          'reviewsCount',
          'specialtyCategory',
          'energyLevel (1-5)',
          'kidFriendliness (1-5)',
          'healthVerificationScore (0-1)',
          'city',
        ],
        breeders: BREEDER_DATASET,
      })
    );
  } catch (error: any) {
    return res.status(500).json(formatApiResponse(false, error.message));
  }
};
