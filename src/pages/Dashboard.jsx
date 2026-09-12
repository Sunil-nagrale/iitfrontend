import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Swords, 
  Sparkles, 
  ArrowRight, 
  Target, 
  CheckCircle2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { StatCard } from '../components/dashboard/StatCard';
import { AttributeCard } from '../components/dashboard/AttributeCard';
import { QuestCard } from '../components/quests/QuestCard';
import { QuestModal } from '../components/quests/QuestModal';
import { Button } from '../components/common/Button';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    user, 
    quests, 
    createQuest, 
    updateQuest, 
    deleteQuest, 
    completeQuest 
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState(null);

  // Active today's quests (filter by active)
  const activeQuests = quests.filter(q => q.status === 'active');
  const completedCount = quests.filter(q => q.status === 'completed').length;

  const handleOpenCreateModal = () => {
    setEditingQuest(null);
    setIsModalOpen(true);
  };

  const handleEditQuest = (quest) => {
    setEditingQuest(quest);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (questData) => {
    if (editingQuest) {
      updateQuest(editingQuest.id, questData);
    } else {
      createQuest(questData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Welcome Card Banner */}
      <WelcomeBanner onCreateQuest={handleOpenCreateModal} />

      {/* 2. Primary Stat Cards Grid (Starts strictly at zero for fresh users) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-bold text-light-text flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-electric" />
            Arena Statistics
          </h2>
          <span className="text-xs font-mono text-light-muted">
            {completedCount} {completedCount === 1 ? 'Quest' : 'Quests'} Conquered
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Character Level"
            value={`LVL ${user.level}`}
            subtitle={`${user.xp} / ${user.xpToNextLevel} XP to Next Tier`}
            iconType="level"
            accentColor="teal"
            badgeText="Rank I"
          />

          <StatCard
            title="Arena XP"
            value={user.xp}
            subtitle={`Total: ${user.totalXp || 0} Lifetime XP`}
            iconType="xp"
            accentColor="emerald"
          />

          <StatCard
            title="Coin Wealth"
            value={user.coins}
            subtitle="Ready to spend in Shop"
            iconType="coins"
            accentColor="gold"
          />

          <StatCard
            title="Daily Streak"
            value={`${user.streak} ${user.streak === 1 ? 'Day' : 'Days'}`}
            subtitle={user.streak > 0 ? "Momentum multiplier active" : "Complete a quest to start"}
            iconType="streak"
            accentColor="coral"
            badgeText={user.streak >= 7 ? "Unstoppable" : null}
          />
        </div>
      </div>

      {/* 3. Core Attributes (Initially 0) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-display font-bold text-light-text flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-bright" />
              RPG Attributes
            </h2>
            <p className="text-xs text-light-muted mt-0.5">
              Reinforced each time you conquer relevant real-life tasks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AttributeCard
            attribute="intelligence"
            value={user.attributes?.intelligence || 0}
            description="Coding, reading, technical mastery"
          />

          <AttributeCard
            attribute="strength"
            value={user.attributes?.strength || 0}
            description="Lifting, running, physical stamina"
          />

          <AttributeCard
            attribute="vitality"
            value={user.attributes?.vitality || 0}
            description="Sleep, nutrition, daily recovery"
          />

          <AttributeCard
            attribute="focus"
            value={user.attributes?.focus || 0}
            description="Meditation, deep work, stillness"
          />
        </div>
      </div>

      {/* 4. Today's Quests Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-display font-bold text-light-text flex items-center gap-2">
              <Swords className="w-4 h-4 text-teal-electric" />
              Today's Quests
            </h2>
            <p className="text-xs text-light-muted mt-0.5">
              Active battles awaiting your real-life execution.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {activeQuests.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/quests')}
                className="text-xs font-semibold text-teal-electric hover:underline hidden sm:inline-flex"
              >
                View All Quests →
              </Button>
            )}

            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={handleOpenCreateModal}
              className="shadow-glow-teal"
            >
              + Create New Quest
            </Button>
          </div>
        </div>

        {/* Quests List or Empty State */}
        {activeQuests.length === 0 ? (
          /* EMPTY STATE (As required: initially show empty state) */
          <div className="rounded-2xl bg-arena-card/60 border border-dashed border-arena-border p-8 sm:p-12 text-center max-w-2xl mx-auto my-4 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-electric/10 text-teal-electric border border-teal-electric/25 mx-auto flex items-center justify-center shadow-glow-teal/15">
              <Swords className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-display font-bold text-light-text">
                No quests yet.
              </h3>
              <p className="text-sm text-light-muted max-w-md mx-auto">
                Create your first quest and start earning XP, coins, and leveling up your attributes.
              </p>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                icon={Plus}
                onClick={handleOpenCreateModal}
                className="shadow-glow-teal"
              >
                + Create New Quest
              </Button>
            </div>
          </div>
        ) : (
          /* Active Quests Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeQuests.slice(0, 4).map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onComplete={completeQuest}
                onEdit={handleEditQuest}
                onDelete={deleteQuest}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quest Modal */}
      <QuestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingQuest}
      />
    </div>
  );
};
