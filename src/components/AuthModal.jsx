import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

export const AuthModal = ({ isOpen, onClose, onAuthSuccess, initialMode = 'signin' }) => {
  const [mode, setMode] = useState(initialMode); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!isOpen) return null;

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (mode === 'signup') {
        // Sign Up with Supabase Auth
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              full_name: fullName.trim(),
            }
          }
        });

        if (error) throw error;

        if (data?.user?.identities?.length === 0) {
          setErrorMsg('An account with this email already exists. Please sign in instead.');
        } else if (data?.session) {
          setSuccessMsg('Account created successfully! Welcome to BLOOMÉ.');
          setTimeout(() => {
            onAuthSuccess(data.user);
            onClose();
          }, 1200);
        } else {
          setSuccessMsg('Account registered! Please check your email to confirm your account.');
          setTimeout(() => {
            onClose();
          }, 2500);
        }

      } else {
        // Sign In with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (error) throw error;

        setSuccessMsg(`Welcome back, ${data.user?.user_metadata?.full_name || data.user?.email}!`);
        setTimeout(() => {
          onAuthSuccess(data.user);
          onClose();
        }, 1000);
      }
    } catch (err) {
      console.error('Auth error:', err);
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setErrorMsg(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err) {
      console.error('Google Auth Error:', err);
      setErrorMsg(err.message || 'Google sign in failed. Please check Supabase OAuth settings.');
      setGoogleLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 350 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '460px', 
          padding: '36px 32px',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Close button */}
        <button 
          className="cart-close-btn" 
          onClick={onClose}
          style={{ position: 'absolute', top: '18px', right: '18px' }}
          aria-label="Close authentication modal"
        >
          <X size={20} />
        </button>

        {/* Brand header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-blush)', color: 'var(--color-burgundy)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '12px' }}>
            🌸
          </div>
          <span className="section-label" style={{ display: 'block', margin: '0 auto 6px' }}>
            {mode === 'signin' ? 'Patron Concierge' : 'Join Our Atelier'}
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-burgundy)', margin: 0 }}>
            {mode === 'signin' ? 'Sign in to BLOOMÉ' : 'Create an Account'}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
            {mode === 'signin' 
              ? 'Access saved bouquets, bespoke orders and exclusive drops'
              : 'Unlock 15% off your first order & track personalized gifts'}
          </p>
        </div>

        {/* Alert Notifications */}
        {errorMsg && (
          <div style={{ 
            background: '#FDE8E8', 
            border: '1px solid #F8B4B4', 
            color: '#9B1C1C', 
            padding: '10px 14px', 
            borderRadius: '8px', 
            fontSize: '0.82rem', 
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div style={{ 
            background: '#DEF7EC', 
            border: '1px solid #BCF0DA', 
            color: '#03543F', 
            padding: '10px 14px', 
            borderRadius: '8px', 
            fontSize: '0.82rem', 
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Google Sign In Option */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '12px 20px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            background: '#FFFFFF',
            color: 'var(--color-text-main)',
            fontSize: '0.88rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            marginBottom: '20px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-dusty-rose)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'}
        >
          {googleLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
          )}
          <span>{mode === 'signin' ? 'Continue with Google' : 'Sign up with Google'}</span>
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(0, 0, 0, 0.08)' }}></div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            or with email
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(0, 0, 0, 0.08)' }}></div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {mode === 'signup' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '6px' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 40px',
                    borderRadius: '8px',
                    border: '1px solid rgba(0,0,0,0.14)',
                    background: 'var(--color-bg)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '6px' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 40px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.14)',
                  background: 'var(--color-bg)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                Password
              </label>
              {mode === 'signin' && (
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent if account exists.')}
                  style={{ fontSize: '0.72rem', color: 'var(--color-rose-deep)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 40px 11px 40px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.14)',
                  background: 'var(--color-bg)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-light)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              marginTop: '8px',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Loader2 size={16} className="animate-spin" />
                {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
              </span>
            ) : (
              <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>
        </form>

        {/* Toggle between Sign In & Sign Up */}
        <div style={{ textAlign: 'center', marginTop: '22px', paddingTop: '18px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          {mode === 'signin' ? (
            <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)' }}>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => switchMode('signup')}
                style={{
                  color: 'var(--color-burgundy)',
                  fontWeight: '700',
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'inherit'
                }}
              >
                Create an account
              </button>
            </p>
          ) : (
            <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)' }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('signin')}
                style={{
                  color: 'var(--color-burgundy)',
                  fontWeight: '700',
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'inherit'
                }}
              >
                Sign in here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
