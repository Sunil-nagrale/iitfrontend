// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Mail, Lock, Swords, ArrowRight, Sparkles } from 'lucide-react';
// import { Logo } from '../components/common/Logo';
// import { Button } from '../components/common/Button';
// import { useApp } from '../context/AppContext';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Sparkles } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { Button } from '../components/common/Button';
import { loginUser } from '../services/api';


export const Login = () => {
  const navigate = useNavigate();
 

  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });

  const [error, setError] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   if (!formData.emailOrUsername.trim()) {
  //     setError('Please enter your email or username.');
  //     return;
  //   }
  //   if (!formData.password) {
  //     setError('Please enter your password.');
  //     return;
  //   }

  //   // Mock authentication
  //   await login({
  //     emailOrUsername: formData.emailOrUsername.trim(),
  //     password: formData.password
  //   });

  //   // Navigate to DASHBOARD as required!
  //   navigate('/dashboard');
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!formData.emailOrUsername.trim()) {
    setError('Please enter your User ID.');
    return;
  }

  if (!formData.password) {
    setError('Please enter your password.');
    return;
  }

  try {
    const result = await loginUser({
      userId: formData.emailOrUsername.trim(),
      password: formData.password
    });

    localStorage.setItem('token', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));

    navigate('/dashboard');
  } catch (error) {
    setError(error.message || 'Login failed. Please check your credentials.');
  }
};

  // const handleDemoLogin = async () => {
  //   await login({
  //     emailOrUsername: user.name || "Adventurer",
  //     password: "demopassword"
  //   });
  //   navigate('/dashboard');
  // };
  const handleDemoLogin = async () => {
  setError('');

  try {
    const result = await loginUser({
      userId: 'Adventurer',
      password: 'demopassword'
    });

    localStorage.setItem('token', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));

    navigate('/dashboard');
  } catch (error) {
    setError(error.message || 'Demo login failed.');
  }
};

  return (
    <div className="min-h-screen bg-arena-bg text-light-text flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-teal-electric/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-gold-amber/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Brand Top Header */}
      <div className="mb-6 text-center z-10">
        <Logo size="lg" to="/" />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-arena-card/90 backdrop-blur-xl border border-teal-electric/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 relative z-10">
        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 p-1 bg-arena-bg rounded-xl border border-arena-border mb-6">
          <Link
            to="/signup"
            className="py-2 text-center text-xs font-mono font-semibold uppercase tracking-wider text-light-muted hover:text-light-text transition-colors"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="py-2 text-center text-xs font-mono font-bold uppercase tracking-wider rounded-lg bg-teal-electric/20 text-teal-electric border border-teal-electric/30 transition-colors"
          >
            Login
          </Link>
        </div>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-display font-bold text-light-text">
            Enter the Arena
          </h2>
          <p className="text-xs text-light-muted mt-1">
            Rejoin the battle and conquer your quests.
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-coral-warm/15 border border-coral-warm/30 text-coral-warm text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email / Username */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-light-muted mb-1">
              Email / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-light-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                required
                placeholder="hero@lifearena.io or Adventurer"
                value={formData.emailOrUsername}
                onChange={(e) => setFormData({ ...formData, emailOrUsername: e.target.value })}
                className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-mono uppercase tracking-wider text-light-muted">
                Password
              </label>
              <span className="text-[10px] text-light-subtle">
                (Any 6+ characters for demo)
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-light-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full shadow-glow-teal"
            >
              Login
            </Button>
          </div>
        </form>

        {/* Quick Demo Access */}
        <div className="mt-4 pt-4 border-t border-arena-border/80">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={Sparkles}
            onClick={handleDemoLogin}
            className="w-full text-xs"
          >
            Instant Demo Sign In
          </Button>
        </div>

        <div className="mt-6 text-center text-xs text-light-muted">
          New to Life Arena?{' '}
          <Link to="/signup" className="text-teal-electric font-semibold hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
