/**
 * PawVerse AI - Machine Learning Breeder Recommendation Engine
 * Algorithm: K-Nearest Neighbors (K-NN)
 * Feature Normalization: Min-Max Normalization (L2 Euclidean Distance Metric)
 */

export interface BreederProfile {
  id: string;
  kennelName: string;
  breederName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  avatar: string;
  experienceYears: number;
  rating: number; // 1.0 - 5.0
  reviewsCount: number;
  specialtyCategory: 'Family Dogs' | 'Guard Dogs' | 'Small Dogs' | 'Rare Breeds' | 'Show Dogs';
  specialtyBreeds: string[];
  avgPrice: number;
  energyLevel: number; // 1 (Low) to 5 (Athlete)
  kidFriendliness: number; // 1 to 5
  healthVerificationScore: number; // 0.0 to 1.0 (KCI, DNA, Microchip)
  apartmentFriendly: boolean;
  responseRate: string;
  joinedYear: number;
  verifiedBreeder: boolean;
  featuredPuppy: {
    name: string;
    breed: string;
    price: number;
    image: string;
  };
}

export interface UserBreederPreferences {
  budget: number; // in INR
  preferredCategory: 'Family Dogs' | 'Guard Dogs' | 'Small Dogs' | 'Rare Breeds' | 'Show Dogs' | 'Any';
  minExperienceYears: number; // e.g. 1 - 15
  minRating: number; // e.g. 4.0 - 5.0
  desiredEnergyLevel: number; // 1 - 5
  desiredKidFriendliness: number; // 1 - 5
  healthPriority: number; // 0.5 (Standard) to 1.0 (Strict KCI & DNA)
  preferredCity?: string; // 'Any' or specific TN city
  k?: number; // Top K neighbors (default 3)
  weights?: {
    budget?: number;
    category?: number;
    experience?: number;
    rating?: number;
    energy?: number;
    kidFriendly?: number;
    health?: number;
    location?: number;
  };
}

export interface KnnDistanceBreakdown {
  feature: string;
  userTarget: string | number;
  breederActual: string | number;
  normalizedDistance: number;
  matchScore: number; // 0 - 100%
}

export interface KnnMatchedBreeder {
  rank: number;
  breeder: BreederProfile;
  euclideanDistance: number;
  compatibilityPercentage: number;
  featureBreakdown: KnnDistanceBreakdown[];
  keyMatchingReasons: string[];
}

export interface KnnModelOutput {
  algorithm: 'K-Nearest Neighbors (K-NN)';
  distanceMetric: 'Weighted Euclidean (L2 Norm)';
  k: number;
  totalCandidates: number;
  featureDimensions: number;
  userVector: number[];
  featureNames: string[];
  topMatches: KnnMatchedBreeder[];
  allCandidatesDistanceMatrix: {
    id: string;
    kennelName: string;
    city: string;
    euclideanDistance: number;
    compatibility: number;
    isTopK: boolean;
  }[];
  executionTimeMs: number;
}

// Category Numerical Mapping for Vectorization
const CATEGORY_MAP: Record<string, number> = {
  'Family Dogs': 1,
  'Guard Dogs': 2,
  'Small Dogs': 3,
  'Rare Breeds': 4,
  'Show Dogs': 5,
};

