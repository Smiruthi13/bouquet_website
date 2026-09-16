import React from 'react';
import { Sparkles, Flower2, Heart, Award } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Content */}
          <div className="about-text-content">
            <span className="section-label">Our Philosophy</span>
            <h2 className="featured-title">Flowers, thoughtfully arranged.</h2>
            
            <blockquote className="about-quote">
              “To send flowers is to send a piece of poetry that never ceases to bring joy.”
            </blockquote>

            <p className="about-paragraph">
              At BLOOMÉ, we believe flowers are more than decoration. They mark milestones, whisper quiet comforts, 
              celebrate triumphs, and celebrate the pure everyday joy of living.
            </p>

            <p className="about-paragraph">
              Every single stem is harvested in peak bloom from sustainable botanical gardens, conditioned with floral elixir, 
              and hand-curated by our master floral artisans. We wrap our arrangements with layered recycled parchment, silk grosgrain ribbons, 
              and love.
            </p>

            <div className="about-badges">
              <div className="about-badge-item">
                <Flower2 size={20} color="var(--color-rose-deep)" />
                <span>100% Eco-Wrap</span>
              </div>
              <div className="about-badge-item">
                <Heart size={20} color="var(--color-rose-deep)" />
                <span>Hand-Arranged</span>
              </div>
              <div className="about-badge-item">
                <Award size={20} color="var(--color-rose-deep)" />
                <span>Award-Winning Design</span>
              </div>
            </div>
          </div>

          {/* Visual with layered images */}
          <div className="about-images-col">
            <div className="about-img-main">
              <img 
                src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1000&q=80" 
                alt="Luxury flower arrangement atelier"
                loading="lazy"
              />
            </div>
            <div className="about-img-sub">
              <img 
                src="https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80" 
                alt="Close-up detail of fresh peonies"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
