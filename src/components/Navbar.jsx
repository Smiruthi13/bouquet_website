import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, User, LogOut } from 'lucide-react';
import { supabase } from '../supabaseClient';

export const Navbar = ({ 
  cartCount, 
  wishlistCount, 
  onOpenCart, 
  onOpenWishlist, 
  onOpenAuth,
  currentUser,
  onSignOut
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

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

  const displayName = currentUser?.user_metadata?.full_name || currentUser?.email?.split('@')[0] || 'Patron';

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
          {/* User Auth Profile / Sign In button */}
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button 
                className="nav-icon-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                title={`Logged in as ${displayName}`}
                style={{ background: 'var(--color-blush)', borderColor: 'var(--color-dusty-rose)' }}
              >
                <User size={19} color="var(--color-burgundy)" />
              </button>

              {userDropdownOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '52px',
                    right: 0,
                    width: '210px',
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(86, 29, 43, 0.15)',
                    border: '1px solid rgba(184, 89, 110, 0.15)',
                    padding: '12px',
                    zIndex: 150
                  }}
                >
                  <div style={{ paddingBottom: '8px', borderBottom: '1px solid rgba(0,0,0,0.06)', marginBottom: '8px' }}>
                    <p style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--color-burgundy)', margin: 0 }}>
                      {displayName}
                    </p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {currentUser.email}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onSignOut();
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      color: '#9B1C1C',
                      background: '#FDE8E8',
                      cursor: 'pointer',
                      border: 'none'
                    }}
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="btn btn-outline" 
              onClick={onOpenAuth}
              style={{
                padding: '8px 18px',
                fontSize: '0.78rem',
                letterSpacing: '0.04em',
                borderRadius: 'var(--radius-pill)'
              }}
            >
              <User size={15} />
              <span>Sign In</span>
            </button>
          )}

          {/* Wishlist Button */}
          <button 
            className="nav-icon-btn" 
            aria-label="Wishlist" 
            onClick={onOpenWishlist}
            title="Wishlist"
          >
            <Heart size={19} />
            {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
          </button>

          {/* Shopping Cart Button */}
          <button 
            className="nav-icon-btn" 
            aria-label="Shopping Cart" 
            onClick={onOpenCart}
            title="Shopping Cart"
          >
            <ShoppingBag size={19} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {/* Mobile menu toggle */}
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
