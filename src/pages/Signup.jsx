import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swords, CheckCircle2, User, Mail, Lock, Shield, ArrowRight } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { Button } from '../components/common/Button';
import { useApp } from '../context/AppContext';

export const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useApp();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username.trim()) {
      setError('Please enter your adventurer name / username.');
      return;
    }
    if (!formData.email.trim()) {
      setError('Please enter a valid email address.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Register user in mock state
    await signup({
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password
    });

    // Show account creation success state (DO NOT immediately open dashboard!)
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-arena-bg text-light-text flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-teal-electric/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed -bottom-40 -left-40 w-96 h-96 bg-emerald-deep/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Brand Top Header */}
      <div className="mb-6 text-center z-10">
        <Logo size="lg" to="/" />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-arena-card/90 backdrop-blur-xl border border-teal-electric/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 relative z-10">
        {success ? (
          /* SUCCESS STATE (Requested: show success state, then direct user to LOGIN page) */
          <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-2xl bg-emerald-bright/15 text-emerald-bright border border-emerald-bright/30 mx-auto flex items-center justify-center shadow-glow-emerald">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-display font-extrabold text-light-text">
              Account Created!
            </h2>

            <p className="text-sm text-light-muted leading-relaxed max-w-sm mx-auto">
              Greetings, <strong className="text-teal-electric font-semibold">{formData.username}</strong>. Your character has been forged. Please log in to enter the Arena and start your quest.
            </p>

            <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate('/login')}
                className="w-full shadow-glow-teal"
              >
                Proceed to Login
              </Button>
            </div>
          </div>
        ) : (
          /* SIGN UP FORM */
          <>
            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 p-1 bg-arena-bg rounded-xl border border-arena-border mb-6">
              <Link
                to="/signup"
                className="py-2 text-center text-xs font-mono font-bold uppercase tracking-wider rounded-lg bg-teal-electric/20 text-teal-electric border border-teal-electric/30 transition-colors"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="py-2 text-center text-xs font-mono font-semibold uppercase tracking-wider text-light-muted hover:text-light-text transition-colors"
              >
                Login
              </Link>
            </div>

            <div className="mb-6 text-center">
              <h2 className="text-2xl font-display font-bold text-light-text">
                Create Adventurer
              </h2>
              <p className="text-xs text-light-muted mt-1">
                Begin your journey at Level 1 and start from zero.
              </p>
            </div>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-coral-warm/15 border border-coral-warm/30 text-coral-warm text-xs font-medium text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-light-muted mb-1">
                  Username / Character Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-light-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. PhoenixBlade"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-light-muted mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-light-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="hero@lifearena.io"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-light-muted mb-1">
                  Password
                </label>
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

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-light-muted mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Shield className="w-4 h-4 text-light-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                  Create Account
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center text-xs text-light-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-teal-electric font-semibold hover:underline">
                Login here
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
