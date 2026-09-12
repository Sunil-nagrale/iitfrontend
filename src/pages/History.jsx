import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { History as HistoryIcon, Swords, Calendar, Sparkles, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HistoryItem } from '../components/history/HistoryItem';
import { Button } from '../components/common/Button';

export const History = () => {
  const navigate = useNavigate();
  const { history } = useApp();

  // Group history items by relative date: "Today", "Yesterday", or full date
  const groupedHistory = useMemo(() => {
    const groups = {};

    history.forEach((item) => {
      const date = new Date(item.timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let key = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
      if (date.toDateString() === today.toDateString()) {
        key = 'Today';
      } else if (date.toDateString() === yesterday.toDateString()) {
        key = 'Yesterday';
      }

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });

    return groups;
  }, [history]);

  const dateKeys = Object.keys(groupedHistory);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-black text-light-text flex items-center gap-2.5">
          <HistoryIcon className="w-6 h-6 sm:w-7 sm:h-7 text-teal-electric" />
          Activity History
        </h1>
        <p className="text-sm text-light-muted mt-1">
          Every step counts.
        </p>
      </div>

      {/* History Timeline */}
      {history.length === 0 ? (
        /* EMPTY STATE (As required: initially show this exact empty state) */
        <div className="p-12 sm:p-16 rounded-3xl bg-arena-card/60 border border-dashed border-arena-border text-center space-y-4 my-8">
          <div className="w-16 h-16 rounded-2xl bg-teal-electric/10 text-teal-electric border border-teal-electric/25 mx-auto flex items-center justify-center shadow-glow-teal/20">
            <HistoryIcon className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-display font-bold text-light-text">
              No activity yet.
            </h3>
            <p className="text-sm text-light-muted max-w-md mx-auto">
              Complete your first quest to begin your journey.
            </p>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              icon={Swords}
              onClick={() => navigate('/quests')}
              className="shadow-glow-teal"
            >
              Explore Quests
            </Button>
          </div>
        </div>
      ) : (
        /* Chronological list grouped by day */
        <div className="space-y-8">
          {dateKeys.map((dateKey) => (
            <div key={dateKey} className="space-y-3">
              {/* Date Header */}
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-teal-electric">
                <Calendar className="w-3.5 h-3.5" />
                <span>{dateKey}</span>
                <div className="flex-1 h-px bg-arena-border ml-2" />
              </div>

              {/* Items for this date */}
              <div className="space-y-2.5">
                {groupedHistory[dateKey].map((item) => (
                  <HistoryItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
