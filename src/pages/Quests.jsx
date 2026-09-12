import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Swords, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QuestCard } from '../components/quests/QuestCard';
import { QuestModal } from '../components/quests/QuestModal';
import { Button } from '../components/common/Button';

export const Quests = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const { 
    quests, 
    createQuest, 
    updateQuest, 
    deleteQuest, 
    completeQuest 
  } = useApp();

  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'active' | 'completed'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState(null);

  const categories = ["All", "Coding", "Fitness", "Reading", "Learning", "Health", "Mind", "Personal", "Other"];

  // Filtered Quests
  const filteredQuests = useMemo(() => {
    return quests.filter((q) => {
      // Status filter
      if (filterStatus === 'active' && q.status !== 'active') return false;
      if (filterStatus === 'completed' && q.status !== 'completed') return false;

      // Category filter
      if (selectedCategory !== 'All' && q.category !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = q.title?.toLowerCase().includes(query);
        const matchesDesc = q.description?.toLowerCase().includes(query);
        const matchesCat = q.category?.toLowerCase().includes(query);
        return matchesTitle || matchesDesc || matchesCat;
      }

      return true;
    });
  }, [quests, filterStatus, selectedCategory, searchQuery]);

  const activeCount = quests.filter(q => q.status === 'active').length;
  const completedCount = quests.filter(q => q.status === 'completed').length;

  const handleOpenCreateModal = () => {
    setEditingQuest(null);
    setIsModalOpen(true);
  };

  const handleEditQuest = (quest) => {
    setEditingQuest(quest);
    setIsModalOpen(true);
  };

  // const handleModalSubmit = (questData) => {
  //   if (editingQuest) {
  //     updateQuest(editingQuest.id, questData);
  //   } else {
  //     createQuest(questData);
  //   }
  //   setIsModalOpen(false);
  // };
  const handleModalSubmit = async (questData) => {
  try {
    if (editingQuest) {
      await updateQuest(editingQuest.id, questData);
    } else {
      await createQuest(questData);
    }

    setIsModalOpen(false);
  } catch (error) {
    console.error('Quest operation failed:', error);
  }
};

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-light-text flex items-center gap-2.5">
            <Swords className="w-6 h-6 sm:w-7 sm:h-7 text-teal-electric" />
            My Quests
          </h1>
          <p className="text-sm text-light-muted mt-1">
            Turn your real-life tasks into victories.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={handleOpenCreateModal}
          className="shadow-glow-teal self-start sm:self-auto"
        >
          + New Quest
        </Button>
      </div>

      {/* Controls Bar: Search, Status Tabs, Category Filter */}
      <div className="p-4 rounded-2xl bg-arena-card/80 border border-arena-border space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Status Tabs: All, Active, Completed */}
          <div className="inline-flex p-1 rounded-xl bg-arena-bg border border-arena-border self-start">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                filterStatus === 'all'
                  ? 'bg-teal-electric/20 text-teal-electric border border-teal-electric/30'
                  : 'text-light-muted hover:text-light-text'
              }`}
            >
              All ({quests.length})
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                filterStatus === 'active'
                  ? 'bg-teal-electric/20 text-teal-electric border border-teal-electric/30'
                  : 'text-light-muted hover:text-light-text'
              }`}
            >
              Active ({activeCount})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                filterStatus === 'completed'
                  ? 'bg-emerald-bright/20 text-emerald-bright border border-emerald-bright/30'
                  : 'text-light-muted hover:text-light-text'
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-light-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by quest name or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-input rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-light-text placeholder-light-subtle"
            />
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          <span className="text-[11px] font-mono text-light-subtle uppercase mr-1 shrink-0">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg font-mono font-medium shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-teal-electric text-arena-bg font-bold shadow-glow-teal/20'
                  : 'bg-arena-bg/80 text-light-muted hover:text-light-text border border-arena-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Quests Cards Grid or Empty State */}
      {filteredQuests.length === 0 ? (
        <div className="p-12 rounded-2xl bg-arena-card/60 border border-dashed border-arena-border text-center max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-electric/10 text-teal-electric border border-teal-electric/25 mx-auto flex items-center justify-center">
            <Swords className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-lg font-display font-bold text-light-text">
              {quests.length === 0 ? "No quests yet." : "No quests match your filters."}
            </h3>
            <p className="text-xs sm:text-sm text-light-muted mt-1">
              {quests.length === 0 
                ? "Create your first quest and start earning XP, coins, and attribute points."
                : "Try adjusting your search terms or category filters to see other quests."}
            </p>
          </div>

          {quests.length === 0 && (
            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={handleOpenCreateModal}
              className="shadow-glow-teal"
            >
              + Create New Quest
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQuests.map((quest) => (
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

      {/* Quest Modal for Create/Edit */}
      <QuestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingQuest}
      />
    </div>
  );
};
