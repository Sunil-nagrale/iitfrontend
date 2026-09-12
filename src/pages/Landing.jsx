import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Swords, 
  Shield, 
  Zap, 
  Coins, 
  Flame, 
  Brain, 
  Dumbbell, 
  HeartPulse, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShoppingBag, 
  History as HistoryIcon,
  Compass,
  Trophy
} from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { Button } from '../components/common/Button';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-arena-bg text-light-text selection:bg-teal-electric selection:text-arena-bg relative overflow-x-hidden">
      {/* Background Ambience Elements */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />
      <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-teal-electric/15 to-emerald-deep/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-gold-amber/5 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-arena-bg/85 border-b border-arena-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo size="md" to="/" />

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-light-muted">
            <a href="#hero" className="hover:text-teal-electric transition-colors">Home</a>
            <a href="#how-it-works" className="hover:text-teal-electric transition-colors">How It Works</a>
            <a href="#features" className="hover:text-teal-electric transition-colors">Features</a>
            <a href="#attributes" className="hover:text-teal-electric transition-colors">Attributes</a>
            <a href="#shop-preview" className="hover:text-teal-electric transition-colors">Shop</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/login')}
              className="text-light-text hover:text-teal-electric"
            >
              Log In
            </Button>

            {/* "Get Started" -> Sign Up page */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/signup')}
              className="shadow-glow-teal"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section id="hero" className="relative z-10 pt-16 pb-24 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-electric/10 border border-teal-electric/30 text-teal-electric text-xs font-mono font-semibold uppercase tracking-wider mb-8 animate-fade-in shadow-glow-teal/20">
          <Sparkles className="w-4 h-4" />
          <span>The Futuristic Productivity RPG</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-light-text max-w-5xl mx-auto leading-[1.1] mb-6">
          Turn Your Real Life Into Your{' '}
          <span className="text-gradient-teal drop-shadow-sm">Arena.</span>
        </h1>

        {/* Supporting Text */}
        <p className="text-base sm:text-xl text-light-muted max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
          Complete quests. Build habits. Earn XP. Level up your real life. Transform routine tasks into epic victories and forge your ideal character.
        </p>

        {/* CTAs */}
        {/* IMPORTANT REQUIREMENT:
            "Get Started" -> SIGN UP page
            "Start Your Journey" -> LOGIN page
            Do not make both buttons go to the same page. */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            variant="primary"
            size="lg"
            icon={Swords}
            iconPosition="left"
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto shadow-glow-teal-lg text-base"
          >
            Start Your Journey
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/signup')}
            className="w-full sm:w-auto text-base"
          >
            Get Started
          </Button>
        </div>

        {/* Hero Interactive HUD Preview Mockup */}
        <div className="relative max-w-5xl mx-auto rounded-3xl bg-arena-card/90 border border-teal-electric/30 p-4 sm:p-6 shadow-2xl shadow-black/80 backdrop-blur-2xl">
          {/* Mock Top bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-arena-border text-left">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-coral-warm/80" />
              <div className="w-3 h-3 rounded-full bg-gold-amber/80" />
              <div className="w-3 h-3 rounded-full bg-teal-electric/80" />
              <span className="text-xs font-mono text-light-subtle ml-2 hidden sm:inline">arena-dashboard.lifearena.io</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-teal-electric font-bold">LVL 12 VANGUARD</span>
              <span className="text-gold-amber font-bold">1,420 COINS</span>
            </div>
          </div>

          {/* Quick Mock Dashboard Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-xl bg-arena-surface border border-arena-border">
              <span className="text-[11px] font-mono text-teal-electric uppercase font-bold">Active Quest</span>
              <h4 className="text-sm font-bold text-light-text mt-1">Solve 3 Graph Algorithms</h4>
              <p className="text-xs text-light-muted mt-1">+60 XP · +25 Coins · +5 Intelligence</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-bright">In Progress</span>
                <span className="text-xs font-mono font-bold text-light-text">45 min</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-arena-surface border border-arena-border">
              <span className="text-[11px] font-mono text-coral-warm uppercase font-bold">Physical Quest</span>
              <h4 className="text-sm font-bold text-light-text mt-1">5km Sunrise Run</h4>
              <p className="text-xs text-light-muted mt-1">+50 XP · +20 Coins · +6 Strength</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] font-mono text-coral-warm">Morning Ritual</span>
                <span className="text-xs font-mono font-bold text-light-text">30 min</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-arena-surface border border-arena-border">
              <span className="text-[11px] font-mono text-gold-amber uppercase font-bold">Mental Training</span>
              <h4 className="text-sm font-bold text-light-text mt-1">15 Min Mindfulness Flow</h4>
              <p className="text-xs text-light-muted mt-1">+35 XP · +15 Coins · +4 Focus</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gold-amber">Daily Habit</span>
                <span className="text-xs font-mono font-bold text-light-text">15 min</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How Life Arena Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-arena-border">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-electric">
            The Battle Loop
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-light-text mt-2">
            How Life Arena Works
          </h2>
          <p className="text-sm sm:text-base text-light-muted mt-3">
            A frictionless cycle designed to turn procrastination into progress and dopamine into discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Forge Quests",
              desc: "Convert your daily to-dos, study sessions, and workouts into structured RPG quests with customized bounties.",
              icon: Swords,
              color: "text-teal-electric"
            },
            {
              step: "02",
              title: "Slay Real-Life Tasks",
              desc: "Focus deeply and conquer your goals in the physical world without distractions.",
              icon: Target,
              color: "text-emerald-bright"
            },
            {
              step: "03",
              title: "Earn XP & Attributes",
              desc: "Claim bounties on completion to level up your Intelligence, Strength, Vitality, and Focus ratings.",
              icon: Zap,
              color: "text-gold-amber"
            },
            {
              step: "04",
              title: "Unlock Relics & Shop",
              desc: "Spend your earned arena coins to unlock prestigious badges, cyberpunk themes, and exclusive avatars.",
              icon: ShoppingBag,
              color: "text-coral-warm"
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="p-6 rounded-2xl bg-arena-card/60 border border-arena-border hover:border-teal-electric/40 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono font-black text-light-subtle/50 group-hover:text-teal-electric transition-colors">
                    {item.step}
                  </span>
                  <div className={`p-3 rounded-xl bg-arena-bg border border-arena-border ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-lg font-display font-bold text-light-text mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-light-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. RPG Attributes System */}
      <section id="attributes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-arena-border">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-bright">
            Core Character Sheet
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-light-text mt-2">
            Level Up Your 4 Real-Life Attributes
          </h2>
          <p className="text-sm sm:text-base text-light-muted mt-3">
            Every task directly strengthens one of your core character pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Intelligence",
              desc: "Deepened by programming, reading books, studying STEM, and solving complex logic problems.",
              icon: Brain,
              color: "text-teal-electric",
              border: "border-teal-electric/30",
              tag: "Knowledge & Logic"
            },
            {
              name: "Strength",
              desc: "Forged through calisthenics, gym lifting, high-intensity cardio, and relentless athletic exertion.",
              icon: Dumbbell,
              color: "text-coral-warm",
              border: "border-coral-warm/30",
              tag: "Power & Endurance"
            },
            {
              name: "Vitality",
              desc: "Nourished by restorative sleep, optimal hydration, balanced nutrition, and daily recovery routines.",
              icon: HeartPulse,
              color: "text-emerald-bright",
              border: "border-emerald-bright/30",
              tag: "Health & Longevity"
            },
            {
              name: "Focus",
              desc: "Sharpened through meditation, deep flow states, digital detox, and distraction resistance.",
              icon: Target,
              color: "text-gold-amber",
              border: "border-gold-amber/30",
              tag: "Clarity & Willpower"
            }
          ].map((attr) => {
            const Icon = attr.icon;
            return (
              <div key={attr.name} className={`p-6 rounded-2xl bg-arena-card/70 border ${attr.border} shadow-card-glass hover:-translate-y-1 transition-all`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-arena-bg border border-arena-border ${attr.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-light-subtle bg-arena-bg px-2 py-0.5 rounded border border-arena-border">
                    {attr.tag}
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold text-light-text mb-2">
                  {attr.name}
                </h3>
                <p className="text-xs sm:text-sm text-light-muted leading-relaxed">
                  {attr.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-arena-border">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-amber">
            Arena Arsenal
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-light-text mt-2">
            Engineered For Consistent Growth
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-arena-card/60 border border-arena-border">
            <div className="p-3 w-fit rounded-xl bg-teal-electric/10 text-teal-electric mb-4">
              <Swords className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-light-text mb-2">Dynamic Quest Engine</h3>
            <p className="text-xs sm:text-sm text-light-muted">
              Filter by active or completed, categorize tasks, and customize rewards to reflect real difficulty.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-arena-card/60 border border-arena-border">
            <div className="p-3 w-fit rounded-xl bg-gold-amber/10 text-gold-amber mb-4">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-light-text mb-2">Arena Economy & Shop</h3>
            <p className="text-xs sm:text-sm text-light-muted">
              Earn coins organically with every finished quest. Unlock custom themes, badges, and avatar identities.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-arena-card/60 border border-arena-border">
            <div className="p-3 w-fit rounded-xl bg-coral-warm/10 text-coral-warm mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-light-text mb-2">Unbroken Streaks</h3>
            <p className="text-xs sm:text-sm text-light-muted">
              Watch your streak multiplier ignite as you show up day after day to conquer your daily arena.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-arena-card/60 border border-arena-border">
            <div className="p-3 w-fit rounded-xl bg-emerald-bright/10 text-emerald-bright mb-4">
              <HistoryIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-light-text mb-2">Chronological History</h3>
            <p className="text-xs sm:text-sm text-light-muted">
              Every quest conquered and item acquired is stamped into your permanent timeline log.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-arena-card/60 border border-arena-border">
            <div className="p-3 w-fit rounded-xl bg-teal-electric/10 text-teal-electric mb-4">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-light-text mb-2">Hall of Achievements</h3>
            <p className="text-xs sm:text-sm text-light-muted">
              Track multi-tier milestones from your First Quest to becoming a 1,000 XP Arena Legend.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-arena-card/60 border border-arena-border">
            <div className="p-3 w-fit rounded-xl bg-gold-amber/10 text-gold-amber mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-light-text mb-2">Character Progression</h3>
            <p className="text-xs sm:text-sm text-light-muted">
              Customize your hero's name, display earned relics, and monitor your attribute radar sheet.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Shop Preview */}
      <section id="shop-preview" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-arena-border">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-arena-card via-arena-surface to-arena-card border border-gold-amber/30 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-amber/15 text-gold-amber border border-gold-amber/30 text-xs font-mono font-bold uppercase">
              <Coins className="w-3.5 h-3.5" />
              Item Shop & Relics
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-light-text">
              Spend Coins. Customize Your Journey.
            </h2>
            <p className="text-sm sm:text-base text-light-muted">
              Acquire prestigious badges, rare blades, cyberpunk theme overlays, and arcane avatars as you amass arena wealth.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <Button
                variant="gold"
                size="md"
                onClick={() => navigate('/login')}
                className="shadow-glow-gold"
              >
                Enter the Shop
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-light-text mb-4">
          Ready to Step into the Arena?
        </h2>
        <p className="text-sm sm:text-base text-light-muted mb-8 max-w-xl mx-auto">
          Sign up today, start at Level 1, and conquer your real-world ambitions step by step.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/signup')}
            className="w-full sm:w-auto shadow-glow-teal"
          >
            Get Started Now
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto"
          >
            Login to Existing Account
          </Button>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="border-t border-arena-border py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-light-subtle">
        <Logo size="sm" to="/" />
        <p>© 2026 LIFE ARENA. All rights reserved. Gamify your potential.</p>
        <div className="flex items-center gap-6">
          <Link to="/login" className="hover:text-teal-electric transition-colors">Login</Link>
          <Link to="/signup" className="hover:text-teal-electric transition-colors">Sign Up</Link>
        </div>
      </footer>
    </div>
  );
};
