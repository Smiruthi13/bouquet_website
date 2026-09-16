import React from 'react';
import { ArrowDown, Sparkles, Flower2, Heart } from 'lucide-react';

export const Hero = () => {
  const scrollToBouquets = (e) => {
    e.preventDefault();
    const bouquetSection = document.getElementById('bouquets');
    if (bouquetSection) {
      bouquetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="hero" className="hero">
      {/* Background visual soft glowing blobs */}
      <div className="hero-bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Floating subtle petals decorative element */}
      <div className="hero-petals">
        {[...Array(6)].map((_, i) => (
          <span 
            key={i} 
            className="petal-item"
            style={{
              left: `${15 + i * 15}%`,
              animationDuration: `${12 + i * 3}s`,
              animationDelay: `${i * 1.8}s`,
              fontSize: `${14 + (i % 3) * 6}px`
            }}
          >
            🌸
          </span>
        ))}
      </div>

      {/* Hero content */}
      <div className="hero-content">
        <div className="hero-pill">
          <Sparkles size={14} />
          <span>Atelier de Fleurs & Botanical Art</span>
        </div>

        <h1 className="hero-title">
          Flowers that speak what <em>words cannot.</em>
        </h1>

        <p className="hero-subtitle">
          Handcrafted bouquets made with love, for every beautiful moment.
        </p>

        <div className="hero-cta-group">
          <a href="#bouquets" className="btn btn-primary" onClick={scrollToBouquets}>
            <Flower2 size={18} />
            Explore Bouquets
          </a>
          <a href="#featured" className="btn btn-outline">
            Our Philosophy
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-num">100%</span>
            <span className="stat-label">Farm Fresh Blooms</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">Same-Day</span>
            <span className="stat-label">Bespoke Delivery</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">4.9 ★</span>
            <span className="stat-label">Loved by 10,000+</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#bouquets" className="hero-scroll-indicator" onClick={scrollToBouquets}>
        <span>Scroll to bloom</span>
        <ArrowDown size={14} />
      </a>
    </header>
  );
};
