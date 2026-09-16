import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal = ({ isOpen, onClose, cartItems, onCompleteOrder }) => {
  const [formData, setFormData] = useState({
    recipientName: '',
    phone: '',
    address: '',
    city: 'Bengaluru',
    deliveryDate: '',
    cardMessage: '',
    deliverySlot: 'morning'
  });
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = subtotal > 1500 || subtotal === 0 ? 0 : 99;
  const grandTotal = subtotal + delivery;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    
    // Trigger celebratory confetti
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#D48C9A', '#B8596E', '#561D2B', '#EBF1EA', '#CBA258']
    });

    setTimeout(() => {
      onCompleteOrder();
      setIsSuccess(false);
      onClose();
    }, 4000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        <button 
          className="cart-close-btn" 
          onClick={onClose}
          style={{ position: 'absolute', top: '18px', right: '18px' }}
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--color-blush)', color: 'var(--color-burgundy)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '2.5rem' }}>
              🌸
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-burgundy)', marginBottom: '12px' }}>
              Order Placed with Love!
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
              Thank you, <strong>{formData.recipientName || 'valuable patron'}</strong>. Your bespoke arrangement is being hand-cut and conditioned at our atelier.
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-rose-deep)', fontWeight: '600' }}>
              Order confirmation reference #BLM-{Math.floor(100000 + Math.random() * 900000)}
            </p>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <span className="section-label">Bespoke Floral Order</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-burgundy)' }}>
                Delivery & Gift Card Details
              </h3>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '6px' }}>
                    Recipient's Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aanya Singhania"
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', background: 'var(--color-bg)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '6px' }}>
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', background: 'var(--color-bg)', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '6px' }}>
                  Delivery Address *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Street address, apartment/villa suite..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', background: 'var(--color-bg)', fontSize: '0.9rem', resize: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '6px' }}>
                  Personalized Calligraphy Note (Complimentary)
                </label>
                <textarea
                  rows={2}
                  placeholder="Write your heartfelt message to be hand-written on luxury parchment..."
                  value={formData.cardMessage}
                  onChange={(e) => setFormData({ ...formData, cardMessage: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', background: 'var(--color-bg)', fontSize: '0.9rem', resize: 'none' }}
                />
              </div>

              <div style={{ background: 'var(--color-bg-secondary)', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Items Total ({cartItems.length} bouquets)</span>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-burgundy)' }}>
                    ₹{grandTotal.toLocaleString()}
                  </p>
                </div>
                <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px' }}>
                  <span>Confirm Order</span>
                </button>
              </div>

              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <ShieldCheck size={14} /> Pay on delivery or test checkout simulated
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
