
import React, { createContext, useContext, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  getProfile,
  updateProfile,
  getDashboard,
  getQuests,
  createQuest as apiCreateQuest,
  updateQuest as apiUpdateQuest,
  deleteQuest as apiDeleteQuest,
  completeQuest as apiCompleteQuest,
  getHistory,
  getShopItems,
  getInventory,
  buyItem as apiBuyItem,
  getAchievements,
unlockAchievement
} from '../services/api';
import { INITIAL_ACHIEVEMENTS } from '../data/initialAchievements';
import { SAMPLE_QUESTS } from '../data/sampleQuests';

const AppContext = createContext(null);

const emptyUser = {
  name: 'Adventurer',
  email: '',
  userId: '',
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
  inventory: []
};

const convertQuest = (quest) => ({
  ...quest,
  id: quest._id,
  rewards: {
    xp: quest.xpReward || 0,
    coins: quest.coinReward || 0,
    attribute: quest.attributeReward?.type || 'Focus',
    attributeAmount: quest.attributeReward?.amount || 0
  }
});

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('token')
  );

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');

    if (saved) {
      try {
        return {
          ...emptyUser,
          ...JSON.parse(saved)
        };
      } catch {
        return emptyUser;
      }
    }

    return emptyUser;
  });

  const [quests, setQuests] = useState([]);
  const [history, setHistory] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [backendAchievements, setBackendAchievements] = useState([]);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', title = null) => {
    const id = Date.now() + Math.random();

    setToasts(prev => [
      ...prev,
      {
        id,
        message,
        type,
        title
      }
    ]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#19D3AE', '#8BE28B', '#F4B942', '#FF7657']
      });
    } catch {}
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(true);
    loadAppData();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const checkAchievements = async (currentQuests, currentProfile) => {
  try {
    const completedCount = currentQuests.filter(
      quest => quest.status === 'completed'
    ).length;

    const achievementsToUnlock = [];

    if (completedCount >= 1) {
      achievementsToUnlock.push('first_quest');
    }

    if (completedCount >= 10) {
      achievementsToUnlock.push('quest_master');
    }

    if ((currentProfile?.level ?? 1) >= 5) {
      achievementsToUnlock.push('level_up');
    }

    if ((currentProfile?.coins ?? 0) >= 500) {
      achievementsToUnlock.push('rich_arena');
    }

    for (const achievementId of achievementsToUnlock) {
      const alreadyUnlocked = backendAchievements.some(
        item => item.achievementId === achievementId
      );

      if (!alreadyUnlocked) {
        try {
          await unlockAchievement(achievementId);
        } catch (error) {
          console.error(
            `Failed to unlock ${achievementId}:`,
            error
          );
        }
      }
    }

    const achievementsData = await getAchievements();

    setBackendAchievements(
      achievementsData?.unlocked || []
    );
  } catch (error) {
    console.error('Achievement check failed:', error);
  }
};

  const loadAppData = async () => {
    try {
      const [
        profileData,
        dashboardData,
        questsData,
        historyData,
        shopData,
        inventoryData,
        achievementsData
      ] = await Promise.all([
        getProfile(),
        getDashboard(),
        getQuests(),
        getHistory(),
        getShopItems(),
        getInventory(),
        getAchievements()
      ]);

      const profile = profileData;

      // setUser({
      //   ...emptyUser,
      //   ...JSON.parse(localStorage.getItem('user') || '{}'),
      //   userId: JSON.parse(localStorage.getItem('user') || '{}').userId || '',
      //   name: profile.name || 'Adventurer',
      //   level: profile.level || 1,
      //   xp: profile.xp || 0,
      //   coins: profile.coins || 0,
      //   attributes: {
      //     intelligence: profile.attributes?.intelligence || 0,
      //     strength: profile.attributes?.strength || 0,
      //     vitality: profile.attributes?.vitality || 0,
      //     focus: profile.attributes?.focus || 0
      //   }
      // });
      const savedUser = JSON.parse(
  localStorage.getItem('user') || '{}'
);

setUser({
  ...emptyUser,
  ...savedUser,
  userId: savedUser.userId || '',
  name: profile.name || savedUser.name || 'Adventurer',
  email: savedUser.email || '',
  level: profile.level || 1,
  xp: profile.xp || 0,
 xpToNextLevel: profile.xpToNextLevel || 100,
totalXp: profile.totalXp || 0,
streak: profile.streak || 0,
  
  attributes: {
    intelligence: profile.attributes?.intelligence || 0,
    strength: profile.attributes?.strength || 0,
    vitality: profile.attributes?.vitality || 0,
    focus: profile.attributes?.focus || 0
  }
});

      //setQuests((questsData || []).map(convertQuest));
     // const formattedQuests = (questsData || []).map(convertQuest);

// setQuests(formattedQuests);

// setShopItems(shopData || []);
// setInventory(inventoryData?.purchasedItems || []);
// setBackendAchievements(achievementsData?.unlocked || []);
const formattedQuests = (questsData || []).map(convertQuest);

setQuests(formattedQuests);

setShopItems(shopData || []);
setInventory(inventoryData?.purchasedItems || []);

const unlockedAchievements = achievementsData?.unlocked || [];

setBackendAchievements(unlockedAchievements);

await checkAchievements(
  formattedQuests,
  profile
);
      //setHistory(historyData || []);
      setHistory(
  (historyData || []).map(item => ({
    ...item,
    id: item._id,
    timestamp: item.createdAt
  }))
);
      setShopItems(shopData || []);
      setInventory(inventoryData?.purchasedItems || []);
      setBackendAchievements(achievementsData?.unlocked || []);
    } catch (error) {
      console.error('Failed to load application data:', error);

      if (
        error.message?.includes('token') ||
        error.message?.includes('expired') ||
        error.message?.includes('Invalid')
      ) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
      }
    }
  };

  const login = async () => {
    setIsAuthenticated(true);
    await loadAppData();

    addToast(
      'Welcome back to the Arena, Adventurer!',
      'success',
      'Login Successful'
    );

    return true;
  };

  const signup = async () => {
    return true;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setIsAuthenticated(false);
    setUser(emptyUser);
    setQuests([]);
    setHistory([]);
    setInventory([]);

    addToast(
      'Safely exited the Arena. Rest well, hero.',
      'info',
      'Logged Out'
    );
  };

  const updateUserProfile = async (updates) => {
    try {
      const updatedProfile = await updateProfile({
        name: updates.name
      });

      setUser(prev => ({
        ...prev,
        name: updatedProfile.name
      }));

      addToast(
        'Character profile updated successfully!',
        'success',
        'Profile Saved'
      );

      return updatedProfile;
    } catch (error) {
      addToast(
        error.message || 'Failed to update profile',
        'error',
        'Profile Update Failed'
      );

      throw error;
    }
  };

  const createQuest = async (questData) => {
    try {
      const createdQuest = await apiCreateQuest({
        title: questData.title.trim(),
        description: questData.description?.trim() || '',
        category: questData.category || 'Personal',
        difficulty: questData.difficulty || 'Medium',
        estimatedTime: questData.estimatedTime || '30 min',
        xpReward: Number(questData.rewards?.xp) || 30,
        coinReward: Number(questData.rewards?.coins) || 15,
        attributeReward: {
          type: questData.rewards?.attribute || 'Focus',
          amount: Number(questData.rewards?.attributeAmount) || 3
        }
      });

      const formattedQuest = convertQuest(createdQuest);

      setQuests(prev => [formattedQuest, ...prev]);

      addToast(
        `Quest "${formattedQuest.title}" forged!`,
        'success',
        'Quest Created'
      );

      return formattedQuest;
    } catch (error) {
      addToast(
        error.message || 'Failed to create quest',
        'error',
        'Quest Creation Failed'
      );

      throw error;
    }
  };

  const updateQuest = async (id, questData) => {
    try {
      const updatedQuest = await apiUpdateQuest(id, {
        title: questData.title,
        description: questData.description,
        category: questData.category,
        difficulty: questData.difficulty,
        estimatedTime: questData.estimatedTime,
        xpReward: Number(questData.rewards?.xp) || 0,
        coinReward: Number(questData.rewards?.coins) || 0,
        attributeReward: {
          type: questData.rewards?.attribute || 'Focus',
          amount: Number(questData.rewards?.attributeAmount) || 0
        }
      });

      const formattedQuest = convertQuest(updatedQuest);

      setQuests(prev =>
        prev.map(quest =>
          quest.id === id ? formattedQuest : quest
        )
      );

      addToast(
        'Quest modifications saved.',
        'info',
        'Quest Updated'
      );

      return formattedQuest;
    } catch (error) {
      addToast(
        error.message || 'Failed to update quest',
        'error',
        'Quest Update Failed'
      );

      throw error;
    }
  };

  const deleteQuest = async (id) => {
    try {
      const questToDelete = quests.find(quest => quest.id === id);

      await apiDeleteQuest(id);

      setQuests(prev =>
        prev.filter(quest => quest.id !== id)
      );

      addToast(
        `Quest "${questToDelete?.title || 'Quest'}" removed.`,
        'warning',
        'Quest Deleted'
      );
    } catch (error) {
      addToast(
        error.message || 'Failed to delete quest',
        'error',
        'Quest Delete Failed'
      );

      throw error;
    }
  };

  const completeQuest = async (id) => {
    const quest = quests.find(item => item.id === id);

    if (!quest || quest.status === 'completed') {
      return;
    }

    try {
      const result = await apiCompleteQuest(id);

      const updatedQuest = convertQuest(result.quest);

      setQuests(prev =>
        prev.map(item =>
          item.id === id ? updatedQuest : item
        )
      );

      // if (result.profile) {
      //   setUser(prev => ({
      //     ...prev,
      //     level: result.profile.level || prev.level,
      //     xp: result.profile.xp || 0,
      //     coins: result.profile.coins || 0,
      //     attributes: {
      //       intelligence:
      //         result.profile.attributes?.intelligence || 0,
      //       strength:
      //         result.profile.attributes?.strength || 0,
      //       vitality:
      //         result.profile.attributes?.vitality || 0,
      //       focus:
      //         result.profile.attributes?.focus || 0
      //     }
      //   }));
      // }
      if (result.profile) {
  setUser(prev => ({
    ...prev,
    level: result.profile.level ?? 1,
    xp: result.profile.xp ?? 0,
    xpToNextLevel: result.profile.xpToNextLevel ?? 100,
    totalXp: result.profile.totalXp ?? 0,
    coins: result.profile.coins ?? 0,
    streak: result.profile.streak ?? 0,
    attributes: {
      intelligence:
        result.profile.attributes?.intelligence ?? 0,
      strength:
        result.profile.attributes?.strength ?? 0,
      vitality:
        result.profile.attributes?.vitality ?? 0,
      focus:
        result.profile.attributes?.focus ?? 0
    }
  }));
}
// Check and unlock achievements
try {
  const completedQuestsCount =
    quests.filter(item => item.status === 'completed').length + 1;

  const achievementsToUnlock = [];

  if (completedQuestsCount >= 1) {
    achievementsToUnlock.push('first_quest');
  }

  if (completedQuestsCount >= 10) {
    achievementsToUnlock.push('quest_master');
  }

  if ((result.profile?.level ?? 1) >= 5) {
    achievementsToUnlock.push('level_up');
  }

  if ((result.profile?.coins ?? 0) >= 500) {
    achievementsToUnlock.push('rich_arena');
  }

  for (const achievementId of achievementsToUnlock) {
    if (
      !backendAchievements.some(
        item => item.achievementId === achievementId
      )
    ) {
      try {
        await unlockAchievement(achievementId);
      } catch (error) {
        // Ignore already-unlocked achievements
      }
    }
  }

  const achievementsData = await getAchievements();

  setBackendAchievements(
    achievementsData?.unlocked || []
  );
} catch (error) {
  console.error(
    'Achievement check failed:',
    error
  );
}
      

      const newHistory = await getHistory();

setHistory(
  (newHistory || []).map(item => ({
    ...item,
    id: item._id,
    timestamp: item.createdAt
  }))
);

      triggerCelebration();

      addToast(
        `+${quest.rewards.xp} XP, +${quest.rewards.coins} Coins, +${quest.rewards.attributeAmount} ${quest.rewards.attribute}!`,
        'success',
        'Quest Conquered!'
      );

      return result;
    } catch (error) {
      addToast(
        error.message || 'Failed to complete quest',
        'error',
        'Quest Completion Failed'
      );

      throw error;
    }
  };

  const buyItem = async (item) => {
    try {
      const itemId = item.itemId || item.id;

      const result = await apiBuyItem(itemId);

      setUser(prev => ({
        ...prev,
        coins: result.coins
      }));

      setInventory(result.inventory?.purchasedItems || []);

      const newHistory = await getHistory();
      setHistory(newHistory || []);

      triggerCelebration();

      addToast(
        `Acquired ${item.name}! Added to your character inventory.`,
        'achievement',
        'Relic Unlocked!'
      );

      return true;
    } catch (error) {
      addToast(
        error.message || 'Purchase failed',
        'error',
        'Purchase Failed'
      );

      return false;
    }
  };

  const achievements = INITIAL_ACHIEVEMENTS.map(achievement => {
    const backendAchievement = backendAchievements.find(
      item => item.achievementId === achievement.id
    );

    return {
      ...achievement,
      isUnlocked: !!backendAchievement,
      current: backendAchievement ? achievement.target : 0,
      progressPercent: backendAchievement ? 100 : 0
    };
  });

  const seedDemoQuests = async () => {
    try {
      for (const quest of SAMPLE_QUESTS) {
        await apiCreateQuest({
          title: quest.title,
          description: quest.description || '',
          category: quest.category || 'Personal',
          difficulty: quest.difficulty || 'Medium',
          estimatedTime: quest.estimatedTime || '30 min',
          xpReward: Number(quest.rewards?.xp) || 30,
          coinReward: Number(quest.rewards?.coins) || 15,
          attributeReward: {
            type: quest.rewards?.attribute || 'Focus',
            amount: Number(quest.rewards?.attributeAmount) || 3
          }
        });
      }

      const questsData = await getQuests();
      setQuests((questsData || []).map(convertQuest));

      addToast(
        'Starter quests loaded into your quest log!',
        'success',
        'Demo Quests Loaded'
      );
    } catch (error) {
      addToast(
        error.message || 'Failed to load demo quests',
        'error',
        'Demo Quest Failed'
      );
    }
  };

  const resetAllData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(emptyUser);
    setQuests([]);
    setHistory([]);
    setInventory([]);
    setIsAuthenticated(false);

    addToast(
      'All local session data reset.',
      'warning',
      'Reset Complete'
    );
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
        inventory,
        buyItem,
        achievements,
        toasts,
        addToast,
        removeToast,
        seedDemoQuests,
        resetAllData,
        loadAppData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
};