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
    <div style={{ backgroundColor: '#1c1c1c', height: '100vh', color: '#d1d4dc', fontFamily: 'Tahoma, Arial, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Top Menu Bar ala MT5 */}
      <div style={{ backgroundColor: '#2b2b2b', padding: '5px 10px', fontSize: '11px', borderBottom: '1px solid #3d3d3d', display: 'flex', gap: '15px' }}>
        <span>File</span><span>View</span><span>Insert</span><span>Charts</span><span>Tools</span><span>Window</span><span>Help</span>
      </div>

      {/* Main Workspace */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Market Watch (Kiri) */}
        <div style={{ width: '220px', borderRight: '1px solid #3d3d3d', display: 'flex', flexDirection: 'column', backgroundColor: '#2b2b2b' }}>
          <div style={{ backgroundColor: '#363636', padding: '5px', fontSize: '11px', fontWeight: 'bold', borderBottom: '1px solid #3d3d3d' }}>Market Watch: 17:14:11</div>
          <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: '#aaa', textAlign: 'left', backgroundColor: '#363636' }}>
                <th style={{ padding: '3px 5px' }}>Symbol</th>
                <th style={{ padding: '3px 5px' }}>Bid</th>
                <th style={{ padding: '3px 5px' }}>Ask</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #3d3d3d' }}>
                <td style={{ padding: '5px', color: '#ffeb3b' }}>XAUUSD</td>
                <td style={{ color: '#ff5252' }}>2350.45</td>
                <td style={{ color: '#81c784' }}>2350.60</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #3d3d3d' }}>
                <td style={{ padding: '5px' }}>BTCUSD</td>
                <td>64210.2</td>
                <td>64215.5</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Chart Area (Tengah) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#000' }}>
          {/* Tool Bar Tab */}
          <div style={{ backgroundColor: '#363636', padding: '3px 10px', fontSize: '11px', borderBottom: '1px solid #3d3d3d', display: 'flex', gap: '10px' }}>
            <span style={{ color: '#2962ff' }}>XAUUSD, H1</span>
          </div>
          
          <div style={{ flex: 1, position: 'relative' }}>
            {/* Quick Trade Buttons */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10, display: 'flex', gap: '2px', border: '1px solid #555' }}>
              <button onClick={() => fetch('/api/robot', { method: 'PATCH', body: JSON.stringify({ action: 'SELL' }) })} 
                style={{ background: '#d32f2f', color: 'white', border: 'none', padding: '5px 12px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>SELL 0.01</button>
              <button onClick={() => fetch('/api/robot', { method: 'PATCH', body: JSON.stringify({ action: 'BUY' }) })}
                style={{ background: '#2e7d32', color: 'white', border: 'none', padding: '5px 12px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>BUY 0.01</button>
            </div>
            <TradingViewChart />
          </div>
        </div>

        {/* Navigator (Kanan) */}
        <div style={{ width: '180px', borderLeft: '1px solid #3d3d3d', backgroundColor: '#2b2b2b' }}>
          <div style={{ backgroundColor: '#363636', padding: '5px', fontSize: '11px', fontWeight: 'bold', borderBottom: '1px solid #3d3d3d' }}>Navigator</div>
          <div style={{ padding: '8px', fontSize: '11px', lineHeight: '1.8' }}>
            <div>📁 Accounts</div>
            <div style={{ paddingLeft: '15px', color: '#81c784' }}>✔️ Live-Server</div>
            <div>🤖 Expert Advisors</div>
            <div style={{ paddingLeft: '15px', color: '#64b5f6' }}>⚙️ XAU Precision EA</div>
          </div>
        </div>
      </div>

      {/* Toolbox / Terminal (Bawah) */}
      <div style={{ height: '140px', backgroundColor: '#2b2b2b', borderTop: '2px solid #3d3d3d' }}>
        <div style={{ display: 'flex', backgroundColor: '#363636', fontSize: '11px', borderBottom: '1px solid #3d3d3d' }}>
          <div style={{ padding: '4px 12px', backgroundColor: '#2b2b2b', borderRight: '1px solid #3d3d3d' }}>Trade</div>
          <div style={{ padding: '4px 12px', borderRight: '1px solid #3d3d3d' }}>Exposure</div>
          <div style={{ padding: '4px 12px', borderRight: '1px solid #3d3d3d' }}>History</div>
          <div style={{ padding: '4px 12px', borderRight: '1px solid #3d3d3d' }}>Journal</div>
        </div>
        <div style={{ padding: '5px', overflowY: 'auto' }}>
          <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: '#aaa', borderBottom: '1px solid #3d3d3d' }}>
                <th style={{ padding: '5px' }}>Ticket</th>
                <th style={{ padding: '5px' }}>Time</th>
                <th style={{ padding: '5px' }}>Type</th>
                <th style={{ padding: '5px' }}>Size</th>
                <th style={{ padding: '5px' }}>Price</th>
                <th style={{ padding: '5px' }}>Profit</th>
              </tr>
            </thead>
          </table>
          {/* Summary Row */}
          <div style={{ padding: '10px 5px', fontSize: '12px', fontWeight: 'bold', borderTop: '1px solid #3d3d3d', marginTop: '30px' }}>
            Balance: {data.balance} USD &nbsp;&nbsp; 
            Equity: {data.equity} USD &nbsp;&nbsp; 
            Margin: 0.00 &nbsp;&nbsp; 
            Free margin: {data.equity} &nbsp;&nbsp;
            <span style={{ color: data.status === 'Active' ? '#81c784' : '#f44336', float: 'right' }}>
              Robot Status: {data.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