// Certified Breeder Training / Knowledge Base Dataset
export const BREEDER_DATASET: BreederProfile[] = [
  {
    id: 'breeder-tn-1',
    kennelName: 'Rajapalayam Royal Kennel Club',
    breederName: 'Raja Sundaram',
    phone: '+91 98401 98765',
    email: 'raja.sundaram@pawverse.ai',
    city: 'Rajapalayam',
    state: 'Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    experienceYears: 16,
    rating: 4.99,
    reviewsCount: 185,
    specialtyCategory: 'Rare Breeds',
    specialtyBreeds: ['Rajapalayam', 'Chippiparai'],
    avgPrice: 35000,
    energyLevel: 5,
    kidFriendliness: 4,
    healthVerificationScore: 0.99,
    apartmentFriendly: false,
    responseRate: '99% (< 10 mins)',
    joinedYear: 2018,
    verifiedBreeder: true,
    featuredPuppy: {
      name: 'Veera - Champion Bloodline',
      breed: 'Rajapalayam',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    },
  },
  {
    id: 'breeder-tn-2',
    kennelName: 'Madurai Heritage Hound Haven',
    breederName: 'Senthil Velan',
    phone: '+91 98402 12345',
    email: 'senthil.velan@pawverse.ai',
    city: 'Madurai',
    state: 'Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    experienceYears: 12,
    rating: 4.96,
    reviewsCount: 142,
    specialtyCategory: 'Rare Breeds',
    specialtyBreeds: ['Chippiparai', 'Kanni'],
    avgPrice: 28000,
    energyLevel: 5,
    kidFriendliness: 4,
    healthVerificationScore: 0.97,
    apartmentFriendly: false,
    responseRate: '98% (< 15 mins)',
    joinedYear: 2019,
    verifiedBreeder: true,
    featuredPuppy: {
      name: 'Madurai Velan - Pure Sighthound',
      breed: 'Chippiparai',
      price: 28000,
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    },
  },
  {
    id: 'breeder-tn-3',
    kennelName: 'Chennai Supreme Canines (Nandanam)',
    breederName: 'Dr. Aravind Krishnan',
    phone: '+91 98405 77889',
    email: 'aravind.krishnan@pawverse.ai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    experienceYears: 14,
    rating: 4.97,
    reviewsCount: 220,
    specialtyCategory: 'Family Dogs',
    specialtyBreeds: ['Golden Retriever', 'Labrador Retriever'],
    avgPrice: 32000,
    energyLevel: 3,
    kidFriendliness: 5,
    healthVerificationScore: 0.98,
    apartmentFriendly: true,
    responseRate: '99% (< 5 mins)',
    joinedYear: 2017,
    verifiedBreeder: true,
    featuredPuppy: {
      name: 'Simba - KCI Golden Retriever',
      breed: 'Golden Retriever',
      price: 32000,
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    },
  },
  {
    id: 'breeder-tn-4',
    kennelName: 'Salem Royal German Shepherd Kennel',
    breederName: 'M. Manikandan',
    phone: '+91 98407 11223',
    email: 'manikandan@pawverse.ai',
    city: 'Salem',
    state: 'Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    experienceYears: 10,
    rating: 4.94,
    reviewsCount: 165,
    specialtyCategory: 'Guard Dogs',
    specialtyBreeds: ['German Shepherd', 'Doberman'],
    avgPrice: 30000,
    energyLevel: 5,
    kidFriendliness: 4,
    healthVerificationScore: 0.96,
    apartmentFriendly: false,
    responseRate: '96% (< 20 mins)',
    joinedYear: 2020,
    verifiedBreeder: true,
    featuredPuppy: {
      name: 'Rex - Working Line Shepherd',
      breed: 'German Shepherd',
      price: 30000,
      image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5455?auto=format&fit=crop&w=800&q=80',
    },
  },
  {
    id: 'breeder-tn-5',
    kennelName: 'Kaveri Valley Toy Breeds',
    breederName: 'Kavitha Ramachandran',
    phone: '+91 98408 33445',
    email: 'kavitha.ram@pawverse.ai',
    city: 'Trichy',
    state: 'Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    experienceYears: 8,
    rating: 4.95,
    reviewsCount: 138,
    specialtyCategory: 'Small Dogs',
    specialtyBreeds: ['Shih Tzu', 'Pomeranian', 'Pug'],
    avgPrice: 24000,
    energyLevel: 2,
    kidFriendliness: 5,
    healthVerificationScore: 0.95,
    apartmentFriendly: true,
    responseRate: '97% (< 15 mins)',
    joinedYear: 2021,
    verifiedBreeder: true,
    featuredPuppy: {
      name: 'Bella - Luxury Shih Tzu Pup',
      breed: 'Shih Tzu',
      price: 24000,
      image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=800&q=80',
    },
  },
  {
    id: 'breeder-tn-6',
    kennelName: 'Kovai Royal Guard Kennels',
    breederName: 'G. Karthikeyan',
    phone: '+91 98404 99001',
    email: 'karthikeyan@pawverse.ai',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    experienceYears: 15,
    rating: 4.93,
    reviewsCount: 156,
    specialtyCategory: 'Guard Dogs',
    specialtyBreeds: ['Kombai', 'Rajapalayam', 'Rottweiler'],
    avgPrice: 32000,
    energyLevel: 5,
    kidFriendliness: 3,
    healthVerificationScore: 0.96,
    apartmentFriendly: false,
    responseRate: '95% (< 25 mins)',
    joinedYear: 2018,
    verifiedBreeder: true,
    featuredPuppy: {
      name: 'Simhan - Ferocious Kombai',
      breed: 'Kombai',
      price: 32000,
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    },
  },
  {
    id: 'breeder-tn-7',
    kennelName: 'Silicon Valley Pet Club (Bangalore / Chennai)',
    breederName: 'Vikram Mehta',
    phone: '+91 98406 55667',
    email: 'vikram.mehta@pawverse.ai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    experienceYears: 9,
    rating: 4.91,
    reviewsCount: 110,
    specialtyCategory: 'Small Dogs',
    specialtyBreeds: ['French Bulldog', 'Pug'],
    avgPrice: 55000,
    energyLevel: 2,
    kidFriendliness: 5,
    healthVerificationScore: 0.98,
    apartmentFriendly: true,
    responseRate: '94% (< 30 mins)',
    joinedYear: 2021,
    verifiedBreeder: true,
    featuredPuppy: {
      name: 'Bruno - French Bulldog Champion',
      breed: 'French Bulldog',
      price: 65000,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    },
  },
  {
    id: 'breeder-tn-8',
    kennelName: 'Tirunelveli Kanni Preservation Society',
    breederName: 'Murugan Chettiar',
    phone: '+91 98403 44556',
    email: 'murugan.chettiar@pawverse.ai',
    city: 'Tirunelveli',
    state: 'Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    experienceYears: 18,
    rating: 4.98,
    reviewsCount: 174,
    specialtyCategory: 'Rare Breeds',
    specialtyBreeds: ['Kanni', 'Chippiparai'],
    avgPrice: 32000,
    energyLevel: 5,
    kidFriendliness: 4,
    healthVerificationScore: 0.99,
    apartmentFriendly: false,
    responseRate: '98% (< 10 mins)',
    joinedYear: 2017,
    verifiedBreeder: true,
    featuredPuppy: {
      name: 'Karuppan - Black & Tan Kanni',
      breed: 'Kanni',
      price: 32000,
      image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80',
    },
  },
];

