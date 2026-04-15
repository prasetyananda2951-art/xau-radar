"use client";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import TradingViewChart from './TradingViewChart';

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyDGK5QMLpXLNNZB6PPSAw8LG5qvvvj1Ye4",
  databaseURL: "https://xau-precision-radar-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "xau-precision-radar",
  appId: "1:701873507385:web:24f83f3108f2fb68b711e8"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function Dashboard() {
  const [signal, setSignal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const signalRef = ref(database, "live_signal");
    
    // Mendengarkan perubahan data di Firebase secara real-time
    const unsubscribe = onValue(signalRef, (snapshot) => {
      const data = snapshot.val();
      setSignal(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center border-b border-slate-700 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-yellow-500">XAU PRECISION RADAR</h1>
          <p className="text-slate-400">Real-time Gold Trading Signals from MT5</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <div className={w-3 h-3 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}}></div>
            <span className="text-sm font-medium">{loading ? 'Connecting...' : 'Firebase Connected'}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">ID: xau-precision-pro</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Kolom Kiri: Sinyal */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              📡 Signal Alert
            </h2>
            
            {loading ? (
              <p className="text-slate-500 italic">Mengambil data...</p>
            ) : signal ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg text-center font-bold text-xl border-2 ${
                  signal.message?.includes('BUY') 
                    ? 'bg-green-900/30 border-green-500 text-green-400' 
                    : 'bg-red-900/30 border-red-500 text-red-400'
                }`}>
                  {signal.message}
                </div>
                <div className="text-sm text-slate-400 text-center">
                  Updated: {signal.timestamp}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-900 rounded-lg text-center border border-dashed border-slate-600">
                <p className="text-slate-500">Menunggu Sinyal Market...</p>
              </div>
            )}
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-sm font-bold text-slate-400 uppercase mb-3">Market Info</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pair:</span>
                <span className="text-yellow-500 font-mono">XAUUSD (GOLD)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Server:</span>
                <span className="text-blue-400">MetaTrader 5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Grafik */}
        <div className="lg:col-span-3">
          <div className="bg-slate-800 p-2 rounded-xl border border-slate-700 shadow-xl h-[600px]">
            <TradingViewChart />
          </div>
        </div>
      </div>
    </div>
  );
}
