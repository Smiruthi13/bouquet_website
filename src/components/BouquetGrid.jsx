import React from 'react';
import { BouquetCard } from './BouquetCard';
import { Sparkles } from 'lucide-react';

export const BouquetGrid = ({ bouquets, onAddToCart, onToggleWishlist, wishlistIds, onQuickView }) => {
  if (bouquets.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '16px' }}>
        <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-burgundy)', marginBottom: '8px' }}>
          No bouquets found in this collection
        </p>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          Please try selecting another category or check back soon for seasonal arrivals.
        </p>
      </div>
    );
  }

  return (
    <div className="bouquet-grid">
      {bouquets.map((item) => (
        <BouquetCard
          key={item.id}
          bouquet={item}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isWishlisted={wishlistIds.includes(item.id)}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};