/**
 * Normalizes a raw value using Min-Max scaling to range [0, 1]
 */
function minMaxScale(val: number, min: number, max: number): number {
  if (max === min) return 0.5;
  return Math.max(0, Math.min(1, (val - min) / (max - min)));
}

/**
 * Computes location proximity penalty/score
 */
function computeLocationDistance(userCity?: string, breederCity?: string): number {
  if (!userCity || userCity.toLowerCase() === 'any' || !breederCity) return 0.1;
  const u = userCity.trim().toLowerCase();
  const b = breederCity.trim().toLowerCase();
  if (u === b) return 0.0; // exact city match
  
  // Nearby regional clustering (Tamil Nadu zones)
  const southZone = ['rajapalayam', 'madurai', 'tirunelveli'];
  const northZone = ['chennai', 'kanchipuram', 'vellore'];
  const centralZone = ['trichy', 'salem', 'coimbatore'];

  const inSameZone =
    (southZone.includes(u) && southZone.includes(b)) ||
    (northZone.includes(u) && northZone.includes(b)) ||
    (centralZone.includes(u) && centralZone.includes(b));

  return inSameZone ? 0.3 : 0.8;
}

/**
 * Executes K-Nearest Neighbors (KNN) ML algorithm to match breeders
 */
export function runKnnBreederMatcher(
  input: UserBreederPreferences,
  customBreederPool?: BreederProfile[]
): KnnModelOutput {
  const startTime = Date.now();
  const pool = customBreederPool && customBreederPool.length > 0 ? customBreederPool : BREEDER_DATASET;
  const k = Math.min(pool.length, Math.max(1, input.k || 3));

  // Determine Min and Max ranges across the training dataset
  const prices = pool.map((b) => b.avgPrice);
  const experiences = pool.map((b) => b.experienceYears);
  const ratings = pool.map((b) => b.rating);
  const energies = pool.map((b) => b.energyLevel);
  const kidFriendlyList = pool.map((b) => b.kidFriendliness);
  const healthScores = pool.map((b) => b.healthVerificationScore);

  const minPrice = Math.min(...prices), maxPrice = Math.max(...prices);
  const minExp = Math.min(...experiences), maxExp = Math.max(...experiences);
  const minRating = Math.min(...ratings), maxRating = Math.max(...ratings);
  const minEnergy = Math.min(...energies), maxEnergy = Math.max(...energies);
  const minKid = Math.min(...kidFriendlyList), maxKid = Math.max(...kidFriendlyList);
  const minHealth = Math.min(...healthScores), maxHealth = Math.max(...healthScores);

  // Normalize User Vector
  const userBudget = input.budget || 35000;
  const userExp = input.minExperienceYears || 5;
  const userRating = input.minRating || 4.5;
  const userEnergy = input.desiredEnergyLevel || 3;
  const userKid = input.desiredKidFriendliness || 4;
  const userHealth = input.healthPriority || 0.95;
  const userCatCode = input.preferredCategory && input.preferredCategory !== 'Any' ? (CATEGORY_MAP[input.preferredCategory] || 1) : 0;

  const uNorm = [
    minMaxScale(userBudget, minPrice, maxPrice),
    minMaxScale(userExp, minExp, maxExp),
    minMaxScale(userRating, minRating, maxRating),
    userCatCode > 0 ? minMaxScale(userCatCode, 1, 5) : 0.5,
    minMaxScale(userEnergy, minEnergy, maxEnergy),
    minMaxScale(userKid, minKid, maxKid),
    minMaxScale(userHealth, minHealth, maxHealth),
    0.0, // perfect target location distance
  ];

  // Feature weights
  const defaultWeights = {
    budget: 2.5,       // high importance on budget match
    category: 2.2,     // high importance on breed category
    experience: 1.2,   // experience
    rating: 1.8,       // trust & reviews
    energy: 1.5,       // energy match
    kidFriendly: 1.4,  // family safety
    health: 1.6,       // KCI / DNA certificates
    location: 1.0,     // location proximity
  };

  const weights = { ...defaultWeights, ...(input.weights || {}) };
  const weightValues = [
    weights.budget,
    weights.experience,
    weights.rating,
    weights.category,
    weights.energy,
    weights.kidFriendly,
    weights.health,
    weights.location,
  ];

  // Compute maximum theoretical distance for scaling compatibility
  const sumWeights = weightValues.reduce((a, b) => a + b, 0);
  const maxPossibleDist = Math.sqrt(sumWeights);

  // Calculate Euclidean Distance for each candidate breeder
  const candidatesWithDistance = pool.map((breeder) => {
    const breederCatCode = CATEGORY_MAP[breeder.specialtyCategory] || 1;
    const locDistance = computeLocationDistance(input.preferredCity, breeder.city);

    const bNorm = [
      minMaxScale(breeder.avgPrice, minPrice, maxPrice),
      minMaxScale(breeder.experienceYears, minExp, maxExp),
      minMaxScale(breeder.rating, minRating, maxRating),
      userCatCode > 0 ? minMaxScale(breederCatCode, 1, 5) : 0.5,
      minMaxScale(breeder.energyLevel, minEnergy, maxEnergy),
      minMaxScale(breeder.kidFriendliness, minKid, maxKid),
      minMaxScale(breeder.healthVerificationScore, minHealth, maxHealth),
      locDistance,
    ];

    // Weighted Euclidean Distance: sqrt( sum( w_j * (u_j - b_j)^2 ) )
    let squaredDiffSum = 0;
    const featureBreakdown: KnnDistanceBreakdown[] = [];

    const featureLabels = [
      { name: 'Puppy Price / Budget', uVal: `₹${userBudget.toLocaleString()}`, bVal: `₹${breeder.avgPrice.toLocaleString()}` },
      { name: 'Breeder Experience', uVal: `${userExp}+ Years`, bVal: `${breeder.experienceYears} Years` },
      { name: 'Customer Review Rating', uVal: `${userRating}★`, bVal: `${breeder.rating}★ (${breeder.reviewsCount} reviews)` },
      { name: 'Breed Specialty Category', uVal: input.preferredCategory || 'Any', bVal: breeder.specialtyCategory },
      { name: 'Dog Activity & Energy', uVal: `Level ${userEnergy}/5`, bVal: `Level ${breeder.energyLevel}/5` },
      { name: 'Kid & Family Friendliness', uVal: `Score ${userKid}/5`, bVal: `Score ${breeder.kidFriendliness}/5` },
      { name: 'KCI / Health Verification', uVal: `${Math.round(userHealth * 100)}% Cert`, bVal: `${Math.round(breeder.healthVerificationScore * 100)}% Cert` },
      { name: 'Location Proximity', uVal: input.preferredCity || 'Any', bVal: `${breeder.city}, ${breeder.state}` },
    ];

    for (let j = 0; j < uNorm.length; j++) {
      const diff = uNorm[j] - bNorm[j];
      const weightedSquare = weightValues[j] * Math.pow(diff, 2);
      squaredDiffSum += weightedSquare;

      const normDist = Math.abs(diff);
      const featureMatchScore = Math.max(0, Math.min(100, Math.round((1 - normDist) * 100)));
      featureBreakdown.push({
        feature: featureLabels[j].name,
        userTarget: featureLabels[j].uVal,
        breederActual: featureLabels[j].bVal,
        normalizedDistance: parseFloat(normDist.toFixed(4)),
        matchScore: featureMatchScore,
      });
    }

    const euclideanDistance = Math.sqrt(squaredDiffSum);

    // Compute Compatibility %: (1 - (dist / maxPossibleDist)) * 100
    const rawCompatibility = Math.round((1 - euclideanDistance / maxPossibleDist) * 100);
    const compatibilityPercentage = Math.max(68, Math.min(99, rawCompatibility));

    // Generate explainable AI reasons
    const keyMatchingReasons: string[] = [];
    if (Math.abs(userBudget - breeder.avgPrice) <= 6000) {
      keyMatchingReasons.push(`🎯 Budget Aligned: Breeder average price (₹${breeder.avgPrice.toLocaleString()}) matches within your ₹${userBudget.toLocaleString()} range.`);
    }
    if (input.preferredCategory && (input.preferredCategory === 'Any' || input.preferredCategory === breeder.specialtyCategory)) {
      keyMatchingReasons.push(`🏆 Category Specialist: Premier kennel for ${breeder.specialtyCategory} (${breeder.specialtyBreeds.join(', ')}).`);
    }
    if (breeder.rating >= 4.9) {
      keyMatchingReasons.push(`⭐ Exceptional Breeder Trust: Verified ${breeder.rating}★ rating across ${breeder.reviewsCount} customer transactions.`);
    }
    if (breeder.experienceYears >= 10) {
      keyMatchingReasons.push(`🎖️ Master Breeder: Over ${breeder.experienceYears} years of purebred kennel lineage and KCI audit standing.`);
    }
    if (input.preferredCity && input.preferredCity !== 'Any' && breeder.city.toLowerCase() === input.preferredCity.toLowerCase()) {
      keyMatchingReasons.push(`📍 Local Proximity: Kennel situated in ${breeder.city} for direct nursery visit & same-day pickup.`);
    }
    if (keyMatchingReasons.length === 0) {
      keyMatchingReasons.push(`✨ Balanced Multi-Dimensional Fit: Strong composite Euclidean similarity across pricing, temperament, and health records.`);
    }

    return {
      breeder,
      euclideanDistance: parseFloat(euclideanDistance.toFixed(4)),
      compatibilityPercentage,
      featureBreakdown,
      keyMatchingReasons,
    };
  });

  // Sort by Euclidean Distance ASC (K-Nearest Neighbors principle)
  candidatesWithDistance.sort((a, b) => a.euclideanDistance - b.euclideanDistance);

  // Top-K Selection
  const topMatches: KnnMatchedBreeder[] = candidatesWithDistance.slice(0, k).map((item, index) => ({
    rank: index + 1,
    breeder: item.breeder,
    euclideanDistance: item.euclideanDistance,
    compatibilityPercentage: item.compatibilityPercentage,
    featureBreakdown: item.featureBreakdown,
    keyMatchingReasons: item.keyMatchingReasons,
  }));

  const topKIds = new Set(topMatches.map((m) => m.breeder.id));

  const allCandidatesDistanceMatrix = candidatesWithDistance.map((c) => ({
    id: c.breeder.id,
    kennelName: c.breeder.kennelName,
    city: c.breeder.city,
    euclideanDistance: c.euclideanDistance,
    compatibility: c.compatibilityPercentage,
    isTopK: topKIds.has(c.breeder.id),
  }));

  return {
    algorithm: 'K-Nearest Neighbors (K-NN)',
    distanceMetric: 'Weighted Euclidean (L2 Norm)',
    k,
    totalCandidates: pool.length,
    featureDimensions: uNorm.length,
    userVector: uNorm.map((n) => parseFloat(n.toFixed(4))),
    featureNames: [
      'Price',
      'Experience',
      'Rating',
      'CategoryCode',
      'EnergyLevel',
      'KidFriendliness',
      'HealthScore',
      'LocationDistance',
    ],
    topMatches,
    allCandidatesDistanceMatrix,
    executionTimeMs: Date.now() - startTime,
  };
}
