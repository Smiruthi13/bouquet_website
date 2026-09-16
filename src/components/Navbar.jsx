import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, Sparkles } from 'lucide-react';

export const Navbar = ({ cartCount, wishlistCount, onOpenCart, onOpenWishlist }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Brand */}
        <a href="#hero" className="nav-brand" onClick={(e) => handleNavClick(e, 'hero')}>
          <span className="brand-logo">BLOOMÉ</span>
          <span className="brand-tagline">Haute Fleuriste</span>
        </a>

        {/* Navigation Links */}
        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <li className="nav-item">
            <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>Home</a>
          </li>
          <li className="nav-item">
            <a href="#bouquets" onClick={(e) => handleNavClick(e, 'bouquets')}>Bouquets</a>
          </li>
          <li className="nav-item">
            <a href="#featured" onClick={(e) => handleNavClick(e, 'featured')}>Story</a>
          </li>
          <li className="nav-item">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
          </li>
          <li className="nav-item">
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
          </li>
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          <button 
            className="nav-icon-btn" 
            aria-label="Wishlist" 
            onClick={onOpenWishlist}
            title="Wishlist"
          >
            <Heart size={20} />
            {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
          </button>

          <button 
            className="nav-icon-btn" 
            aria-label="Shopping Cart" 
            onClick={onOpenCart}
            title="Shopping Cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <button 
            className="mobile-menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
