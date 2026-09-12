const API_URL = "https://iitfrontend-1.onrender.com/api";

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`
      }),
      ...options.headers
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const signupUser = async (userData) => {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData)
  });
};

export const loginUser = async (userData) => {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(userData)
  });
};

export const getProfile = async () => {
  return request("/profile");
};

export const updateProfile = async (data) => {
  return request("/profile", {
    method: "PUT",
    body: JSON.stringify(data)
  });
};

export const getDashboard = async () => {
  return request("/dashboard");
};

export const getQuests = async () => {
  return request("/quests");
};

export const createQuest = async (data) => {
  return request("/quests", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

export const updateQuest = async (id, data) => {
  return request(`/quests/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
};

export const deleteQuest = async (id) => {
  return request(`/quests/${id}`, {
    method: "DELETE"
  });
};

export const completeQuest = async (id) => {
  return request(`/quests/${id}/complete`, {
    method: "PUT"
  });
};

export const getHistory = async () => {
  return request("/history");
};

export const getShopItems = async () => {
  return request("/inventory/shop");
};

export const getInventory = async () => {
  return request("/inventory");
};

export const buyItem = async (itemId) => {
  return request(`/inventory/buy/${itemId}`, {
    method: "POST"
  });
};

export const getAchievements = async () => {
  return request("/achievements");
};

export const unlockAchievement = async (achievementId) => {
  return request("/achievements/unlock", {
    method: "POST",
    body: JSON.stringify({ achievementId })
  });
};