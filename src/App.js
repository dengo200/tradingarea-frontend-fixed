import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get('https://tradingarea.onrender.com/api/offers');
        if (Array.isArray(res.data)) {
          setOffers(res.data);
        } else {
          console.warn('Unerwartete Antwort:', res.data);
          setOffers([]);
        }
      } catch (err) {
        console.error('Fehler beim Laden:', err);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div style={{ backgroundColor: '#111', color: 'white', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>TradingArea – Skin-Angebote</h1>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Lade Angebote...</p>
      ) : offers.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Keine Angebote gefunden.</p>
      ) : (
        <div style={{
          display: 'grid',
          gap: '

