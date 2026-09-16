import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setSubscribed(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#F7E4E6', '#D48C9A', '#B8596E', '#FAF7F2']
    });

    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-box">
          <span className="section-label" style={{ color: 'var(--color-blush)' }}>
            Join Our Floral Circle
          </span>
          <h2 className="newsletter-title">Get a little bloom in your inbox.</h2>
          <p className="newsletter-subtitle">
            Receive curated flower care guides, secret seasonal drops, and 15% off your first handcrafted bouquet.
          </p>

          {subscribed ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.15)', padding: '12px 28px', borderRadius: '50px' }}>
              <CheckCircle2 size={20} color="#EBF1EA" />
              <span style={{ fontWeight: '500', color: '#FAF7F2' }}>Welcome to the BLOOMÉ circle! Check your inbox soon.</span>
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input 
                type="email" 
                className="newsletter-input" 
                placeholder="Enter your email address..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">
                <span>Subscribe</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
