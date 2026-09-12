import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { mockApi, INITIAL_USER_STATE } from '../services/mockApi';
import { SHOP_ITEMS } from '../data/initialItems';
import { INITIAL_ACHIEVEMENTS } from '../data/initialAchievements';
import { SAMPLE_QUESTS } from '../data/sampleQuests';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('life_arena_auth') === 'true';
  });

  // User state (starts at clean ZERO for new users)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('life_arena_user');
    return saved ? JSON.parse(saved) : INITIAL_USER_STATE;
  });

  // Quests state (starts at empty [] for new users)
  const [quests, setQuests] = useState(() => {
    const saved = localStorage.getItem('life_arena_quests');
    return saved ? JSON.parse(saved) : [];
  });

  // History state (starts at empty [] for new users)
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('life_arena_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Shop items
  const [shopItems] = useState(SHOP_ITEMS);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Sync user to storage
  useEffect(() => {
    localStorage.setItem('life_arena_user', JSON.stringify(user));
  }, [user]);

  // Sync quests to storage
  useEffect(() => {
    localStorage.setItem('life_arena_quests', JSON.stringify(quests));
  }, [quests]);

  // Sync history to storage
  useEffect(() => {
    localStorage.setItem('life_arena_history', JSON.stringify(history));
  }, [history]);

  // Sync auth to storage
  useEffect(() => {
    localStorage.setItem('life_arena_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  // Add toast helper
  const addToast = (message, type = 'info', title = null) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Trigger celebration particles
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#19D3AE', '#8BE28B', '#F4B942', '#FF7657']
      });
    } catch {
      // safe fallback if confetti is unsupported in test env
    }
  };

  // Auth actions
  const login = async (credentials) => {
    // If username is provided, update the profile name if it is currently the default
    if (credentials?.emailOrUsername && user.name === "Adventurer") {
      setUser(prev => ({
        ...prev,
        name: credentials.emailOrUsername.includes('@')
          ? credentials.emailOrUsername.split('@')[0]
          : credentials.emailOrUsername
      }));
    }
    setIsAuthenticated(true);
    addToast("Welcome back to the Arena, Adventurer!", "success", "Login Successful");
    return true;
  };

  const signup = async (userData) => {
    // Create new account starting at ZERO
    const newUser = {
      ...INITIAL_USER_STATE,
      name: userData.username || "Adventurer",
      email: userData.email || "adventurer@lifearena.io"
    };
    setUser(newUser);
    // Note: Do NOT set isAuthenticated to true here, as the prompt specifies
    // that signup should show a success message and then redirect to login!
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    addToast("Safely exited the Arena. Rest well, hero.", "info", "Logged Out");
  };

  // User Profile actions
  const updateUserProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
    addToast("Character profile updated successfully!", "success", "Profile Saved");
  };

  // Quest Actions
  const createQuest = (questData) => {
    const newQuest = {
      id: `quest-${Date.now()}`,
      title: questData.title.trim(),
      description: questData.description.trim(),
      category: questData.category || "Personal",
      difficulty: questData.difficulty || "Medium",
      estimatedTime: questData.estimatedTime || "30 min",
      rewards: {
        xp: Number(questData.rewards?.xp) || 30,
        coins: Number(questData.rewards?.coins) || 15,
        attribute: questData.rewards?.attribute || "Focus",
        attributeAmount: Number(questData.rewards?.attributeAmount) || 3
      },
      status: "active",
      createdAt: new Date().toISOString()
    };

    setQuests(prev => [newQuest, ...prev]);
    addToast(`Quest "${newQuest.title}" forged!`, "success", "Quest Created");
    return newQuest;
  };

  const updateQuest = (id, questData) => {
    setQuests(prev => prev.map(q => {
      if (q.id === id) {
        return {
          ...q,
          ...questData,
          updatedAt: new Date().toISOString()
        };
      }
      return q;
    }));
    addToast("Quest modifications saved.", "info", "Quest Updated");
  };

  const deleteQuest = (id) => {
    const questToDelete = quests.find(q => q.id === id);
    setQuests(prev => prev.filter(q => q.id !== id));
    addToast(`Quest "${questToDelete?.title || 'Quest'}" removed.`, "warning", "Quest Deleted");
  };

  const completeQuest = (id) => {
    const quest = quests.find(q => q.id === id);
    if (!quest || quest.status === "completed") return;

    // 1. Update quest status
    setQuests(prev => prev.map(q => {
      if (q.id === id) {
        return { ...q, status: "completed", completedAt: new Date().toISOString() };
      }
      return q;
    }));

    // 2. Compute XP, Coins, and Attribute gains
    const earnedXp = quest.rewards.xp || 20;
    const earnedCoins = quest.rewards.coins || 10;
    const attributeName = (quest.rewards.attribute || 'focus').toLowerCase();
    const attributeGain = quest.rewards.attributeAmount || 3;

    setUser(prev => {
      let newXp = prev.xp + earnedXp;
      let newLevel = prev.level;
      let newXpToNext = prev.xpToNextLevel;
      let leveledUp = false;

      // Level up logic (100 XP per base level threshold)
      while (newXp >= newXpToNext) {
        newXp -= newXpToNext;
        newLevel += 1;
        newXpToNext = Math.round(newXpToNext * 1.35); // escalating threshold
        leveledUp = true;
      }

      if (leveledUp) {
        setTimeout(() => {
          triggerCelebration();
          addToast(`You ascended to Level ${newLevel}! Attributes sharpened.`, "achievement", "LEVEL UP!");
        }, 300);
      }

      return {
        ...prev,
        level: newLevel,
        xp: newXp,
        xpToNextLevel: newXpToNext,
        totalXp: (prev.totalXp || 0) + earnedXp,
        coins: prev.coins + earnedCoins,
        streak: prev.streak === 0 ? 1 : prev.streak, // start streak on first completed quest
        attributes: {
          ...prev.attributes,
          [attributeName]: (prev.attributes[attributeName] || 0) + attributeGain
        }
      };
    });

    // 3. Log to History
    const historyEntry = {
      id: `act-${Date.now()}`,
      type: "quest_completed",
      questId: quest.id,
      title: quest.title,
      category: quest.category,
      xpEarned: earnedXp,
      coinsEarned: earnedCoins,
      attributeEarned: quest.rewards.attribute,
      attributeAmount: attributeGain,
      timestamp: new Date().toISOString()
    };
    setHistory(prev => [historyEntry, ...prev]);

    // Micro-celebration
    triggerCelebration();
    addToast(`+${earnedXp} XP, +${earnedCoins} Coins, +${attributeGain} ${quest.rewards.attribute}!`, "success", "Quest Conquered!");
  };

  // Shop Actions
  const buyItem = (item) => {
    // Check if already owned
    if (user.inventory?.includes(item.id)) {
      addToast(`You already own the ${item.name}!`, "info", "Already Owned");
      return false;
    }

    // Check balance
    if (user.coins < item.price) {
      const needed = item.price - user.coins;
      addToast(`Insufficient coins! Complete quests to earn ${needed} more coins.`, "error", "Purchase Failed");
      return false;
    }

    // Deduct coins & add to inventory
    setUser(prev => ({
      ...prev,
      coins: prev.coins - item.price,
      inventory: [...(prev.inventory || []), item.id],
      equippedTheme: item.category === "Themes" ? item.id : prev.equippedTheme,
      equippedBadge: item.category === "Badges" ? item.name : prev.equippedBadge
    }));

    // Log to History
    const historyEntry = {
      id: `act-${Date.now()}`,
      type: "shop_purchase",
      itemId: item.id,
      title: `Acquired: ${item.name}`,
      category: item.category,
      coinsSpent: item.price,
      timestamp: new Date().toISOString()
    };
    setHistory(prev => [historyEntry, ...prev]);

    triggerCelebration();
    addToast(`Acquired ${item.name}! Added to your character inventory.`, "achievement", "Relic Unlocked!");
    return true;
  };

  // Dynamic Achievements calculation
  const achievements = INITIAL_ACHIEVEMENTS.map(ach => {
    let currentVal = 0;
    const completedCount = quests.filter(q => q.status === "completed").length;
    
    switch (ach.progressKey) {
      case "completedQuestsCount":
        currentVal = completedCount;
        break;
      case "streak":
        currentVal = user.streak || 0;
        break;
      case "intelligence":
        currentVal = user.attributes.intelligence || 0;
        break;
      case "strength":
        currentVal = user.attributes.strength || 0;
        break;
      case "focus":
        currentVal = user.attributes.focus || 0;
        break;
      case "vitality":
        currentVal = user.attributes.vitality || 0;
        break;
      case "totalXp":
        currentVal = user.totalXp || 0;
        break;
      case "purchasedItemsCount":
        currentVal = user.inventory?.length || 0;
        break;
      default:
        currentVal = 0;
    }

    const isUnlocked = currentVal >= ach.target;
    return {
      ...ach,
      current: currentVal,
      isUnlocked,
      progressPercent: Math.min(100, Math.round((currentVal / ach.target) * 100))
    };
  });

  // Convenient helper to load sample demo quests for evaluators/hackathon judges
  const seedDemoQuests = () => {
    setQuests(SAMPLE_QUESTS);
    addToast("4 starter quests loaded into your quest log!", "success", "Demo Quests Loaded");
  };

  // Reset all data back to pristine zero
  const resetAllData = () => {
    setUser(INITIAL_USER_STATE);
    setQuests([]);
    setHistory([]);
    mockApi.clearAll();
    addToast("All data reset to zero. Fresh start initiated.", "warning", "Reset Complete");
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        signup,
        logout,
        user,
        updateUserProfile,
        quests,
        createQuest,
        updateQuest,
        deleteQuest,
        completeQuest,
        history,
        shopItems,
        buyItem,
        achievements,
        toasts,
        addToast,
        removeToast,
        seedDemoQuests,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
