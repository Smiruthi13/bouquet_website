import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onCheckout 
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = subtotal > 1500 || subtotal === 0 ? 0 : 99;
  const total = subtotal + delivery;

  return (
    <>
      <div 
        className={`cart-backdrop ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
        aria-hidden="true"
      />

      <aside 
        className={`cart-drawer ${isOpen ? 'open' : ''}`}
        aria-label="Shopping Cart Drawer"
      >
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={22} />
            <span>Your Bloom Bag</span>
          </div>
          <button 
            className="cart-close-btn" 
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">
                🌸
              </div>
              <h3 className="cart-empty-title">Your bag is empty</h3>
              <p className="cart-empty-text">
                Bring love and warmth into your home by picking a handcrafted bouquet.
              </p>
              <button 
                className="btn btn-outline" 
                onClick={onClose}
                style={{ padding: '10px 24px', fontSize: '0.85rem' }}
              >
                Explore Collection
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="cart-item-img" 
                />
                <div className="cart-item-info">
                  <div>
                    <h4 className="cart-item-title">{item.name}</h4>
                    <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
                  </div>

                  <div className="cart-item-controls">
                    <div className="qty-stepper">
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button 
                      className="cart-item-remove"
                      onClick={() => onRemoveItem(item.id)}
                      title="Remove bouquet"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="cart-total-row">
              <span>Delivery Packaging</span>
              <span>{delivery === 0 ? <strong style={{ color: 'var(--color-sage-dark)' }}>FREE (Orders &gt; ₹1500)</strong> : `₹${delivery}`}</span>
            </div>
            <div className="cart-total-row grand-total">
              <span>Total Amount</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            <button 
              className="btn btn-primary cart-checkout-btn" 
              onClick={onCheckout}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--color-text-light)', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ShieldCheck size={14} /> Guaranteed fresh delivery in pristine insulated gift box
            </p>
          </div>
        )}
      </aside>
    </>
  );
};
