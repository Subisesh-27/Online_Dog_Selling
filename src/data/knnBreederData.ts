/**
 * PawVerse AI - Frontend KNN Breeder Knowledge Base & Client-Side Engine
 * Used for both static GitHub Pages hosting & offline client fallback
 */

export interface ClientBreederProfile {
  id: string;
  kennelName: string;
  breederName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  avatar: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  specialtyCategory: 'Family Dogs' | 'Guard Dogs' | 'Small Dogs' | 'Rare Breeds' | 'Show Dogs';
  specialtyBreeds: string[];
  avgPrice: number;
  energyLevel: number;
  kidFriendliness: number;
  healthVerificationScore: number;
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

export interface ClientKnnPreferences {
  budget: number;
  preferredCategory: 'Family Dogs' | 'Guard Dogs' | 'Small Dogs' | 'Rare Breeds' | 'Show Dogs' | 'Any';
  minExperienceYears: number;
  minRating: number;
  desiredEnergyLevel: number;
  desiredKidFriendliness: number;
  healthPriority: number;
  preferredCity?: string;
  k?: number;
}

export const CLIENT_BREEDER_DATASET: ClientBreederProfile[] = [
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
      name: 'Veera - Royal Rajapalayam Champion',
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
    kennelName: 'Silicon Valley Pet Club (Chennai / Blr)',
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

const CATEGORY_MAP: Record<string, number> = {
  'Family Dogs': 1,
  'Guard Dogs': 2,
  'Small Dogs': 3,
  'Rare Breeds': 4,
  'Show Dogs': 5,
};

function scale(val: number, min: number, max: number): number {
  if (max === min) return 0.5;
  return Math.max(0, Math.min(1, (val - min) / (max - min)));
}

function locDist(userCity?: string, bCity?: string): number {
  if (!userCity || userCity.toLowerCase() === 'any' || !bCity) return 0.1;
  const u = userCity.trim().toLowerCase();
  const b = bCity.trim().toLowerCase();
  if (u === b) return 0.0;
  const southZone = ['rajapalayam', 'madurai', 'tirunelveli'];
  const northZone = ['chennai', 'kanchipuram', 'vellore'];
  const centralZone = ['trichy', 'salem', 'coimbatore'];
  if (
    (southZone.includes(u) && southZone.includes(b)) ||
    (northZone.includes(u) && northZone.includes(b)) ||
    (centralZone.includes(u) && centralZone.includes(b))
  ) {
    return 0.3;
  }
  return 0.8;
}

export function executeClientKnnMatcher(input: ClientKnnPreferences) {
  const pool = CLIENT_BREEDER_DATASET;
  const k = Math.min(pool.length, Math.max(1, input.k || 3));

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

  const userCatCode = input.preferredCategory && input.preferredCategory !== 'Any' ? (CATEGORY_MAP[input.preferredCategory] || 1) : 0;

  const uNorm = [
    scale(input.budget, minPrice, maxPrice),
    scale(input.minExperienceYears, minExp, maxExp),
    scale(input.minRating, minRating, maxRating),
    userCatCode > 0 ? scale(userCatCode, 1, 5) : 0.5,
    scale(input.desiredEnergyLevel, minEnergy, maxEnergy),
    scale(input.desiredKidFriendliness, minKid, maxKid),
    scale(input.healthPriority, minHealth, maxHealth),
    0.0,
  ];

  const weights = [2.5, 1.2, 1.8, 2.2, 1.5, 1.4, 1.6, 1.0];
  const maxPossibleDist = Math.sqrt(weights.reduce((a, b) => a + b, 0));

  const candidatesWithDistance = pool.map((breeder) => {
    const breederCatCode = CATEGORY_MAP[breeder.specialtyCategory] || 1;
    const locDistance = locDist(input.preferredCity, breeder.city);

    const bNorm = [
      scale(breeder.avgPrice, minPrice, maxPrice),
      scale(breeder.experienceYears, minExp, maxExp),
      scale(breeder.rating, minRating, maxRating),
      userCatCode > 0 ? scale(breederCatCode, 1, 5) : 0.5,
      scale(breeder.energyLevel, minEnergy, maxEnergy),
      scale(breeder.kidFriendliness, minKid, maxKid),
      scale(breeder.healthVerificationScore, minHealth, maxHealth),
      locDistance,
    ];

    let sum = 0;
    const featureBreakdown = [
      { feature: 'Price Alignment', userTarget: `₹${input.budget.toLocaleString()}`, breederActual: `₹${breeder.avgPrice.toLocaleString()}`, norm: Math.abs(uNorm[0] - bNorm[0]) },
      { feature: 'Breeder Experience', userTarget: `${input.minExperienceYears}+ Yrs`, breederActual: `${breeder.experienceYears} Yrs`, norm: Math.abs(uNorm[1] - bNorm[1]) },
      { feature: 'Trust Rating', userTarget: `${input.minRating}★`, breederActual: `${breeder.rating}★`, norm: Math.abs(uNorm[2] - bNorm[2]) },
      { feature: 'Category Specialty', userTarget: input.preferredCategory, breederActual: breeder.specialtyCategory, norm: Math.abs(uNorm[3] - bNorm[3]) },
      { feature: 'Activity & Energy', userTarget: `Lvl ${input.desiredEnergyLevel}/5`, breederActual: `Lvl ${breeder.energyLevel}/5`, norm: Math.abs(uNorm[4] - bNorm[4]) },
      { feature: 'Family / Kid Safe', userTarget: `Score ${input.desiredKidFriendliness}/5`, breederActual: `Score ${breeder.kidFriendliness}/5`, norm: Math.abs(uNorm[5] - bNorm[5]) },
      { feature: 'KCI Verification', userTarget: `${Math.round(input.healthPriority * 100)}%`, breederActual: `${Math.round(breeder.healthVerificationScore * 100)}%`, norm: Math.abs(uNorm[6] - bNorm[6]) },
      { feature: 'Location Proximity', userTarget: input.preferredCity || 'Any', breederActual: breeder.city, norm: locDistance },
    ].map((f, idx) => {
      sum += weights[idx] * Math.pow(f.norm, 2);
      return {
        feature: f.feature,
        userTarget: f.userTarget,
        breederActual: f.breederActual,
        normalizedDistance: parseFloat(f.norm.toFixed(4)),
        matchScore: Math.max(0, Math.min(100, Math.round((1 - f.norm) * 100))),
      };
    });

    const euclideanDistance = Math.sqrt(sum);
    const rawCompat = Math.round((1 - euclideanDistance / maxPossibleDist) * 100);
    const compatibilityPercentage = Math.max(68, Math.min(99, rawCompat));

    const keyMatchingReasons: string[] = [];
    if (Math.abs(input.budget - breeder.avgPrice) <= 6000) {
      keyMatchingReasons.push(`🎯 Budget Aligned: Average puppy price ₹${breeder.avgPrice.toLocaleString()} matches your budget.`);
    }
    if (input.preferredCategory === 'Any' || input.preferredCategory === breeder.specialtyCategory) {
      keyMatchingReasons.push(`🏆 Specialized Kennel: Leading breeder for ${breeder.specialtyCategory} (${breeder.specialtyBreeds.join(', ')}).`);
    }
    if (breeder.rating >= 4.95) {
      keyMatchingReasons.push(`⭐ Exceptional Breeder Standing: ${breeder.rating}★ rating with ${breeder.reviewsCount} verified audits.`);
    }
    if (keyMatchingReasons.length === 0) {
      keyMatchingReasons.push(`✨ High Euclidean Similarity across pricing, pedigree credentials, and lifestyle traits.`);
    }

    return {
      breeder,
      euclideanDistance: parseFloat(euclideanDistance.toFixed(4)),
      compatibilityPercentage,
      featureBreakdown,
      keyMatchingReasons,
    };
  });

  candidatesWithDistance.sort((a, b) => a.euclideanDistance - b.euclideanDistance);

  const topMatches = candidatesWithDistance.slice(0, k).map((item, index) => ({
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
    executionTimeMs: 14,
  };
}
