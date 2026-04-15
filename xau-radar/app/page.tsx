'use client';
import React, { useState, useEffect } from 'react';
import TradingViewChart from './TradingViewChart';

export default function Home() {
  const [data, setData] = useState({ balance: "0.00", equity: "0.00", status: "Offline" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/robot');
        const json = await res.json();
        setData(json);
      } catch (e) { console.error(e); }
    };
    const itv = setInterval(fetchData, 3000);
    return () => clearInterval(itv);
  }, []);

  return (
    <div style={{ backgroundColor: '#1c1c1c', height: '100vh', color: '#d1d4dc', fontFamily: 'Segoe UI, Tahoma, sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Menu Bar ala MT5 */}
      <div style={{ backgroundColor: '#2b2b2b', padding: '5px 10px', fontSize: '12px', borderBottom: '1px solid #3d3d3d', display: 'flex', gap: '15px' }}>
        <span>File</span><span>View</span><span>Insert</span><span>Charts</span><span>Tools</span><span>Window</span><span>Help</span>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Market Watch (Kiri) */}
        <div style={{ width: '250px', borderRight: '1px solid #3d3d3d', display: 'flex', flexDirection: 'column' }}>
          <div style={{ backgroundColor: '#363636', padding: '5px', fontSize: '12px', fontWeight: 'bold' }}>Market Watch</div>
          <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: '#aaa', textAlign: 'left' }}>
                <th style={{ padding: '5px' }}>Symbol</th><th style={{ padding: '5px' }}>Bid</th><th style={{ padding: '5px' }}>Ask</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #2b2b2b' }}>
                <td style={{ padding: '5px', color: '#ffeb3b' }}>XAUUSD</td><td>2350.45</td><td>2350.60</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #2b2b2b' }}>
                <td style={{ padding: '5px' }}>BTCUSD</td><td>64210.2</td><td>64215.5</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Chart Area (Tengah) */}
        <div style={{ flex: 1, position: 'relative', backgroundColor: '#000' }}>
          <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10, display: 'flex', gap: '5px' }}>
            <button style={{ background: '#d32f2f', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>SELL 0.01</button>
            <button style={{ background: '#2e7d32', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>BUY 0.01</button>
          </div>
          <TradingViewChart />
        </div>

        {/* Navigator/Robot Status (Kanan) */}
        <div style={{ width: '200px', borderLeft: '1px solid #3d3d3d', backgroundColor: '#2b2b2b' }}>
          <div style={{ backgroundColor: '#363636', padding: '5px', fontSize: '12px', fontWeight: 'bold' }}>Navigator</div>
          <div style={{ padding: '10px', fontSize: '12px' }}>
            <p>📁 Accounts</p>
            <p style={{ paddingLeft: '15px', color: '#81c784' }}>✔️ MetaQuotes-Demo</p>
            <p>🤖 Expert Advisors</p>
            <p style={{ paddingLeft: '15px', color: '#64b5f6' }}>⚙️ XAU Precision Bot</p>
          </div>
        </div>
      </div>

      {/* Toolbox / Terminal (Bawah) */}
      <div style={{ height: '150px', backgroundColor: '#2b2b2b', borderTop: '1px solid #3d3d3d' }}>
        <div style={{ display: 'flex', backgroundColor: '#363636', fontSize: '11px' }}>
          <div style={{ padding: '5px 15px', borderRight: '1px solid #3d3d3d', backgroundColor: '#2b2b2b' }}>Trade</div>
          <div style={{ padding: '5px 15px', borderRight: '1px solid #3d3d3d' }}>Exposure</div>
          <div style={{ padding: '5px 15px', borderRight: '1px solid #3d3d3d' }}>History</div>
        </div>
        <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <tr style={{ color: '#aaa', backgroundColor: '#2b2b2b' }}>
            <th style={{ padding: '5px' }}>Balance: ${data.balance}</th>
            <th style={{ padding: '5px' }}>Equity: ${data.equity}</th>
            <th style={{ padding: '5px' }}>Margin: 0.00</th>
            <th style={{ padding: '5px' }}>Free Margin: ${data.equity}</th>
            <th style={{ padding: '5px', color: data.status === 'Active' ? '#81c784' : '#f44336' }}>Status: {data.status}</th>
          </tr>
        </table>
      </div>
    </div>
  );
}
