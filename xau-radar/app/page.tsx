'use client';
import React from 'react';
import TradingViewChart from './TradingViewChart';

export default function Home() {
  return (
    <main style={{ backgroundColor: '#131722', minHeight: '100vh', color: 'white', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#2962ff' }}>XAU Precision Radar v2.0</h1>
        <div style={{ backgroundColor: '#2e7d32', padding: '5px 15px', borderRadius: '20px', fontSize: '14px' }}>
          ● Robot Status: Connected to MT5
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '20px' }}>
        <div style={{ height: '600px', backgroundColor: '#1e222d', borderRadius: '8px' }}>
          <TradingViewChart />
        </div>
        
        <div style={{ backgroundColor: '#1e222d', padding: '20px', borderRadius: '8px' }}>
          <h3>Robot Command</h3>
          <button style={{ width: '100%', padding: '10px', marginBottom: '10px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px' }}>
            AUTO BUY (XAU)
          </button>
          <button style={{ width: '100%', padding: '10px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px' }}>
            AUTO SELL (XAU)
          </button>
          <hr style={{ margin: '20px 0', borderColor: '#363c4e' }} />
          <p style={{ fontSize: '12px', color: '#787b86' }}>Signal Strength: 85%</p>
          <p style={{ fontSize: '12px', color: '#787b86' }}>Active Strategy: Martingale Scalper</p>
        </div>
      </div>
    </main>
  );
}
