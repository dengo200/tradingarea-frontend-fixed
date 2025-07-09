import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://tradingarea.onrender.com/api';

function Home() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/offers`)
      .then(res => setOffers(res.data))
      .catch(() => setOffers([]));
  }, []);

  return (
    <div className="container">
      <h2>Marktplatz</h2>
      {offers.length === 0 ? (
        <p>Keine Angebote gefunden.</p>
      ) : (
        <ul>
          {offers.map((offer, idx) => (
            <li key={idx}>{offer.name} – {offer.price} Coins</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Login() {
  return (
    <div className="container">
      <h2>Steam Login</h2>
      <a href="https://tradingarea.onrender.com/auth/steam">
        <button>Mit Steam einloggen</button>
      </a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Startseite</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>Seite nicht gefunden</div>} />
      </Routes>
    </Router>
  );
}

export default App;