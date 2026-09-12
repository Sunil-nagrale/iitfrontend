export const SAMPLE_QUESTS = [
  {
    id: "quest-1",
    title: "Solve 3 DSA Problems",
    description: "Tackle 3 dynamic programming and tree algorithms on LeetCode without peeking at solutions.",
    category: "Coding",
    difficulty: "Medium",
    estimatedTime: "45 min",
    rewards: {
      xp: 50,
      coins: 20,
      attribute: "Intelligence",
      attributeAmount: 5
    },
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: "quest-2",
    title: "Workout for 45 Minutes",
    description: "Complete intense strength conditioning: squats, pull-ups, push-ups, and core circuits.",
    category: "Fitness",
    difficulty: "Hard",
    estimatedTime: "45 min",
    rewards: {
      xp: 40,
      coins: 20,
      attribute: "Strength",
      attributeAmount: 5
    },
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: "quest-3",
    title: "Read 20 Pages",
    description: "Absorb 20 dense pages of architectural design patterns or deep non-fiction literature.",
    category: "Reading",
    difficulty: "Easy",
    estimatedTime: "30 min",
    rewards: {
      xp: 30,
      coins: 10,
      attribute: "Intelligence",
      attributeAmount: 3
    },
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: "quest-4",
    title: "Meditate for 10 Minutes",
    description: "Quiet the arena mind, practice box-breathing, and center attention for unbreakable focus.",
    category: "Mind",
    difficulty: "Easy",
    estimatedTime: "10 min",
    rewards: {
      xp: 20,
      coins: 10,
      attribute: "Focus",
      attributeAmount: 5
    },
    status: "active",
    createdAt: new Date().toISOString()
  }
];
