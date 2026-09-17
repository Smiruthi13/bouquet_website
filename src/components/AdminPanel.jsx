import React, { useState, useEffect } from 'react';
import { 
  X, RefreshCw, Search, Filter, Phone, MapPin, Package, 
  Calendar, CheckCircle, Clock, Truck, AlertCircle, Trash2, 
  ChevronDown, ExternalLink, ShieldCheck, Download
} from 'lucide-react';
import { supabase } from '../supabaseClient';

export const AdminPanel = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch orders from Supabase
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchErr } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchErr) {
        throw fetchErr;
      }

      setOrders(data || []);
      if (data && data.length > 0 && !selectedOrder) {
        setSelectedOrder(data[0]);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Failed to connect to Supabase. Ensure table "orders" is created.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const { error: updateErr } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (updateErr) throw updateErr;

      setOrders(prev => prev.map(ord => ord.id === orderId ? { ...ord, status: newStatus } : ord));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete order
  const handleDeleteOrder = async (orderId, orderNum) => {
    if (!window.confirm(`Are you sure you want to delete order #${orderNum}?`)) return;
    try {
      const { error: delErr } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (delErr) throw delErr;

      setOrders(prev => prev.filter(o => o.id !== orderId));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null);
      }
    } catch (err) {
      alert('Failed to delete order: ' + err.message);
    }
  };

  if (!isOpen) return null;

  // Filtered orders
  const filteredOrders = orders.filter(ord => {
    const matchesSearch = 
      ord.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.phone?.includes(searchTerm) ||
      ord.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.address?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || ord.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Aggregated Stats
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.grand_total || 0), 0);
  const totalBouquetsSold = orders.reduce((sum, o) => sum + Number(o.total_bouquets_count || 0), 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;

  const getStatusBadge = (status) => {
    const colors = {
      Pending: { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' },
      Confirmed: { bg: '#DBEAFE', text: '#1E40AF', border: '#BFDBFE' },
      Preparing: { bg: '#FCE7F3', text: '#9D174D', border: '#FBCFE8' },
      'Out for Delivery': { bg: '#E0E7FF', text: '#3730A3', border: '#C7D2FE' },
      Delivered: { bg: '#D1FAE5', text: '#065F46', border: '#A7F3D0' },
      Cancelled: { bg: '#FEE2E2', text: '#991B1B', border: '#FECACA' }
    };
    const style = colors[status] || colors.Pending;
    return (
      <span style={{ 
        padding: '4px 10px', 
        borderRadius: '50px', 
        fontSize: '0.75rem', 
        fontWeight: '600',
        backgroundColor: style.bg,
        color: style.text,
        border: `1px solid ${style.border}`,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        ● {status}
      </span>
    );
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1000, padding: '16px' }}>
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()} 
        style={{ 
          maxWidth: '1200px', 
          width: '95vw', 
          height: '90vh', 
          padding: 0, 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#FDFCFA'
        }}
      >
        {/* Admin Header */}
        <div style={{ 
          padding: '20px 28px', 
          background: '#561D2B', 
          color: '#FAF7F2', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
              🌸
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FAF7F2', margin: 0 }}>
                  BLOOMÉ Atelier Admin Portal
                </h2>
                <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Press F2 to toggle
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'rgba(250, 247, 242, 0.8)', margin: 0 }}>
                Live orders, customer inquiries, bouquet counts & delivery fulfillment
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={fetchOrders} 
              disabled={loading}
              style={{ 
                background: 'rgba(255,255,255,0.15)', 
                color: '#FAF7F2', 
                border: '1px solid rgba(255,255,255,0.25)', 
                padding: '8px 16px', 
                borderRadius: '50px',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
              title="Refresh Orders"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
            </button>

            <button 
              onClick={onClose} 
              style={{ 
                background: 'rgba(255,255,255,0.15)', 
                color: '#FAF7F2', 
                border: 'none', 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Close Admin Panel"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Quick Analytics Bar */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '16px', 
          padding: '16px 28px', 
          background: '#FAF7F2',
          borderBottom: '1px solid rgba(86, 29, 43, 0.08)'
        }}>
          <div style={{ background: '#FFF', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Orders</span>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--color-burgundy)', margin: '4px 0 0' }}>
              {orders.length}
            </p>
          </div>

          <div style={{ background: '#FFF', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pending Actions</span>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: '700', color: '#D97706', margin: '4px 0 0' }}>
              {pendingOrdersCount}
            </p>
          </div>

          <div style={{ background: '#FFF', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Bouquets</span>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--color-rose-deep)', margin: '4px 0 0' }}>
              {totalBouquetsSold} Stems/Bundles
            </p>
          </div>

          <div style={{ background: '#FFF', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gross Revenue</span>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--color-burgundy)', margin: '4px 0 0' }}>
              ₹{totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ 
          padding: '12px 28px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '16px',
          flexWrap: 'wrap',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          background: '#FFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1', minWidth: '240px' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              <input 
                type="text"
                placeholder="Search by customer name, phone, order #, address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '8px 12px 8px 36px', 
                  borderRadius: '50px', 
                  border: '1px solid rgba(0,0,0,0.12)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  background: 'var(--color-bg)'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={15} color="var(--color-text-muted)" />
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: '500' }}>Status:</span>
            {['All', 'Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  border: statusFilter === st ? '1px solid var(--color-burgundy)' : '1px solid rgba(0,0,0,0.08)',
                  background: statusFilter === st ? 'var(--color-burgundy)' : '#FFF',
                  color: statusFilter === st ? '#FAF7F2' : 'var(--color-text-muted)'
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content: Split View Table + Detail */}
        <div style={{ flex: '1', display: 'grid', gridTemplateColumns: '1.2fr 1fr', overflow: 'hidden' }}>
          
          {/* Left Table / List */}
          <div style={{ overflowY: 'auto', borderRight: '1px solid rgba(0,0,0,0.08)', padding: '16px' }}>
            {error && (
              <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '16px', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '16px' }}>
                <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <AlertCircle size={16} /> Supabase Setup Notice:
                </div>
                {error}
                <p style={{ marginTop: '8px', fontSize: '0.8rem' }}>
                  Please make sure you have run the provided SQL script in your Supabase SQL Editor.
                </p>
              </div>
            )}

            {filteredOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-muted)' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-burgundy)', marginBottom: '6px' }}>
                  No orders found
                </p>
                <p style={{ fontSize: '0.85rem' }}>
                  {orders.length === 0 ? 'Orders will appear here immediately after patrons complete checkout.' : 'No orders matched your search filter.'}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredOrders.map(order => {
                  const isSelected = selectedOrder?.id === order.id;
                  return (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '10px',
                        border: isSelected ? '2px solid var(--color-burgundy)' : '1px solid rgba(0,0,0,0.06)',
                        background: isSelected ? 'rgba(247, 228, 230, 0.25)' : '#FFF',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 4px 12px rgba(86, 29, 43, 0.08)' : '0 1px 3px rgba(0,0,0,0.02)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--color-burgundy)' }}>
                          #{order.order_number}
                        </span>
                        {getStatusBadge(order.status)}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <div>
                          <p style={{ fontWeight: '600', fontSize: '0.92rem', color: 'var(--color-text-main)', margin: '0 0 2px' }}>
                            {order.customer_name}
                          </p>
                          <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Phone size={12} /> {order.phone}
                          </p>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--color-rose-deep)' }}>
                            ₹{Number(order.grand_total || 0).toLocaleString()}
                          </span>
                          <p style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', margin: 0 }}>
                            {order.total_bouquets_count} Bouquet{order.total_bouquets_count > 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>

                      <div style={{ marginTop: '8px', fontSize: '0.72rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} />
                        {new Date(order.created_at).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Detail Pane */}
          <div style={{ overflowY: 'auto', padding: '24px', background: '#FAF7F2' }}>
            {selectedOrder ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(86, 29, 43, 0.1)', paddingBottom: '14px', marginBottom: '20px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-rose-deep)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Order Details
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-burgundy)', margin: '2px 0 0' }}>
                      #{selectedOrder.order_number}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button 
                      onClick={() => handleDeleteOrder(selectedOrder.id, selectedOrder.order_number)}
                      style={{ 
                        background: '#FEE2E2', 
                        color: '#991B1B', 
                        border: '1px solid #FECACA', 
                        padding: '6px 12px', 
                        borderRadius: '6px', 
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      title="Delete this order"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>

                {/* Status Update Control */}
                <div style={{ background: '#FFF', padding: '16px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)', marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Fulfillment Status
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'].map(st => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(selectedOrder.id, st)}
                        disabled={updatingId === selectedOrder.id}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '50px',
                          fontSize: '0.78rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          border: selectedOrder.status === st ? '2px solid var(--color-burgundy)' : '1px solid rgba(0,0,0,0.1)',
                          background: selectedOrder.status === st ? 'var(--color-burgundy)' : '#FAF7F2',
                          color: selectedOrder.status === st ? '#FAF7F2' : 'var(--color-text-main)'
                        }}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer Info Card */}
                <div style={{ background: '#FFF', padding: '18px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)', marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-burgundy)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={16} color="var(--color-rose-deep)" /> Customer & Recipient Info
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '12px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>Customer Name:</span>
                      <p style={{ fontSize: '0.92rem', fontWeight: '600', color: 'var(--color-text-main)', margin: '2px 0 0' }}>
                        {selectedOrder.customer_name}
                      </p>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>Mobile Contact:</span>
                      <p style={{ fontSize: '0.92rem', fontWeight: '600', color: 'var(--color-text-main)', margin: '2px 0 0' }}>
                        <a href={`tel:${selectedOrder.phone}`} style={{ color: 'var(--color-rose-deep)', textDecoration: 'underline' }}>
                          {selectedOrder.phone}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>Delivery Address:</span>
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-main)', margin: '2px 0 0', lineHeight: '1.5' }}>
                      <MapPin size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                      {selectedOrder.address}
                    </p>
                  </div>

                  {selectedOrder.gift_message && (
                    <div style={{ background: 'var(--color-blush-soft)', padding: '12px 14px', borderRadius: '8px', borderLeft: '3px solid var(--color-rose-deep)', marginTop: '12px' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--color-rose-deep)', textTransform: 'uppercase' }}>
                        💌 Handwritten Gift Message:
                      </span>
                      <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--color-burgundy)', margin: '4px 0 0' }}>
                        "{selectedOrder.gift_message}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Bouquets Ordered */}
                <div style={{ background: '#FFF', padding: '18px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-burgundy)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Package size={16} color="var(--color-rose-deep)" /> Ordered Bouquets ({selectedOrder.total_bouquets_count})
                    </h4>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                    {Array.isArray(selectedOrder.items) && selectedOrder.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                        {item.image && (
                          <img src={item.image} alt={item.name} style={{ width: '45px', height: '45px', borderRadius: '6px', objectFit: 'cover' }} />
                        )}
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: '600', fontSize: '0.88rem', color: 'var(--color-text-main)', margin: 0 }}>
                            {item.name}
                          </p>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                            Qty: {item.quantity} × ₹{item.price}
                          </span>
                        </div>
                        <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--color-burgundy)' }}>
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                      <span>Subtotal</span>
                      <span>₹{Number(selectedOrder.subtotal || 0).toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                      <span>Delivery Packaging</span>
                      <span>{selectedOrder.delivery_fee == 0 ? 'FREE' : `₹${selectedOrder.delivery_fee}`}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-burgundy)', borderTop: '1px dashed rgba(86, 29, 43, 0.2)', paddingTop: '8px' }}>
                      <span>Grand Total</span>
                      <span>₹{Number(selectedOrder.grand_total || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--color-text-light)' }}>
                <p>Select an order from the list to view full customer details and fulfillment controls.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
