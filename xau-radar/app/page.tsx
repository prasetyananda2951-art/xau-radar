'use client';
import React, { useState, useEffect } from 'react';
import TradingViewChart from './TradingViewChart';

export default function Home() {
  const [robotStatus, setRobotStatus] = useState('Active');
  const [lastSignal, setLastSignal] = useState('Wait');

  return (
    <main style={{ backgroundColor: '#131722', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Header Dashboard */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #2a2e39', paddingBottom: '10px' }}>
        <div>
          <h1 style={{ color: '#2962ff', margin: 0, fontSize: '24px' }}>XAU Precision Radar v2.0</h1>
          <p style={{ color: '#787b86', fontSize: '12px', margin: '5px 0 0 0' }}>Connected to MetaTrader 5 Terminal</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ backgroundColor: '#1e222d', padding: '10px 20px', borderRadius: '8px', border: '1px solid #363c4e' }}>
            <span style={{ fontSize: '12px', color: '#787b86' }}>Status: </span>
            <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>● {robotStatus}</span>
          </div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '20px' }}>
        {/* Kolom Grafik */}
        <div style={{ backgroundColor: '#1e222d', borderRadius: '8px', padding: '10px', border: '1px solid #363c4e' }}>
          <TradingViewChart />
        </div>
        
        {/* Kolom Kontrol Robot */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ backgroundColor: '#1e222d', padding: '20px', borderRadius: '8px', border: '1px solid #363c4e' }}>
            <h3 style={{ marginTop: 0, fontSize: '18px', borderBottom: '1px solid #363c4e', paddingBottom: '10px' }}>Robot Console</h3>
            
            <div style={{ margin: '20px 0' }}>
              <p style={{ fontSize: '14px', color: '#d1d4dc' }}>Last Signal: <span style={{ color: '#ff9800' }}>{lastSignal}</span></p>
              <p style={{ fontSize: '14px', color: '#d1d4dc' }}>Strategy: <span style={{ color: '#2962ff' }}>Martingale Scalper</span></p>
              <p style={{ fontSize: '14px', color: '#d1d4dc' }}>Pair: <span style={{ color: '#2962ff' }}>XAU/USD</span></p>
            </div>

            <button 
              onClick={() => alert('Sending Manual Buy to MT5...')}
              style={{ width: '100%', padding: '12px', marginBottom: '10px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              MANUAL BUY
            </button>
            <button 
              onClick={() => alert('Sending Manual Sell to MT5...')}
              style={{ width: '100%', padding: '12px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              MANUAL SELL
            </button>
          </div>

          <div style={{ backgroundColor: '#1e222d', padding: '20px', borderRadius: '8px', border: '1px solid #363c4e' }}>
            <h4 style={{ marginTop: 0 }}>Active Trades</h4>
            <p style={{ fontSize: '12px', color: '#787b86' }}>No active positions found.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
