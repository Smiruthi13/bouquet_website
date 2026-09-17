import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedSection } from './components/FeaturedSection';
import { CategoryFilter } from './components/CategoryFilter';
import { BouquetGrid } from './components/BouquetGrid';
import { CartDrawer } from './components/CartDrawer';
import { AboutSection } from './components/AboutSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { StoryModal } from './components/StoryModal';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';

import { BOUQUETS_DATA, CATEGORIES, OCCASIONS, REVIEWS } from './data/bouquets';
import { Sparkles, Shield } from 'lucide-react';
import { supabase } from './supabaseClient';

export function App() {
  // Products & Filtering state
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Cart state
  const [cartItems, setCartItems] = useState([
    {
      ...BOUQUETS_DATA[0],
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState([BOUQUETS_DATA[3].id]);

  // Auth state
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');

  // Modals state
  const [quickViewBouquet, setQuickViewBouquet] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  // Monitor Supabase auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // F2 Shortcut key listener for Admin Panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'F2') {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    showToast('Signed out successfully');
  };

  // Filtered bouquets
  const filteredBouquets = useMemo(() => {
    if (selectedCategory === 'All') return BOUQUETS_DATA;
    return BOUQUETS_DATA.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory]);

  // Cart operations
  const handleAddToCart = (bouquet) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(item => item.id === bouquet.id);
      if (existing) {
        return prevItems.map(item =>
          item.id === bouquet.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...bouquet, quantity: 1 }];
    });

    showToast(`Added "${bouquet.name}" to Bloom Bag 🌸`);
  };

  const handleUpdateQty = (id, delta) => {
    setCartItems((prevItems) => {
      return prevItems
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast('Removed item from bag');
  };

  const handleToggleWishlist = (bouquet) => {
    if (wishlist.includes(bouquet.id)) {
      setWishlist(prev => prev.filter(id => id !== bouquet.id));
      showToast(`Removed "${bouquet.name}" from Wishlist`);
    } else {
      setWishlist(prev => [...prev, bouquet.id]);
      showToast(`Saved "${bouquet.name}" to your Wishlist ❤️`);
    }
  };

  const handleCompleteOrder = () => {
    setCartItems([]);
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-container">
      {/* 1. Sticky Navigation */}
      <Navbar
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        currentUser={currentUser}
        onOpenAuth={() => {
          setAuthMode('signin');
          setIsAuthOpen(true);
        }}
        onSignOut={handleSignOut}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          setSelectedCategory('All');
          const element = document.getElementById('bouquets');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
          showToast(`You have ${wishlist.length} bouquet(s) in wishlist ❤️`);
        }}
      />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Featured Editorial Section */}
      <FeaturedSection onOpenStoryModal={() => setIsStoryOpen(true)} />

      {/* 4. Occasions Banner Section */}
      <section className="occasions-section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: '36px' }}>
            <span className="section-label">Moments to Celebrate</span>
            <h2 className="section-title" style={{ fontSize: '2.2rem' }}>Every Moment Deserves Blooms</h2>
          </div>
          <div className="occasions-grid">
            {OCCASIONS.map((occ, idx) => (
              <div key={idx} className="occasion-card">
                <span className="occasion-emoji">{occ.icon}</span>
                <h4 className="occasion-title">{occ.name}</h4>
                <p className="occasion-desc">{occ.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Main Bouquet Collection & Filter */}
      <section id="bouquets" className="collection-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Artisanal Selection</span>
            <h2 className="section-title">Find Your Perfect Bouquet</h2>
            <p className="section-subtitle">
              Made for birthdays, celebrations, apologies, anniversaries, and everything in between.
            </p>
          </div>

          <CategoryFilter
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <BouquetGrid
            bouquets={filteredBouquets}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlist}
            onQuickView={(b) => setQuickViewBouquet(b)}
          />
        </div>
      </section>

      {/* 6. About Section */}
      <AboutSection />

      {/* 7. Reviews & Love Section */}
      <section className="reviews-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Patron Testimonials</span>
            <h2 className="section-title">Words from Our Floral Lovers</h2>
            <p className="section-subtitle">
              Discover why thousands choose BLOOMÉ for their most precious occasions.
            </p>
          </div>

          <div className="reviews-grid">
            {REVIEWS.map((rev, index) => (
              <div key={index} className="review-card">
                <div>
                  <div className="review-stars">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <p className="review-text">"{rev.text}"</p>
                </div>
                <div className="review-author">
                  <div>
                    <h5 className="author-name">{rev.name}</h5>
                    <span className="author-location">{rev.city}</span>
                  </div>
                  <span className="review-bouquet-tag">{rev.bouquet}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Newsletter Section */}
      <Newsletter />

      {/* 9. Contact / Footer */}
      <Footer />

      {/* Floating Admin Button helper */}
      <button 
        onClick={() => setIsAdminOpen(true)}
        className="admin-floating-btn"
        title="Open Atelier Admin Portal (or press F2)"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          background: 'rgba(86, 29, 43, 0.9)',
          color: '#FAF7F2',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '8px 14px',
          borderRadius: '50px',
          fontSize: '0.75rem',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
          zIndex: 90
        }}
      >
        <Shield size={14} color="#F7E4E6" />
        <span>Admin (F2)</span>
      </button>

      {/* Authentication Modal (Sign In / Sign Up / Google Auth) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Welcome, ${user.user_metadata?.full_name || user.email}! 🌸`);
        }}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <QuickViewModal
        bouquet={quickViewBouquet}
        onClose={() => setQuickViewBouquet(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewBouquet ? wishlist.includes(quickViewBouquet.id) : false}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        currentUser={currentUser}
        onCompleteOrder={handleCompleteOrder}
      />

      <StoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />

      {/* Admin Panel (F2 Shortcut) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <Sparkles size={18} color="#F7E4E6" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default App;
