import React from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';

export const BouquetCard = ({ bouquet, onAddToCart, onToggleWishlist, isWishlisted, onQuickView }) => {
  return (
    <article className="product-card">
      <div className="card-image-wrap">
        <img 
          src={bouquet.image} 
          alt={bouquet.name} 
          loading="lazy" 
          onClick={() => onQuickView(bouquet)}
          style={{ cursor: 'pointer' }}
        />
        {bouquet.tag && (
          <span className="card-tag">{bouquet.tag}</span>
        )}
        <button
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={() => onToggleWishlist(bouquet)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title={isWishlisted ? "In Wishlist" : "Add to Wishlist"}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="card-body">
        <div className="card-category-rating">
          <span className="card-category">{bouquet.category}</span>
          <div className="card-rating">
            <Star size={14} className="star-icon" fill="#F5A623" />
            <span>{bouquet.rating}</span>
            <span style={{ color: 'var(--color-text-light)', fontSize: '0.72rem' }}>({bouquet.reviews})</span>
          </div>
        </div>

        <h3 
          className="card-title" 
          onClick={() => onQuickView(bouquet)}
          style={{ cursor: 'pointer' }}
        >
          {bouquet.name}
        </h3>

        <p className="card-description">
          {bouquet.description}
        </p>

        <div className="card-footer">
          <div className="card-price-wrap">
            <span className="card-price">₹{bouquet.price.toLocaleString()}</span>
            {bouquet.originalPrice && (
              <span className="card-price-original">₹{bouquet.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <button 
            className="card-add-btn" 
            onClick={() => onAddToCart(bouquet)}
            aria-label={`Add ${bouquet.name} to cart`}
          >
            <ShoppingBag size={15} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
};
