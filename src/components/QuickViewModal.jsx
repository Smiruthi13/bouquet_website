import React from 'react';
import { X, ShoppingBag, Star, Sparkles, Check, Heart, ShieldCheck } from 'lucide-react';

export const QuickViewModal = ({ bouquet, onClose, onAddToCart, onToggleWishlist, isWishlisted }) => {
  if (!bouquet) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '780px', padding: 0, overflow: 'hidden' }}
      >
        <button 
          className="cart-close-btn" 
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: 'rgba(255,255,255,0.85)' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <div style={{ position: 'relative', height: '100%', minHeight: '340px' }}>
            <img 
              src={bouquet.image} 
              alt={bouquet.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {bouquet.tag && (
              <span className="card-tag" style={{ top: '16px', left: '16px' }}>{bouquet.tag}</span>
            )}
          </div>

          <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="card-category">{bouquet.category}</span>
                <div className="card-rating">
                  <Star size={14} className="star-icon" fill="#F5A623" />
                  <span>{bouquet.rating}</span>
                  <span style={{ color: 'var(--color-text-light)', fontSize: '0.75rem' }}>({bouquet.reviews} reviews)</span>
                </div>
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-burgundy)', marginBottom: '12px' }}>
                {bouquet.name}
              </h3>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-burgundy)' }}>
                  ₹{bouquet.price.toLocaleString()}
                </span>
                {bouquet.originalPrice && (
                  <span style={{ color: 'var(--color-text-light)', textDecoration: 'line-through', fontSize: '0.9rem' }}>
                    ₹{bouquet.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                {bouquet.description}
              </p>

              <div style={{ marginBottom: '20px', background: 'var(--color-bg)', padding: '14px', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-burgundy)', marginBottom: '8px' }}>
                  Stems in this Arrangement:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {bouquet.flowers?.map((f, i) => (
                    <span key={i} style={{ fontSize: '0.75rem', background: 'white', padding: '4px 10px', borderRadius: '50px', border: '1px solid rgba(0,0,0,0.06)' }}>
                      🌸 {f}
                    </span>
                  ))}
                </div>
              </div>

              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
                <Sparkles size={14} color="var(--color-rose-deep)" /> Ribbon: {bouquet.ribbonColor}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                onClick={() => {
                  onAddToCart(bouquet);
                  onClose();
                }}
              >
                <ShoppingBag size={18} />
                <span>Add to Bloom Bag</span>
              </button>

              <button 
                className={`nav-icon-btn ${isWishlisted ? 'active' : ''}`}
                style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                onClick={() => onToggleWishlist(bouquet)}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} color={isWishlisted ? "#E63946" : "currentColor"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
