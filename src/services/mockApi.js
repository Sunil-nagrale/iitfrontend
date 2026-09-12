/**
 * Life Arena API Client Layer (Mock Implementation)
 * 
 * To integrate with a real backend later, replace the simulated localStorage
 * methods with actual HTTP requests (e.g. using fetch or axios):
 * 
 *   const res = await fetch('/api/quests');
 *   return res.json();
 */

const STORAGE_KEYS = {
  USER: 'life_arena_user',
  QUESTS: 'life_arena_quests',
  HISTORY: 'life_arena_history',
  SHOP_INVENTORY: 'life_arena_inventory',
  ACHIEVEMENTS: 'life_arena_achievements'
};

// Initial empty user state starting strictly at ZERO
export const INITIAL_USER_STATE = {
  id: "user-1",
  name: "Adventurer",
  title: "Novice Challenger",
  email: "adventurer@lifearena.io",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  totalXp: 0,
  coins: 0,
  streak: 0,
  attributes: {
    intelligence: 0,
    strength: 0,
    vitality: 0,
    focus: 0
  },
  equippedTheme: "default",
  equippedAvatar: "default",
  equippedBadge: null,
  inventory: []
};

// Simulates minor network latency for realistic feeling micro-loaders
const delay = (ms = 80) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // ===================== USER & PROFILE =====================
  // Future: GET /api/profile
  async getProfile() {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : INITIAL_USER_STATE;
  },

  // Future: PUT /api/profile
  async updateProfile(profileData) {
    await delay();
    const current = await this.getProfile();
    const updated = { ...current, ...profileData };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
    return updated;
  },

  // ===================== QUESTS =====================
  // Future: GET /api/quests
  async getQuests() {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEYS.QUESTS);
    return stored ? JSON.parse(stored) : [];
  },

  // Future: POST /api/quests
  async createQuest(questData) {
    await delay();
    const quests = await this.getQuests();
    const newQuest = {
      id: `quest-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "active",
      ...questData
    };
    const updated = [newQuest, ...quests];
    localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(updated));
    return newQuest;
  },

  // Future: PUT /api/quests/:id
  async updateQuest(id, questData) {
    await delay();
    const quests = await this.getQuests();
    const index = quests.findIndex(q => q.id === id);
    if (index === -1) throw new Error("Quest not found");
    
    quests[index] = { ...quests[index], ...questData, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(quests));
    return quests[index];
  },

  // Future: DELETE /api/quests/:id
  async deleteQuest(id) {
    await delay();
    const quests = await this.getQuests();
    const filtered = quests.filter(q => q.id !== id);
    localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(filtered));
    return { success: true, id };
  },

  // Future: POST /api/quests/:id/complete
  async completeQuest(id) {
    await delay();
    const quests = await this.getQuests();
    const index = quests.findIndex(q => q.id === id);
    if (index === -1) throw new Error("Quest not found");
    
    const quest = quests[index];
    if (quest.status === "completed") return quest;

    quest.status = "completed";
    quest.completedAt = new Date().toISOString();
    quests[index] = quest;
    localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(quests));
    return quest;
  },

  // ===================== HISTORY =====================
  // Future: GET /api/history
  async getHistory() {
    await delay();
    const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return stored ? JSON.parse(stored) : [];
  },

  // Future: POST /api/history
  async logActivity(activity) {
    await delay();
    const history = await this.getHistory();
    const entry = {
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      ...activity
    };
    const updated = [entry, ...history];
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    return entry;
  },

  // ===================== STORAGE RESET / SEED =====================
  clearAll() {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.QUESTS);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.SHOP_INVENTORY);
  }
};
