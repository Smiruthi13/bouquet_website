import React from 'react';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand">
            <a href="#hero" className="brand-logo" style={{ fontSize: '1.8rem', letterSpacing: '0.18em' }}>
              BLOOMÉ
            </a>
            <p className="footer-about-text">
              Haute flower boutique delivering handcrafted, fresh floral poetry directly to your doorstep. 
              Elevating every emotion through botanical art.
            </p>
            <div className="footer-social-links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Pinterest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="4" x2="12" y2="20"></line>
                  <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0"></path>
                </svg>
              </a>
              <a href="mailto:concierge@bloome.com" className="social-link" aria-label="Email Concierge">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Collections</h4>
            <ul className="footer-nav-list">
              <li><a href="#bouquets">All Bouquets</a></li>
              <li><a href="#bouquets">Roses & Peonies</a></li>
              <li><a href="#bouquets">Dutch Tulips</a></li>
              <li><a href="#bouquets">Sympathy & Lilies</a></li>
              <li><a href="#bouquets">Artisanal Mixed</a></li>
            </ul>
          </div>

          {/* Experience */}
          <div>
            <h4 className="footer-heading">Boutique</h4>
            <ul className="footer-nav-list">
              <li><a href="#featured">Our Atelier</a></li>
              <li><a href="#about">Philosophy</a></li>
              <li><a href="#about">Flower Care Guide</a></li>
              <li><a href="#about">Sustainable Sourcing</a></li>
              <li><a href="#contact">Custom Events & Weddings</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-heading">Atelier Concierge</h4>
            <div className="footer-contact-item">
              <MapPin size={18} />
              <span>Pavilion Atelier, 42 Boulevard de Fleurs, Indiranagar, Bengaluru 560038</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} />
              <span>+91 (80) 4122 8900</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} />
              <span>hello@bloomefleuriste.com</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} BLOOMÉ Haute Fleuriste. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Crafted with <Heart size={14} fill="#B8596E" color="#B8596E" /> for floral lovers
          </p>
        </div>
      </div>
    </footer>
  );
};
