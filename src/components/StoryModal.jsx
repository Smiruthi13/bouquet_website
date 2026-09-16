import React from 'react';
import { X, Sparkles, Heart } from 'lucide-react';

export const StoryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        <button 
          className="cart-close-btn" 
          onClick={onClose}
          style={{ position: 'absolute', top: '18px', right: '18px' }}
        >
          <X size={20} />
        </button>

        <span className="section-label">The BLOOMÉ Heritage</span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-burgundy)', margin: '8px 0 20px' }}>
          Born from a passion for botanical elegance.
        </h2>

        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p>
            BLOOMÉ was founded in 2021 with a simple vision: replace plastic-wrapped commercial flowers with artisanal botanical art.
          </p>
          <p>
            We curate each stem individually from high-altitude regenerative flower estates. Our florists compose each arrangement like an oil painting—layering texture, aroma, foliage, and height to evoke poetry that words cannot capture.
          </p>
          <p>
            Every bouquet is finished with handmade deckle-edge paper, luxury silk grosgrain ribbon, and our signature botanical hydration wrap to keep every petal glowing.
          </p>
        </div>

        <div style={{ marginTop: '28px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.3rem', color: 'var(--color-rose-deep)' }}>
              Aurelie & Team
            </p>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Master Floral Artisans
            </span>
          </div>

          <button className="btn btn-primary" onClick={onClose} style={{ padding: '10px 24px', fontSize: '0.8rem' }}>
            <span>Explore Collection</span>
          </button>
        </div>
      </div>
    </div>
  );
};
