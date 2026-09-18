import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, User, LogOut, Sun, Moon, Sparkles } from 'lucide-react';

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
  const [themeMode, setThemeMode] = useState('dark');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
    <nav className={`editorial-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container editorial-navbar-inner">
        {/* Left Links & Theme Toggle */}
        <div className="nav-col nav-col-left">
          <ul className="nav-minimal-links">
            <li>
              <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>Home</a>
            </li>
            <li>
              <a href="#bouquets" onClick={(e) => handleNavClick(e, 'bouquets')}>Shop</a>
            </li>
          </ul>

          <button 
            className="nav-theme-toggle"
            onClick={() => setThemeMode(prev => prev === 'dark' ? 'ambient' : 'dark')}
            title="Atmospheric Tone Toggle"
            aria-label="Toggle visual atmosphere"
          >
            {themeMode === 'dark' ? <Sparkles size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Center Brand Logo */}
        <div className="nav-col nav-col-center">
          <a href="#hero" className="editorial-brand" onClick={(e) => handleNavClick(e, 'hero')}>
            <span className="editorial-logo">BLOOMÉ</span>
          </a>
        </div>

        {/* Right Links & Icons */}
        <div className="nav-col nav-col-right">
          <ul className="nav-minimal-links right-links">
            <li>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
            </li>
          </ul>

          {/* User Profile / Sign In */}
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button 
                className="nav-icon-link"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                title={`Account: ${displayName}`}
                aria-label="User profile"
              >
                <User size={15} />
              </button>

              {userDropdownOpen && (
                <div className="nav-dropdown-menu">
                  <div className="dropdown-user-header">
                    <p className="dropdown-user-name">{displayName}</p>
                    <p className="dropdown-user-email">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onSignOut();
                    }}
                    className="dropdown-signout-btn"
                  >
                    <LogOut size={13} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="nav-text-btn" 
              onClick={onOpenAuth}
              title="Patron Sign In"
            >
              Sign In
            </button>
          )}

          {/* Wishlist Link */}
          <button 
            className="nav-icon-link" 
            aria-label="Wishlist" 
            onClick={onOpenWishlist}
            title="Wishlist"
          >
            <Heart size={16} />
            {wishlistCount > 0 && <span className="minimal-badge">{wishlistCount}</span>}
          </button>

          {/* Shopping Bag */}
          <button 
            className="nav-icon-link nav-bag-btn" 
            aria-label="Shopping Bag" 
            onClick={onOpenCart}
            title="Shopping Bag"
          >
            <ShoppingBag size={16} />
            {cartCount > 0 && <span className="minimal-badge">{cartCount}</span>}
          </button>

          {/* Mobile menu trigger */}
          <button 
            className="editorial-mobile-toggle"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="editorial-mobile-drawer">
          <ul className="mobile-nav-list">
            <li><a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>Home</a></li>
            <li><a href="#bouquets" onClick={(e) => handleNavClick(e, 'bouquets')}>Shop Collection</a></li>
            <li><a href="#featured" onClick={(e) => handleNavClick(e, 'featured')}>Our Story</a></li>
            <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>Atelier Philosophy</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Concierge & Contact</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
};
