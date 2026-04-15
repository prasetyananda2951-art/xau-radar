'use client';
import React, { useState, useEffect } from 'react';
import TradingViewChart from './TradingViewChart';

export default function Home() {
  const [data, setData] = useState({
    balance: "0.00",
    equity: "0.00",
    status: "Connecting...",
    lastUpdate: "-"
  });

  // Fungsi untuk mengambil data dari API Robot setiap 5 detik
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/robot');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Gagal mengambil data robot:", error);
      }
    };

    const interval = setInterval(fetchData, 5000); // Update setiap 5 detik
    fetchData(); // Ambil data pertama kali saat halaman dibuka

    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ backgroundColor: '#131722', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Header dengan Status Robot */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #2a2e39', paddingBottom: '10px' }}>
        <div>
          <h1 style={{ color: '#2962ff', margin: 0, fontSize: '24px' }}>XAU Precision Radar v2.0</h1>
          <p style={{ color: '#787b86', fontSize: '12px', margin: '5px 0 0 0' }}>MT5 Bridge Active</p>
        </div>
        <div style={{ backgroundColor: '#1e222d', padding: '10px 20px', borderRadius: '8px', border: '1px solid #363c4e' }}>
          <span style={{ fontSize: '12px', color: '#787b86' }}>Robot Status: </span>
          <span style={{ color: data.status === 'Active' ? '#2e7d32' : '#d32f2f', fontWeight: 'bold' }}>
            ● {data.status}
          </span>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '20px' }}>
        {/* Kolom Grafik TradingView */}
        <div style={{ backgroundColor: '#1e222d', borderRadius: '8px', padding: '10px', border: '1px solid #363c4e' }}>
          <TradingViewChart />
        </div>
        
        {/* Kolom Informasi Akun MT5 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ backgroundColor: '#1e222d', padding: '20px', borderRadius: '8px', border: '1px solid #363c4e' }}>
            <h3 style={{ marginTop: 0, fontSize: '18px', borderBottom: '1px solid #363c4e', paddingBottom: '10px' }}>Account Info</h3>
            
            <div style={{ margin: '20px 0' }}>
              <div style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '12px', color: '#787b86', margin: 0 }}>Balance (USD)</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#fff' }}>${data.balance}</p>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '12px', color: '#787b86', margin: 0 }}>Equity (USD)</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2962ff' }}>${data.equity}</p>
              </div>
              <p style={{ fontSize: '11px', color: '#5d606b' }}>Last Sync: {data.lastUpdate}</p>
            </div>

            <button 
              style={{ width: '100%', padding: '12px', backgroundColor: '#2962ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              REFRESH DATA
            </button>
          </div>

          {/* Log Aktivitas Sederhana */}
          <div style={{ backgroundColor: '#1e222d', padding: '20px', borderRadius: '8px', border: '1px solid #363c4e', flexGrow: 1 }}>
            <h4 style={{ marginTop: 0 }}>Signal Log</h4>
            <div style={{ fontSize: '12px', color: '#d1d4dc' }}>
              <p style={{ borderLeft: '2px solid #2e7d32', paddingLeft: '10px' }}>[INFO] Monitoring XAUUSD...</p>
              {data.status === 'Active' && (
                <p style={{ borderLeft: '2px solid #2e7d32', paddingLeft: '10px' }}>[MT5] Connection established.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
