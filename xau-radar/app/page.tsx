'use client';

import React from 'react';
import TradingViewChart from './TradingViewChart';

export default function Home() {
  return (
    <main style={{ 
      padding: '20px', 
      backgroundColor: '#131722', 
      minHeight: '100vh', 
      color: 'white',
      fontFamily: 'sans-serif' 
    }}>
      <header style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', color: '#2962ff' }}>XAU Precision Radar</h1>
        <p style={{ color: '#d1d4dc' }}>Real-time Gold Analysis Dashboard</p>
      </header>

      <div style={{ 
        backgroundColor: '#1e222d', 
        borderRadius: '8px', 
        padding: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)' 
      }}>
        {/* Memanggil Komponen Grafik */}
        <TradingViewChart />
      </div>

      <footer style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#787b86' }}>
        © 2026 XAU Precision Radar | Automated Trading System
      </footer>
    </main>
  );
}
