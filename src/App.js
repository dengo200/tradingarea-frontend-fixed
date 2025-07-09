import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://tradingarea.onrender.com/api/offers')
      .then((res) => {
        setOffers(res.data || []);
      })
      .catch((err) => {
        console.error('Fehler beim Laden der Angebote:', err);
        setOffers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">TradingArea – Skin-Angebote</h1>

      {loading ? (
        <p className="text-center">Lade Angebote...</p>
      ) : offers.length === 0 ? (
        <p className="text-center text-gray-400">Noch keine Angebote verfügbar.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-gray-800 rounded-lg shadow p-4 hover:bg-gray-700 transition">
              <h2 className="text-xl font-semibold mb-2">{offer.itemName || 'Unbenannter Skin'}</h2>
              <p>Preis: {offer.price || 'k.A.'} Coins<
