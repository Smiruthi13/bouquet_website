import React, { useEffect, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBouquets = (e) => {
    e.preventDefault();
    const bouquetSection = document.getElementById('bouquets');
    if (bouquetSection) {
      bouquetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="hero" className="editorial-hero">
      {/* Deep atmospheric radial glow layers */}
      <div className="hero-dark-atmosphere">
        <div className="dark-glow dark-glow-1"></div>
        <div className="dark-glow dark-glow-2"></div>
        <div className="dark-glow dark-glow-3"></div>
      </div>

      {/* Dramatic Oversized Flower Visual - High Fashion Editorial Treatment */}
      <div 
        className="editorial-flower-container"
        style={{
          transform: `translate3d(0, ${scrollY * 0.18}px, 0)`
        }}
      >
        <div className="editorial-flower-wrapper">
          {/* Main Giant Flower - Pink Lotus / Peony with vivid magenta, lavender & soft peach tones */}
          <img 
            src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=2200&q=90"
            alt="Dramatic cinematic pink blossom in atmospheric deep midnight"
            className="editorial-flower-img"
          />
          {/* Secondary subtle ambient floral layer for depth */}
          <div className="flower-radial-mask"></div>
          <div className="flower-soft-glow"></div>
        </div>
      </div>

      {/* Editorial Vignette & Translucent Dark Overlay for maximum readability */}
      <div className="hero-cinematic-overlay"></div>

      {/* Luxury Editorial Corner & Edge Elements */}
      <div className="editorial-edge-labels">
        <div className="edge-item edge-top-left">
          <span className="edge-num">01 — 04</span>
          <span className="edge-sub">ATELIER HAUTE FLORAL</span>
        </div>

        <div className="edge-item edge-bottom-left">
          <span className="edge-accent-dot"></span>
          <span className="edge-sub">Seasonal Collection • Vol. 26</span>
        </div>

        <div className="edge-item edge-bottom-right">
          <span className="edge-sub">Handcrafted in Bloom • Pure Botanical Art</span>
        </div>

        {/* Right side delicate floral collection marker */}
        <div className="edge-side-indicator">
          <div className="collection-circle-marker">
            <span className="marker-ring"></span>
            <span className="marker-core"></span>
          </div>
          <span className="side-rotated-text">BLOOMÉ CAMPAIGN</span>
        </div>
      </div>

      {/* Central Editorial Hero Typography */}
      <div 
        className="editorial-hero-content"
        style={{
          transform: `translate3d(0, ${scrollY * -0.08}px, 0)`
        }}
      >
        <div className="hero-eyebrow-wrap">
          <span className="hero-eyebrow">ARTISTRY IN BLOOM</span>
        </div>

        <h1 className="editorial-hero-title">
          Curated Floral<br />
          <span className="italic-title">Masterpieces</span>
        </h1>

        <p className="editorial-hero-description">
          Bringing the ethereal beauty of the garden into your home with seasonal, hand-crafted arrangements designed to inspire.
        </p>

        <div className="editorial-hero-cta">
          <a 
            href="#bouquets" 
            className="editorial-btn-explore" 
            onClick={scrollToBouquets}
          >
            <span>Explore Collection</span>
          </a>
        </div>
      </div>

      {/* Bottom Scroll to Bloom Indicator */}
      <a 
        href="#bouquets" 
        className="editorial-scroll-indicator" 
        onClick={scrollToBouquets}
        aria-label="Scroll to Bloom"
      >
        <span className="scroll-bloom-text">SCROLL TO BLOOM</span>
        <div className="scroll-animated-line">
          <div className="scroll-line-pulse"></div>
        </div>
      </a>
    </header>
  );
};
