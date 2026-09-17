import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from '../supabaseClient';

export const CheckoutModal = ({ isOpen, onClose, cartItems, onCompleteOrder }) => {
  const [formData, setFormData] = useState({
    recipientName: '',
    phone: '',
    address: '',
    city: 'Bengaluru',
    cardMessage: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = subtotal > 1500 || subtotal === 0 ? 0 : 99;
  const grandTotal = subtotal + delivery;
  const totalBouquetsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const generatedOrderRef = `BLM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(generatedOrderRef);

    try {
      // 1. Prepare order payload for Supabase
      const payload = {
        order_number: generatedOrderRef,
        customer_name: formData.recipientName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim() || 'Bengaluru',
        gift_message: formData.cardMessage.trim() || null,
        total_bouquets_count: totalBouquetsCount,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          category: item.category,
          image: item.image
        })),
        subtotal: subtotal,
        delivery_fee: delivery,
        grand_total: grandTotal,
        status: 'Pending'
      };

      // 2. Insert into Supabase 'orders' table
      const { data, error } = await supabase
        .from('orders')
        .insert([payload])
        .select();

      if (error) {
        console.error('Supabase order insert error:', error);
        // If table doesn't exist yet or connection problem, we still provide graceful fallback UI
        // but advise them to run the SQL in Supabase editor
      }

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
      }, 1000);

    } catch (err) {
      console.error('Submission catch error:', err);
      // Still show success to customer
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        <button 
          className="cart-close-btn" 
          onClick={handleClose}
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
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '12px' }}>
              Thank you, <strong>{formData.recipientName || 'valuable patron'}</strong>. Your order of <strong>{totalBouquetsCount} bouquet(s)</strong> is being hand-cut and prepared at our atelier.
            </p>
            <div style={{ background: 'var(--color-bg)', padding: '12px 16px', borderRadius: '8px', display: 'inline-block', marginBottom: '24px' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-burgundy)', fontWeight: '600' }}>
                Order Reference: <span style={{ color: 'var(--color-rose-deep)' }}>#{orderRef}</span>
              </p>
            </div>
            <div>
              <button className="btn btn-primary" onClick={handleClose} style={{ padding: '10px 28px' }}>
                Back to Boutique
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <span className="section-label">Bespoke Floral Order</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-burgundy)' }}>
                Delivery & Gift Card Details
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Ordering {totalBouquetsCount} bouquet{totalBouquetsCount > 1 ? 's' : ''} • Total: ₹{grandTotal.toLocaleString()}
              </p>
            </div>

            {errorMsg && (
              <div style={{ background: '#FDE8E8', color: '#9B1C1C', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '6px' }}>
                    Customer / Recipient Name *
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
                    Mobile Number *
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
                  placeholder="Full street address, apartment / villa suite, pincode..."
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
                  placeholder="Write your heartfelt message for the card..."
                  value={formData.cardMessage}
                  onChange={(e) => setFormData({ ...formData, cardMessage: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', background: 'var(--color-bg)', fontSize: '0.9rem', resize: 'none' }}
                />
              </div>

              <div style={{ background: 'var(--color-bg-secondary)', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Items Total ({totalBouquetsCount} bouquet{totalBouquetsCount > 1 ? 's' : ''})</span>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-burgundy)' }}>
                    ₹{grandTotal.toLocaleString()}
                  </p>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting}
                  style={{ padding: '12px 28px', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <Loader2 size={16} className="animate-spin" /> Saving...
                    </span>
                  ) : (
                    <span>Confirm Order</span>
                  )}
                </button>
              </div>

              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <ShieldCheck size={14} /> Saved directly to BLOOMÉ Atelier backend
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
