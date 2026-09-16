import React from 'react';
import { Sparkles, HeartHandshake, Truck, ShieldCheck } from 'lucide-react';

export const FeaturedSection = ({ onOpenStoryModal }) => {
  return (
    <section id="featured" className="featured-section">
      <div className="container">
        <div className="featured-grid">
          {/* Visual column */}
          <div className="featured-image-container">
            <div className="featured-img-wrap">
              <img 
                src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80" 
                alt="Florist crafting bouquet with care"
                loading="lazy" 
              />
            </div>
            <div className="featured-badge-float">
              <div className="featured-badge-icon">
                🌸
              </div>
              <div>
                <p style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--color-burgundy)' }}>100% Hand-Tied</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Wrapped in French Linen</p>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="featured-content">
            <span className="section-label">Artistry & Soul</span>
            <h2 className="featured-title">
              A little beauty, wrapped with love.
            </h2>
            <p className="featured-desc">
              Every bouquet is thoughtfully arranged using fresh blooms and wrapped beautifully by hand. 
              We partner directly with sustainable flower growers to bring you long-lasting petals that turn everyday moments into cherished memories.
            </p>

            <div className="featured-perks">
              <div className="perk-card">
                <div className="perk-icon-wrap">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="perk-title">Fresh Stem Guarantee</h4>
                  <p className="perk-text">Blooms stay vibrant for 7+ days with botanical food.</p>
                </div>
              </div>

              <div className="perk-card">
                <div className="perk-icon-wrap">
                  <Truck size={18} />
                </div>
                <div>
                  <h4 className="perk-title">Hydrated Delivery</h4>
                  <p className="perk-text">Temperature controlled in special water-packs.</p>
                </div>
              </div>

              <div className="perk-card">
                <div className="perk-icon-wrap">
                  <HeartHandshake size={18} />
                </div>
                <div>
                  <h4 className="perk-title">Handwritten Note</h4>
                  <p className="perk-text">Custom wax-sealed personalized calligraphy.</p>
                </div>
              </div>

              <div className="perk-card">
                <div className="perk-icon-wrap">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="perk-title">Signature Ribbon</h4>
                  <p className="perk-text">Double-faced velvet and satin trims.</p>
                </div>
              </div>
            </div>

            <button className="btn btn-primary" onClick={onOpenStoryModal}>
              Discover Our Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
